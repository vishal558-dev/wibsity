// Initializes the Google Analytics (gtag.js) dataLayer once the external
// gtag.js script (loaded alongside this file in index.html) is present.
// Kept as a first-party file rather than an inline <script> block so the
// site's CSP can keep script-src free of 'unsafe-inline'.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-2TCETV3EDR');
