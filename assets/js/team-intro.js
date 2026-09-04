class AppTeamIntro extends HTMLElement {
  connectedCallback() {
    fetch('components/team-intro.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
        this.loadTeamMembers();
      });
  }

  loadTeamMembers() {
    const grid = this.querySelector('#team-grid');
    if (!grid) return;

    fetch('assets/json/team.json')
      .then(res => res.json())
      .then(members => {
        grid.innerHTML = members.map(member => {
          // Fallbacks for empty values
          const name = member.name.trim() || `Team Member ${member.id}`;
          const role = member.role.trim() || 'Core Contributor';
          const imageSrc = member.profile_img.trim() || 'assets/images/logo.png';
          const studentId = member.student_id.trim() ? `ID: ${member.student_id}` : 'Student ID';
          const about = member.about.trim() || 'Dedicated to improving financial literacy through clear, first-principles education and interactive tools.';

          return `
            <a href="member.html?id=${member.id}" class="team-card">
              <div class="card-avatar-box">
                <img src="${imageSrc}" alt="${name}" class="card-avatar" onerror="this.src='assets/images/logo.png'">
              </div>
              <div class="card-body">
                <span class="card-role">${role}</span>
                <h3 class="card-name">${name}</h3>
                <span class="card-student-id">${studentId}</span>
                <p class="card-about">${about}</p>
                <div class="card-action">
                  <span>View Full Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          `;
        }).join('');
      })
      .catch(err => {
        console.error('Error loading team JSON:', err);
      });
  }
}

customElements.define('app-team-intro', AppTeamIntro);