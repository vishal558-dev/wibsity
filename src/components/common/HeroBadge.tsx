import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

const RING_TEXT = 'HAND-BUILT SITES';

// Circle geometry, in the SVG's own 0-200 user-unit space.
const R = 80;
const CIRCUMFERENCE = 2 * Math.PI * R;
// A small reserved gap at 12 o'clock for the tick mark — the text runs the
// rest of the way around, exactly, via `textLength` below.
const GAP = 22;
const TEXT_LENGTH = CIRCUMFERENCE - GAP;
const START_OFFSET = `${((GAP / 2) / CIRCUMFERENCE) * 100}%`;

/**
 * The hero's spinning ring badge — a second, explicit continuous-loop
 * override alongside the rotating headline (see "The hero loop overrides" in
 * CLAUDE.md's Motion section).
 *
 * Only the ring (the circle, the text, the tick mark) spins — `LogoMark` sits
 * in its own non-rotating, absolutely-centered layer on top, so the mark
 * itself stays upright while the ring turns behind it. The ring has to be a
 * separate SVG rather than being drawn into the mark's own geometry: the mark
 * is a raster PNG with no vector source (see Logo.tsx).
 *
 * The path is TWO half-circle arcs (top→bottom, bottom→top-minus-epsilon),
 * not one near-360° arc run twice. A single `A r r 0 1 1 …` arc back to
 * almost its own start point already traces nearly a full circle on its own
 * (the "large-arc" side), so writing that twice — the first version of this
 * component's mistake — makes the path's total length roughly DOUBLE the
 * true circumference, silently breaking every `startOffset` percentage
 * (they were computed assuming one circumference, not two) and bunching both
 * text copies into one arc instead of spacing them apart.
 *
 * The ring text is a single loop (not two repeats): at this size, two
 * legible copies plus real spacing between words don't both fit around the
 * circumference. One loop, with `textLength` + `lengthAdjust="spacing"`
 * stretching it to fill the path's length exactly (minus one small reserved
 * gap for the tick mark), is what makes the text read as genuinely,
 * precisely circular — matching a stamp or seal's single wrap rather than
 * eyeballing repeat counts and hoping they fit.
 */
export const HeroBadge: React.FC = () => (
  <Link to="/contact" aria-label="Start a project" className="hero-badge hidden lg:block">
    <svg className="hero-badge__ring" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="hero-badge-path" d={`M 100 ${100 - R} A ${R} ${R} 0 1 1 100 ${100 + R} A ${R} ${R} 0 1 1 100 ${100 - R + 0.01}`} />
      </defs>
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
      <line
        x1="100"
        y1={100 - R - 8}
        x2="100"
        y2={100 - R}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="butt"
      />
      <text className="hero-badge__text">
        <textPath
          href="#hero-badge-path"
          startOffset={START_OFFSET}
          textLength={TEXT_LENGTH}
          lengthAdjust="spacing"
        >
          {RING_TEXT}
        </textPath>
      </text>
    </svg>
    <span className="hero-badge__mark">
      <LogoMark size={60} tone="paper" />
    </span>
  </Link>
);
