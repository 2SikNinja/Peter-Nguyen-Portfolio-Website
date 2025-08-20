export class Skills {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const skillCategories = this.config.skillsData || [];
    
    const skillsGrid = skillCategories.map((category: any) => `
      <div class="skills-category">
        <h3 class="skills-category-title">${category.title}</h3>
        <div class="skills-tags">
          ${category.skills.map((skill: string) => `
            <span class="skill-tag">${skill}</span>
          `).join('')}
        </div>
      </div>
    `).join('');
    
    return `
      <div class="container">
        <h2 class="section-title">My Skills</h2>
        <div class="skills-grid">
          ${skillsGrid}
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    // Add hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
      });
    });
  }
}