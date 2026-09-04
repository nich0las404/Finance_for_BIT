/* assets/js/modules.js - Modules Page Component Logic */
class AppModules extends HTMLElement {
  connectedCallback() {
    fetch('components/modules.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
        this.init();
      })
      .catch(err => console.error('Error loading modules component:', err));
  }

  init() {
    this.session = window.FinanceAccounts ? window.FinanceAccounts.getActiveSession() : null;
    this.modulesData = window.FinanceModulesData || [];
    
    // Auth Check
    const authGuard = this.querySelector('#modulesAuthGuard');
    const modulesList = this.querySelector('#modulesList');
    const progressFooter = this.querySelector('#modulesProgressFooter');

    if (!this.session || !this.session.isLoggedIn) {
      if (authGuard) authGuard.style.display = 'block';
      this.bindAuthGuardButtons();
      this.renderModules(true); // Locked mode preview
      this.updateProgressBar(0);
      return;
    }

    if (authGuard) authGuard.style.display = 'none';

    // Get User Progress
    this.progress = window.FinanceAccounts.getUserProgress(this.session.userId);
    this.renderModules(false);
    this.updateProgressBar();

    // Listen for session updates
    window.addEventListener('user-session-changed', () => {
      this.session = window.FinanceAccounts.getActiveSession();
      if (this.session && this.session.isLoggedIn) {
        if (authGuard) authGuard.style.display = 'none';
        this.progress = window.FinanceAccounts.getUserProgress(this.session.userId);
        this.renderModules(false);
        this.updateProgressBar();
      } else {
        if (authGuard) authGuard.style.display = 'block';
        this.renderModules(true);
        this.updateProgressBar(0);
      }
    });
  }

  bindAuthGuardButtons() {
    const loginBtn = this.querySelector('#guardLoginBtn');
    const demoBtn = this.querySelector('#guardDemoBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        window.FinanceAccounts.loginAsDemo();
      });
    }
  }

  renderModules(isGuestMode) {
    const container = this.querySelector('#modulesList');
    if (!container) return;

    container.innerHTML = '';

    const unlockedSet = new Set(this.progress ? this.progress.unlockedSubmodules : ['1-1']);
    const completedSet = new Set(this.progress ? this.progress.completedSubmodules : []);

    this.modulesData.forEach((mod, index) => {
      const line = document.createElement('div');
      line.className = 'module-line';
      
      // Calculate module progress
      const totalSubs = mod.submodules.length;
      const completedCount = mod.submodules.filter(s => completedSet.has(s.id)).length;
      const hasUnlockedSub = mod.submodules.some(s => unlockedSet.has(s.id));

      if (!hasUnlockedSub && !isGuestMode) {
        line.classList.add('is-locked');
      }

      line.innerHTML = `
        <div class="module-line-header">
          <div class="module-meta-left">
            <span class="module-badge-tag">${mod.badge}</span>
            <span class="module-title-text">${mod.title}</span>
          </div>
          <div class="module-meta-right">
            <span class="module-stats">${completedCount}/${totalSubs} Completed</span>
            <span class="module-toggle-icon">▼</span>
          </div>
        </div>
        <div class="submodules-drawer">
          ${mod.submodules.map(sub => {
            const isUnlocked = !isGuestMode && unlockedSet.has(sub.id);
            const isDone = !isGuestMode && completedSet.has(sub.id);

            let statusBadgeHtml = '<span class="submodule-status-badge status-locked">🔒 Locked</span>';
            if (isDone) {
              statusBadgeHtml = '<span class="submodule-status-badge status-completed">✓ Completed</span>';
            } else if (isUnlocked) {
              statusBadgeHtml = '<span class="submodule-status-badge status-unlocked">▶ Ready</span>';
            }

            return `
              <div class="submodule-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
                <div class="submodule-main-info">
                  <div class="submodule-header-row">
                    <span class="submodule-number">${sub.number}</span>
                    <h4 class="submodule-title">${sub.title}</h4>
                  </div>
                  <p class="submodule-desc">${sub.desc}</p>
                </div>
                <div class="submodule-action">
                  ${statusBadgeHtml}
                  <a href="${isUnlocked ? `submodule.html?id=${sub.id}` : '#'}" 
                     class="btn-start-submodule ${!isUnlocked ? 'disabled' : ''}">
                    ${isDone ? 'Review' : (sub.isFinalTest ? 'Start Final Test' : 'Start Learning')}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Accordion toggle click handler
      const header = line.querySelector('.module-line-header');
      header.addEventListener('click', () => {
        line.classList.toggle('is-expanded');
      });

      container.appendChild(line);
    });
  }

  updateProgressBar(overrideUnlockedCount) {
    const countText = this.querySelector('#unlockedCountText');
    const percentText = this.querySelector('#unlockedPercentText');
    const barFill = this.querySelector('#progressBarFill');

    if (!countText || !barFill) return;

    let unlockedCount = 0;
    if (typeof overrideUnlockedCount === 'number') {
      unlockedCount = overrideUnlockedCount;
    } else if (this.progress && this.progress.unlockedSubmodules) {
      unlockedCount = this.progress.unlockedSubmodules.length;
    }

    const totalSubmodules = 20;
    const percentage = Math.min(100, Math.round((unlockedCount / totalSubmodules) * 100));

    countText.textContent = `${unlockedCount} / ${totalSubmodules} Unlocked`;
    percentText.textContent = `${percentage}%`;
    barFill.style.width = `${percentage}%`;
  }
}

customElements.define('app-modules', AppModules);
