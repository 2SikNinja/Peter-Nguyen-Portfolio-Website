export class Contact {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public render(): string {
    return `
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-container">
          <div class="contact-info">
            <a href="mailto:${this.config.personal.email}" class="contact-email">${this.config.personal.email}</a>
          </div>
          <form class="contact-form" id="contactForm">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-input" name="name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" name="email" required />
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-textarea" name="message" required></textarea>
            </div>
            <button type="submit" class="btn submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    `;
  }

  public setupEventListeners(): void {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(contactForm);
    });
  }

  private handleFormSubmission(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (name && email && message) {
      // Simulate form submission
      this.showMessage('Thank you! Your message has been sent successfully.', 'success');
      form.reset();
    } else {
      this.showMessage('Please fill in all fields.', 'error');
    }
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    const contactContainer = document.querySelector('.contact-container');
    const existingMessage = contactContainer?.querySelector('.message');
    
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = text;
    
    contactContainer?.appendChild(messageElement);
    
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}
