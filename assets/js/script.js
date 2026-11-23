'use strict';

/**
 * Bootstrap: load the last known-good core script, then attach mobile UX.
 * This avoids shipping a truncated script while we keep mobile improvements local.
 */
(function bootstrapHerbivedaScript() {
  var CORE = 'https://cdn.jsdelivr.net/gh/herbiveda/hv-organica@a97be912b190a14da01d94bda7a5d42a155d6bf6/assets/js/script.js';

  function loadCore(cb) {
    var s = document.createElement('script');
    s.src = CORE;
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  function ensureMobileUxStyles() {
    if (document.querySelector('link[href*="mobile-ux.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/css/mobile-ux.css';
    document.head.appendChild(link);
  }

  function initializeMobileActionBarScroll() {
    var bars = document.querySelectorAll('.mobile-action-bar, .site-mobile-action-bar');
    if (!bars.length) return;

    var lastY = window.scrollY || 0;
    var ticking = false;
    var threshold = 12;
    var minScroll = 80;

    function applyState(hidden) {
      bars.forEach(function (bar) {
        bar.classList.toggle('is-hidden', hidden);
      });
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
  }

  function startMobile() {
    ensureMobileUxStyles();
    initializeMobileActionBarScroll();
  }

  loadCore(function () {
    // Core may already bind DOMContentLoaded handlers; mobile can run now.
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startMobile, { once: true });
    } else {
      startMobile();
    }
  });
})();
