// src/scripts/utils/carousel.ts

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CarouselOptions {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  swipeEnabled?: boolean;
  fadeTransition?: boolean;
}

export class ImageCarousel {
  private container: HTMLElement;
  private images: CarouselImage[];
  private currentIndex: number = 0;
  private options: Required<CarouselOptions>;
  
  private isPlaying: boolean = false;
  private autoPlayTimer: NodeJS.Timeout | null = null;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  
  // DOM Elements
  private carouselWrapper!: HTMLElement;
  private imagesContainer!: HTMLElement;
  private prevArrow?: HTMLButtonElement;
  private nextArrow?: HTMLButtonElement;
  private dotsContainer?: HTMLElement;

  constructor(container: HTMLElement, images: CarouselImage[], options: CarouselOptions = {}) {
    this.container = container;
    this.images = images;
    this.options = {
      autoPlay: false,
      autoPlayInterval: 5000,
      showDots: true,
      showArrows: true,
      loop: true,
      swipeEnabled: true,
      fadeTransition: false,
      ...options
    };
    
    this.init();
  }

  private init(): void {
    this.createCarouselStructure();
    this.renderImages();
    this.setupEventListeners();
    this.updateDisplay();
    
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }

  private createCarouselStructure(): void {
    this.container.innerHTML = '';
    this.container.className = 'carousel-container';
    
    // Main carousel wrapper
    this.carouselWrapper = document.createElement('div');
    this.carouselWrapper.className = 'carousel-wrapper';
    
    // Images container
    this.imagesContainer = document.createElement('div');
    this.imagesContainer.className = this.options.fadeTransition ? 'carousel-images fade-mode' : 'carousel-images slide-mode';
    
    // Navigation arrows
    if (this.options.showArrows && this.images.length > 1) {
      this.createArrows();
    }
    
    // Dots indicator
    if (this.options.showDots && this.images.length > 1) {
      this.createDots();
    }
    
    this.carouselWrapper.appendChild(this.imagesContainer);
    this.container.appendChild(this.carouselWrapper);
  }

  private createArrows(): void {
    // Previous arrow
    this.prevArrow = document.createElement('button');
    this.prevArrow.className = 'carousel-arrow carousel-prev';
    this.prevArrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    this.prevArrow.setAttribute('aria-label', 'Previous image');
    
    // Next arrow
    this.nextArrow = document.createElement('button');
    this.nextArrow.className = 'carousel-arrow carousel-next';
    this.nextArrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    this.nextArrow.setAttribute('aria-label', 'Next image');
    
    this.carouselWrapper.appendChild(this.prevArrow);
    this.carouselWrapper.appendChild(this.nextArrow);
  }

