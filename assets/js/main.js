// ── LIVE PLAYER COUNT ────────────────────────────────────────
(function () {
  const el = document.getElementById('c-players');
  if (!el) return;
  fetch('https://api.mcsrvstat.us/3/play.ethernitymc.it')
    .then(r => r.json())
    .then(data => {
      if (data.online) {
        el.textContent = data.players?.online ?? 0;
      } else {
        el.textContent = 'Offline';
        el.style.fontSize = '20px';
      }
    })
    .catch(() => { el.textContent = '—'; });
})();

// ── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── MOBILE MENU ─────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      menuBtn.textContent = '☰';
    }
  });
}

// ── COPY IP ──────────────────────────────────────────────────
const copyBtn = document.getElementById('copyIP');
const copyHint = document.getElementById('copyHint');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('play.ethernitymc.it').then(() => {
      copyHint.textContent = '✅ Copiato!';
      setTimeout(() => { copyHint.textContent = '📋 Copia IP'; }, 2000);
    });
  });
}

// ── SCROLL FADE IN ──────────────────────────────────────────
(function () {
  const targets = document.querySelectorAll('.mode-card, .step-card, .vip-card, .vote-card, .section-header');
  targets.forEach(el => el.classList.add('fade-in'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
})();

// ── PARTICLES ────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(204,68,255,', 'rgba(255,102,221,', 'rgba(180,80,255,'];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.8, 2.5),
      vx: rand(-0.2, 0.2),
      vy: rand(-0.4, -0.1),
      alpha: rand(0.2, 0.8),
      color: colors[Math.floor(rand(0, colors.length))],
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.001;

      if (p.y < -5 || p.alpha <= 0) Object.assign(p, createParticle(), { y: H + 5 });
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
