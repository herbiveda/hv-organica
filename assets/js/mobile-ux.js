/** Mobile action bar: hide on scroll-down, show on scroll-up */
(function initializeMobileActionBarScroll() {
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

    if (y <= minScroll) {
      applyState(false);
    } else if (delta > threshold) {
      applyState(true);
    } else if (delta < -threshold) {
      applyState(false);
    }

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
