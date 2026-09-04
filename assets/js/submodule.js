/* assets/js/submodule.js - Submodule Page Interaction & Progression logic */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const subId = urlParams.get('id') || '1-1';

  // Find Submodule Data
  let currentSub = null;
  let currentMod = null;
  const modulesData = window.FinanceModulesData || [];

  for (const mod of modulesData) {
    const found = mod.submodules.find(s => s.id === subId);
    if (found) {
      currentSub = found;
      currentMod = mod;
      break;
    }
  }

  // Populate UI elements
  if (currentSub) {
    document.title = `${currentSub.title} | Finance for BIT`;
    
    const tag = document.getElementById('submoduleTag');
    const title = document.getElementById('submoduleMainTitle');
    const lead = document.getElementById('submoduleLead');
    const readPill = document.getElementById('readTimePill');

    if (tag) tag.textContent = `Submodule ${currentSub.number}`;
    if (title) title.textContent = currentSub.title;
    if (lead) lead.textContent = currentSub.desc;
    if (readPill) readPill.textContent = `⏱ ${currentSub.readTime} read`;
  }

  // Quiz Toggle Button
  const quizBtn = document.getElementById('quizBtn');
  const quizCard = document.getElementById('quizCard');

  if (quizBtn && quizCard) {
    quizBtn.addEventListener('click', () => {
      quizCard.style.display = quizCard.style.display === 'none' ? 'block' : 'none';
      quizCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Complete Submodule Action
  const completeBtn = document.getElementById('completeBtn');
  const finishQuizBtn = document.getElementById('finishQuizBtn');

  const handleCompletion = () => {
    const session = window.FinanceAccounts ? window.FinanceAccounts.getActiveSession() : null;
    const userId = session ? session.userId : 'demo';

    const userProgress = window.FinanceAccounts.getUserProgress(userId);
    
    // Add current to completed
    if (!userProgress.completedSubmodules.includes(subId)) {
      userProgress.completedSubmodules.push(subId);
    }

    // Determine Next Submodule ID
    const allSubIds = [];
    modulesData.forEach(m => {
      m.submodules.forEach(s => allSubIds.push(s.id));
    });

    const currentIndex = allSubIds.indexOf(subId);
    if (currentIndex !== -1 && currentIndex + 1 < allSubIds.length) {
      const nextSubId = allSubIds[currentIndex + 1];
      if (!userProgress.unlockedSubmodules.includes(nextSubId)) {
        userProgress.unlockedSubmodules.push(nextSubId);
      }
    }

    // Save Progress
    window.FinanceAccounts.saveUserProgress(userId, userProgress);

    alert(`🎉 Submodule ${currentSub ? currentSub.number : subId} Completed! Next submodule unlocked.`);
    window.location.href = 'modules.html';
  };

  if (completeBtn) completeBtn.addEventListener('click', handleCompletion);
  if (finishQuizBtn) finishQuizBtn.addEventListener('click', handleCompletion);
});
