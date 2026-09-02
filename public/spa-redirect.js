(function (location) {
  if (location.search[1] !== '/') return;

  var decoded = location.search.slice(1).split('&').map(function (segment) {
    return segment.replace(/~and~/g, '&');
  }).join('?');

  window.history.replaceState(null, '', location.pathname.slice(0, -1) + decoded + location.hash);
}(window.location));
