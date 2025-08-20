export class Experience {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const experience = this.config.experienceData.map((exp: any) => `
      <div class="experience-card">
        <div class="experience-header">
          <h3 class="experience-title">${exp.title}</h3>
          <h4 class="experience-company">${exp.company}</h4>
          <div class="experience-meta">
            <span>${exp.period}</span>
            <span>📍 ${exp.location}</span>
          </div>
        </div>
        <p class="experience-description">${exp.description}</p>
        <div class="experience-technologies">
          ${exp.technologies.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `).join('');
    
    return `
      <div class="container">
        <h2 class="section-title">Experience</h2>
        <div class="experience-grid">
          ${experience}
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    // Add hover effects for tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
      });
    });
  }
}