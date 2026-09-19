/* assets/js/tldr-toggle.js - Interactive Submodule TL;DR Summary Toggle */
document.addEventListener('DOMContentLoaded', () => {
  const tldrButtons = document.querySelectorAll('.btn-tldr-toggle');

  tldrButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.tldr-card');
      if (!card) return;

      const content = card.querySelector('.tldr-content');
      if (!content) return;

      const isActive = content.classList.contains('active');

      if (isActive) {
        content.classList.remove('active');
        btn.innerHTML = '💡 Reveal Quick TL;DR Summary';
      } else {
        content.classList.add('active');
        btn.innerHTML = '⚡ Hide Quick TL;DR Summary';
      }
    });
  });
});
