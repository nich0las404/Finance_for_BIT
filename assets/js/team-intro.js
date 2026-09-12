class AppTeamIntro extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<section class="team-section">
    <div class="team-container">
        
        <div class="team-header">
            <span class="team-badge">The Team Behind Finance for BIT</span>
            <h1 class="team-title">Meet Our <span>Contributors</span></h1>
            <p class="team-subtitle">
                Bridging the financial literacy gap with interactive learning modules and accessible design.
            </p>
        </div>

        <!-- Dynamic Grid Container -->
        <div class="team-grid" id="team-grid">
            <!-- Rendered automatically from assets/json/team.json -->
        </div>

    </div>
</section>
`;
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    const grid = this.querySelector('#team-grid');
    if (!grid) return;

    // Use global JS data instead of fetch() so this works without a local server (file://)
    const members = window.FinanceTeamData;
    if (!members || members.length === 0) {
      grid.innerHTML = '<p style="color:#a0aec0;">No team data found. Make sure team-data.js is loaded.</p>';
      return;
    }

    const isInsidePages = window.location.pathname.replace(/\\/g, '/').includes('/pages/');
    const rootPrefix = isInsidePages ? '../' : '';
    const logoFallback = `${rootPrefix}assets/images/logo.png`;

    grid.innerHTML = members.map(member => {
      const name = member.name.trim() || `Team Member ${member.id}`;
      const role = member.role.trim() || 'Core Contributor';
      const rawImg = member.profile_img.trim();
      const imageSrc = rawImg ? `${rootPrefix}${rawImg}` : logoFallback;
      const studentId = member.student_id.trim() ? `ID: ${member.student_id}` : 'Student ID';
      const about = member.about.trim() || 'Dedicated to improving financial literacy through clear, first-principles education and interactive tools.';

      return `
        <a href="member.html?id=${member.id}" class="team-card">
          <div class="card-avatar-box">
            <img src="${imageSrc}" alt="${name}" class="card-avatar" onerror="this.src='${logoFallback}'">
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
  }
}

customElements.define('app-team-intro', AppTeamIntro);