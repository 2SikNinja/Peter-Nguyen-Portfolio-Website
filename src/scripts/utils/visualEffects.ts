export class VisualEffects {
  private mouseTrail: HTMLElement | null = null;
  private scrollProgress: HTMLElement | null = null;
  private particles: HTMLElement[] = [];

  constructor() {
    this.init();
  }

  public init(): void {
    this.hideCursor();
    this.setupMouseTrail();
    this.setupScrollProgress();
    this.setupParticleEffects();
    this.setupScrollAnimations();
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
    let trailX = 0;
    let trailY = 0;

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
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    });

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

  // Advanced hover effects for cards
  public setupAdvancedHoverEffects(): void {
    const cards = document.querySelectorAll('.project-card, .skills-category, .experience-card, .grid-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const element = e.target as HTMLElement;
        element.style.transform = 'translateY(-10px) scale(1.02)';
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      card.addEventListener('mouseleave', (e) => {
        const element = e.target as HTMLElement;
        element.style.transform = 'translateY(0) scale(1)';
      });
      
      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        const element = e.target as HTMLElement;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', (e) => {
        const element = e.target as HTMLElement;
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // Cleanup method
  public destroy(): void {
    this.particles.forEach(particle => particle.remove());
    this.particles = [];
    
    // Restore cursor
    document.body.style.cursor = 'auto';
  }
}