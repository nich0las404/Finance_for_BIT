class AppAbout extends HTMLElement {
    connectedCallback() {
        fetch('components/about.html')
            .then(res => res.text())
            .then(html => {
                this.innerHTML = html;
                
                // Handle initial anchor hash navigation (e.g. #curriculum)
                if (window.location.hash) {
                    const targetId = window.location.hash.substring(1);
                    setTimeout(() => {
                        const targetElem = this.querySelector(`#${targetId}`) || document.getElementById(targetId);
                        if (targetElem) {
                            targetElem.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 50);
                }
            })
            .catch(err => console.error('Error loading about component:', err));
    }
}

customElements.define('app-about', AppAbout);