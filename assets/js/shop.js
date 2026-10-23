/**
 * Herbiveda Shop — render grid, filters, cart
 */
(function () {
  'use strict';

  const CART_KEY = 'herbiveda_cart';
  const categoryMap = {
    stress: ['ashwagandha', 'valerian', 'brahmi'],
    inflammation: ['turmeric', 'boswellia'],
    digestive: ['triphala', 'trikatu', 'fenugreek', 'licorice'],
    women: ['shatavari', 'fenugreek'],
    cognitive: ['brahmi', 'ashwagandha']
  };

  const categoryKeys = [
    'herbs-botanicals',
    'polyherbal-formulations',
    'personal-care',
    'ayurvedic-products',
    'natural-foods',
    'accessories'
  ];

  function getCategories(product) {
    if (Array.isArray(product.categories)) return product.categories;
    if (['triphala', 'trikatu'].indexOf(product.slug) !== -1) {
      return ['polyherbal-formulations', 'ayurvedic-products'];
    }
    return ['herbs-botanicals', 'ayurvedic-products'];
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(slug, qty) {
    qty = qty || 1;
    const products = window.HERBIVEDA_PRODUCTS || {};
    const p = products[slug];
    if (!p || typeof p.price !== 'number' || p.purchaseable === false) return;
    const cart = getCart();
    const existing = cart.find(function (i) { return i.slug === slug; });
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ slug: slug, name: p.name, price: p.price, image: p.image, qty: qty });
    }
    saveCart(cart);
    openCart();
  }

  function removeFromCart(slug) {
    saveCart(getCart().filter(function (i) { return i.slug !== slug; }));
  }

  function clearCart() {
    saveCart([]);
  }

  function cartCount() {
    return getCart().reduce(function (s, i) { return s + i.qty; }, 0);
  }

  function cartSubtotal() {
    return getCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function updateCartUI() {
    var badges = document.querySelectorAll('.cart-badge');
    var count = cartCount();
    badges.forEach(function (b) {
      b.textContent = count;
      b.setAttribute('value', count);
    });

    var list = document.querySelector('[data-cart-items]');
    var subEl = document.querySelector('[data-cart-subtotal]');
    if (!list) return;

    var cart = getCart();
    if (!cart.length) {
      list.innerHTML = '<li class="cart-empty">Your cart is empty.<br>Browse certified herbs below.</li>';
    } else {
      list.innerHTML = cart.map(function (item) {
        return '<li class="cart-item">' +
          '<img src="' + item.image + '" alt="' + item.name + '" width="64" height="64" loading="lazy">' +
          '<div class="cart-item-info"><h4>' + item.name + '</h4>' +
          '<p class="cart-item-meta">$' + item.price.toFixed(2) + ' × ' + item.qty + '</p></div>' +
          '<button class="cart-item-remove" data-remove="' + item.slug + '" aria-label="Remove">&times;</button></li>';
      }).join('');
    }
    if (subEl) subEl.textContent = '$' + cartSubtotal().toFixed(2);

    list.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.getAttribute('data-remove'));
      });
    });
    updateCheckoutLinks();
  }

  function openCart() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-overlay]');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    updateCheckoutLinks();
  }

  function closeCart() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-overlay]');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  function renderGrid(filter) {
    var grid = document.querySelector('[data-product-grid]');
    var countEl = document.querySelector('[data-product-count]');
    if (!grid || !window.HERBIVEDA_PRODUCT_LIST) return;

    var list = window.HERBIVEDA_PRODUCT_LIST;
    if (filter && filter !== 'all' && categoryKeys.indexOf(filter) !== -1) {
      list = list.filter(function (p) { return getCategories(p).indexOf(filter) !== -1; });
    } else if (filter && filter !== 'all' && categoryMap[filter]) {
      list = list.filter(function (p) { return categoryMap[filter].indexOf(p.slug) !== -1; });
    }

    if (countEl) countEl.textContent = list.length;

    if (!list.length) {
      var requestedCategory = filter === 'personal-care' ? 'Soaps & Personal Care' :
        filter === 'accessories' ? 'Accessories' :
        filter === 'natural-foods' ? 'Natural Foods & Honey' : 'this category';
      grid.innerHTML = '<div class="shop-empty-state"><h3>More coming soon</h3>' +
        '<p>There are no items listed in ' + requestedCategory + ' yet. Contact us to ask about upcoming availability.</p>' +
        '<a href="./contact.html?interest=products&amp;source=shop-category&amp;topic=' + encodeURIComponent(requestedCategory) + '" class="btn btn-outline">Enquire about this category</a></div>';
      return;
    }

    grid.innerHTML = list.map(function (p) {
      var hasPrice = typeof p.price === 'number' && Number.isFinite(p.price) && p.purchaseable !== false;
      var priceMarkup = hasPrice ? ('$' + p.price.toFixed(2)) : 'Price on enquiry';
      var actionMarkup;
      if (hasPrice) {
        actionMarkup = '<button type="button" class="btn btn-primary" data-add="' + p.slug + '">Add</button>';
      } else {
        actionMarkup = '<a href="./contact.html?interest=products&amp;source=shop-product&amp;topic=' + encodeURIComponent(p.name) + '" class="btn btn-primary">Enquire</a>';
      }

      return '<article class="product-card" data-slug="' + p.slug + '">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="product-card-img">' +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" width="400" height="400"></a>' +
        '<div class="product-card-body">' +
        '<span class="product-card-badge">' + p.badge + '</span>' +
        '<h2 class="product-card-title"><a href="./product-details.html?product=' + p.slug + '">' + p.name + '</a></h2>' +
        '<p class="product-card-botanical">' + p.botanical + '</p>' +
        '<p class="product-card-text">' + p.short + '</p>' +
        '<div class="product-card-footer">' +
        '<span class="product-card-price">' + priceMarkup + '</span>' +
        '<div class="product-card-actions">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="btn btn-outline">Details</a>' +
        actionMarkup +
        '</div></div></div></article>';
    }).join('');

    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'), 1);
      });
    });
  }

  function buildContactUrl() {
    var cart = getCart();
    var base = './contact.html?interest=consultation&source=cart';
    if (!cart.length) return base;
    var items = cart.map(function (i) {
      return i.name + (i.qty > 1 ? ' x' + i.qty : '');
    }).join(', ');
    var slugs = cart.map(function (i) { return i.slug + ':' + i.qty; }).join(',');
    return base + '&topic=' + encodeURIComponent('Cart: ' + items) +
      '&cart=' + encodeURIComponent(slugs) +
      '&message=' + encodeURIComponent('I would like practitioner guidance on these cart items before purchasing:\n' + items);
  }

  function updateCheckoutLinks() {
    document.querySelectorAll('.cart-checkout-btn').forEach(function (a) {
      a.href = buildContactUrl();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderGrid('all');
    updateCartUI();
    updateCheckoutLinks();

    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderGrid(btn.getAttribute('data-filter'));
      });
    });

    document.querySelectorAll('[data-cart-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var drawer = document.querySelector('[data-cart-drawer]');
        if (drawer && drawer.classList.contains('active')) closeCart();
        else openCart();
      });
    });

    var overlay = document.querySelector('[data-cart-overlay]');
    if (overlay) overlay.addEventListener('click', closeCart);

    var clearBtn = document.querySelector('[data-cart-clear]');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
  });

  window.HerbivedaCart = {
    add: addToCart,
    remove: removeFromCart,
    clear: clearCart,
    get: getCart,
    updateUI: updateCartUI,
    open: openCart,
    close: closeCart,
    buildContactUrl: buildContactUrl
  };
})();
 + p.price.toFixed(2) : 'Price on enquiry';
      var actionMarkup = hasPrice
        ? '<button type="button" class="btn btn-primary" data-add="' + p.slug + '">Add</button>'
        : '<a href="./contact.html?interest=products&source=shop-product&topic=' + encodeURIComponent(p.name) + '" class="btn btn-primary">Enquire</a>';

      return '<article class="product-card" data-slug="' + p.slug + '">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="product-card-img">' +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" width="400" height="400"></a>' +
        '<div class="product-card-body">' +
        '<span class="product-card-badge">' + p.badge + '</span>' +
        '<h2 class="product-card-title"><a href="./product-details.html?product=' + p.slug + '">' + p.name + '</a></h2>' +
        '<p class="product-card-botanical">' + p.botanical + '</p>' +
        '<p class="product-card-text">' + p.short + '</p>' +
        '<div class="product-card-footer">' +
        '<span class="product-card-price">' + priceMarkup + '</span>' +
        '<div class="product-card-actions">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="btn btn-outline">Details</a>' +
        actionMarkup +
        '</div></div></div></article>';
    }).join('');

    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'), 1);
      });
    });
  }

  function buildContactUrl() {
    var cart = getCart();
    var base = './contact.html?interest=consultation&source=cart';
    if (!cart.length) return base;
    var items = cart.map(function (i) {
      return i.name + (i.qty > 1 ? ' x' + i.qty : '');
    }).join(', ');
    var slugs = cart.map(function (i) { return i.slug + ':' + i.qty; }).join(',');
    return base + '&topic=' + encodeURIComponent('Cart: ' + items) +
      '&cart=' + encodeURIComponent(slugs) +
      '&message=' + encodeURIComponent('I would like practitioner guidance on these cart items before purchasing:\n' + items);
  }

  function updateCheckoutLinks() {
    document.querySelectorAll('.cart-checkout-btn').forEach(function (a) {
      a.href = buildContactUrl();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderGrid('all');
    updateCartUI();
    updateCheckoutLinks();

    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderGrid(btn.getAttribute('data-filter'));
      });
    });

    document.querySelectorAll('[data-cart-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var drawer = document.querySelector('[data-cart-drawer]');
        if (drawer && drawer.classList.contains('active')) closeCart();
        else openCart();
      });
    });

    var overlay = document.querySelector('[data-cart-overlay]');
    if (overlay) overlay.addEventListener('click', closeCart);

    var clearBtn = document.querySelector('[data-cart-clear]');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
  });

  window.HerbivedaCart = {
    add: addToCart,
    remove: removeFromCart,
    clear: clearCart,
    get: getCart,
    updateUI: updateCartUI,
    open: openCart,
    close: closeCart,
    buildContactUrl: buildContactUrl
  };
})();
