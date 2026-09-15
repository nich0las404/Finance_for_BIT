class AppHomepage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<section class="kinetic-hero">
    <!-- Dynamic Interactive Canvas Background -->
    <canvas id="kinetic-canvas"></canvas>

    <!-- Content Overlay -->
    <div class="hero-viewport">
        <!-- Brand Header Badge -->
        <div class="hero-badge">
            <span class="pulse-dot"></span>
            <span>Finance for BIT</span>
        </div>

        <!-- Dynamic Kinetic Headline -->
        <h1 class="hero-title">
            Master Financial Intelligence <br>
            <span class="gradient-text">Through Active Discovery.</span>
        </h1>

        <!-- High-Level Subtitle -->
        <p class="hero-description">
            Experience first-principles learning in Accounting, Corporate Finance, Valuation, and Applied Markets through interactive models and real-time simulations.
        </p>

        <!-- Kinetic Action Hub -->
        <div class="hero-cta-group">
            <a href="pages/modules.html" class="btn-kinetic-primary">
                <span>Explore Modules</span>
                <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="pages/minigames.html" class="btn-kinetic-secondary">
                <span>Play Minigames</span>
            </a>
        </div>

        <!-- Interactive Pillar & Minigame Nodes -->
        <div class="hero-nodes-grid">
            <div class="node-card" data-speed="0.05">
                <div class="node-icon">📈</div>
                <div class="node-info">
                    <h4>Accounting & TVM</h4>
                    <p>Financial Statements & Time Value</p>
                </div>
            </div>
            <div class="node-card" data-speed="0.08">
                <div class="node-icon">💎</div>
                <div class="node-info">
                    <h4>DCF Valuation</h4>
                    <p>Intrinsic Value & Cash Flows</p>
                </div>
            </div>
            <div class="node-card" data-speed="0.03">
                <div class="node-icon">🏛️</div>
                <div class="node-info">
                    <h4>Applied Markets</h4>
                    <p>Investment Banking & Equity</p>
                </div>
            </div>
            <div class="node-card" data-speed="0.06">
                <div class="node-icon">🎮</div>
                <div class="node-info">
                    <h4>Interactive Games</h4>
                    <p>TypeRacer, Millionaire & More</p>
                </div>
            </div>
        </div>
    </div>
</section>
`;
    this.initKineticEngine();
  }

  initKineticEngine() {
    const canvas = this.querySelector('#kinetic-canvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse Tracking with Easing (Lerp)
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    this.addEventListener('mousemove', (e) => {
      const rect = this.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    });

    // Particle Fluid Mesh System
    const particleCount = 300;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2
    }));

    // Animation Loop
    const render = () => {
      // Smooth interpolation for fluid kinetic response
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Kinetic Gradient Aura following cursor
      const auraGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, Math.max(width, height) * 0.55
      );
      auraGradient.addColorStop(0, 'rgba(179, 146, 88, 0.22)');
      auraGradient.addColorStop(0.4, 'rgba(28, 45, 66, 0.45)');
      auraGradient.addColorStop(1, 'rgba(18, 24, 36, 0.95)');

      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // Interactive Particle Connections
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Repel slightly from cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const angle = Math.atan2(dy, dx);
          const force = (180 - dist) / 180;
          p.x -= Math.cos(angle) * force * 1.5;
          p.y -= Math.sin(angle) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(179, 146, 88, ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles with gradient lines
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (pDist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(179, 146, 88, ${0.15 * (1 - pDist / 120)})`;
            ctx.stroke();
          }
        }
      }

      // Parallax effect on nodes based on mouse distance from center
      const centerX = width / 2;
      const centerY = height / 2;
      const deltaX = (mouse.x - centerX) / centerX;
      const deltaY = (mouse.y - centerY) / centerY;

      const nodes = this.querySelectorAll('.node-card');
      nodes.forEach(node => {
        const speed = parseFloat(node.dataset.speed || '0.05');
        const offsetX = deltaX * speed * 60;
        const offsetY = deltaY * speed * 60;
        node.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      requestAnimationFrame(render);
    };

    render();
  }
}

customElements.define('app-homepage', AppHomepage);