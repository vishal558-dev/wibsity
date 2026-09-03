import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useMotionValue, useSpring, type Variants } from 'motion/react';
import { CheckCircle2, Phone, ArrowRight, Code, Network, LayoutTemplate, MonitorSmartphone, Rocket, type LucideIcon } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { StartProjectModal } from '../components/common/StartProjectModal';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { faqsData } from '../data/faqs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CONTACT_INFO } from '../data/contact';

/** Subtle magnetic pull for a single, deliberate hero CTA. Hover-only enhancement; the wrapped element stays a fully clickable link/button on its own. */
const MagneticCTA: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.3 });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </m.div>
  );
};

const headlineLeadWords = ['We', 'design', 'and', 'build', 'websites', 'that', 'help', 'your', 'business'];

/** A real, verbatim excerpt of this repo's own Button.tsx (src/components/common/Button.tsx),
 * trimmed to the most illustrative props — not a fabricated example. Manually tokenized rather
 * than pulled in via a syntax-highlighter package, since a 12-line static snippet doesn't
 * justify shipping a whole highlighting library to every visitor.
 * Tokens use `text-fg`/`text-fg-muted` only, not `-subtle`/`-faint` — those two are tuned for
 * AA contrast against `--color-canvas`, but this panel sits on `bg-canvas-elevated` (and its
 * header on `bg-canvas-surface`), where both fall to ~3.1–3.8:1 in light mode (and fg-faint to
 * ~4.3:1 even in dark). `fg-muted` clears AA on every surface in both themes. */
const manifestoCodeLines: { text: string; cls: string }[][] = [
  [
    { text: 'export interface ', cls: 'text-accent-light' },
    { text: 'ButtonProps ', cls: 'text-fg' },
    { text: 'extends ', cls: 'text-accent-light' },
    { text: 'Omit', cls: 'text-fg-muted' },
    { text: '<', cls: 'text-fg-muted' },
    { text: 'HTMLMotionProps', cls: 'text-fg-muted' },
    { text: "<'button'>, 'children'> {", cls: 'text-fg-muted' },
  ],
  [
    { text: '  children', cls: 'text-fg' },
    { text: ': ', cls: 'text-fg-muted' },
    { text: 'React.ReactNode', cls: 'text-fg-muted' },
    { text: ';', cls: 'text-fg-muted' },
  ],
  [
    { text: '  variant', cls: 'text-fg' },
    { text: '?: ', cls: 'text-fg-muted' },
    { text: "'primary' | 'secondary' | 'outline' | 'ghost'", cls: 'text-fg-muted' },
    { text: ';', cls: 'text-fg-muted' },
  ],
  [
    { text: '  size', cls: 'text-fg' },
    { text: '?: ', cls: 'text-fg-muted' },
    { text: "'sm' | 'md' | 'lg'", cls: 'text-fg-muted' },
    { text: ';', cls: 'text-fg-muted' },
  ],
  [
    { text: '  icon', cls: 'text-fg' },
    { text: '?: ', cls: 'text-fg-muted' },
    { text: 'React.ReactNode', cls: 'text-fg-muted' },
    { text: ';', cls: 'text-fg-muted' },
  ],
  [{ text: '  // ...href, to, className, and more', cls: 'text-fg-muted' }],
  [{ text: '}', cls: 'text-fg-muted' }],
];

/** Mirrors the same lookup in ServicesPage.tsx — one icon per process step. */
const processIcons: Record<string, LucideIcon> = {
  STEP_01: Network,
  STEP_02: LayoutTemplate,
  STEP_03: MonitorSmartphone,
  STEP_04: Rocket,
};

/** Compact abstract UI-mockup tiles for the hero's vertical marquee columns —
 * generic wireframe compositions (browser chrome, mobile card, form, stat),
 * not tied to any real project/client. Same primitive shapes and semantic
 * color tokens as the previous device-illustration SVG, just smaller and
 * duplicated for a scrolling column instead of a single static mockup. */
const HeroTileBrowser: React.FC = () => (
  <svg viewBox="0 0 140 104" className="w-full h-auto block" aria-hidden="true">
    <rect x="1" y="1" width="138" height="102" rx="4" fill="var(--color-canvas-subtle)" stroke="var(--color-border-hairline)" />
    <line x1="1" y1="18" x2="139" y2="18" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
    <circle cx="10" cy="9.5" r="2" fill="var(--color-accent)" />
    <circle cx="18" cy="9.5" r="2" fill="var(--color-accent)" />
    <circle cx="26" cy="9.5" r="2" fill="var(--color-accent)" />
    <rect x="12" y="30" width="70" height="6" rx="1" fill="var(--color-fg)" opacity="0.5" />
    <rect x="12" y="42" width="48" height="5" rx="1" fill="var(--color-fg)" opacity="0.3" />
    <rect x="12" y="58" width="34" height="12" rx="6" fill="var(--color-accent)" />
    <rect x="12" y="80" width="116" height="16" fill="none" stroke="var(--color-border-hairline)" />
  </svg>
);

