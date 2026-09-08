/* =====================================================
   B.U. BHANDARI HONDA PUNE — SCRIPT
===================================================== */

/* ---------- MOTORCYCLE DATA ---------- */
const models = [
  { name: 'Activa 6G', tagline: 'Pune\'s favourite scooter', price: 'from ₹77,181', img: 'https://images.unsplash.com/photo-1519750292352-c9fc17322ed7?auto=format&fit=crop&w=600&q=70' },
  { name: 'Dio', tagline: 'Sporty, stylish, agile', price: 'from ₹78,441', img: 'https://images.unsplash.com/photo-1554223789-df81106a45ed?auto=format&fit=crop&w=600&q=70' },
  { name: 'Shine 125', tagline: 'Built to shine every day', price: 'from ₹81,251', img: 'https://images.unsplash.com/photo-1549558373-aeb1559973b9?auto=format&fit=crop&w=600&q=70' },
  { name: 'SP 125', tagline: 'Smart performance', price: 'from ₹86,381', img: 'https://images.unsplash.com/photo-1527537232679-89f0d63ea3f7?auto=format&fit=crop&w=600&q=70' },
  { name: 'Hornet 2.0', tagline: 'Street aggression redefined', price: 'from ₹1,37,000', img: 'https://images.unsplash.com/photo-1627919522200-217fa02fe759?auto=format&fit=crop&w=600&q=70' },
  { name: 'Unicorn', tagline: 'The legendary commuter', price: 'from ₹1,10,000', img: 'https://images.unsplash.com/photo-1611182150972-4094e06cba79?auto=format&fit=crop&w=600&q=70' },
  { name: 'CB350', tagline: 'Honest, timeless, Honda soul', price: 'from ₹2,10,000', img: 'https://images.unsplash.com/photo-1561811565-6ed172b54cbe?auto=format&fit=crop&w=600&q=70' },
  { name: 'Highness CB350', tagline: 'The king of the road', price: 'from ₹2,20,000', img: 'https://images.unsplash.com/photo-1611769828049-4e3481716dfd?auto=format&fit=crop&w=600&q=70' },
  { name: 'NX500', tagline: 'Adventure on every horizon', price: 'from ₹6,33,000', img: 'https://images.unsplash.com/photo-1610202926204-c0c9b7d8f112?auto=format&fit=crop&w=600&q=70' }
];

/* ---------- RENDER MODELS ---------- */
function renderModels() {
  const grid = document.getElementById('modelsGrid');
  if (grid) {
    grid.innerHTML = models.slice(0, 9).map(m => `
      <a href="#getQuote" class="models_link-block">
        <div class="models-image_wrapper"><img src="${m.img}" alt="${m.name}" loading="lazy" width="200" height="150"></div>
        <h5 class="models_name">${m.name}</h5>
      </a>
    `).join('');
  }

  const products = document.getElementById('productsGrid');
  if (products) {
    products.innerHTML = models.map(m => `
      <article class="product-card" data-animate onclick="window.location.hash='getQuote'">
        <div class="product-media"><img src="${m.img}" alt="${m.name} Honda at B.U. Bhandari Pune" loading="lazy" width="400" height="300"></div>
        <div class="product-info">
          <div class="red_line"></div>
          <h3 class="product-name">${m.name}</h3>
          <p class="product-tagline">${m.tagline}</p>
          <p class="product-price">${m.price}</p>
        </div>
      </article>
    `).join('');
  }
}

/* ---------- NAVIGATION ---------- */
const nav = document.querySelector('.navigation');

function handleScroll() {
  if (window.scrollY > 10) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* Dropdown toggles (desktop) */
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dd => {
  const toggle = dd.querySelector('.dropdown-toggle');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dd.classList.toggle('opened');
    // Close siblings
    dropdowns.forEach(other => { if (other !== dd) other.classList.remove('opened'); });
  });
});
document.addEventListener('click', () => dropdowns.forEach(dd => dd.classList.remove('opened')));

/* Mobile menu */
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('is-active');
  menuOverlay.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
});
menuOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('is-active');
    menuOverlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  });
});

/* ---------- HERO SLIDER ---------- */
const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('heroDots');
let currentSlide = 0;
let slideTimer;

if (slides.length > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('is-active', i === index));
    currentSlide = index;
    resetTimer();
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5500);
  }

  resetTimer();
}

/* ---------- SERVICES SYNC ---------- */
const serviceRows = document.querySelectorAll('.service-row');
const serviceImgs = document.querySelectorAll('.service-img');

if (serviceRows.length > 0) {
  serviceRows.forEach(row => {
    row.addEventListener('click', () => activateService(row));
    row.addEventListener('mouseenter', () => activateService(row));
  });

  function activateService(el) {
    const idx = el.getAttribute('data-service');
    serviceRows.forEach(r => r.classList.toggle('is-active', r === el));
    serviceImgs.forEach(img => img.classList.toggle('is-active', img.getAttribute('data-service') === idx));
  }
}

/* ---------- COUNTERS ---------- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * (target - start) + start);
    el.textContent = value.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

/* ---------- SCROLL REVEAL ---------- */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);
document.querySelectorAll('[data-animate]').forEach(el => revealObserver.observe(el));

/* ---------- FORMS ---------- */
function setupForm(formId, messageId, subject) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(messageId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('[name="name"]') || form.querySelector('#quoteName') || {}).value;
    const phone = (form.querySelector('[name="phone"]') || form.querySelector('#quotePhone') || {}).value;
    const model = (form.querySelector('[name="model"]') || form.querySelector('#quoteModel') || {}).value;
    const email = (form.querySelector('[name="email"]') || {}).value || '';
    const wa = (form.querySelector('[name="whatsapp"]') || {}).checked;

    if (!name || !phone || !model) {
      msg.textContent = 'Please fill in all required fields.';
      msg.className = 'form-message error';
      return;
    }

    // Build WhatsApp enquiry
    const lines = [
      `Hi, I'm ${name}.`,
      `I'm interested in the ${model}.`,
      `Phone: ${phone}`
    ];
    if (email) lines.push(`Email: ${email}`);
    if (wa) lines.push('I am available on WhatsApp.');
    lines.push(`Subject: ${subject}`);

    window.open('https://wa.me/917720031883?text=' + encodeURIComponent(lines.join('\n')), '_blank');

    msg.textContent = 'Thank you! Redirecting you to WhatsApp...';
    msg.className = 'form-message success';
    form.reset();
  });
}

setupForm('leadFormFields', 'formMessage', 'Callback Request - B.U. Bhandari Honda');
setupForm('quoteForm', 'quoteMessage', 'Quote Request - B.U. Bhandari Honda');

/* ---------- SMOOTH ANCHOR SCROLL (accounts for fixed nav) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 78;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ---------- IMAGE FALLBACK (never show a broken image) ---------- */
const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23151515'/%3E%3Ctext x='50%25' y='48%25' fill='%23e4032e' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle'%3EHONDA%3C%2Ftext%3E%3Ctext x='50%25' y='60%25' fill='%23ffffff' font-family='Arial' font-size='16' text-anchor='middle'%3EB.U. Bhandari Honda%3C%2Ftext%3E%3C%2Fsvg%3E";

function protectImages() {
  document.querySelectorAll('img').forEach(img => {
    if (img.dataset.protected) return;
    img.dataset.protected = '1';
    img.addEventListener('error', () => {
      img.src = FALLBACK_IMG;
    });
  });
}

renderModels();
protectImages();
