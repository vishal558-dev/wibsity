import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

const RING_TEXT = 'HAND-BUILT SITES';

/**
 * The hero's spinning ring badge — a second, explicit continuous-loop
 * override alongside the rotating headline (see "The hero loop overrides" in
 * CLAUDE.md's Motion section).
 *
 * Only the ring (the circle, the text, the two tick marks) spins — `LogoMark`
 * sits in its own non-rotating, absolutely-centered layer on top, so the mark
 * itself stays upright while the ring turns behind it. The ring has to be a
 * separate SVG rather than being drawn into the mark's own geometry: the mark
 * is a raster PNG with no vector source (see Logo.tsx).
 *
 * The two accent-coloured tick marks at 12 and 6 o'clock are the seam/repeat
 * device — reusing `.measure`'s own tick language instead of a middle-dot
 * separator, which is one of the most common AI-generated-design tells.
 *
 * `tone="paper"` (not LogoMark's default `tone="ink"`) is required: the hero
 * sits on `data-field="paper"`, and the white raster mark is nearly invisible
 * there without the CSS invert — see Logo.tsx's own footer note.
 */
export const HeroBadge: React.FC = () => (
  <Link to="/contact" aria-label="Start a project" className="hero-badge hidden lg:block">
    <svg className="hero-badge__ring" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="hero-badge-path" d="M 100 24 A 76 76 0 1 1 99.99 24 A 76 76 0 1 1 100.01 24" />
      </defs>
      <circle cx="100" cy="100" r="76" fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
      <line x1="100" y1="16" x2="100" y2="24" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="butt" />
      <line x1="100" y1="176" x2="100" y2="184" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="butt" />
      <text className="hero-badge__text">
        <textPath href="#hero-badge-path" startOffset="2%">
          {RING_TEXT}
        </textPath>
      </text>
      <text className="hero-badge__text">
        <textPath href="#hero-badge-path" startOffset="52%">
          {RING_TEXT}
        </textPath>
      </text>
    </svg>
    <span className="hero-badge__mark">
      <LogoMark size={44} tone="paper" />
    </span>
  </Link>
);