const HeroTileMobile: React.FC = () => (
  <svg viewBox="0 0 140 104" className="w-full h-auto block" aria-hidden="true">
    <rect x="42" y="1" width="56" height="102" rx="10" fill="var(--color-canvas-subtle)" stroke="var(--color-accent)" strokeWidth="1.5" />
    <rect x="58" y="10" width="24" height="3" rx="1.5" fill="var(--color-accent)" opacity="0.6" />
    <circle cx="70" cy="24" r="5" fill="var(--color-accent-light)" />
    <rect x="50" y="36" width="40" height="4" fill="var(--color-fg)" opacity="0.4" />
    <rect x="50" y="46" width="28" height="4" fill="var(--color-fg)" opacity="0.25" />
    <rect x="50" y="58" width="40" height="24" rx="3" fill="var(--color-accent)" opacity="0.15" stroke="var(--color-border-hairline)" />
    <rect x="50" y="88" width="40" height="8" rx="4" fill="var(--color-accent-light)" />
  </svg>
);

const HeroTileForm: React.FC = () => (
  <svg viewBox="0 0 140 104" className="w-full h-auto block" aria-hidden="true">
    <rect x="1" y="1" width="138" height="102" rx="4" fill="var(--color-canvas-subtle)" stroke="var(--color-border-hairline)" />
    <rect x="16" y="18" width="108" height="5" rx="1" fill="var(--color-fg)" opacity="0.4" />
    <rect x="16" y="34" width="108" height="16" rx="2" fill="none" stroke="var(--color-border-hairline)" />
    <rect x="16" y="58" width="108" height="16" rx="2" fill="none" stroke="var(--color-border-hairline)" />
    <rect x="16" y="82" width="46" height="14" rx="7" fill="var(--color-accent)" />
  </svg>
);

const HeroTileStat: React.FC = () => (
  <svg viewBox="0 0 140 104" className="w-full h-auto block" aria-hidden="true">
    <rect x="1" y="1" width="138" height="102" rx="4" fill="var(--color-canvas-subtle)" stroke="var(--color-border-hairline)" />
    <rect x="16" y="16" width="4" height="72" fill="var(--color-accent)" opacity="0.5" />
    <rect x="30" y="24" width="46" height="20" rx="1" fill="var(--color-accent-light)" opacity="0.25" />
    <rect x="30" y="52" width="70" height="6" rx="1" fill="var(--color-fg)" opacity="0.5" />
    <rect x="30" y="64" width="54" height="5" rx="1" fill="var(--color-fg)" opacity="0.3" />
    <rect x="30" y="78" width="30" height="10" rx="5" fill="var(--color-accent)" opacity="0.7" />
  </svg>
);

const heroMockupTiles = [HeroTileBrowser, HeroTileMobile, HeroTileForm, HeroTileStat];

