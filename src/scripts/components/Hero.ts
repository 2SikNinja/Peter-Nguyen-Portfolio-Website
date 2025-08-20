export class Hero {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const personal = this.config.personal;
    
    return `
      <div class="container">
        <div class="hero-content">
          <div class="hero-image">
            <img src="${personal.image}" alt="${personal.name}" />
          </div>
          <div class="hero-text">
            <h1>${personal.name}</h1>
            <p class="subtitle">${personal.title}</p>
            <p class="description">${personal.subtitle}</p>
            <div class="hero-actions">
              <a href="#projects" class="btn">View Projects</a>
              <a href="${personal.resumeUrl}" class="btn btn-secondary" target="_blank">Download Resume</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    // Add any hero-specific event listeners here
    const heroActions = document.querySelectorAll('.hero-actions a[href^="#"]');
    
    heroActions.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target) {
          const targetElement = document.querySelector(target);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
}