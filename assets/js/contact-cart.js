/**
 * Prefill Herbiveda contact form from shop cart (localStorage or ?cart= / ?message=)
 */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var params = new URLSearchParams(window.location.search);
    var cartParam = (params.get('cart') || '').trim();
    var messageParam = (params.get('message') || '').trim();
    var topicParam = (params.get('topic') || params.get('specific') || '').trim();
    var sourceParam = (params.get('source') || '').toLowerCase().trim();

    function readCart() {
      try { return JSON.parse(localStorage.getItem('herbiveda_cart') || '[]'); } catch (e) { return []; }
    }
    function parseCart(str) {
      if (!str) return [];
      return str.split(',').map(function (part) {
        var bits = part.split(':');
        return { slug: (bits[0] || '').trim(), qty: parseInt(bits[1], 10) || 1 };
      }).filter(function (i) { return i.slug; });
    }

    var fromStore = readCart();
    var fromUrl = parseCart(cartParam);
    var active = fromUrl.length ? fromUrl : fromStore;
    if (fromStore.length && fromUrl.length) {
      var bySlug = {};
      fromStore.forEach(function (i) { bySlug[i.slug] = i; });
      active = fromUrl.map(function (u) {
        var s = bySlug[u.slug];
        return s ? { slug: u.slug, name: s.name, price: s.price, qty: u.qty } : u;
      });
    } else if (fromStore.length) {
      active = fromStore;
    }

    // Only run when cart context is present
    if (!active.length && !messageParam && sourceParam !== 'cart') return;

    var form = document.getElementById('enquiry-form');
    if (!form) return;

    function ensureHidden(name, id) {
      var el = document.getElementById(id);
      if (el) return el;
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = name;
      el.id = id;
      form.appendChild(el);
      return el;
    }
    var cartItemsField = ensureHidden('cart_items', 'cart-items');
    var cartTotalField = ensureHidden('cart_total', 'cart-total');
    var leadSource = document.getElementById('lead-source');
    var specific = document.getElementById('specific');
    var message = document.getElementById('message');

    if (active.length) {
      var lines = active.map(function (i) {
        return (i.name || i.slug) + (i.qty > 1 ? ' × ' + i.qty : '');
      });
      var summary = lines.join(', ');
      var total = active.reduce(function (s, i) { return s + ((i.price || 0) * (i.qty || 1)); }, 0);
      cartItemsField.value = summary;
      if (total) cartTotalField.value = '$' + total.toFixed(2);

      var consultRadio = document.querySelector('input[name="interest"][value="Consultation"]');
      if (consultRadio) {
        consultRadio.checked = true;
        consultRadio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (leadSource) leadSource.value = 'cart';
      if (specific) specific.value = topicParam || ('Cart items: ' + summary);
      if (message) {
        var msg = messageParam || ('I would like practitioner guidance on these cart items before purchasing:\n' + lines.join('\n'));
        if (total) msg += '\nEstimated subtotal: $' + total.toFixed(2);
        message.value = msg;
      }
    } else if (messageParam && message) {
      message.value = messageParam;
      if (specific && topicParam) specific.value = topicParam;
      if (leadSource && sourceParam) leadSource.value = sourceParam;
    }
  });
})();
