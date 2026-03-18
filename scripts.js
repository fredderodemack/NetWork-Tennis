/* ═══════════════════════════════════════════
   La Galaxie Tennis – scripts.js
   Thionville & Luxembourg
═══════════════════════════════════════════ */

/* ── CONFIGURATION EMAILJS ── */
// Remplacez ces valeurs par celles de votre compte EmailJS
// https://www.emailjs.com → Account → API Keys
const EMAILJS_PUBLIC_KEY  = 'AhbZUYdl-uOF8LnAW';   // ex: 'aB1cD2eF3gH4iJ5k'
const EMAILJS_SERVICE_ID  = 'service_ih7ff4g';   // ex: 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_m4z277u';  // ex: 'template_xxxxxxx'

/* ── FORMULAIRE DE CONTACT ── */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.form-submit');

  // Récupération des champs (via les attributs name)
  const data = new FormData(form);
  const templateParams = {
    prenom:     data.get('prenom')     || '',
    nom:        data.get('nom')        || '',
    email:      data.get('email')      || '',
    telephone:  data.get('telephone')  || '',
    prestation: data.get('prestation') || '',
    message:    data.get('message')    || '',
  };

  // État : envoi en cours
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      // Succès
      btn.textContent = '✓ Message envoyé !';
      btn.style.background = '#2e6b46';
      btn.style.opacity = '1';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Envoyer ma demande →';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    })
    .catch((error) => {
      // Erreur
      console.error('EmailJS error:', error);
      btn.textContent = '✗ Erreur – réessayez';
      btn.style.background = '#c8572e';
      btn.style.opacity = '1';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Envoyer ma demande →';
        btn.style.background = '';
      }, 4000);
    });
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
  // Initialisation EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  generateStars();
  initScrollReveal();
});
