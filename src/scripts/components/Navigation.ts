export class Navigation {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): void {
    const navList = document.getElementById('navigation');
    if (!navList) return;

    navList.innerHTML = this.config.navigation.map((item: any) => `
      <li class="nav-item">
        <a href="${item.link}" class="nav-link">${item.name}</a>
      </li>
    `).join('');

    this.setupEventListeners();
  }

  public setupEventListeners(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          
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
