/* ============================================================
   PORTFOLIO — ANASS AIT HSSAYENE — script.js
   ============================================================ */

/* ─── Navbar scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 300);
});

/* ─── Hamburger / Mobile menu ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Back to top button ─── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Intersection Observer — AOS-like ─── */
const aosItems = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        aosObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
aosItems.forEach(el => aosObserver.observe(el));

/* ─── Animated Counters ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ─── Skill bar animations ─── */
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-category').forEach(el => skillBarObserver.observe(el));

/* ─── Active nav link highlighting ─── */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinkItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--accent)';
  });
};
window.addEventListener('scroll', highlightNav);

/* ─── Contact form (demo — mailto fallback) ─── */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Contact depuis le portfolio';
    const message = form.message.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formNote.style.color = '#f85149';
      formNote.textContent = 'Veuillez saisir une adresse email valide.';
      return;
    }

    // Build mailto link
    const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`;
    const mailtoLink = `mailto:aithssayeneanass@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    formNote.style.color = 'var(--accent)';
    formNote.textContent = 'Votre client mail s\'est ouvert. Merci !';
    form.reset();
  });
}

/* ─── Smooth reveal for hero on load ─── */
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image');
  if (heroText) {
    heroText.style.transition = 'opacity .8s ease, transform .8s ease';
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateX(-30px)';
    setTimeout(() => {
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateX(0)';
    }, 100);
  }
  if (heroImage) {
    heroImage.style.transition = 'opacity .8s ease .2s, transform .8s ease .2s';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(30px)';
    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'translateX(0)';
    }, 100);
  }
});
