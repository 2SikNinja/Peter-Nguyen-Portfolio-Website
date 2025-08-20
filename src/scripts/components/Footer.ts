export class Footer {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): void {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              ${this.config.navigation.map((item: any) => `
                <li><a href="${item.link}">${item.name}</a></li>
              `).join('')}
            </ul>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <div class="social-links">
              ${this.config.socialMedia.map((social: any) => `
                <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                  <img src="${social.icon}" alt="${social.name}" width="20" height="20" />
                </a>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="copyright">
            © 2024 <span style="color: var(--primary-color); font-weight: 600;">Peter Nguyen</span>. All rights reserved.
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  public setupEventListeners(): void {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href) {
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