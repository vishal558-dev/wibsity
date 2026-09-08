import React, { useEffect, useRef } from 'react';

/**
 * A soft accent-tinted circle that trails the pointer, sitewide.
 *
 * This exact idea — a cursor-following element — was built and deliberately
 * removed three times over the 2026 redesign (`ConstructionGrid`,
 * `CursorWindow`/`CursorMarks`, `useCursorField`), each time because it
 * competed with the content it sat over. This version is a considered fourth
 * attempt, added on direct instruction after that history was raised
 * explicitly: it stays low-opacity, sits below interactive chrome
 * (`z-index: 30`, under the header's 40), never intercepts a click
 * (`pointer-events: none`), and is skipped entirely for touch input and
 * reduced motion.
 *
 * The trailing feel comes from a CSS `transition` on `transform`, not from
 * throttling the writes — the same fix this codebase already leans on for
 * smooth JS-driven motion (see the `--hero-set` scroll handler in
 * HomePage.tsx). `transform` is a plain property here, not a registered
 * custom one: it is written and read on the same element, so it needs no
 * `@property` to interpolate.
 */
export const CursorGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let x = -9999;
    let y = -9999;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
};
