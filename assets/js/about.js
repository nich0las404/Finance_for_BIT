class AppAbout extends HTMLElement {
    connectedCallback() {
        fetch('components/about.html')
            .then(res => res.text())
            .then(html => {
                this.innerHTML = html;
            })
            .catch(err => console.error('Error loading about component:', err));
    }
}

customElements.define('app-about', AppAbout);