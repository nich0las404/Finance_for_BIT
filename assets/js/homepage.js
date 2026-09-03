class AppHomepage extends HTMLElement {
  connectedCallback() {
    fetch('components/homepage.html')
      .then(res => res.text())
      .then(data => {
        this.innerHTML = data;
        this.initHomepage(); // Call any homepage JS logic here if needed
      });
  }

  initHomepage() {
    // Add page-specific JS event listeners here
  }
}

customElements.define('app-homepage', AppHomepage);