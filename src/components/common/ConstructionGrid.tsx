import React, { useEffect, useRef } from 'react';

/**
 * The hero's cursor moment: looking through the finished page at the file
 * underneath.
 *
 * The headline says every site starts as an empty file, so moving the pointer
 * across the hero reveals the column guides and baseline grid the type is
 * actually set on — inside a soft circular mask that follows the cursor, with
 * a hairline crosshair at its centre. It is the one place on the site where
 * the construction is visible, and it exists because it says something true
 * about the work rather than because a hero needed decorating.
 *
 * All the drawing is CSS (see `.construction` in index.css): two repeating
 * gradients under a radial mask. This component only supplies coordinates.
 *
 * Three things keep it cheap:
 *  - The handler is rAF-batched, so a 1000Hz mouse still costs one style write
 *    per frame rather than one per event.
 *  - It listens on the hero element, not the window, so it stops mattering the
 *    moment the pointer leaves.
 *  - Coordinates are written straight to `element.style`, not through React
 *    state — a re-render per mouse move would be absurd.
 *
 * It renders nothing at all for coarse pointers (no cursor to follow) or when
 * the visitor has asked for reduced motion.
 */
export const ConstructionGrid: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    // The hero section is the overlay's offset parent, so pointer coordinates
    // are taken relative to it.
    const host = el.parentElement;
    if (!host) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--cx', `${x}px`);
      el.style.setProperty('--cy', `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      // The first real pointer move ends the introductory sweep and takes
      // over: `data-live="true"` drops the keyframe selector entirely, so the
      // inline coordinates below become the only thing positioning the mask.
      const box = host.getBoundingClientRect();
      x = e.clientX - box.left;
      y = e.clientY - box.top;
      el.dataset.live = 'true';
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      el.dataset.live = 'false';
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Starts "idle", which is the state the introductory sweep animates. The
  // pointer handler above switches it to "true" on first move, and "false" when
  // the pointer leaves — neither of which replays the sweep.
  return <div ref={ref} className="construction" data-live="idle" aria-hidden="true" />;
};
