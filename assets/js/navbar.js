/* assets/js/navbar.js */
class AppNavbar extends HTMLElement {
  connectedCallback() {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(data => {
        this.innerHTML = data;
        this.initToggle();
        this.initAuth();
      });
  }

  initToggle() {
    const navbarToggle = this.querySelector('#navbarToggle');
    const navbarMenu = this.querySelector('#navbarMenu');

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function () {
        navbarToggle.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');

        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
      });
    }
  }

  initAuth() {
    const loginBtn = this.querySelector('#loginNavBtn');

    // Update UI based on active session
    this.updateNavbarAuthUI();

    // Listen for global session changes
    window.addEventListener('user-session-changed', () => {
      this.updateNavbarAuthUI();
    });

    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const rawSession = localStorage.getItem('finance_session');
        const session = rawSession ? JSON.parse(rawSession) : null;

        if (session && session.isLoggedIn) {
          // If already logged in, clicking acts as Logout
          if (confirm(`Logged in as ${session.name}. Do you want to log out?`)) {
            localStorage.removeItem('finance_session');
            this.updateNavbarAuthUI();
            window.location.reload();
          }
        } else {
          // Trigger login modal popup
          window.dispatchEvent(new CustomEvent('open-login-modal'));
        }
      });
    }
  }

  updateNavbarAuthUI() {
    const loginBtn = this.querySelector('#loginNavBtn');
    if (!loginBtn) return;

    const rawSession = localStorage.getItem('finance_session');
    if (rawSession) {
      try {
        const session = JSON.parse(rawSession);
        if (session && session.isLoggedIn) {
          const firstName = session.name ? session.name.split(' ')[0] : 'User';
          loginBtn.textContent = `Logout (${firstName})`;
          loginBtn.setAttribute('title', `Logged in as ${session.name}. Click to log out.`);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    loginBtn.textContent = 'Log In';
    loginBtn.removeAttribute('title');
  }
}

customElements.define('app-navbar', AppNavbar);