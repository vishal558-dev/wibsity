import { useEffect, useRef } from 'react';

/**
 * Generic, reusable pointer-position tracker for cursor-driven interactions.
 *
 * Attach the returned ref to any container. While a fine pointer moves over
 * it, `--cx` / `--cy` (px, relative to the container's own box) are written
 * straight to `element.style` — never through React state, so a fast mouse
 * costs one style write per animation frame, not one per event. `data-cursor`
 * flips between `"idle"` and `"live"` on the same element so consuming CSS can
 * gate on hover state without a second listener.
 *
 * This is the one interaction primitive the homepage's cursor-driven moments
 * are built on — see `CursorWindow`, which layers a mask-reveal on top of it —
 * and it is deliberately generic rather than hero-specific: attach it to any
 * section that wants the same interaction language later.
 *
 * It does nothing at all on a coarse pointer or under reduced motion. There is
 * no cursor to track in either case, so no listener is ever attached; the
 * consuming CSS is expected to have its own matching `@media` gate rather than
 * rely on this alone (see `.cursor-field__mask` in index.css), the same
 * belt-and-braces pattern the rest of this codebase uses.
 */
export function useCursorField<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--cx', `${x}px`);
      el.style.setProperty('--cy', `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      x = e.clientX - box.left;
      y = e.clientY - box.top;
      el.dataset.cursor = 'live';
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      el.dataset.cursor = 'idle';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
