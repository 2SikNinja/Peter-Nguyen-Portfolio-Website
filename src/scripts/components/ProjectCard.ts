export interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  images: string[];
  techIcons: string[];
  link: string;
  featured: boolean;
}

export class ProjectCard {
  private project: ProjectCardData;
  private container: HTMLElement;
  private cardElement: HTMLElement | null = null;
  private currentImageIndex: number = 0;
  private carouselInterval: NodeJS.Timeout | null = null;
  private isHovered: boolean = false;

  constructor(project: ProjectCardData, container: HTMLElement) {
    this.project = project;
    this.container = container;
  }

  public render(): string {
    const cardHTML = `
      <div class="project-card ${this.project.featured ? 'featured' : ''}" data-project-id="${this.project.id}">
        <div class="project-images">
          ${this.renderImages()}
          ${this.project.images.length > 1 ? this.renderCarouselControls() : ''}
        </div>
        <div class="project-content">
          <h3 class="project-title">${this.project.title}</h3>
          <p class="project-description">${this.project.description}</p>
          <div class="project-tech">
            ${this.project.techIcons.map(icon => `<img src="${icon}" alt="Technology" class="tech-icon" />`).join('')}
          </div>
          <a href="${this.project.link}" class="project-link" target="_blank" rel="noopener noreferrer">View Project →</a>
        </div>
      </div>
    `;

    // Create and append the card element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    this.cardElement = tempDiv.firstElementChild as HTMLElement;
    this.container.appendChild(this.cardElement);

    this.setupEventListeners();
    this.startCarousel();

    return cardHTML;
  }

  private renderImages(): string {
    return this.project.images.map((image, index) => `
      <img 
        src="${image}" 
        alt="${this.project.title} screenshot ${index + 1}" 
        class="project-image ${index === 0 ? 'active' : ''}"
        loading="lazy"
      />
    `).join('');
  }

  private renderCarouselControls(): string {
    return `
      <button class="carousel-nav carousel-prev" data-direction="prev" aria-label="Previous image">‹</button>
      <button class="carousel-nav carousel-next" data-direction="next" aria-label="Next image">›</button>
      <div class="carousel-dots">
        ${this.project.images.map((_, index) => `
          <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></div>
        `).join('')}
      </div>
    `;
  }

  public setupEventListeners(): void {
    if (!this.cardElement) return;

    // Carousel navigation
    this.setupCarouselNavigation();
    
    // Hover effects for carousel
    this.setupHoverEffects();
    
    // Tech icon hover effects
    this.setupTechIconEffects();
  }

  private setupCarouselNavigation(): void {
    if (!this.cardElement || this.project.images.length <= 1) return;

    // Previous/Next buttons
    const prevBtn = this.cardElement.querySelector('.carousel-prev');
    const nextBtn = this.cardElement.querySelector('.carousel-next');
    
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.previousImage();
    });
    
    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.nextImage();
    });

    // Dot navigation
    const dots = this.cardElement.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToImage(index);
      });
    });

    // Keyboard navigation
    this.cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previousImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextImage();
      }
    });
  }

  private setupHoverEffects(): void {
    if (!this.cardElement) return;

    this.cardElement.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.stopCarousel();
    });

    this.cardElement.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.startCarousel();
    });
  }

  private setupTechIconEffects(): void {
    if (!this.cardElement) return;

    const techIcons = this.cardElement.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        (icon as HTMLElement).style.transform = 'scale(1.2) rotate(5deg)';
      });
      
      icon.addEventListener('mouseleave', () => {
        (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }

  private nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.project.images.length;
    this.updateImageDisplay();
  }

  private previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.project.images.length) % this.project.images.length;
    this.updateImageDisplay();
  }

  private goToImage(index: number): void {
    this.currentImageIndex = index;
    this.updateImageDisplay();
  }

  private updateImageDisplay(): void {
    if (!this.cardElement) return;

    // Update images
    const images = this.cardElement.querySelectorAll('.project-image');
    images.forEach((img, index) => {
      img.classList.toggle('active', index === this.currentImageIndex);
    });

    // Update dots
    const dots = this.cardElement.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentImageIndex);
    });
  }

  private startCarousel(): void {
    if (this.project.images.length <= 1 || this.isHovered) return;
    
    this.stopCarousel();
    this.carouselInterval = setInterval(() => {
      if (!this.isHovered) {
        this.nextImage();
      }
    }, 4000);
  }

  private stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  public destroy(): void {
    this.stopCarousel();
    
    if (this.cardElement && this.cardElement.parentNode) {
      this.cardElement.parentNode.removeChild(this.cardElement);
    }
    
    this.cardElement = null;
  }

  public getProject(): ProjectCardData {
    return this.project;
  }

  public updateProject(newProject: ProjectCardData): void {
    this.destroy();
    this.project = newProject;
    this.currentImageIndex = 0;
    this.render();
  }

  public getCurrentImageIndex(): number {
    return this.currentImageIndex;
  }
}