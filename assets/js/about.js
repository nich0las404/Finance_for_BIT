class AppAbout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<section class="about-section">
    <div class="about-container">
        
        <!-- Hero Header -->
        <div class="about-hero">
            <span class="about-badge">Origin & Mission</span>
            <h1 class="about-title">Bridging the Gap in <span>Financial Literacy</span></h1>
            <p class="about-subtitle">
                Designed specifically to transform complex financial theories into intuitive, hands-on knowledge for high school and university students.
            </p>
        </div>

        <!-- Problem vs Mission Grid -->
        <div class="origin-grid">
            <div class="origin-card alert-card">
                <div class="card-tag">The Reality</div>
                <h3>The Literacy Gap</h3>
                <p>
                    Only 11% of 15-year-old students achieve high proficiency in financial literacy globally. Most traditional resources leave beginners overwhelmed with complex jargon and abstract equations without clear practical context.
                </p>
            </div>

            <div class="origin-card mission-card">
                <div class="card-tag">Our Purpose</div>
                <h3>Finance for BIT</h3>
                <p>
                    We provide a structured, student-centric pathway that strips away confusion. By combining first-principles learning with interactive tools, we prepare students for both academic excellence and real-world finance careers.
                </p>
            </div>
        </div>

        <!-- Core Curriculum Pillars -->
        <div class="pillars-section" id="curriculum">
            <div class="section-header">
                <h2>Our <span>Curriculum Pillars</span></h2>
                <p>A step-by-step pathway from foundational concepts to institutional-grade valuation.</p>
            </div>

            <div class="pillars-grid">
                <div class="pillar-card">
                    <span class="pillar-num">01</span>
                    <h3>Financial Accounting</h3>
                    <p>Master the universal language of business through standardized financial statements, cash flow linkages, and balance sheet mechanics.</p>
                </div>

                <div class="pillar-card">
                    <span class="pillar-num">02</span>
                    <h3>Corporate Finance</h3>
                    <p>Understand how corporations make decisions—covering Time Value of Money (TVM), capital budgeting, risk vs. return, and capital structure.</p>
                </div>

                <div class="pillar-card">
                    <span class="pillar-num">03</span>
                    <h3>DCF Valuation</h3>
                    <p>Learn the gold standard of company valuation by projecting free cash flows, determining WACC, and calculating intrinsic value.</p>
                </div>

                <div class="pillar-card">
                    <span class="pillar-num">04</span>
                    <h3>Applied Finance</h3>
                    <p>Translate theoretical finance into career pathways across Investment Banking, Equity Research, Private Equity, and Asset Management.</p>
                </div>
            </div>
        </div>

        <!-- Student-Centric Features -->
        <div class="features-section">
            <div class="section-header">
                <h2>Built for <span>Intuitive Learning</span></h2>
            </div>

            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">💡</div>
                    <h4>First-Principles Approach</h4>
                    <p>Concepts and formulas are derived step-by-step from fundamental principles, avoiding memorization.</p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">🏠</div>
                    <h4>Relatable Analogies</h4>
                    <p>Abstract concepts like Leveraged Buyouts (LBOs) are taught using simple analogies like real-estate mortgages.</p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">📊</div>
                    <h4>Interactive Calculators</h4>
                    <p>Hands-on models and dynamic charts allow learners to adjust variables and immediately visualize outcomes.</p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">🎯</div>
                    <h4>Career Connection</h4>
                    <p>Every module concludes with explicit mappings to professional industry roles and self-assessment tools.</p>
                </div>
            </div>
        </div>

    </div>
</section>
`;
        
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
    }
}

customElements.define('app-about', AppAbout);