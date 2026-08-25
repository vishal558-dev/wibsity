/**
 * Smoothly scrolls the window to the top using Lenis smooth scroll engine
 * with native window.scrollTo smooth fallback.
 */
export function smoothScrollToTop(duration: number = 0.9): void {
  if (typeof window === 'undefined') return;

  const globalLenis = (window as unknown as {
    __lenis?: {
      scrollTo: (target: number, opts?: { duration?: number; immediate?: boolean }) => void;
      resize?: () => void;
    };
  }).__lenis;

  if (globalLenis) {
    globalLenis.resize?.();
    globalLenis.scrollTo(0, { duration });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

/**
 * Resets the scroll position and re-syncs Lenis bounds.
 */
export function resetScrollPosition(): void {
  if (typeof window === 'undefined') return;

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

  const globalLenis = (window as unknown as {
    __lenis?: {
      scrollTo: (target: number, opts?: { immediate?: boolean }) => void;
      resize?: () => void;
    };
  }).__lenis;

  if (globalLenis) {
    globalLenis.resize?.();
    globalLenis.scrollTo(0, { immediate: true });
  }
}
