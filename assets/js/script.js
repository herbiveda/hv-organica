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

/** Ensure mobile-ux stylesheet is present */
(function ensureMobileUxStyles() {
  if (document.querySelector('link[href*="mobile-ux.css"]')) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './assets/css/mobile-ux.css';
  document.head.appendChild(link);
})();

/** Mobile action bar: hide on scroll-down, show on scroll-up */
(function initializeMobileActionBarScroll() {
  var bars = document.querySelectorAll('.mobile-action-bar, .site-mobile-action-bar');
  if (!bars.length) return;
  var lastY = window.scrollY || 0;
  var ticking = false;
  var threshold = 12;
  var minScroll = 80;
  function applyState(hidden) {
    bars.forEach(function (bar) { bar.classList.toggle('is-hidden', hidden); });
    document.body.classList.toggle('mobile-bar-hidden', hidden);
  }
  function onScroll() {
    var y = window.scrollY || 0;
    var delta = y - lastY;
    if (y <= minScroll) applyState(false);
    else if (delta > threshold) applyState(true);
    else if (delta < -threshold) applyState(false);
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });
  applyState(false);
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) applyState(false);
  }, { passive: true });
})();