const heroGridLines = [
  { x1: '0', y1: '25%', x2: '100%', y2: '25%', color: 'text-[color:var(--color-grid-line)]' },
  { x1: '0', y1: '50%', x2: '100%', y2: '50%', color: 'text-accent/25' },
  { x1: '0', y1: '75%', x2: '100%', y2: '75%', color: 'text-[color:var(--color-grid-line)]' },
  { x1: '20%', y1: '0', x2: '20%', y2: '100%', color: 'text-[color:var(--color-grid-line)]' },
  { x1: '50%', y1: '0', x2: '50%', y2: '100%', color: 'text-accent/25' },
  { x1: '80%', y1: '0', x2: '80%', y2: '100%', color: 'text-[color:var(--color-grid-line)]' },
];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const HomePage: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const valuePoints = [
    'Mobile Responsive',
    'Pay 50% After Completion',
    'SEO-Ready Structure',
    'Fast Loading',
  ];

  const [isStartProjectOpen, setStartProjectOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 00 / Hero Monograph */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden border-b border-border-hairline bg-canvas">
        {/* Animated Background Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {heroGridLines.map((line, i) =>
              prefersReduced ? (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="currentColor" strokeWidth="1" className={line.color} />
              ) : (
                <m.line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="currentColor"
                  strokeWidth="1"
                  className={line.color}
                  initial={{ opacity: 0.05 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeInOut' }}
                />
              )
            )}
          </svg>
        </div>

        {/* Soft brand-color depth glow, kept behind content and heavily blurred.
            Scaled down below sm — at the full 36rem size it's wider than a phone
            viewport and washes out the whole top of the hero. */}
        <div className="accent-glow w-[18rem] h-[18rem] -top-24 right-[-6rem] opacity-20 sm:w-[36rem] sm:h-[36rem] sm:-top-40 sm:right-[-10rem] sm:opacity-30 z-0" aria-hidden="true" />

        {/* Accent boundary line at the base of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-4xl">
            {/* Clean Unboxed Eyebrow */}
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted"
            >
              <span className="font-mono text-fg-faint text-[11px]">00</span>
              <span className="text-accent">/</span>
              <span className="tracking-widest text-fg-muted">Studio Introduction</span>
              <span className="text-border-hover hidden sm:inline">•</span>
              <span className="text-fg-subtle hidden sm:inline text-[11px]">Digital Design & Engineering</span>
            </m.div>

            {/* Headline */}
            {prefersReduced ? (
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-fg leading-[1.08]">
                We design and build websites that help your business{' '}
                <span className="text-accent-light">stand out.</span>
              </h1>
            ) : (
              <m.h1
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.06 } } }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-fg leading-[1.08]"
              >
                {headlineLeadWords.map((word, i) => (
                  <React.Fragment key={i}>
                    <m.span variants={wordVariants} style={{ display: 'inline-block' }}>
                      {word}
                    </m.span>{' '}
                  </React.Fragment>
                ))}
                <m.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  <span className="text-accent-light">stand out.</span>
                </m.span>
              </m.h1>
            )}

            {/* Value Verification Grid */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {valuePoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-accent-light shrink-0 mt-0.5" />
                  <span className="text-xs font-sans text-fg-muted leading-tight font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </m.div>

            {/* Actions */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border-hairline flex flex-wrap items-center gap-3 sm:gap-3.5"
            >
              <MagneticCTA className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStartProjectOpen(true)}
                  icon={<ArrowRight size={18} />}
                  className="w-full sm:w-auto justify-center"
                >
                  Start a Project
                </Button>
              </MagneticCTA>

              <Button
                variant="ghost"
                size="lg"
                href={CONTACT_INFO.phoneHref}
                icon={<Phone size={16} />}
                className="text-sm w-full sm:w-auto justify-center"
              >
                Call Us
              </Button>

            </m.div>
          </div>

          {/* Vertical marquee, desktop only — two columns of small, generic
              UI-mockup tiles (no project-specific data) scrolling opposite
              directions. Purely decorative (aria-hidden), same seamless-loop
              CSS technique as the horizontal capability ticker below, and
              likewise frozen under prefers-reduced-motion via CSS alone. */}
          <div
            className="hidden lg:flex w-full max-w-xs shrink-0 items-stretch justify-center gap-3 h-[26rem] py-4"
            aria-hidden="true"
          >
            {[0, 1].map((col) => (
              <div key={col} className="flex-1 marquee-fade-vertical overflow-hidden">
                <div className={col === 0 ? 'flex flex-col gap-3 w-full marquee-track-vertical' : 'flex flex-col gap-3 w-full marquee-track-vertical-reverse'}>
                  {[...heroMockupTiles, ...heroMockupTiles].map((Tile, i) => (
                    <div
                      key={i}
                      className="border border-border-hairline bg-canvas-subtle p-1.5 shrink-0"
                    >
                      <Tile />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/tablet fallback for the vertical marquee above — a single
            horizontal row using the same ticker pattern as the capability
            ticker below, since there's no room for two columns. */}
        <div className="lg:hidden marquee-fade overflow-hidden mt-8 relative z-10" aria-hidden="true">
          <div className="flex w-max gap-3 marquee-track">
            {[...heroMockupTiles, ...heroMockupTiles].map((Tile, i) => (
              <div
                key={i}
                className="w-28 border border-border-hairline bg-canvas-subtle p-1.5 shrink-0"
              >
                <Tile />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Ticker — pure-CSS marquee, decorative */}
      <div className="marquee-fade border-b border-border-hairline bg-canvas-subtle overflow-hidden" aria-hidden="true">
        <div className="flex w-max marquee-track py-3 sm:py-4">
          {[...servicesData, ...servicesData].map((service, i) => (
            <span
              key={`${service.id}-${i}`}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 shrink-0 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-fg-muted whitespace-nowrap"
            >
              {service.title}
              <span className="text-accent">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* 01 / Capabilities Matrix Teaser */}
      <section className="py-20 sm:py-24 border-b border-border-hairline bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              tag="CORE CAPABILITIES"
              title="Built for modern businesses & founders."
              description="Four digital engineering offerings built to convert visitors."
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted hover:text-accent-light border border-border-hairline bg-canvas-surface hover:border-accent/60 px-4 py-2.5 transition-colors"
              >
                <span>Explore Full Scope & Process</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="relative border border-border-hairline bg-canvas p-6 flex flex-col justify-between hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(75,80,254,0.08),0_16px_40px_-24px_rgba(75,80,254,0.6)] transition-all"
              >
                {/* Permanent accent rule — a small at-rest color touch so
                    the card isn't purely grayscale until hover. */}
                <span
                  className="absolute top-0 left-0 right-0 h-[2px] bg-accent/40"
                  aria-hidden="true"
                />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-fg-faint">
                      {service.index}
                    </span>
                    <span className="text-[11px] font-sans font-medium text-accent-light uppercase tracking-wider">
                      {service.scopeType.split(' ')[0]} Scope
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-fg tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-fg-muted leading-relaxed mb-6">
                    {service.tagline}
                  </p>
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted hover:text-accent-light transition-colors pt-4 -mb-2.5 pb-2.5 border-t border-border-hairline"
                >
                  <span>View Details</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 / Studio Manifesto Teaser */}
      <section className="py-20 sm:py-24 border-b border-border-hairline bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted">
                <span className="font-mono text-fg-faint text-[11px]">02</span>
                <span className="text-accent">/</span>
                <span className="tracking-widest text-fg-muted">Studio Manifesto</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg leading-tight">
                No templates. No slow page builders. Just fast, modern code.
              </h2>
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                We handcraft bespoke React and TypeScript flagships instead of bloated page builders.
              </p>

              {/* Real code, not an invented example — see the comment on
                  manifestoCodeLines above. Illustrates the headline instead
                  of just asserting it. */}
              <div className="pt-2 border border-border-hairline bg-canvas-elevated overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border-hairline bg-canvas-surface">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-border-active" />
                    <span className="w-1.5 h-1.5 rounded-full bg-border-hover" />
                    <span className="w-1.5 h-1.5 rounded-full bg-border-hover" />
                  </div>
                  <span className="font-mono text-[10px] text-fg-muted flex items-center gap-1.5">
                    <Code size={11} className="shrink-0" /> Button.tsx
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-fg-muted">
                    Real Code
                  </span>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-xs leading-[1.7] font-mono">
                  <code>
                    {manifestoCodeLines.map((line, i) => (
                      <div key={i}>
                        {line.map((tok, j) => (
                          <span key={j} className={tok.cls}>
                            {tok.text}
                          </span>
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            <div className="lg:col-span-5 border border-border-hairline bg-canvas-subtle p-6 sm:p-8 space-y-6">
              <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block">
                Studio Philosophy
              </span>
              <p className="font-sans text-sm text-fg leading-relaxed">
                &ldquo;A website is your business&apos;s most active commercial representative. It should exude caliber, load instantly on any mobile connection, and direct visitors straight to high-value conversations.&rdquo;
              </p>
              <div className="pt-4 border-t border-border-hairline flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-fg block">wibsity engineering</span>
                  <span className="text-[11px] text-fg-faint font-sans">Founding Principles</span>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light hover:underline underline-offset-4 -my-3 py-3"
                >
                  Read Studio Principles <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / Process Teaser */}
      <section className="py-20 sm:py-24 border-b border-border-hairline bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              tag="HOW WE WORK"
              title="A structured 4-step workflow from kickoff to launch."
              description="Direct communication and predictable milestones — no black box."
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted hover:text-accent-light border border-border-hairline bg-canvas-surface hover:border-accent/60 px-4 py-2.5 transition-colors"
              >
                <span>See Full Methodology</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-border-hairline divide-y sm:divide-y-0 lg:divide-x divide-border-hairline">
            {processData.map((step) => {
              const StepIcon = processIcons[step.code];
              return (
                <div key={step.step} className="px-0 lg:px-6 py-6 max-sm:first:pt-0 lg:first:pl-0 lg:last:pr-0">
                  <div className="flex items-center gap-2.5">
                    <StepIcon size={16} className="text-accent-light shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent-light font-semibold">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-fg tracking-tight mt-2 mb-1.5">{step.name}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed">{step.focus}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 / FAQ Teaser */}
      <section className="relative overflow-hidden py-20 sm:py-24 border-b border-border-hairline bg-canvas">
        {/* Same soft brand-glow treatment as the hero and the footer CTA band,
            at a fraction of the intensity — the page's closing section
            otherwise had zero accent presence at rest. */}
        <div className="accent-glow w-[26rem] h-[26rem] -bottom-40 left-[-8rem] opacity-10 sm:opacity-15 z-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              tag="COMMON QUESTIONS"
              title="What people ask before they message us."
              description="The three questions that come up in nearly every first conversation."
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted hover:text-accent-light border border-border-hairline bg-canvas-surface hover:border-accent/60 px-4 py-2.5 transition-colors"
              >
                <span>View All FAQs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {faqsData.slice(0, 3).map((faq) => (
              <div key={faq.id} className="border-t-2 border-fg pt-5">
                <h3 className="text-base font-bold text-fg tracking-tight mb-2.5 leading-snug">
                  {faq.question}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StartProjectModal open={isStartProjectOpen} onClose={() => setStartProjectOpen(false)} />
    </div>
  );
};
