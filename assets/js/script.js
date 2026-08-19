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
      if (clickedElemDataValue === panel.dataset.sidePanel) {
        panel.classList.toggle('active');
      } else {
        panel.classList.remove('active');
      }
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
      setTimeout(function () {
        productDisplay.classList.remove('fade-anim');
      }, 250);
    });
  });
}

/** Global legacy spelling cleanup */
document.querySelectorAll('[aria-label], [title]').forEach(function (element) {
  if (element.hasAttribute('aria-label')) {
    element.setAttribute('aria-label', element.getAttribute('aria-label').replace(/whishlist/gi, 'wishlist'));
  }
  if (element.hasAttribute('title')) {
    element.setAttribute('title', element.getAttribute('title').replace(/whishlist/gi, 'wishlist'));
  }
});

document.querySelectorAll('body *').forEach(function (element) {
  if (element.children.length === 0 && element.textContent) {
    element.textContent = element.textContent.replace(/Whishlist/g, 'Wishlist').replace(/whishlist/g, 'wishlist');
  }
});
