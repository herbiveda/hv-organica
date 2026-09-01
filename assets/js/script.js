'use strict';

/** Navbar toggle */
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navbar = document.querySelector('[data-navbar]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
[navOpenBtn, navCloseBtn].filter(Boolean).forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (navbar) navbar.classList.toggle('active');
  });
});

/** Search toggle */
const searchContainer = document.querySelector('[data-search-wrapper]');
const searchBtn = document.querySelector('[data-search-btn]');
if (searchBtn && searchContainer) {
  searchBtn.addEventListener('click', function () {
    searchContainer.classList.toggle('active');
  });
}

/** Wishlist & cart toggle */
const panelBtns = document.querySelectorAll('[data-panel-btn]');
const sidePanels = document.querySelectorAll('[data-side-panel]');
panelBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const clickedElemDataValue = this.dataset.panelBtn;
    sidePanels.forEach(function (panel) {
      if (clickedElemDataValue === panel.dataset.sidePanel) panel.classList.toggle('active');
      else panel.classList.remove('active');
    });
  });
});

/** Back to top */
const backTopBtn = document.querySelector('[data-back-top-btn]');
if (backTopBtn) {
  window.addEventListener('scroll', function () {
    backTopBtn.classList.toggle('active', window.scrollY >= 100);
  });
}

/** Product details gallery */
const productDisplay = document.querySelector('[data-product-display]');
const productThumbnails = document.querySelectorAll('[data-product-thumbnail]');
if (productDisplay) {
  productThumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      productDisplay.src = this.src;
      productDisplay.classList.add('fade-anim');
      setTimeout(function () { productDisplay.classList.remove('fade-anim'); }, 250);
    });
  });
}

/** Homepage enhancements */
function loadStylesheet(href) {
  if (document.querySelector('link[href="' + href + '"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
function loadScript(src, callback) {
  const existing = document.querySelector('script[src="' + src + '"]');
  if (existing) {
    if (typeof window.Swiper === 'function') callback();
    else existing.addEventListener('load', callback, { once: true });
    return;
  }
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
}
function injectSitePolishStyles() {
  if (document.getElementById('site-final-polish')) return;
  const style = document.createElement('style');
  style.id = 'site-final-polish';
  style.textContent = `
    :root {
      --shamrock-green: rgba(15, 60, 53, 1) !important;
      --ds-emerald: rgba(15, 60, 53, 1) !important;
      --ds-green-pigment: rgba(11, 47, 42, 1) !important;
    }
    .partner { background-color: rgba(15, 60, 53, 1) !important; }
    .testimonials-swiper { position:relative; width:100%; overflow:hidden; padding-block:4px 28px; }
    .testimonials-swiper .swiper-wrapper { display:flex !important; align-items:stretch; gap:0 !important; }
    .testimonials-swiper .swiper-slide { height:auto; display:flex; }
    .testimonials-swiper .testi-card { width:100%; height:100%; }
    .testimonials-swiper .swiper-pagination-bullet-active { background:rgba(15, 60, 53, 1); }
    .testimonials-swiper .swiper-button-prev,.testimonials-swiper .swiper-button-next { color:rgba(15, 60, 53, 1); width:38px; height:38px; border:1px solid rgba(15, 60, 53, .25); border-radius:50%; background:rgba(255, 255, 255, .95); }
    .testimonials-swiper .swiper-button-prev::after,.testimonials-swiper .swiper-button-next::after { font-size:15px; font-weight:700; }
    @media (max-width:767px) {
      .testimonials-swiper .swiper-button-prev,.testimonials-swiper .swiper-button-next { display:none; }
    }
  `;
  document.head.appendChild(style);
}
function addFourthHomepageCard(selector, cardHtml) {
  const list = document.querySelector(selector);
  if (!list) return;
  Array.from(list.children).forEach(function (item) {
    if (/coming\\s*soon/i.test(item.textContent || '')) item.remove();
  });
  if (list.children.length < 4) list.insertAdjacentHTML('beforeend', cardHtml);
}
function addRealFourthCards() {
  addFourthHomepageCard('#featured-courses .grid-list', '<li><div class="product-card"><figure class="card-banner"><img src="./assets/images/product-4.png" width="189" height="189" loading="lazy" alt="Ayurvedic Daily Routines course"></figure><div class="card-content"><p class="card-category">PRACTICAL</p><h3 class="h3 card-title">Ayurvedic Daily Routines</h3><p class="card-text">Build a practical Dinacharya-inspired routine for everyday wellbeing and mindful living.</p><ul class="product-meta"><li><ion-icon name="time-outline"></ion-icon><span>5 Hours</span></li><li><ion-icon name="book-outline"></ion-icon><span>20 Lessons</span></li></ul><a href="./courses.html" class="btn btn-primary">Explore Course</a></div></div></li>');
  addFourthHomepageCard('#books-guides .blog-list', '<li><div class="blog-card"><figure class="card-banner"><img src="./assets/images/blog-1.jpg" width="451" height="310" loading="lazy" alt="Ayurvedic daily living guide" class="w-100"></figure><div class="card-content"><p class="card-subtitle">GUIDE</p><h3 class="h3 card-title">Dinacharya for Daily Living</h3><p class="card-text">A practical guide to Ayurvedic routines, timing, habits and mindful self-care.</p><a href="./journal.html" class="btn btn-primary">Read Guide</a></div></div></li>');
  addFourthHomepageCard('#retreats .offer-list', '<li class="offer-item"><div class="offer-card"><figure class="card-banner"><img src="./assets/images/blog-1.jpg" width="450" height="300" loading="lazy" alt="Ayurveda yoga and meditation retreat" class="w-100"></figure><div class="card-content"><p class="card-subtitle">YOGA & MEDITATION</p><h3 class="h3 card-title">Mindful Renewal Journey</h3><p class="card-text">An immersive wellness experience built around yoga, meditation, nature and restorative daily practices.</p><a href="./travel.html" class="btn btn-primary">Explore Retreats</a></div></div></li>');
}
function initializeTestimonialsSwiper() {
  const list = document.querySelector('.testimonials .testi-list');
  if (!list || list.classList.contains('swiper-wrapper') || typeof window.Swiper !== 'function') return;
  const swiper = document.createElement('div');
  swiper.className = 'swiper testimonials-swiper';
  const wrapper = document.createElement('ul');
  wrapper.className = 'swiper-wrapper';
  Array.from(list.children).forEach(function (slide) {
    slide.classList.add('swiper-slide');
    wrapper.appendChild(slide);
  });
  swiper.appendChild(wrapper);
  swiper.insertAdjacentHTML('beforeend', '<div class="swiper-pagination"></div><div class="swiper-button-prev" aria-label="Previous testimonial"></div><div class="swiper-button-next" aria-label="Next testimonial"></div>');
  list.replaceWith(swiper);
  new window.Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 18,
    speed: 650,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
    navigation: { nextEl: '.testimonials-swiper .swiper-button-next', prevEl: '.testimonials-swiper .swiper-button-prev' },
    breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 20 } }
  });
}
function initializeHomepageEnhancements() {
  injectSitePolishStyles();
  addRealFourthCards();
  loadStylesheet('https://cdn.jsdelivr.net/npm/swiper@14.1.0/swiper-bundle.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/swiper@14.1.0/swiper-bundle.min.js', initializeTestimonialsSwiper);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHomepageEnhancements, { once: true });
} else {
  initializeHomepageEnhancements();
}