  private createDots(): void {
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.className = 'carousel-dots';
    
    this.images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to image ${index + 1}`);
      dot.setAttribute('data-index', index.toString());
      this.dotsContainer!.appendChild(dot);
    });
    
    this.container.appendChild(this.dotsContainer);
  }

  private renderImages(): void {
    this.imagesContainer.innerHTML = '';
    
    this.images.forEach((image, index) => {
      const imageElement = document.createElement('div');
      imageElement.className = 'carousel-slide';
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = 'lazy';
      
      // Handle image load errors
      img.onerror = () => {
        img.src = '/public/images/placeholder.jpg';
        img.alt = 'Image not available';
      };
      
      imageElement.appendChild(img);
      
      // Add caption if available
      if (image.caption) {
        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = image.caption;
        imageElement.appendChild(caption);
      }
      
      this.imagesContainer.appendChild(imageElement);
    });
  }

  private setupEventListeners(): void {
    // Arrow navigation
    if (this.prevArrow) {
      this.prevArrow.addEventListener('click', () => this.goToPrevious());
    }
    
    if (this.nextArrow) {
      this.nextArrow.addEventListener('click', () => this.goToNext());
    }
    
    // Dots navigation
    if (this.dotsContainer) {
      this.dotsContainer.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('carousel-dot')) {
          const index = parseInt(target.getAttribute('data-index') || '0');
          this.goToSlide(index);
        }
      });
    }
    
    // Keyboard navigation
    this.container.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.goToNext();
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoPlay();
          break;
      }
    });
    
    // Touch/swipe support
    if (this.options.swipeEnabled) {
      this.setupTouchEvents();
    }
    
    // Pause auto-play on hover
    if (this.options.autoPlay) {
      this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }
  }

  private setupTouchEvents(): void {
    this.imagesContainer.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    this.imagesContainer.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.goToPrevious();
      } else {
        this.goToNext();
      }
    }
  }

  public goToNext(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    } else if (this.options.loop) {
      this.goToSlide(0);
    }
  }

  public goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    } else if (this.options.loop) {
      this.goToSlide(this.images.length - 1);
    }
  }

  public goToSlide(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    
    this.currentIndex = index;
    this.updateDisplay();
    this.resetAutoPlay();
  }

  private updateDisplay(): void {
    // Update slide position
    const slides = this.imagesContainer.querySelectorAll('.carousel-slide') as NodeListOf<HTMLElement>;
    
    if (this.options.fadeTransition) {
      // Fade transition
      slides.forEach((slide, index) => {
        slide.style.opacity = index === this.currentIndex ? '1' : '0';
        slide.style.zIndex = index === this.currentIndex ? '2' : '1';
      });
    } else {
      // Slide transition
      const translateX = -this.currentIndex * 100;
      this.imagesContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
    
    // Update arrows
    if (this.prevArrow && this.nextArrow && !this.options.loop) {
      this.prevArrow.disabled = this.currentIndex === 0;
      this.nextArrow.disabled = this.currentIndex === this.images.length - 1;
    }
  }

  private startAutoPlay(): void {
    if (this.images.length <= 1) return;
    
    this.isPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      this.goToNext();
    }, this.options.autoPlayInterval);
  }

  private pauseAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private resumeAutoPlay(): void {
    if (this.isPlaying && !this.autoPlayTimer) {
      this.startAutoPlay();
    }
  }

  private resetAutoPlay(): void {
    if (this.isPlaying) {
      this.pauseAutoPlay();
      this.startAutoPlay();
    }
  }

  public toggleAutoPlay(): void {
    if (this.isPlaying) {
      this.pauseAutoPlay();
      this.isPlaying = false;
    } else {
      this.startAutoPlay();
    }
  }

  public destroy(): void {
    this.pauseAutoPlay();
    this.container.innerHTML = '';
  }

  // Public API methods
  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getTotalSlides(): number {
    return this.images.length;
  }

  public updateImages(newImages: CarouselImage[]): void {
    this.images = newImages;
    this.currentIndex = 0;
    this.renderImages();
    this.updateDisplay();
  }
}

// Project interfaces
export interface ProjectLink {
  type: 'github' | 'live' | 'demo' | 'docs';
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images?: CarouselImage[];
  mainImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  links?: ProjectLink[];
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'archived';
  startDate?: string;
  endDate?: string;
}

// Enhanced Project Card Component with Carousel Integration
export class ProjectCard {
  private project: Project;
  private container: HTMLElement;
  private carousel: ImageCarousel | null = null;
  private cardElement!: HTMLElement;

  constructor(project: Project, container: HTMLElement) {
    this.project = project;
    this.container = container;
    this.render();
  }

  private render(): void {
    this.cardElement = document.createElement('div');
    this.cardElement.className = 'project-card';
    this.cardElement.innerHTML = `
      <div class="project-image-container">
        ${this.project.images && this.project.images.length > 0 ? 
          '<div class="project-carousel"></div>' : 
          `<img src="${this.project.mainImage || '/public/images/placeholder.jpg'}" alt="${this.project.title}" class="project-main-image">`
        }
      </div>
      <div class="project-content">
        <h3 class="project-title">${this.project.title}</h3>
        <p class="project-description">${this.project.description}</p>
        <div class="project-technologies">
          ${this.project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${this.renderProjectLinks()}
        </div>
      </div>
    `;
    
    this.container.appendChild(this.cardElement);
    
    // Initialize carousel if project has multiple images
    if (this.project.images && this.project.images.length > 0) {
      const carouselContainer = this.cardElement.querySelector('.project-carousel') as HTMLElement;
      if (carouselContainer) {
        this.carousel = new ImageCarousel(carouselContainer, this.project.images, {
          showDots: this.project.images.length > 1,
          showArrows: this.project.images.length > 1,
          autoPlay: false,
          loop: true,
          swipeEnabled: true
        });
      }
    }
  }

  private renderProjectLinks(): string {
    const links: string[] = [];
    
    // GitHub link
    if (this.project.githubUrl) {
      links.push(`
        <a href="${this.project.githubUrl}" target="_blank" class="project-link" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      `);
    }
    
    // Live demo link
    if (this.project.liveUrl) {
      links.push(`
        <a href="${this.project.liveUrl}" target="_blank" class="project-link" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
          Live Demo
        </a>
      `);
    }
    
    // Additional custom links
    if (this.project.links) {
      this.project.links.forEach(link => {
        links.push(`
          <a href="${link.url}" target="_blank" class="project-link" rel="noopener noreferrer">
            ${this.getLinkIcon(link.type)}
            ${link.label || this.getLinkLabel(link.type)}
          </a>
        `);
      });
    }
    
    return links.join('');
  }

  private getLinkIcon(type: ProjectLink['type']): string {
    const icons = {
      github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
      live: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>`,
      demo: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16 10,8"/></svg>`,
      docs: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>`
    };
    return icons[type] || icons.live;
  }

  private getLinkLabel(type: ProjectLink['type']): string {
    const labels = {
      github: 'GitHub',
      live: 'Live Demo',
      demo: 'Demo',
      docs: 'Documentation'
    };
    return labels[type] || 'Link';
  }

  public destroy(): void {
    if (this.carousel) {
      this.carousel.destroy();
    }
    if (this.cardElement && this.cardElement.parentNode) {
      this.cardElement.parentNode.removeChild(this.cardElement);
    }
  }

  public getProject(): Project {
    return this.project;
  }

  public updateProject(newProject: Project): void {
    this.project = newProject;
    this.destroy();
    this.render();
  }
}

// Usage Example for Your Portfolio
export function createProjectCarousels(projects: Project[], container: HTMLElement): ProjectCard[] {
  const projectCards: ProjectCard[] = [];
  
  projects.forEach(project => {
    const projectCard = new ProjectCard(project, container);
    projectCards.push(projectCard);
  });
  
  return projectCards;
}

// Example project data structure for your data/index.ts
export const exampleProjectData: Project = {
  id: 'conscious-carts',
  title: 'Conscious Carts',
  description: 'Full-stack e-commerce platform with React and Node.js',
  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
  githubUrl: 'https://github.com/yourusername/conscious-carts',
  liveUrl: 'https://conscious-carts.com',
  status: 'completed',
  featured: true,
  images: [
    {
      src: '/public/images/projects/conscious-carts/main.jpg',
      alt: 'Conscious Carts homepage',
      caption: 'Homepage with featured products'
    },
    {
      src: '/public/images/projects/conscious-carts/product-page.jpg',
      alt: 'Product detail page',
      caption: 'Product detail with reviews'
    },
    {
      src: '/public/images/projects/conscious-carts/cart.jpg',
      alt: 'Shopping cart',
      caption: 'Shopping cart functionality'
    },
    {
      src: '/public/images/projects/conscious-carts/checkout.jpg',
      alt: 'Checkout process',
      caption: 'Secure checkout process'
    }
  ]
};