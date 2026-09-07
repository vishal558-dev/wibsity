import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Puts a new route at the top of the page.
 *
 * The previous version fought itself: it reset the scroll position
 * synchronously, then scheduled a *smooth* animated scroll to the same place a
 * frame later, then ran a third smooth scroll on reload — all routed through
 * Lenis. With Lenis gone this is one instant jump in a layout effect, before
 * the browser paints the new route, which is both correct and free.
 *
 * A hash in the URL is left alone so in-page anchors still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
