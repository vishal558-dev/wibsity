import React from 'react';

/**
 * The wibsity identity: a photoreal 3D chrome ribbon mark, supplied as a
 * finished brand board (not vector geometry) and cropped into raster assets
 * — see CLAUDE.md's "Icons and the logo" section for where each crop lives
 * and why there is no SVG source for this mark, unlike the code-drawn
 * geometric mark it replaced.
 *
 * `public/logo-mark.png` is a flat white silhouette crop of the mark alone,
 * alpha-keyed to a transparent background — not the board's rounded-square
 * app-icon composition. That square-icon crop was tried first and dropped:
 * its soft ambient shadow (baked into the supplied render for the "icon on a
 * device" look) survived the crop as a visible grey halo once placed on the
 * site's own flat dark ink ground, and its chrome gradient turned to mush at
 * the ~24px size the header/footer actually render it at. The flat
 * silhouette has neither problem — no shadow to leak, and a single-tone
 * shape stays crisp at small sizes where a gradient doesn't.
 *
 * Because the source mark is wide (roughly 1.76:1, not the old square glyph),
 * `LogoMark` sizes by height only and lets width follow the image's own
 * aspect ratio, rather than forcing it into a square box.
 *
 * The asset is white-on-transparent, which only reads on a dark ground. The
 * header and the mobile nav sheet are both `field-ink`, so that's the
 * default (`tone="ink"`). The footer isn't inverted — it sits on plain
 * paper — where a white mark is nearly invisible; `tone="paper"` CSS-inverts
 * it to a dark mark instead of shipping a second image file. `invert()`
 * only touches color channels, so the transparent background survives it.
 */

export interface LogoMarkProps {
  /** Rendered height in px; width follows the mark's own aspect ratio. */
  size?: number;
  /** Which ground the mark sits on. `ink` (default) for a dark field, like
   *  the header; `paper` inverts the white source to a dark mark for a
   *  plain light ground, like the footer. */
  tone?: 'ink' | 'paper';
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 28, tone = 'ink', className }) => (
  <img
    src="/logo-mark.png"
    alt=""
    aria-hidden="true"
    height={size}
    className={className}
    style={{ height: size, width: 'auto', filter: tone === 'paper' ? 'invert(1)' : undefined }}
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
