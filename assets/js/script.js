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

/** Homepage conversion polish */
document.addEventListener('DOMContentLoaded', function () {
  /* Move trust-strip items into the original top bar and remove the duplicate strip. */
  const proof = document.querySelector('.top-bar-proof');
  const trustItems = Array.from(document.querySelectorAll('.trust-strip-item'));
  if (proof && trustItems.length) {
    proof.textContent = trustItems.map(function (item) {
      return item.textContent.trim();
    }).join(' • ');
    const trustStrip = document.querySelector('.trust-strip');
    if (trustStrip) trustStrip.remove();
  }

  /* Update the hero store CTA. */
  const heroStoreCta = document.querySelector('.hero-btn-group .btn-secondary');
  if (heroStoreCta) heroStoreCta.textContent = 'HV Herbs Store';

  /* Replace the early consultation block with the existing CTA section. */
  const earlyConsultation = document.querySelector('.early-consultation');
  const cta = document.querySelector('.cta');
  const courses = document.querySelector('#featured-courses');
  if (earlyConsultation) earlyConsultation.remove();
  if (cta) {
    cta.id = 'consultation';
    if (courses && courses.parentNode) {
      courses.parentNode.insertBefore(cta, courses);
    }
  }

  /* Keep the desktop card rhythm at four cards without inventing prices or unavailable products. */
  const addComingSoonCard = function (listSelector, sectionType, title, description) {
    const list = document.querySelector(listSelector);
    if (!list || list.children.length >= 4) return;

    const item = document.createElement('li');
    if (sectionType === 'course') {
      item.innerHTML = '<div class="product-card"><figure class="card-banner"><img src="./assets/images/product-4.png" width="189" height="189" loading="lazy" alt="More Ayurveda learning coming soon"></figure><div class="card-content"><p class="card-category">COMING SOON</p><h3 class="h3 card-title">' + title + '</h3><p class="card-text">' + description + '</p><a href="#consultation" class="btn btn-secondary">Get Notified</a></div></div>';
    } else if (sectionType === 'guide') {
      item.innerHTML = '<div class="blog-card"><figure class="card-banner"><img src="./assets/images/blog-1.jpg" width="451" height="310" loading="lazy" alt="More Ayurveda guides coming soon" class="w-100"></figure><div class="card-content"><p class="card-subtitle">COMING SOON</p><h3 class="h3 card-title">' + title + '</h3><p class="card-text">' + description + '</p><a href="#consultation" class="btn btn-secondary">Get Notified</a></div></div>';
    } else if (sectionType === 'retreat') {
      item.innerHTML = '<div class="offer-card"><figure class="card-banner"><img src="./assets/images/blog-3.jpg" width="450" height="300" loading="lazy" alt="More Ayurveda retreats coming soon"></figure><div class="card-content"><p class="card-subtitle">COMING SOON</p><h3 class="h3 card-title">' + title + '</h3><p class="card-text">' + description + '</p><a href="#consultation" class="btn btn-secondary">Get Notified</a></div></div>';
    }
    list.appendChild(item);
  };

  addComingSoonCard('#featured-courses .grid-list', 'course', 'More Courses Coming Soon', 'New practitioner-reviewed Ayurveda learning experiences are being developed.');
  addComingSoonCard('#books-guides .blog-list', 'guide', 'More Guides Coming Soon', 'New evidence-informed guides and deeper reading are being prepared.');
  addComingSoonCard('#retreats .offer-list', 'retreat', 'More Retreats Coming Soon', 'New vetted Ayurveda, Panchakarma and yoga journeys will be announced here.');
});

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
