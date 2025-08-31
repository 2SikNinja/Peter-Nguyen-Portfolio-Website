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
            <button type="submit" class="btn submit-btn" id="submitButton">
              <span class="button-text">Send Message</span>
              <div class="loading" id="loadingSpinner" style="display: none;"></div>
            </button>
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

  private async handleFormSubmission(form: HTMLFormElement): Promise<void> {
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    const buttonText = submitButton.querySelector('.button-text') as HTMLElement;
    const loadingSpinner = document.getElementById('loadingSpinner') as HTMLElement;
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    loadingSpinner.style.display = 'inline-block';
    
    try {
      const formData = new FormData(form);
      const contactData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string
      };

      // Validate form data
      if (!contactData.name || !contactData.email || !contactData.message) {
        throw new Error('Please fill in all fields');
      }

      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Success
      this.showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
      form.reset();
      
    } catch (error: any) {
      // Error handling
      console.error('Form submission error:', error);
      this.showMessage(error.message || 'Something went wrong. Please try again or email me directly.', 'error');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      buttonText.textContent = 'Send Message';
      loadingSpinner.style.display = 'none';
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
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 8000);
    
    // Scroll message into view
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}