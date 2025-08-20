import { portfolioConfig } from '../config';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Education } from './Education';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { VisualEffects } from '../utils/visualEffects';

export class PortfolioManager {
  private config = portfolioConfig;
  private components: { [key: string]: any } = {};
  private visualEffects: VisualEffects | null = null;

  constructor() {
    this.initializeComponents();
  }

  private initializeComponents(): void {
    this.components = {
      Hero: new Hero(this.config),
      About: new About(this.config),
      Skills: new Skills(this.config),
      Projects: new Projects(this.config),
      Education: new Education(this.config),
      Experience: new Experience(this.config),
      Contact: new Contact(this.config)
    };
  }

  public init(): void {
    this.render();
    this.setupEventListeners();
    this.setupAnimations();
    this.initializeVisualEffects();
    console.log('Portfolio initialized successfully!');
  }

  private render(): void {
    this.renderNavigation();
    this.renderSections();
    this.renderFooter();
  }

  private renderNavigation(): void {
    const navigation = new Navigation(this.config);
    navigation.render();
  }

  private renderSections(): void {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = '';

    this.config.sections.forEach(sectionConfig => {
      if (!sectionConfig.enabled) return;

      const section = this.createSection(sectionConfig);
      if (section) {
        mainContent.appendChild(section);
      }
    });
  }

  private renderFooter(): void {
    const footer = new Footer(this.config);
    footer.render();
  }

  private createSection(config: any): HTMLElement | null {
    const section = document.createElement('section');
    section.id = config.id;
    section.className = `section ${config.alignment ? 'align-' + config.alignment : 'align-center'}`;

    const component = this.components[config.component];
    if (component && typeof component.render === 'function') {
      const content = component.render();
      if (content) {
        section.innerHTML = content;
        return section;
      }
    }

    return null;
  }

  private setupEventListeners(): void {
    // Set up component-specific event listeners
    Object.values(this.components).forEach(component => {
      if (component && typeof component.setupEventListeners === 'function') {
        component.setupEventListeners();
      }
    });
  }

  private setupAnimations(): void {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    // Navigation active states
    this.setupActiveNavigation();
  }

  private setupActiveNavigation(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
  }

  private initializeVisualEffects(): void {
    // Initialize visual effects after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.visualEffects = new VisualEffects();
      
      // Setup advanced hover effects after components are rendered
      setTimeout(() => {
        this.visualEffects?.setupAdvancedHoverEffects();
      }, 500);
    }, 100);
  }

  public destroy(): void {
    // Cleanup visual effects
    if (this.visualEffects) {
      this.visualEffects.destroy();
    }
  }
}