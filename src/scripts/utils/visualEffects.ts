// Enhanced floating background system
class FloatingBackground {
  private elements: HTMLElement[] = [];
  private animationId: number | null = null;
  private isDestroyed: boolean = false;

  constructor() {
    this.init();
  }

  public init(): void {
    this.createFloatingElements();
    this.startAnimation();
  }

  private createFloatingElements(): void {
    // Create multiple floating elements with different sizes and positions
    const elementsConfig = [
      { size: 60, top: 10, left: 5, delay: 0, color: 'purple' },
      { size: 40, top: 70, right: 10, delay: -3, color: 'blue' },
      { size: 50, top: 40, left: 80, delay: -6, color: 'cyan' },
      { size: 35, top: 20, right: 30, delay: -2, color: 'purple' },
      { size: 45, top: 80, left: 20, delay: -4, color: 'blue' },
      { size: 55, top: 60, right: 25, delay: -1, color: 'cyan' },
      { size: 30, top: 30, left: 60, delay: -5, color: 'purple' },
      { size: 65, top: 90, right: 5, delay: -7, color: 'blue' }
    ];

    elementsConfig.forEach((config, index) => {
      const element = this.createElement(config, index);
      document.body.appendChild(element);
      this.elements.push(element);
    });
  }

  private createElement(config: any, index: number): HTMLElement {
    const element = document.createElement('div');
    element.className = 'floating-background-element';
    
    // Position styling
    const position = this.getPositionStyle(config);
    
    // Color gradient based on type
    const gradients = {
      purple: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
      blue: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      cyan: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
    };

    element.style.cssText = `
      position: fixed;
      width: ${config.size}px;
      height: ${config.size}px;
      ${position}
      background: ${gradients[config.color as keyof typeof gradients]};
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.6;
      filter: blur(1px);
      animation: floatBackground ${8 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${config.delay}s;
      will-change: transform;
    `;

    return element;
  }

  private getPositionStyle(config: any): string {
    let position = '';
    
    if (config.top !== undefined) position += `top: ${config.top}%; `;
    if (config.bottom !== undefined) position += `bottom: ${config.bottom}%; `;
    if (config.left !== undefined) position += `left: ${config.left}%; `;
    if (config.right !== undefined) position += `right: ${config.right}%; `;
    
    return position;
  }

