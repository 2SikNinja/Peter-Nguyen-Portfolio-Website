export class About {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const gridItems = this.config.gridItems.map((item: any) => `
      <div class="grid-item">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" />` : ''}
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
    
    return `
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="grid-layout">
          ${gridItems}
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    // Add any about-specific event listeners here
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('animate-fadeInUp');
      });
    });
  }
}