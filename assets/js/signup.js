/* assets/js/signup.js */
class AppSignup extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<section class="signup-section">
    <div class="signup-container">
        <div class="signup-card">
            <div class="signup-header">
                <span class="signup-badge">Join Finance for BIT</span>
                <h1 class="signup-title">Create Your Account</h1>
                <p class="signup-subtitle">Start mastering your financial future with interactive modules today.</p>
            </div>

            <div id="signupAlert" class="signup-alert" style="display: none;"></div>

            <form id="signupForm" class="signup-form" autocomplete="off">
                <div class="form-group">
                    <label for="signupName">Full Name</label>
                    <input type="text" id="signupName" placeholder="e.g. John Doe" required>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="signupUserId">User ID</label>
                        <input type="text" id="signupUserId" placeholder="e.g. johndoe" required>
                    </div>

                    <div class="form-group">
                        <label for="signupEmail">Email Address</label>
                        <input type="email" id="signupEmail" placeholder="e.g. john@example.com" required>
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" placeholder="Minimum 6 characters" required>
                    </div>

                    <div class="form-group">
                        <label for="signupConfirmPassword">Confirm Password</label>
                        <input type="password" id="signupConfirmPassword" placeholder="Re-enter password" required>
                    </div>
                </div>

                <button type="submit" class="btn-signup-submit">Create Account</button>
            </form>

            <div class="signup-footer">
                <p>Already have an account? <a href="#" id="openLoginFromSignup" class="signup-link">Log In</a></p>
            </div>
        </div>
    </div>
</section>
`;
    this.initSignup();
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
        const rootPath = window.location.pathname.replace(/\\/g, '/').includes('/pages/') ? '../index.html' : 'index.html';
        window.location.href = `${rootPath}?openLogin=true`;
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
        const rootPath = window.location.pathname.replace(/\\/g, '/').includes('/pages/') ? '../index.html' : 'index.html';
        window.location.href = `${rootPath}?openLogin=true&registered=true`;
      }, 1200);
    } catch (err) {
      console.error(err);
      this.showAlert('Failed to save account to local storage.', 'error');
    }
  }
}

customElements.define('app-signup', AppSignup);
