import React from 'react';
import { useCursorField } from '../../hooks/useCursorField';
import { CursorMarks } from './CursorMarks';
import { cn } from '../../utils/cn';

export interface CursorWindowProps {
  /** The default, always-visible layer. */
  children: React.ReactNode;
  /** The layer revealed inside the cursor window. Always `aria-hidden` — this
   *  is a visual echo, not real content, so it must never duplicate anything
   *  a screen reader needs to hear. */
  alt: React.ReactNode;
  windowWidth?: number;
  windowHeight?: number;
  className?: string;
}

/**
 * The reusable cursor-reveal primitive: the pointer becomes a small window
 * moving across `children`, and inside it the `alt` layer shows through
 * instead, as if the surface had a hole cut in it. Built on `useCursorField`
 * (see there for the pointer-tracking mechanics) specifically so it is not
 * hero-only — drop it around any section that wants the same interaction
 * language, passing whatever `alt` layer makes sense there.
 *
 * On the homepage hero, `alt` is the same headline in its pre-set state — see
 * `DraftHeadline` in HomePage.tsx — so revealing it under the cursor *is* the
 * "cursor-driven typography" moment: the reveal mechanism and the typographic
 * effect are the same thing, rather than two separate systems stacked on top
 * of each other.
 *
 * The `alt` layer is always in the DOM (so there is nothing to mount/unmount
 * on hover — no state, no re-render), but it stays permanently hidden behind
 * the fully-opaque `children` layer unless `.cursor-field__mask`'s reveal is
 * actually active — which, per the `@media` guard on that rule, is only ever
 * true on a fine pointer with no reduced-motion preference. On every other
 * input this renders `children` exactly as if `CursorWindow` were not there.
 */
export const CursorWindow: React.FC<CursorWindowProps> = ({
  children,
  alt,
  windowWidth = 170,
  windowHeight = 100,
  className,
}) => {
  const ref = useCursorField<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('cursor-field', className)}
      data-cursor="idle"
      style={{ '--window-w': `${windowWidth}px`, '--window-h': `${windowHeight}px` } as React.CSSProperties}
    >
      <div className="cursor-field__alt" aria-hidden="true">
        {alt}
      </div>
      <div className="cursor-field__base cursor-field__mask">{children}</div>
      <CursorMarks width={windowWidth} height={windowHeight} />
    </div>
  );
};