  private startAnimation(): void {
    // Additional parallax animation on scroll
    const handleScroll = () => {
      if (this.isDestroyed) return;
      
      const scrolled = window.pageYOffset;
      
      this.elements.forEach((element, index) => {
        const speed = 0.1 + (index % 3) * 0.05; // Varied speeds
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  public destroy(): void {
    this.isDestroyed = true;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    this.elements = [];
  }
}

// Main VisualEffects class with enhanced floating background
export class VisualEffects {
  private mouseTrail: HTMLElement | null = null;
  private scrollProgress: HTMLElement | null = null;
  private particles: HTMLElement[] = [];
  private floatingBackground: FloatingBackground | null = null;

  constructor() {
    this.init();
  }

  public init(): void {
    this.hideCursor();
    this.setupMouseTrail();
    this.setupScrollProgress();
    this.setupParticleEffects();
    this.setupScrollAnimations();
    this.initFloatingBackground();
    this.injectFloatingCSS();
  }

  private initFloatingBackground(): void {
    this.floatingBackground = new FloatingBackground();
  }

  private injectFloatingCSS(): void {
    // Inject the floating background CSS if it doesn't exist
    if (!document.getElementById('floating-background-styles')) {
      const style = document.createElement('style');
      style.id = 'floating-background-styles';
      style.textContent = `
        /* Floating background animation */
        @keyframes floatBackground {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) rotate(270deg);
          }
        }

        .floating-background-element {
          transition: opacity 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .floating-background-element {
            opacity: 0.3;
            filter: blur(2px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-background-element {
            animation: none !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  private hideCursor(): void {
    // Hide the default cursor on the entire page
    document.body.style.cursor = 'none';
    
    // Hide cursor on all interactive elements
    const style = document.createElement('style');
    style.textContent = `
      *, *:hover, *:active, *:focus {
        cursor: none !important;
      }
      a, button, input, textarea, select, [role="button"], .btn, .nav-link, .skill-tag, .tech-tag {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  private setupMouseTrail(): void {
    this.mouseTrail = document.getElementById('mouseTrail');
    if (!this.mouseTrail) return;

    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position and immediately position trail
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the trail at cursor location for immediate response
      if (this.mouseTrail) {
        this.mouseTrail.style.left = mouseX + 'px';
        this.mouseTrail.style.top = mouseY + 'px';
      }
    });

    // Show trail when mouse enters window
    document.addEventListener('mouseenter', () => {
      if (this.mouseTrail) {
        this.mouseTrail.style.opacity = '1';
        this.mouseTrail.style.display = 'block';
      }
    });

    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
      if (this.mouseTrail) {
        this.mouseTrail.style.opacity = '0';
      }
    });

    // Change trail appearance on hover over interactive elements
    this.setupTrailInteractions();
  }

  private setupTrailInteractions(): void {
    if (!this.mouseTrail) return;

    const interactiveElements = 'a, button, .btn, .nav-link, .skill-tag, .tech-tag, .project-card, .carousel-nav, input, textarea, select';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        // Enlarge and change color for interactive elements
        if (this.mouseTrail) {
          this.mouseTrail.style.transform = 'scale(1.5)';
          this.mouseTrail.style.background = 'radial-gradient(circle, var(--secondary-color) 20%, var(--accent-color) 60%, transparent 80%)';
          this.mouseTrail.style.mixBlendMode = 'screen';
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        // Reset to normal appearance
        if (this.mouseTrail) {
          this.mouseTrail.style.transform = 'scale(1)';
          this.mouseTrail.style.background = 'radial-gradient(circle, var(--primary-color) 20%, var(--secondary-color) 60%, transparent 80%)';
          this.mouseTrail.style.mixBlendMode = 'screen';
        }
      }
    });

    // Special effect for clicking
    document.addEventListener('mousedown', () => {
      if (this.mouseTrail) {
        this.mouseTrail.style.transform = 'scale(0.8)';
        this.mouseTrail.style.background = 'radial-gradient(circle, var(--accent-color) 30%, var(--primary-color) 70%, transparent 90%)';
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.mouseTrail) {
        this.mouseTrail.style.transform = 'scale(1)';
        this.mouseTrail.style.background = 'radial-gradient(circle, var(--primary-color) 20%, var(--secondary-color) 60%, transparent 80%)';
      }
    });
  }

  private setupScrollProgress(): void {
    this.scrollProgress = document.getElementById('scrollProgress');
    if (!this.scrollProgress) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      
      if (this.scrollProgress) {
        this.scrollProgress.style.width = scrolled + '%';
      }
    });
  }

  private setupParticleEffects(): void {
    // Create particles on click
    document.addEventListener('click', (e) => {
      this.createClickParticles(e.clientX, e.clientY);
    });

    // Create particles on skill tag hover
    document.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('skill-tag') || 
          target.classList.contains('tech-tag') ||
          target.classList.contains('btn')) {
        this.createHoverParticles(target);
      }
    }, true);
  }

  private createClickParticles(x: number, y: number): void {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.position = 'fixed';
      particle.style.borderRadius = '50%';
      particle.style.background = 'var(--primary-color)';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.boxShadow = '0 0 8px var(--primary-color)';
      
      const angle = (Math.PI * 2 * i) / 8;
      const velocity = 60 + Math.random() * 40;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--random-x', vx + 'px');
      particle.style.setProperty('--random-y', vy + 'px');
      
      document.body.appendChild(particle);
      this.particles.push(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
        const index = this.particles.indexOf(particle);
        if (index > -1) {
          this.particles.splice(index, 1);
        }
      }, 2000);
    }
  }

  private createHoverParticles(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + (Math.random() - 0.5) * 20 + 'px';
        particle.style.top = y + (Math.random() - 0.5) * 20 + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.position = 'fixed';
        particle.style.borderRadius = '50%';
        particle.style.background = 'var(--accent-color)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        particle.style.opacity = '0.8';
        
        const vx = (Math.random() - 0.5) * 30;
        const vy = -20 - Math.random() * 20;
        
        particle.style.setProperty('--random-x', vx + 'px');
        particle.style.setProperty('--random-y', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
      }, i * 100);
    }
  }

  private setupScrollAnimations(): void {
    // Enhanced section reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('visible');
          
          // Stagger animations for grid items
          const gridItems = element.querySelectorAll('.grid-item, .skills-category, .project-card, .experience-card');
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-fadeInUp');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  // Simple hover effects without movement - only for non-card elements
  public setupAdvancedHoverEffects(): void {
    // Only apply subtle effects to small elements, NOT cards
    const smallElements = document.querySelectorAll('.skill-tag, .tech-tag, .btn');
    
    smallElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const target = e.target as HTMLElement;
        // Only very subtle scale for small elements
        if (target.classList.contains('skill-tag') || target.classList.contains('tech-tag')) {
          target.style.transform = 'scale(1.05)';
          target.style.transition = 'all 0.2s ease';
        }
      });
      
      element.addEventListener('mouseleave', (e) => {
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1)';
      });
    });

    // NO CARD EFFECTS - Cards should only use CSS hover effects
    // Removed all .project-card, .skills-category, .experience-card, .grid-item effects
  }

  // Cleanup method
  public destroy(): void {
    this.particles.forEach(particle => particle.remove());
    this.particles = [];
    
    if (this.floatingBackground) {
      this.floatingBackground.destroy();
    }
    
    // Restore cursor
    document.body.style.cursor = 'auto';

    // Remove injected CSS
    const styleElement = document.getElementById('floating-background-styles');
    if (styleElement) {
      styleElement.remove();
    }
  }
}