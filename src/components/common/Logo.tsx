import React from 'react';

/**
 * The wibsity identity: a photoreal 3D chrome ribbon mark, supplied as a
 * finished brand board (not vector geometry) and cropped into raster assets
 * — see CLAUDE.md's "Icons and the logo" section for where each crop lives
 * and why there is no SVG source for this mark, unlike the code-drawn
 * geometric mark it replaced.
 *
 * `public/logo-mark.png` is the white-square / dark-mark crop, matching the
 * dark ink ground the header and footer both sit on (the previous code-drawn
 * mark rendered the same composition — light square, dark cutout — via
 * `currentColor`; this is that same visual slot, now a raster image).
 */

export interface LogoMarkProps {
  /** Rendered size in px (square). */
  size?: number;
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 28, className }) => (
  <img
    src="/logo-mark.png"
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    className={className}
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
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
