/* assets/js/submodule-quiz.js - Submodule Multiple-Choice Quiz & Progression logic */
document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('submoduleQuizForm');
  const quizFeedback = document.getElementById('quizFeedback');
  const currentSubId = document.body.getAttribute('data-submodule-id') || '1-1';

  if (!quizForm) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let allAnswered = true;
    let correctCount = 0;
    const questions = quizForm.querySelectorAll('.quiz-question-box');

    questions.forEach((qBox) => {
      const selected = qBox.querySelector('input[type="radio"]:checked');
      const options = qBox.querySelectorAll('.quiz-option');

      // Reset option styles
      options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
      });

      if (!selected) {
        allAnswered = false;
        return;
      }

      const isCorrect = selected.getAttribute('data-correct') === 'true';
      const parentOption = selected.closest('.quiz-option');

      if (isCorrect) {
        correctCount++;
        if (parentOption) parentOption.classList.add('correct');
      } else {
        if (parentOption) parentOption.classList.add('incorrect');
        // Highlight the correct choice for learning feedback
        const correctRadio = qBox.querySelector('input[data-correct="true"]');
        if (correctRadio) {
          const correctOpt = correctRadio.closest('.quiz-option');
          if (correctOpt) correctOpt.classList.add('correct');
        }
      }
    });

    if (!allAnswered) {
      if (quizFeedback) {
        quizFeedback.style.color = '#f39c12';
        quizFeedback.textContent = '⚠️ Please answer all questions before submitting.';
      }
      return;
    }

    const totalQuestions = questions.length;

    if (correctCount === totalQuestions) {
      // Save progression (if logged in) and get next submodule ID
      const nextSubId = handleSubmoduleCompletion(currentSubId);

      if (quizFeedback) {
        quizFeedback.style.color = '#2ecc71';
        const destination = nextSubId ? `Submodule ${nextSubId.replace('-', '.')}` : 'the Curriculum Room';
        quizFeedback.innerHTML = `🎉 <strong>Perfect Score! (${correctCount}/${totalQuestions})</strong> Redirecting you to ${destination}...`;
      }

      // Redirect after 1.5 seconds
      setTimeout(() => {
        if (nextSubId) {
          // Navigate to next submodule page (same folder)
          window.location.href = `submodule-${nextSubId}.html`;
        } else {
          // Last submodule — go back to the Curriculum Room
          window.location.href = '../modules.html';
        }
      }, 1500);

    } else {
      if (quizFeedback) {
        quizFeedback.style.color = '#e74c3c';
        quizFeedback.innerHTML = `❌ You scored ${correctCount}/${totalQuestions}. Review the correct answers highlighted above and try again!`;
      }
    }
  });

  // Saves progress if user is logged in, and returns the next submodule ID (or null if last)
  function handleSubmoduleCompletion(subId) {
    const modulesData = window.FinanceModulesData || [];
    const allSubIds = [];
    modulesData.forEach(m => {
      m.submodules.forEach(s => allSubIds.push(s.id));
    });

    const currentIndex = allSubIds.indexOf(subId);
    const nextSubId = (currentIndex !== -1 && currentIndex + 1 < allSubIds.length)
      ? allSubIds[currentIndex + 1]
      : null;

    // Save progression only if FinanceAccounts is available (user is logged in)
    if (window.FinanceAccounts) {
      const session = window.FinanceAccounts.getActiveSession();
      const userId = session ? session.userId : 'demo';
      const userProgress = window.FinanceAccounts.getUserProgress(userId);

      if (!userProgress.completedSubmodules.includes(subId)) {
        userProgress.completedSubmodules.push(subId);
      }

      if (nextSubId && !userProgress.unlockedSubmodules.includes(nextSubId)) {
        userProgress.unlockedSubmodules.push(nextSubId);
      }

      window.FinanceAccounts.saveUserProgress(userId, userProgress);
    }

    return nextSubId;
  }
});
