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
    if (!p) return;
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
  }

  function openCart() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-overlay]');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
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
    if (filter && filter !== 'all' && categoryMap[filter]) {
      list = list.filter(function (p) { return categoryMap[filter].indexOf(p.slug) !== -1; });
    }

    if (countEl) countEl.textContent = list.length;

    grid.innerHTML = list.map(function (p) {
      return '<article class="product-card" data-slug="' + p.slug + '">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="product-card-img">' +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" width="400" height="400"></a>' +
        '<div class="product-card-body">' +
        '<span class="product-card-badge">' + p.badge + '</span>' +
        '<h2 class="product-card-title"><a href="./product-details.html?product=' + p.slug + '">' + p.name + '</a></h2>' +
        '<p class="product-card-botanical">' + p.botanical + '</p>' +
        '<p class="product-card-text">' + p.short + '</p>' +
        '<div class="product-card-footer">' +
        '<span class="product-card-price">$' + p.price.toFixed(2) + '</span>' +
        '<div class="product-card-actions">' +
        '<a href="./product-details.html?product=' + p.slug + '" class="btn btn-outline">Details</a>' +
        '<button type="button" class="btn btn-primary" data-add="' + p.slug + '">Add</button>' +
        '</div></div></div></article>';
    }).join('');

    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'), 1);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderGrid('all');
    updateCartUI();

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
    close: closeCart
  };
})();
