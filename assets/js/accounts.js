/* assets/js/accounts.js - Account & Developer Seed Management */
window.FinanceAccounts = {
  // Pre-configured Developer / Admin Demo Account with ALL 20 submodules unlocked
  demoAccount: {
    userId: 'demo',
    email: 'demo@finance.bit',
    name: 'Developer Demo Account',
    password: 'password123',
    isLoggedIn: true,
    isDemo: true,
    progress: {
      unlockedSubmodules: [
        '1-1', '1-2', '1-3', '1-4', '1-5',
        '2-1', '2-2', '2-3', '2-4', '2-5',
        '3-1', '3-2', '3-3', '3-4', '3-5',
        '4-1', '4-2', '4-3', '4-4', '4-5'
      ],
      completedSubmodules: [
        '1-1', '1-2', '1-3', '1-4', '1-5',
        '2-1', '2-2', '2-3', '2-4', '2-5',
        '3-1', '3-2', '3-3', '3-4', '3-5',
        '4-1', '4-2', '4-3', '4-4', '4-5'
      ]
    }
  },

  // Get currently active session
  getActiveSession() {
    const raw = localStorage.getItem('finance_session');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  // Log in using Demo Account instantly
  loginAsDemo() {
    localStorage.setItem('finance_user', JSON.stringify(this.demoAccount));
    localStorage.setItem('finance_session', JSON.stringify({
      isLoggedIn: true,
      name: this.demoAccount.name,
      userId: this.demoAccount.userId,
      email: this.demoAccount.email,
      isDemo: true
    }));
    // Save demo progress
    localStorage.setItem('finance_progress_demo', JSON.stringify(this.demoAccount.progress));
    window.dispatchEvent(new CustomEvent('user-session-changed', { detail: { isLoggedIn: true } }));
    window.location.reload();
  },

  // Get user progress (defaults to ['1-1'] for regular students)
  getUserProgress(userId) {
    if (!userId) return { unlockedSubmodules: ['1-1'], completedSubmodules: [] };
    
    // Check if demo user
    if (userId === 'demo') {
      const demoSaved = localStorage.getItem('finance_progress_demo');
      if (demoSaved) {
        try { return JSON.parse(demoSaved); } catch(e) {}
      }
      return this.demoAccount.progress;
    }

    const saved = localStorage.getItem(`finance_progress_${userId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    // Default initial progress for new students
    const initial = {
      unlockedSubmodules: ['1-1'],
      completedSubmodules: []
    };
    localStorage.setItem(`finance_progress_${userId}`, JSON.stringify(initial));
    return initial;
  },

  // Save progress for current user
  saveUserProgress(userId, progress) {
    if (!userId) return;
    localStorage.setItem(`finance_progress_${userId}`, JSON.stringify(progress));
  }
};
