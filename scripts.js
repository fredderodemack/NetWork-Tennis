/* ═══════════════════════════════════════════
   La Galaxie Tennis – scripts.js
   Thionville & Luxembourg
═══════════════════════════════════════════ */

/* ── FORMULAIRE DE CONTACT ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✓ Message envoyé !';
  btn.style.background = '#2e6b46';
  setTimeout(() => {
    btn.textContent = 'Envoyer ma demande →';
    btn.style.background = '';
    e.target.reset();
  }, 3500);
}

/* ── ÉTOILES SECTION GALAXIE ── */
function generateStars() {
  const starsContainer = document.getElementById('galaxie-stars');
  if (!starsContainer) return;

  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    starsContainer.appendChild(star);
  }
}

/* ── ANIMATIONS AU DÉFILEMENT ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll(
    '.service-card, .about-stat, .public-card, .principe-card, .axe-item'
  );

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── INITIALISATION ── */
document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  initScrollReveal();
});
