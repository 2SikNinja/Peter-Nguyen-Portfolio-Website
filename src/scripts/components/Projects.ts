export class Projects {
  private config: any;
  private carouselIntervals: Map<string, NodeJS.Timeout> = new Map();
  private intersectionObserver: IntersectionObserver | null = null;
  private isDestroyed: boolean = false;
  private modal: HTMLElement | null = null;
  private currentProjectImages: string[] = [];
  private currentImageIndex = 0;
  private currentProjectTitle = '';
  private isClosing: boolean = false; // Add debounce flag

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const projects = this.config.projects.map((project: any) => `
      <div class="project-card ${project.featured ? 'featured' : ''}" data-project-id="${project.id}">
        <div class="project-images">
          ${project.images.map((img: string, index: number) => `
            <img 
              src="${img}" 
              alt="${project.title} screenshot ${index + 1}" 
              class="project-image ${index === 0 ? 'active' : ''}"
              loading="lazy"
              onerror="this.src='/images/placeholder.jpg'; this.alt='Image not available';"
              data-project-title="${project.title}"
              data-image-index="${index}"
              style="cursor: zoom-in;"
            />
          `).join('')}
          ${project.images.length > 1 ? `
            <button class="carousel-nav carousel-prev" data-direction="prev" aria-label="Previous image">‹</button>
            <button class="carousel-nav carousel-next" data-direction="next" aria-label="Next image">›</button>
            <div class="carousel-dots">
              ${project.images.map((_: string, index: number) => `
                <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.techIcons.map((icon: string) => `
              <img 
                src="${icon}" 
                alt="Technology" 
                class="tech-icon"
                loading="lazy"
                onerror="this.style.display='none';"
              />
            `).join('')}
          </div>
          <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
            View Project →
          </a>
        </div>
      </div>
    `).join('');
    
    return `
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          ${projects}
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    if (this.isDestroyed) return;
    
    this.setupCarousels();
    this.setupIntersectionObserver();
    this.setupImageModal();
  }

  private setupImageModal(): void {
    // Create modal and append directly to body to escape any container constraints
    this.createModal();

    // Open modal when clicking on project images
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('project-image')) {
        e.preventDefault();
        e.stopPropagation();
        
        const projectCard = target.closest('.project-card');
        if (!projectCard) return;

        const projectId = projectCard.getAttribute('data-project-id');
        const project = this.config.projects.find((p: any) => p.id.toString() === projectId);
        
        if (project) {
          this.currentProjectImages = project.images;
          this.currentProjectTitle = project.title;
          this.currentImageIndex = parseInt(target.getAttribute('data-image-index') || '0');
          
          this.openImageModal();
        }
      }
    });
  }

  private createModal(): void {
    // Remove existing modal if it exists (prevent duplicates)
    if (this.modal && document.body.contains(this.modal)) {
      document.body.removeChild(this.modal);
      this.modal = null;
    }

    // Also clean up any existing fullscreen modals
    const existingModals = document.querySelectorAll('.fullscreen-image-modal');
    existingModals.forEach(modal => modal.remove());

    // Create modal HTML with unique IDs to prevent conflicts
    const uniqueId = Date.now();
    const modalHTML = `
      <div class="fullscreen-image-modal" id="fullscreenImageModal_${uniqueId}">
        <div class="fullscreen-modal-backdrop" id="backdrop_${uniqueId}"></div>
        <button class="fullscreen-modal-close" id="closeBtn_${uniqueId}" type="button">&times;</button>
        
        <div class="fullscreen-image-container">
          <button class="fullscreen-nav fullscreen-prev" id="prevBtn_${uniqueId}" type="button">‹</button>
          <img src="" alt="" class="fullscreen-modal-image" id="modalImage_${uniqueId}" />
          <button class="fullscreen-nav fullscreen-next" id="nextBtn_${uniqueId}" type="button">›</button>
        </div>
        
        <div class="fullscreen-modal-info">
          <h3 class="fullscreen-modal-title" id="modalTitle_${uniqueId}"></h3>
          <p class="fullscreen-modal-counter" id="modalCounter_${uniqueId}"></p>
        </div>
        
        <div class="fullscreen-modal-hint">
          Use ← → arrow keys or ESC to close
        </div>
      </div>
    `;

    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    this.modal = modalDiv.firstElementChild as HTMLElement;

    // Store unique ID for cleanup
    this.modal.dataset.uniqueId = uniqueId.toString();

    // Append directly to body
    document.body.appendChild(this.modal);

    // Setup event listeners immediately with unique selectors
    this.setupModalEventListeners(uniqueId);
  }

  private setupModalEventListeners(uniqueId: number): void {
    if (!this.modal) return;

    // Get elements using unique IDs
    const closeBtn = document.getElementById(`closeBtn_${uniqueId}`);
    const prevBtn = document.getElementById(`prevBtn_${uniqueId}`);
    const nextBtn = document.getElementById(`nextBtn_${uniqueId}`);
    const backdrop = document.getElementById(`backdrop_${uniqueId}`);

    // Create bound functions to avoid multiple listeners
    const boundCloseModal = () => {
      if (this.isClosing) return;
      this.closeImageModal();
    };

    const boundPrevImage = () => {
      this.previousModalImage();
    };

    const boundNextImage = () => {
      this.nextModalImage();
    };

    // Close modal events - use once option to prevent multiple triggers
    closeBtn?.addEventListener('click', boundCloseModal, { once: false });
    
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop && !this.isClosing) {
        this.closeImageModal();
      }
    }, { once: false });

    // Navigation events
    prevBtn?.addEventListener('click', boundPrevImage, { once: false });
    nextBtn?.addEventListener('click', boundNextImage, { once: false });

    // Keyboard events - store reference for cleanup
    this.keydownHandler = (e: KeyboardEvent) => {
      if (!this.modal?.classList.contains('active')) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (!this.isClosing) {
            this.closeImageModal();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previousModalImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextModalImage();
          break;
      }
    };

    document.addEventListener('keydown', this.keydownHandler);

    // Store handler references for cleanup
    this.modalHandlers = {
      close: boundCloseModal,
      prev: boundPrevImage,
      next: boundNextImage,
      keydown: this.keydownHandler
    };
  }

  private keydownHandler?: (e: KeyboardEvent) => void;
  private modalHandlers?: any;

  private openImageModal(): void {
    if (!this.modal || this.isClosing) return;
    
    // Show modal
    this.modal.classList.add('active');
    
    // Lock body scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Update image
    this.updateModalImage();
  }

  private closeImageModal(): void {
    // Prevent multiple close attempts
    if (!this.modal || !this.modal.classList.contains('active') || this.isClosing) {
      return;
    }
    
    // Set closing flag
    this.isClosing = true;
    
    // Hide modal
    this.modal.classList.remove('active');
    
    // Unlock body scroll
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    
    // Reset closing flag after animation completes
    setTimeout(() => {
      this.isClosing = false;
    }, 300); // Match CSS transition duration
  }

  private updateModalImage(): void {
    if (!this.modal) return;
    
    const uniqueId = this.modal.dataset.uniqueId;
    const modalImage = document.getElementById(`modalImage_${uniqueId}`) as HTMLImageElement;
    const modalTitle = document.getElementById(`modalTitle_${uniqueId}`);
    const modalCounter = document.getElementById(`modalCounter_${uniqueId}`);
    const prevBtn = document.getElementById(`prevBtn_${uniqueId}`) as HTMLElement;
    const nextBtn = document.getElementById(`nextBtn_${uniqueId}`) as HTMLElement;
    
    if (modalImage && modalTitle && modalCounter) {
      modalImage.src = this.currentProjectImages[this.currentImageIndex];
      modalImage.alt = `${this.currentProjectTitle} screenshot ${this.currentImageIndex + 1}`;
      modalTitle.textContent = this.currentProjectTitle;
      modalCounter.textContent = `${this.currentImageIndex + 1} / ${this.currentProjectImages.length}`;
      
      // Show/hide navigation buttons
      if (prevBtn && nextBtn) {
        const showNav = this.currentProjectImages.length > 1;
        prevBtn.style.display = showNav ? 'flex' : 'none';
        nextBtn.style.display = showNav ? 'flex' : 'none';
      }
    }
  }

  private previousModalImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProjectImages.length) % this.currentProjectImages.length;
    this.updateModalImage();
  }

  private nextModalImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProjectImages.length;
    this.updateModalImage();
  }

  private setupCarousels(): void {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      const projectId = card.getAttribute('data-project-id');
      if (!projectId) return;

      const images = card.querySelectorAll('.project-image');
      const dots = card.querySelectorAll('.carousel-dot');
      const prevBtn = card.querySelector('.carousel-prev');
      const nextBtn = card.querySelector('.carousel-next');
      
      if (images.length <= 1) return; // Skip if only one image
      
      let currentIndex = 0;
      
      const showImage = (index: number) => {
        if (this.isDestroyed) return;
        
        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      };
      
      const nextImage = () => {
        if (this.isDestroyed) return;
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      };
      
      const prevImage = () => {
        if (this.isDestroyed) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      };
      
      // Event listeners with proper cleanup
      const handleNext = (e: Event) => {
        e.stopPropagation();
        nextImage();
        this.resetAutoplay(projectId);
      };
      
      const handlePrev = (e: Event) => {
        e.stopPropagation();
        prevImage();
        this.resetAutoplay(projectId);
      };
      
      const handleDotClick = (e: Event, index: number) => {
        e.stopPropagation();
        currentIndex = index;
        showImage(currentIndex);
        this.resetAutoplay(projectId);
      };
      
      // Add event listeners
      nextBtn?.addEventListener('click', handleNext);
      prevBtn?.addEventListener('click', handlePrev);
      
      dots.forEach((dot, index) => {
        const handler = (e: Event) => handleDotClick(e, index);
        dot.addEventListener('click', handler);
      });
      
      // Keyboard navigation
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.target !== card && !card.contains(e.target as Node)) return;
        
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            prevImage();
            this.resetAutoplay(projectId);
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextImage();
            this.resetAutoplay(projectId);
            break;
        }
      };
      
      card.addEventListener('keydown', handleKeydown);
      
      // Auto-play with proper cleanup
      this.startAutoplay(projectId, nextImage);
      
      // Pause/resume on hover
      const handleMouseEnter = () => this.pauseAutoplay(projectId);
      const handleMouseLeave = () => this.resumeAutoplay(projectId, nextImage);
      
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  private startAutoplay(projectId: string, nextImageFn: () => void): void {
    this.clearAutoplay(projectId);
    
    const interval = setInterval(() => {
      if (!this.isDestroyed && this.isProjectVisible(projectId)) {
        nextImageFn();
      }
    }, 5000);
    
    this.carouselIntervals.set(projectId, interval);
  }

  private pauseAutoplay(projectId: string): void {
    const interval = this.carouselIntervals.get(projectId);
    if (interval) {
      clearInterval(interval);
      this.carouselIntervals.delete(projectId);
    }
  }

  private resumeAutoplay(projectId: string, nextImageFn: () => void): void {
    if (!this.carouselIntervals.has(projectId)) {
      this.startAutoplay(projectId, nextImageFn);
    }
  }

  private resetAutoplay(projectId: string): void {
    const card = document.querySelector(`[data-project-id="${projectId}"]`);
    if (!card) return;
    
    const images = card.querySelectorAll('.project-image');
    if (images.length <= 1) return;
    
    this.pauseAutoplay(projectId);
    
    // Restart autoplay after a delay
    setTimeout(() => {
      if (!this.isDestroyed) {
        let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        
        const nextImageFn = () => {
          if (this.isDestroyed) return;
          currentIndex = (currentIndex + 1) % images.length;
          const dots = card.querySelectorAll('.carousel-dot');
          
          images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
          });
          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
          });
        };
        
        this.startAutoplay(projectId, nextImageFn);
      }
    }, 1000);
  }

  private clearAutoplay(projectId: string): void {
    const interval = this.carouselIntervals.get(projectId);
    if (interval) {
      clearInterval(interval);
      this.carouselIntervals.delete(projectId);
    }
  }

  private isProjectVisible(projectId: string): boolean {
    const card = document.querySelector(`[data-project-id="${projectId}"]`);
    if (!card) return false;
    
    const rect = card.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  private setupIntersectionObserver(): void {
    // Pause carousels when not visible for performance
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const projectId = entry.target.getAttribute('data-project-id');
        if (!projectId) return;
        
        if (!entry.isIntersecting) {
          this.pauseAutoplay(projectId);
        } else {
          // Resume autoplay when visible again
          const card = entry.target;
          const images = card.querySelectorAll('.project-image');
          if (images.length > 1) {
            let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
            
            const nextImageFn = () => {
              if (this.isDestroyed) return;
              currentIndex = (currentIndex + 1) % images.length;
              const dots = card.querySelectorAll('.carousel-dot');
              
              images.forEach((img, i) => {
                img.classList.toggle('active', i === currentIndex);
              });
              dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
              });
            };
            
            this.startAutoplay(projectId, nextImageFn);
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
      this.intersectionObserver?.observe(card);
    });
  }

  public destroy(): void {
    this.isDestroyed = true;
    
    // Clean up all carousel intervals
    this.carouselIntervals.forEach((interval, projectId) => {
      clearInterval(interval);
    });
    this.carouselIntervals.clear();
    
    // Clean up intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    
    // Clean up modal event listeners
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = undefined;
    }
    
    // Remove modal from body
    if (this.modal && document.body.contains(this.modal)) {
      document.body.removeChild(this.modal);
      this.modal = null;
    }
    
    // Restore body scroll
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    
    // Reset flags
    this.isClosing = false;
    
    // Remove event listeners from DOM elements
    document.querySelectorAll('.project-card').forEach(card => {
      const clonedCard = card.cloneNode(true);
      card.parentNode?.replaceChild(clonedCard, card);
    });
  }
}