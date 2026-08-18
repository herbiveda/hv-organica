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
  /* Load the mobile/tablet responsive overrides after all legacy CSS. */
  if (!document.querySelector('link[data-responsive-fixes]')) {
    const responsiveStyles = document.createElement('link');
    responsiveStyles.rel = 'stylesheet';
    responsiveStyles.href = './assets/css/responsive-fixes.css';
    responsiveStyles.dataset.responsiveFixes = 'true';
    document.head.appendChild(responsiveStyles);
  }

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

  /**
   * Scroll-stacked Learn / Heal / Retreat pillar cards.
   */
  const pillarSection = document.querySelector('#pillars');
  const pillarList = pillarSection ? pillarSection.querySelector('.pillar-list') : null;

  if (pillarSection && pillarList && pillarList.children.length === 3 && !pillarSection.dataset.stackInitialized) {
    const stackWrapper = document.createElement('div');
    stackWrapper.className = 'stack-wrapper';
    stackWrapper.setAttribute('aria-label', 'Learn, Heal and Retreat');

    Array.from(pillarList.children).forEach(function (item, index) {
      const stackCard = document.createElement('div');
      stackCard.className = 'stack-card';
      stackCard.dataset.stack = String(index + 1);
      stackCard.appendChild(item.firstElementChild);
      stackWrapper.appendChild(stackCard);
    });

    pillarList.replaceWith(stackWrapper);
    pillarSection.classList.add('stacked-pillars');
    pillarSection.dataset.stackInitialized = 'true';

    const stackCards = stackWrapper.querySelectorAll('.stack-card');
    if ('IntersectionObserver' in window) {
      const stackObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            entry.target.style.transform = 'scale(1) translateY(0)';
            entry.target.style.opacity = '1';
          } else {
            entry.target.classList.remove('is-active');
            entry.target.style.transform = 'scale(0.94) translateY(28px)';
            entry.target.style.opacity = '0.72';
          }
        });
      }, {
        threshold: 0.4,
        rootMargin: '-8% 0px -8% 0px'
      });

      stackCards.forEach(function (card) {
        stackObserver.observe(card);
      });
    } else {
      stackCards.forEach(function (card) {
        card.classList.add('is-active');
      });
    }
  }

  /**
   * Horizontal carousels for:
   * #featured-courses, #books-guides, #heal, #retreats
   */
  (function initHerbivedaCarousels() {
    const sections = ['#featured-courses', '#books-guides', '#heal', '#retreats'];

    sections.forEach(function (selector) {
      const section = document.querySelector(selector);
      if (!section) return;

      const track = section.querySelector('.has-scrollbar');
      if (!track || track.dataset.carouselReady === 'true') return;
      track.dataset.carouselReady = 'true';

      const nav = document.createElement('div');
      nav.className = 'carousel-nav';
      nav.innerHTML =
        '<button type="button" class="carousel-btn prev" aria-label="Previous">' +
        '<ion-icon name="chevron-back-outline"></ion-icon></button>' +
        '<button type="button" class="carousel-btn next" aria-label="Next">' +
        '<ion-icon name="chevron-forward-outline"></ion-icon></button>';

      track.parentNode.insertBefore(nav, track);

      const prevBtn = nav.querySelector('.prev');
      const nextBtn = nav.querySelector('.next');

      const getScrollAmount = function () {
        const card = track.querySelector('li');
        if (!card) return 300;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap) || 20;
        return card.offsetWidth + gap;
      };

      const updateButtons = function () {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = track.scrollLeft <= 8;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 8;
      };

      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });

      track.addEventListener('scroll', updateButtons, { passive: true });
      window.addEventListener('resize', updateButtons);
      updateButtons();

      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener('mousedown', function (e) {
        isDown = true;
        track.classList.add('grabbing');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener('mouseleave', function () {
        isDown = false;
        track.classList.remove('grabbing');
      });

      track.addEventListener('mouseup', function () {
        isDown = false;
        track.classList.remove('grabbing');
      });

      track.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.4;
        track.scrollLeft = scrollLeft - walk;
      });
    });
  })();
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
