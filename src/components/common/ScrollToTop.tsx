import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollToTop, resetScrollPosition } from '../../utils/scroll';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration on reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // If page reloaded with scroll offset, smoothly glide to top
    if (typeof window !== 'undefined' && window.scrollY > 0) {
      const timer = setTimeout(() => {
        smoothScrollToTop(1.0);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Reset immediately for new route
    resetScrollPosition();

    // Smoothly ensure alignment once page transition settles
    const rafId = requestAnimationFrame(() => {
      smoothScrollToTop(0.7);
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
