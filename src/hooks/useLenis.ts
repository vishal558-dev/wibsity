import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
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

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
