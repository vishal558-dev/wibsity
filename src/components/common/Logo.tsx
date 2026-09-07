import React from 'react';

/**
 * The wibsity identity, drawn in code rather than shipped as raster art.
 *
 * The previous logo was four PNGs — logo.png / logo-light.png plus a mark in
 * each theme — swapped by `useTheme()` in both Navbar and Footer. Everything
 * here is `currentColor` instead, so there is nothing to swap, nothing to
 * re-export when a colour changes, no oversized-image audit to fail, and the
 * mark stays sharp at every size including 2560px-wide displays.
 *
 * The mark is a geometric lowercase "w" sitting on a rule that runs past the
 * letter on both sides. That rule is the same measure device the whole site is
 * built on (see `.measure` in index.css), so the smallest piece of the brand
 * carries its structural idea. It is drawn with flat caps and mitred joints to
 * match Archivo's mechanical terminals, and it survives being reduced to a
 * 16px monochrome favicon, which is what it was designed against.
 */

export interface LogoMarkProps {
  /** Rendered size in px. The geometry is a 32-unit square. */
  size?: number;
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 28, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <rect width="32" height="32" fill="currentColor" />
    <path
      d="M6 8.5 L10.4 21 L16 12.5 L21.6 21 L26 8.5"
      stroke="var(--color-canvas)"
      strokeWidth="2.9"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      fill="none"
    />
    <path d="M4 25.4 H28" stroke="var(--color-canvas)" strokeWidth="2" />
  </svg>
);

export interface WordmarkProps {
  /** Also renders the mark to the left of the word. */
  withMark?: boolean;
  className?: string;
}

/**
 * Lowercase throughout — the name is a coined, soft word and setting it in
 * caps fought that. Tracked in tightly at weight 600 so it reads as one object
 * rather than seven letters.
 */
export const Wordmark: React.FC<WordmarkProps> = ({ withMark = true, className }) => (
  <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
    {withMark && <LogoMark size={22} className="shrink-0" />}
    <span
      className="font-sans font-semibold lowercase leading-none"
      style={{ letterSpacing: '-0.045em' }}
    >
      wibsity
    </span>
  </span>
);
