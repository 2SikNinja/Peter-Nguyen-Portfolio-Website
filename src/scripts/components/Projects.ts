export class Projects {
  private config: any;
  private carouselIntervals: Map<string, NodeJS.Timeout> = new Map();
  private intersectionObserver: IntersectionObserver | null = null;
  private isDestroyed: boolean = false;

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
    
    // Remove event listeners from DOM elements
    document.querySelectorAll('.project-card').forEach(card => {
      const clonedCard = card.cloneNode(true);
      card.parentNode?.replaceChild(clonedCard, card);
    });
  }

  // Performance monitoring (optional)
  private logPerformance(operation: string, startTime: number): void {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 16) { // Slower than 60fps
      console.warn(`${operation} took ${duration.toFixed(2)}ms (slower than 16ms)`);
    }
  }
}