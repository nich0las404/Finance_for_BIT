/* assets/js/login-modal.js */
class AppLoginModal extends HTMLElement {
  connectedCallback() {
    fetch('components/login-modal.html')
      .then(res => res.text())
      .then(data => {
        this.innerHTML = data;
        this.initModal();
      });
  }

  initModal() {
    const overlay = this.querySelector('#loginModalOverlay');
    const closeBtn = this.querySelector('#closeModalBtn');
    const form = this.querySelector('#loginForm');
    const alertBox = this.querySelector('#loginAlert');

    // Global listener to open modal from anywhere (e.g. navbar login button)
    window.addEventListener('open-login-modal', () => {
      this.openModal();
    });

    // Close on 'X' button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Close on clicking backdrop outside modal card
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('is-active')) {
        this.closeModal();
      }
    });

    // Form Submission logic with localStorage
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = this.querySelector('#loginIdentifier').value.trim();
        const password = this.querySelector('#loginPassword').value;

        this.handleLogin(identifier, password);
      });
    }

    // Auto-open modal if redirected from signup page
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenModal = urlParams.get('openLogin') === 'true' || urlParams.get('login') === 'true';
    const isRegistered = urlParams.get('registered') === 'true';

    if (shouldOpenModal) {
      this.openModal();
      if (isRegistered) {
        this.showAlert('Account created successfully! Please log in below.', 'success');
      }
      // Clean query params from URL without page reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  openModal() {
    const overlay = this.querySelector('#loginModalOverlay');
    if (overlay) {
      overlay.classList.add('is-active');
      overlay.setAttribute('aria-hidden', 'false');
      const identifierInput = this.querySelector('#loginIdentifier');
      if (identifierInput) identifierInput.focus();
    }
  }

  closeModal() {
    const overlay = this.querySelector('#loginModalOverlay');
    if (overlay) {
      overlay.classList.remove('is-active');
      overlay.setAttribute('aria-hidden', 'true');
      this.hideAlert();
    }
  }

  showAlert(message, type = 'error') {
    const alertBox = this.querySelector('#loginAlert');
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.className = `login-alert login-alert--${type}`;
      alertBox.style.display = 'block';
    }
  }

  hideAlert() {
    const alertBox = this.querySelector('#loginAlert');
    if (alertBox) {
      alertBox.style.display = 'none';
    }
  }

  handleLogin(identifier, password) {
    const rawUserData = localStorage.getItem('finance_user');
    
    if (!rawUserData) {
      this.showAlert('No registered account found. Please sign up first!', 'error');
      return;
    }

    try {
      const user = JSON.parse(rawUserData);
      const cleanIdentifier = identifier.toLowerCase().replace(/^@/, '');
      const savedUserId = (user.userId || '').toLowerCase().replace(/^@/, '');
      const savedEmail = (user.email || '').toLowerCase();

      // Accept User ID OR Email!
      const isIdentifierMatch = (cleanIdentifier === savedUserId) || (cleanIdentifier === savedEmail);
      const isPasswordMatch = (password === user.password);

      if (isIdentifierMatch && isPasswordMatch) {
        this.showAlert(`Welcome back, ${user.name}! Logging you in...`, 'success');
        
        // Save active session
        localStorage.setItem('finance_session', JSON.stringify({
          isLoggedIn: true,
          name: user.name,
          userId: user.userId,
          email: user.email
        }));

        // Notify Navbar & rest of page
        window.dispatchEvent(new CustomEvent('user-session-changed', { detail: { isLoggedIn: true, user } }));

        setTimeout(() => {
          this.closeModal();
          const form = this.querySelector('#loginForm');
          if (form) form.reset();
        }, 1200);

      } else {
        this.showAlert('Invalid User ID / Email or Password. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      this.showAlert('An error occurred during login verification.', 'error');
    }
  }
}

customElements.define('app-login-modal', AppLoginModal);
