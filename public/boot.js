/**
 * Everything that has to happen in the document head, in one first-party file.
 *
 * These jobs used to be separate scripts — gtag-init.js and font-styles.js,
 * plus theme-bootstrap.js and spa-redirect.js, both since deleted (the site is
 * light-only now, and the GitHub Pages deep-link shim was for a host this
 * project does not deploy to). They were separate files rather than inline
 * blocks because the production CSP has no 'unsafe-inline' in script-src, and
 * that constraint was quietly costing four blocking requests before the page
 * could get on with itself. One file, same constraint, one request.
 */
(function () {
  /* ---------------------------------------------------------------------
     1. Google Analytics init.
     Only sets up dataLayer and the config call; the gtag.js tag itself is a
     separate async script in index.html and picks these up whenever it loads,
     so the order between them does not matter.
     --------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-2TCETV3EDR');

  /* ---------------------------------------------------------------------
     2. Promote the preloaded font stylesheet.
     The <link rel="preload" as="style"> keeps Google Fonts off the critical
     rendering path; this turns it into a real stylesheet once it arrives.
     Deferred to DOMContentLoaded because this file runs at the top of the
     head, before those links exist. If a preload finished before we attached
     a listener, the window load pass below still promotes it — and
     font-display=swap means text is visible throughout either way.
     --------------------------------------------------------------------- */
  function promoteFonts() {
    var links = document.querySelectorAll('link[data-font-preload]');

    function activate(link) {
      if (link.rel === 'preload') link.rel = 'stylesheet';
    }

    links.forEach(function (link) {
      link.addEventListener('load', function () {
        activate(link);
      }, { once: true });
    });

    window.addEventListener('load', function () {
      links.forEach(activate);
    }, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', promoteFonts, { once: true });
  } else {
    promoteFonts();
  }
}());
