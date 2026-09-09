document.addEventListener('DOMContentLoaded', () => {
    const contentBox = document.getElementById('member-content');
    if (!contentBox) return;

    // Parse URL parameter: member.html?id=1
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');

    if (!memberId) {
        renderError(contentBox, 'No team member selected.');
        return;
    }

    const isInsidePages = window.location.pathname.replace(/\\/g, '/').includes('/pages/');
    const fetchPath = isInsidePages ? '../assets/json/team.json' : 'assets/json/team.json';
    const logoFallback = isInsidePages ? '../assets/images/logo.png' : 'assets/images/logo.png';

    fetch(fetchPath)
        .then(res => res.json())
        .then(members => {
            const member = members.find(m => m.id === memberId);

            if (!member) {
                renderError(contentBox, 'Team member not found.');
                return;
            }

            // Fallback values
            const name = member.name.trim() || `Team Member ${member.id}`;
            const role = member.role.trim() || 'Core Contributor';
            const studentId = member.student_id.trim() ? `Student ID: ${member.student_id}` : 'Student ID';
            const rawImg = member.profile_img.trim();
            const imageSrc = rawImg ? (isInsidePages ? `../${rawImg}` : rawImg) : logoFallback;
            const about = member.about.trim() || 'No description provided yet.';

            contentBox.innerHTML = `
                <!-- Left Column: Details -->
                <div class="member-info">
                    <div class="member-header">
                        <h1 class="member-name">${name}</h1>
                        <span class="member-role">${role}</span>
                        <span class="member-id-tag">${studentId}</span>
                    </div>

                    <div class="member-about-section">
                        <h3 class="about-heading">About Me</h3>
                        <div class="about-body">${about.replace(/\n/g, '<br><br>')}</div>
                    </div>
                </div>

                <!-- Right Column: Big Feature Image -->
                <div class="member-media">
                    <div class="image-frame">
                        <img src="${imageSrc}" alt="${name}" onerror="this.src='${logoFallback}'">
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error('Error fetching member data:', err);
            renderError(contentBox, 'Failed to load member profile.');
        });
});

function renderError(container, message) {
    container.innerHTML = `
        <div class="member-error">
            <h2>${message}</h2>
            <a href="team.html" class="btn-primary">Return to Team Directory</a>
        </div>
    `;
}