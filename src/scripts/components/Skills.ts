export class Skills {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  // Icon mapping for different skills using your asset paths
  private getSkillIcon(skill: string): string {
    const iconMap: { [key: string]: string } = {
      // Frontend
      'React': '/icons/tech/frontend/react.svg',
      'Next.js': '/icons/tech/frontend/nextjs.svg',
      'TypeScript': '/icons/tech/frontend/typescript.svg',
      'HTML/CSS': '/icons/tech/frontend/html-css.svg',
      'Tailwind CSS': '/icons/tech/frontend/tailwind.svg',
      'JavaScript': '/icons/tech/frontend/javascript.svg',
      'Vue.js': '/icons/tech/frontend/vue.svg',
      'Angular': '/icons/tech/frontend/angular.svg',
      
      // Backend
      'Python': '/icons/tech/backend/python.svg',
      'Node.js': '/icons/tech/backend/nodejs.svg',
      'Java': '/icons/tech/backend/java.svg',
      'Express.js': '/icons/tech/backend/express.svg',
      'REST APIs': '/icons/tech/backend/api.svg',
      'PHP': '/icons/tech/backend/php.svg',
      'C++': '/icons/tech/backend/cpp.svg',
      'C#': '/icons/tech/backend/csharp.svg',
      
      // AI/ML
      'Machine Learning': '/icons/tech/ai-ml/ml.svg',
      'TensorFlow': '/icons/tech/ai-ml/tensorflow.svg',
      'Data Science': '/icons/tech/ai-ml/data-science.svg',
      'Neural Networks': '/icons/tech/ai-ml/neural-network.svg',
      'PyTorch': '/icons/tech/ai-ml/pytorch.svg',
      
      // Mobile
      'Flutter': '/icons/tech/mobile/flutter.svg',
      'Dart': '/icons/tech/mobile/dart.svg',
      'React Native': '/icons/tech/mobile/react-native.svg',
      'Android Studio': '/icons/tech/mobile/android.svg',
      
      // Database
      'Firebase': '/icons/tech/database/firebase.svg',
      'MongoDB': '/icons/tech/database/mongodb.svg',
      'MySQL': '/icons/tech/database/mysql.svg',
      'PostgreSQL': '/icons/tech/database/postgresql.svg',
      
      // Cloud & DevOps
      'AWS': '/icons/tech/tools/aws.svg',
      'Docker': '/icons/tech/tools/docker.svg',
      'Git': '/icons/tech/tools/git.svg',
      'CI/CD': '/icons/tech/tools/cicd.svg',
      
      // Default fallback
      'default': '/icons/tech/default.svg'
    };
    
    return iconMap[skill] || iconMap['default'];
  }

  public render(): string {
    const skillCategories = this.config.skillsData || [];
    
    const skillsGrid = skillCategories.map((category: any) => `
      <div class="skills-category">
        <h3 class="skills-category-title">${category.title}</h3>
        <div class="skills-tags">
          ${category.skills.map((skill: string) => `
            <span class="skill-tag">
              <img 
                src="${this.getSkillIcon(skill)}" 
                alt="${skill} icon" 
                class="skill-icon"
                loading="lazy"
                onerror="this.style.display='none';"
              />
              <span class="skill-name">${skill}</span>
            </span>
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
        const icon = tag.querySelector('.skill-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
      });
      
      tag.addEventListener('mouseleave', () => {
        const icon = tag.querySelector('.skill-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }
}