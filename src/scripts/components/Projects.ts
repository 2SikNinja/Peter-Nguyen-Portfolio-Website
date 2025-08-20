export class Projects {
  private config: any;
  private carouselIntervals: { [key: string]: NodeJS.Timeout } = {};

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const projects = this.config.projects.map((project: any) => `
      <div class="project-card ${project.featured ? 'featured' : ''}" data-project-id="${project.id}">
        <div class="project-images">
          ${project.images.map((img: string, index: number) => `
            <img src="${img}" alt="${project.title}" class="project-image ${index === 0 ? 'active' : ''}" />
          `).join('')}
          ${project.images.length > 1 ? `
            <button class="carousel-nav carousel-prev" data-direction="prev">‹</button>
            <button class="carousel-nav carousel-next" data-direction="next">›</button>
            <div class="carousel-dots">
              ${project.images.map((_: string, index: number) => `
                <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.techIcons.map((icon: string) => `<img src="${icon}" alt="Technology" class="tech-icon" />`).join('')}
          </div>
          <a href="${project.link}" class="project-link" target="_blank">View Project →</a>
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
    this.setupCarousels();
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
        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      };
      
      const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      };
      
      const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      };
      
      // Event listeners
      nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
        this.resetAutoplay(projectId);
      });
      
      prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
        this.resetAutoplay(projectId);
      });
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          currentIndex = index;
          showImage(currentIndex);
          this.resetAutoplay(projectId);
        });
      });
      
      // Auto-play carousel every 5 seconds
      this.carouselIntervals[projectId] = setInterval(nextImage, 5000);
      
      // Pause autoplay on hover
      card.addEventListener('mouseenter', () => {
        if (this.carouselIntervals[projectId]) {
          clearInterval(this.carouselIntervals[projectId]);
        }
      });
      
      // Resume autoplay when mouse leaves
      card.addEventListener('mouseleave', () => {
        this.carouselIntervals[projectId] = setInterval(nextImage, 5000);
      });
    });
  }

  private resetAutoplay(projectId: string): void {
    if (this.carouselIntervals[projectId]) {
      clearInterval(this.carouselIntervals[projectId]);
    }
    
    const card = document.querySelector(`[data-project-id="${projectId}"]`);
    if (!card) return;
    
    const images = card.querySelectorAll('.project-image');
    if (images.length <= 1) return;
    
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      const dots = card.querySelectorAll('.carousel-dot');
      
      images.forEach((img, i) => {
        img.classList.toggle('active', i === currentIndex);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };
    
    this.carouselIntervals[projectId] = setInterval(nextImage, 5000);
  }

  public destroy(): void {
    // Clean up intervals when component is destroyed
    Object.values(this.carouselIntervals).forEach(interval => {
      clearInterval(interval);
    });
    this.carouselIntervals = {};
  }
}