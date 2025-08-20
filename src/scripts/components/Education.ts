export class Education {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    const education = this.config.educationData.map((edu: any) => `
      <div class="education-item">
        <div class="education-content">
          <h3 class="education-degree">${edu.degree}</h3>
          <h4 class="education-school">${edu.school}</h4>
          <p class="education-period">${edu.period}</p>
          <p class="education-description">${edu.description}</p>
          ${edu.gpa ? `<p class="education-gpa">${edu.gpa}</p>` : ''}
          ${edu.minor ? `<p class="education-minor">${edu.minor}</p>` : ''}
          <button class="btn coursework-btn">View Coursework</button>
        </div>
      </div>
    `).join('');
    
    return `
      <div class="container">
        <h2 class="section-title">Education</h2>
        <div class="education-timeline">
          ${education}
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    this.setupCourseworkModal();
  }

  private setupCourseworkModal(): void {
    const courseworkBtns = document.querySelectorAll('.coursework-btn');
    
    courseworkBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.showCourseworkModal();
      });
    });
  }

  private showCourseworkModal(): void {
    // Import coursework data dynamically - Fixed path
    import('../../data/education').then(({ courseworkData }) => {
      const modalHTML = `
        <div class="modal-overlay active" id="courseworkModal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Computer Science Coursework</h2>
              <button class="modal-close" id="closeCourseworkModal">×</button>
            </div>
            <div class="modal-body">
              <div class="search-container">
                <input type="text" class="search-input" placeholder="Search courses..." id="courseSearch">
                <span class="search-icon">🔍</span>
              </div>
              <div class="courses-grid" id="coursesGrid">
                ${courseworkData.map(course => `
                  <div class="course-card" data-category="${course.category.toLowerCase()}" data-name="${course.name.toLowerCase()}" data-code="${course.code.toLowerCase()}">
                    <div class="course-code">${course.code}</div>
                    <div class="course-name">${course.name}</div>
                    <div class="course-category">${course.category}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Setup search functionality
      const searchInput = document.getElementById('courseSearch') as HTMLInputElement;
      const courseCards = document.querySelectorAll('.course-card');
      
      searchInput?.addEventListener('input', (e) => {
        const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
        
        courseCards.forEach(card => {
          const cardElement = card as HTMLElement;
          const category = cardElement.dataset.category || '';
          const name = cardElement.dataset.name || '';
          const code = cardElement.dataset.code || '';
          
          const matches = category.includes(searchTerm) || 
                         name.includes(searchTerm) || 
                         code.includes(searchTerm);
          
          cardElement.style.display = matches ? 'block' : 'none';
        });
      });
      
      // Setup close functionality
      const closeBtn = document.getElementById('closeCourseworkModal');
      const modal = document.getElementById('courseworkModal');
      
      closeBtn?.addEventListener('click', () => {
        modal?.remove();
      });
      
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  }
}