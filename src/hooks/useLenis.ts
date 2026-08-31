import { useEffect, useRef, useCallback } from 'react';
import type Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip smooth-scroll entirely on reduced-motion and on touch devices —
    // mobile browsers already give native momentum scrolling, and touch
    // input doesn't produce the wheel deltas Lenis is built to smooth, so
    // running it there is pure CPU/battery overhead with no UX benefit.
    const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(pointer: coarse)').matches
      : false;
    if (reducedMotion || isCoarsePointer || typeof window === 'undefined') {
      return;
    }

    // Dynamically imported so Lenis never ships in the eager entry bundle —
    // it's a scroll-feel enhancement, not something the hero needs to paint,
    // and this branch already only runs for fine-pointer, motion-OK devices.
    let cancelled = false;
    let rafId: number;

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;

      const lenis = new LenisCtor({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, [reducedMotion]);

  const scrollTo = useCallback((target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      // Native fallback
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  return { getLenis, scrollTo };
}
