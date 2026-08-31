import React from 'react';
import { cn } from '../../utils/cn';
import { readableOn } from '../../utils/contrast';
import type {
  ClinicPreview,
  ConceptPreview as ConceptPreviewData,
  MonographPreview,
  StorefrontPreview,
} from '../../types';

/**
 * Miniature renderings of each concept, shared by /projects and each case study.
 *
 * This is a component rather than markup inlined into a page (which is the
 * convention everywhere else in this codebase) specifically because two pages
 * render the same three mocks at two different sizes — the showcase bands on
 * ProjectsPage and the viewport simulator on CaseStudyPage.
 *
 * The three archetypes are intentionally NOT variations on a shared layout.
 * They differ in composition, information density, and type scale, because a
 * studio showing three concepts that all resolve to the same rectangle is
 * showing one concept three times. Each takes a different data shape (see the
 * ConceptPreview union in types/index.ts), and the switch at the bottom is
 * exhaustive, so a fourth archetype cannot silently inherit another's layout.
 *
 * Two rules hold across all three:
 *  - Every piece of text sits on a semantic token (`text-fg`, `text-fg-muted`),
 *    so the mocks re-theme with the site.
 *  - The mocked business's `accent` is only ever a FILL or a RULE, with
 *    `readableOn()` choosing the text over it. It is never a text colour on the
 *    page canvas — see the note on ConceptPreviewBase in types/index.ts.
 */

type Scale = 'card' | 'viewport';
type Device = 'desktop' | 'mobile';

interface ConceptPreviewProps {
  preview: ConceptPreviewData;
  /** Card is the /projects showcase band; viewport is the case study simulator. */
  scale?: Scale;
  device?: Device;
  /** Used for the mock's accessible description, e.g. "Surgical Practice". */
  title: string;
  className?: string;
}

/**
 * Type and spacing steps per scale. The two scales are not a uniform multiplier
 * of each other — the card drops secondary copy density so the composition
 * still reads at a glance rather than becoming an unreadable shrink.
 */
const T = {
  card: {
    pad: 'p-3.5 sm:p-5',
    display: 'text-[22px] sm:text-[34px]',
    headline: 'text-[15px] sm:text-[18px]',
    sub: 'text-[9px] sm:text-[10px]',
    body: 'text-[9px] sm:text-[10px]',
    label: 'text-[8px] sm:text-[8px]',
    gap: 'gap-2.5 sm:gap-3',
  },
  viewport: {
    pad: 'p-5 sm:p-8',
    display: 'text-[32px] sm:text-[56px]',
    headline: 'text-[20px] sm:text-[27px]',
    body: 'text-[11px] sm:text-[12px]',
    sub: 'text-[11px] sm:text-[13px]',
    label: 'text-[9px] sm:text-[10px]',
    gap: 'gap-4 sm:gap-6',
  },
} as const;

/** Translucent wash of the mocked brand's colour, for tonal fills and rules. */
const wash = (accent: string, pct: number) =>
  `color-mix(in srgb, ${accent} ${pct}%, transparent)`;

/* ------------------------------------------------------------------ */
/* 01 — Clinic: low density, wide horizontal rhythm, pinned booking    */
/* ------------------------------------------------------------------ */

