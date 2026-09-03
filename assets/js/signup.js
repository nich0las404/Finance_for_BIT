/* assets/js/signup.js */
class AppSignup extends HTMLElement {
  connectedCallback() {
    fetch('components/signup-form.html')
      .then(res => res.text())
      .then(data => {
        this.innerHTML = data;
        this.initSignup();
      });
  }

  initSignup() {
    const form = this.querySelector('#signupForm');
    const openLoginBtn = this.querySelector('#openLoginFromSignup');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = this.querySelector('#signupName').value.trim();
        const userId = this.querySelector('#signupUserId').value.trim();
        const email = this.querySelector('#signupEmail').value.trim();
        const password = this.querySelector('#signupPassword').value;
        const confirmPassword = this.querySelector('#signupConfirmPassword').value;

        this.handleRegistration(name, userId, email, password, confirmPassword);
      });
    }

    if (openLoginBtn) {
      openLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html?openLogin=true';
      });
    }
  }

  showAlert(message, type = 'error') {
    const alertBox = this.querySelector('#signupAlert');
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.className = `signup-alert signup-alert--${type}`;
      alertBox.style.display = 'block';
    }
  }

  handleRegistration(name, userId, email, password, confirmPassword) {
    // Basic validation
    if (!name || !userId || !email || !password) {
      this.showAlert('Please fill in all required fields.', 'error');
      return;
    }

    if (password.length < 6) {
      this.showAlert('Password must be at least 6 characters long.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      this.showAlert('Passwords do not match. Please check and try again.', 'error');
      return;
    }

    // Prepare user payload
    const cleanUserId = userId.replace(/^@/, '');
    const userPayload = {
      name: name,
      userId: cleanUserId,
      email: email,
      password: password,
      registeredAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      localStorage.setItem('finance_user', JSON.stringify(userPayload));
      this.showAlert('Account created successfully! Redirecting to login...', 'success');

      setTimeout(() => {
        window.location.href = 'index.html?openLogin=true&registered=true';
      }, 1200);
    } catch (err) {
      console.error(err);
      this.showAlert('Failed to save account to local storage.', 'error');
    }
  }
}

customElements.define('app-signup', AppSignup);
