/* assets/js/navbar.js */
class AppNavbar extends HTMLElement {
  connectedCallback() {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(data => {
        this.innerHTML = data;
        this.initToggle(); // Attach logic AFTER elements are injected
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
}

customElements.define('app-navbar', AppNavbar);