function ClinicMock({ p, s, device }: { p: ClinicPreview; s: Scale; device: Device }) {
  const t = T[s];
  const ink = readableOn(p.accent);

  if (device === 'mobile') {
    return (
      <div className="flex flex-col h-full">
        <div className={cn('flex-1 space-y-4', t.pad)}>
          <div className="flex items-center justify-between border-b border-border-hairline pb-2.5">
            <span className="font-sans text-[10px] font-bold text-fg">{p.wordmark}</span>
            <span className="font-sans text-[8px] font-semibold uppercase tracking-wider text-fg-faint">
              Menu
            </span>
          </div>

          <h4 className="font-sans text-[15px] font-bold text-fg leading-[1.25] tracking-tight">
            {p.mobileHeadline}
          </h4>

          <div
            className="h-16 border border-border-hairline bg-canvas-elevated"
            style={{ background: `linear-gradient(150deg, ${wash(p.accent, 26)} 0%, transparent 70%)` }}
          />

          <div className="space-y-2.5 pt-0.5">
            {p.departments.map((d) => (
              <div key={d.code} className="border-b border-border-hairline pb-2">
                <span className="font-mono text-[8px] text-fg-faint block mb-1">DEPT {d.code}</span>
                <span className="font-sans text-[11px] font-semibold text-fg leading-snug block">
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned booking bar — the archetype's defining pattern. */}
        <div className="p-3 border-t border-border-hairline bg-canvas-subtle">
          <div
            className="w-full text-center font-sans text-[10px] font-bold py-2.5"
            style={{ backgroundColor: p.accent, color: ink }}
          >
            {p.mobileCta}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', t.pad)}>
      {/* Roomy nav — text links, one filled action, nothing crowded. */}
      <div className="flex items-center justify-between border-b border-border-hairline pb-3 sm:pb-4">
        <span className={cn('font-sans font-bold text-fg tracking-tight', t.body)}>{p.wordmark}</span>
        <div className="flex items-center gap-3 sm:gap-5">
          {p.nav.map((n) => (
            <span key={n} className={cn('font-sans font-medium text-fg-muted hidden sm:inline', t.label)}>
              {n}
            </span>
          ))}
          <span
            className={cn('font-sans font-bold px-2.5 py-1', t.label)}
            style={{ backgroundColor: p.accent, color: ink }}
          >
            {p.bookingCta}
          </span>
        </div>
      </div>

      {/* Hero: type left, tonal plate right. Generous vertical space. */}
      <div className={cn('grid grid-cols-5 items-center py-5 sm:py-8', t.gap)}>
        <div className="col-span-3 space-y-2 sm:space-y-3">
          <h4
            className={cn(
              'font-sans font-bold text-fg leading-[1.15] tracking-tight',
              t.headline
            )}
          >
            {p.headline}
          </h4>
          <p className={cn('text-fg-muted leading-relaxed font-sans', t.sub)}>{p.standfirst}</p>
        </div>
        <div
          className="col-span-2 border border-border-hairline bg-canvas-elevated h-20 sm:h-32"
          style={{ background: `linear-gradient(155deg, ${wash(p.accent, 30)} 0%, transparent 68%)` }}
        />
      </div>

      {/* Credentials as quiet microtext, not badges. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-3 sm:pb-4 border-b border-border-hairline">
        {p.trustMarkers.map((marker) => (
          <span key={marker} className={cn('font-sans text-fg-subtle flex items-center gap-1.5', t.label)}>
            <span
              className="w-1 h-1 shrink-0"
              style={{ backgroundColor: p.accent }}
              aria-hidden="true"
            />
            {marker}
          </span>
        ))}
      </div>

      {/* Full-width department rows separated by hairlines — not boxed cards. */}
      <div className="flex-1">
        {p.departments.map((d) => (
          <div
            key={d.code}
            className="flex items-baseline gap-3 sm:gap-5 py-2.5 sm:py-4 border-b border-border-hairline last:border-b-0"
          >
            <span className={cn('font-mono text-fg-faint shrink-0 tabular-nums', t.label)}>
              {d.code}
            </span>
            <span className={cn('font-sans font-semibold text-fg shrink-0', t.body)}>{d.name}</span>
            <span className={cn('font-sans text-fg-muted ml-auto text-right hidden sm:block', t.label)}>
              {d.blurb}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Monograph: type-dominant, asymmetric, achromatic, no nav       */
/* ------------------------------------------------------------------ */

function MonographMock({ p, s, device }: { p: MonographPreview; s: Scale; device: Device }) {
  const t = T[s];

  if (device === 'mobile') {
    return (
      <div className={cn('flex flex-col h-full', t.pad)}>
        <div className="flex items-center justify-between pb-2.5">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-fg-muted">
            {p.wordmark}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-fg-faint">Index</span>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: p.accent }} />

        <h4 className="font-sans text-[22px] font-bold text-fg leading-[0.98] tracking-tightest mt-4 mb-4">
          {p.displayLine}
        </h4>

        {/* Full-bleed tall plate — the mobile monograph leads with image, not list. */}
        <div
          className="flex-1 min-h-20 border border-border-hairline bg-canvas-elevated relative"
          style={{ background: `linear-gradient(180deg, ${wash(p.accent, 70)} 0%, ${wash(p.accent, 14)} 80%)` }}
        >
          <div className="absolute left-0 right-0 bottom-5 h-px bg-border-hover" />
        </div>

        <div className="pt-3 space-y-1.5">
          {p.indexEntries.map((e) => (
            <div key={e.no} className="flex items-baseline gap-2 font-mono text-[8px] tabular-nums">
              <span className="text-fg-faint">{e.no}</span>
              <span className="text-fg font-sans text-[10px] font-medium truncate">{e.project}</span>
              <span className="text-fg-faint ml-auto">{e.year}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', t.pad)}>
      {/* An editorial masthead rule, not a navigation bar. */}
      <div className="flex items-baseline justify-between pb-2">
        <span className={cn('font-mono uppercase tracking-[0.24em] text-fg-muted', t.label)}>
          {p.discipline}
        </span>
        <span className={cn('font-mono uppercase tracking-[0.24em] text-fg-faint', t.label)}>
          {p.wordmark}
        </span>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: p.accent }} />

      {/* Asymmetric body: oversized type overruns the plate column. */}
      <div className="flex-1 grid grid-cols-12 gap-3 sm:gap-5 pt-5 sm:pt-8">
        <div className="col-span-7 flex flex-col">
          <h4
            className={cn(
              'font-sans font-bold text-fg leading-[0.94] tracking-tightest',
              t.display
            )}
          >
            {p.displayLine}
          </h4>
          {/* Short, wide plate sitting low and left, deliberately unequal to the tall one.
              The monograph washes run much stronger than the other two archetypes':
              its accent is a near-neutral graphite, so at the 30-ish percent that
              reads clearly for sky or terracotta these plates collapse into the
              dark canvas and look like empty boxes rather than image masses. */}
          <div
            className="mt-auto h-10 sm:h-16 w-[86%] border border-border-hairline bg-canvas-elevated relative"
            style={{ background: `linear-gradient(160deg, ${wash(p.accent, 62)} 0%, ${wash(p.accent, 12)} 78%)` }}
          >
            <div className="absolute left-0 right-0 bottom-3 h-px bg-border-hover" />
          </div>
        </div>

        {/* Tall portrait plate, offset upward from the wide one. */}
        <div className="col-span-5 -mt-2 sm:-mt-4">
          <div
            className="h-24 sm:h-44 border border-border-hairline bg-canvas-elevated relative"
            style={{ background: `linear-gradient(180deg, ${wash(p.accent, 74)} 0%, ${wash(p.accent, 16)} 82%)` }}
          >
            <div className="absolute left-0 right-0 bottom-6 h-px bg-border-hover" />
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-border-hairline" />
          </div>
        </div>
      </div>

      {/* Numbered index in tabular figures — aligned columns, no cards. */}
      <div className="pt-4 sm:pt-6 mt-3 border-t border-border-hairline">
        {p.indexEntries.map((e) => (
          <div
            key={e.no}
            className="grid grid-cols-12 items-baseline gap-2 py-1.5 sm:py-2 border-b border-border-hairline last:border-b-0"
          >
            <span className={cn('col-span-1 font-mono text-fg-faint tabular-nums', t.label)}>
              {e.no}
            </span>
            <span className={cn('col-span-7 font-sans font-medium text-fg', t.body)}>
              {e.project}
            </span>
            <span className={cn('col-span-2 font-mono text-fg-muted uppercase tracking-wider', t.label)}>
              {e.place}
            </span>
            <span
              className={cn('col-span-2 font-mono text-fg-muted tabular-nums text-right', t.label)}
            >
              {e.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Storefront: high density, modular product grid, warm fills     */
/* ------------------------------------------------------------------ */

function RoastScale({ level, accent }: { level: number; accent: string }) {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn('w-[5px] h-[5px] rounded-full', i >= level && 'bg-border-hover')}
          style={i < level ? { backgroundColor: accent } : undefined}
        />
      ))}
    </span>
  );
}

function StorefrontMock({ p, s, device }: { p: StorefrontPreview; s: Scale; device: Device }) {
  const t = T[s];
  const ink = readableOn(p.accent);

  if (device === 'mobile') {
    return (
      <div className="flex flex-col h-full">
        <div
          className="text-center font-sans text-[8px] font-semibold py-1.5 px-2 truncate"
          style={{ backgroundColor: p.accent, color: ink }}
        >
          {p.promo}
        </div>

        <div className={cn('flex-1 space-y-3', t.pad)}>
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <span className="font-sans text-[10px] font-bold text-fg">{p.wordmark}</span>
            <span
              className="font-mono text-[8px] font-bold px-1.5 py-0.5 tabular-nums"
              style={{ backgroundColor: p.accent, color: ink }}
            >
              {p.cartCount}
            </span>
          </div>

          <h4 className="font-sans text-[13px] font-bold text-fg leading-tight tracking-tight">
            {p.mobileHeadline}
          </h4>

          {/* Two-up on mobile — still the densest of the three archetypes. */}
          <div className="grid grid-cols-2 gap-2">
            {p.products.slice(0, 2).map((prod) => (
              <div key={prod.name} className="border border-border-hairline">
                <div
                  className="h-10 border-b border-border-hairline bg-canvas-elevated"
                  style={{ background: `linear-gradient(150deg, ${wash(p.accent, 34)} 0%, transparent 74%)` }}
                />
                <div className="p-1.5 space-y-1">
                  <span className="font-mono text-[7px] uppercase tracking-wider text-fg-faint block">
                    {prod.origin}
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-fg leading-tight block">
                    {prod.name}
                  </span>
                  <div className="flex items-center justify-between pt-0.5">
                    <RoastScale level={prod.roast} accent={p.accent} />
                    <span className="font-mono text-[9px] font-bold text-fg tabular-nums">
                      {prod.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-border-hairline bg-canvas-subtle">
          <div
            className="w-full text-center font-sans text-[10px] font-bold py-2.5"
            style={{ backgroundColor: p.accent, color: ink }}
          >
            {p.mobileCta}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Promo strip — full-bleed warm fill across the top. */}
      <div
        className={cn('text-center font-sans font-semibold py-1.5 px-3 truncate', t.label)}
        style={{ backgroundColor: p.accent, color: ink }}
      >
        {p.promo}
      </div>

      <div className={cn('flex-1 flex flex-col', t.pad)}>
        {/* Compact nav with a cart count — commerce chrome, tight spacing. */}
        <div className="flex items-center justify-between border-b border-border-hairline pb-2.5 sm:pb-3">
          <span className={cn('font-sans font-bold text-fg tracking-tight', t.body)}>
            {p.wordmark}
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            {p.nav.map((n) => (
              <span key={n} className={cn('font-sans font-medium text-fg-muted hidden sm:inline', t.label)}>
                {n}
              </span>
            ))}
            <span
              className={cn('font-mono font-bold px-1.5 py-0.5 tabular-nums', t.label)}
              style={{ backgroundColor: p.accent, color: ink }}
            >
              {p.cartCount}
            </span>
          </div>
        </div>

        {/* Three-up product grid: full signature on every card. */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 sm:py-5 flex-1">
          {p.products.map((prod) => (
            <div key={prod.name} className="border border-border-hairline flex flex-col">
              <div
                className="h-10 sm:h-20 border-b border-border-hairline bg-canvas-elevated"
                style={{ background: `linear-gradient(150deg, ${wash(p.accent, 34)} 0%, transparent 74%)` }}
              />
              <div className="p-1.5 sm:p-2.5 flex flex-col flex-1 gap-1">
                <span
                  className={cn('font-mono uppercase tracking-wider text-fg-faint', t.label)}
                >
                  {prod.origin}
                </span>
                <span className={cn('font-sans font-semibold text-fg leading-tight', t.body)}>
                  {prod.name}
                </span>
                <span
                  className={cn('font-sans text-fg-muted leading-snug hidden sm:block', t.label)}
                >
                  {prod.notes}
                </span>
                <div className="flex items-center justify-between mt-auto pt-1.5">
                  <RoastScale level={prod.roast} accent={p.accent} />
                  <span className={cn('font-mono font-bold text-fg tabular-nums', t.body)}>
                    {prod.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hours strip closes the page the way a real cafe site would. */}
        <div className="border-t border-border-hairline pt-2 sm:pt-3">
          <span className={cn('font-mono uppercase tracking-wider text-fg-subtle', t.label)}>
            {p.hours}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frame + dispatcher                                                  */
/* ------------------------------------------------------------------ */

function MockBody({ preview, scale, device }: { preview: ConceptPreviewData; scale: Scale; device: Device }) {
  switch (preview.layout) {
    case 'clinic':
      return <ClinicMock p={preview} s={scale} device={device} />;
    case 'monograph':
      return <MonographMock p={preview} s={scale} device={device} />;
    case 'storefront':
      return <StorefrontMock p={preview} s={scale} device={device} />;
    default: {
      // Exhaustiveness guard: adding a fourth archetype without a branch above
      // is a compile error here, rather than silently rendering nothing.
      const unreachable: never = preview;
      return unreachable;
    }
  }
}

export const ConceptPreview: React.FC<ConceptPreviewProps> = ({
  preview,
  scale = 'card',
  device = 'desktop',
  title,
  className,
}) => {
  const isMobile = device === 'mobile';

  return (
    // role="img" + a single label: the mock is a composed illustration of a
    // hypothetical business, so exposing its internal copy to a screen reader
    // would announce a wall of fictional content. One description is more
    // useful than all of it.
    <div
      role="img"
      aria-label={`Design mockup of the ${title} concept — ${isMobile ? 'mobile' : 'desktop'} layout.`}
      className={cn(
        'bg-canvas border border-border-hairline overflow-hidden flex flex-col',
        isMobile ? 'w-[248px] sm:w-[290px] rounded-2xl border-2 border-border-hover' : 'w-full',
        className
      )}
    >
      {/* Thin frame strip. This is wibsity's presentation chrome around the
          mock — not part of the concept's own design — which is why all three
          archetypes share it while everything below differs completely. It also
          keeps the "Concept" marker visible in any crop or screenshot. */}
      <div className="bg-canvas-subtle border-b border-border-hairline px-2.5 sm:px-3.5 py-1.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-border-active" />
          <span className="w-1.5 h-1.5 rounded-full bg-border-hover" />
          <span className="w-1.5 h-1.5 rounded-full bg-border-hover" />
        </div>
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-fg-faint truncate">
          {isMobile ? '390 × 844' : '1440 × 900'}
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.16em] text-fg-subtle shrink-0">
          Concept
        </span>
      </div>

      <div className={cn('flex-1', isMobile ? 'min-h-[340px]' : 'min-h-[220px] sm:min-h-[300px]')}>
        <MockBody preview={preview} scale={scale} device={device} />
      </div>
    </div>
  );
};
