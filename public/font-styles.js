(function () {
  var preloadedStyles = document.querySelectorAll('link[data-font-preload]');

  function activate(link) {
    if (link.rel === 'preload') link.rel = 'stylesheet';
  }

  preloadedStyles.forEach(function (link) {
    link.addEventListener('load', function () {
      activate(link);
    }, { once: true });
  });

  // Covers an already-complete preload from the HTTP cache without making
  // either font stylesheet render-blocking on the first paint.
  window.addEventListener('load', function () {
    preloadedStyles.forEach(activate);
  }, { once: true });
}());
