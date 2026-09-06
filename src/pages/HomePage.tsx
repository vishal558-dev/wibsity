import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'motion/react';
import { CheckCircle2, ChevronDown, ArrowRight, Code, Network, LayoutTemplate, MonitorSmartphone, Rocket, type LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { StartProjectModal } from '../components/common/StartProjectModal';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { faqsData } from '../data/faqs';
import { useReducedMotion } from '../hooks/useReducedMotion';

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

/** Replaces a static 4-card grid with a hover-driven vertical service list
 * (desktop) and a tap-to-reveal single-open accordion (mobile/tablet,
 * mirroring ServicesPage.tsx's existing bento-card accordion technique —
 * same WAI-ARIA heading-wraps-button pattern, same CSS
 * grid-template-rows: 0fr -> 1fr transition, not a JS height measurement).
 * Desktop hovering/focusing a service title crossfades a shared image panel
 * to that service's photo. */
const ServiceShowcase: React.FC<{ prefersReduced: boolean }> = ({ prefersReduced }) => {
  const [activeId, setActiveId] = useState<string>(servicesData[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const activeService = servicesData.find((service) => service.id === activeId) ?? servicesData[0];

  return (
    <>
      {/* Desktop (lg+): hover/focus-driven list + swapping image panel */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
        <div className="lg:col-span-7 flex flex-col">
          {servicesData.map((service) => {
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
                className={cn(
                  'text-left border-t border-border-hairline py-6 transition-colors last:border-b',
                  isActive ? 'text-fg' : 'text-fg-faint hover:text-fg-muted'
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-fg-faint shrink-0">{service.index}</span>
                  <span className="text-3xl xl:text-4xl font-extrabold tracking-tight">{service.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden border border-border-hairline bg-canvas-elevated">
          <AnimatePresence mode="wait">
            <m.img
              key={activeService.id}
              src={activeService.image}
              alt=""
              aria-hidden="true"
              width={800}
              height={1000}
              decoding="async"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              className="absolute inset-0 w-full h-full object-cover grayscale-[90%]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-canvas/90 to-transparent">
            <p className="text-xs text-fg-muted leading-relaxed">{activeService.tagline}</p>
          </div>
        </div>
      </div>

      {/* Mobile/tablet (below lg): single-open tap accordion */}
      <div className="lg:hidden divide-y divide-border-hairline border-t border-b border-border-hairline">
        {servicesData.map((service) => {
          const isOpen = expandedId === service.id;
          const contentId = `home-service-detail-${service.id}`;
          return (
            <div key={service.id} className="py-5">
              <h3 className="mb-0">
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : service.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 text-left -my-2 py-2"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-fg-faint">{service.index}</span>
                    <span className="text-xl font-extrabold tracking-tight text-fg">{service.title}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn('text-fg-muted shrink-0 transition-transform', isOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={contentId}
                className={cn(
                  'grid transition-[grid-template-rows] ease-in-out',
                  prefersReduced ? 'duration-0' : 'duration-300',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className="pt-4 flex flex-col gap-4">
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-48 object-cover grayscale-[90%] border border-border-hairline"
                    />
                    <p className="text-sm text-fg-muted leading-relaxed">{service.tagline}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
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

/** The hero's signature 3D piece — a pre-rendered obsidian sculpture of the
 * Wibsity "W", a continuous twisted-ribbon form (dark obsidian/glossy
 * material, restrained blue-violet edge lighting) chosen specifically
 * because it reads clearly as a "W" rather than resolving only after a
 * delay — an earlier, more abstract/fractured candidate was tried and
 * rejected for reading too slowly as the brand mark. It's a
 * static AVIF (25KB — re-encoded from an original WebP at less than half the
 * size with no visible quality loss), not a live 3D engine — no Three.js/
 * React Three Fiber/Spline runtime, consistent with this codebase's whole
 * mobile-performance posture (see the Animation section in CLAUDE.md). The
 * only "3D-ness" comes from two restrained motion layers on top of the
 * still render:
 *  1. A spring-driven cursor tilt (rotateX/rotateY, capped at a few degrees)
 *     plus a small paired x/y translation, both falling off with distance
 *     from the object, so it reads as ambient presence-awareness rather than
 *     a cursor-follow gimmick. Skipped under reduced-motion and on
 *     coarse-pointer/touch devices — same touch check `useLenis.ts` uses,
 *     since touch input has no hover state to drive this. The window-level
 *     `mousemove` listener is rAF-batched (at most one rect read + one tilt
 *     calculation per animation frame, not per raw event) and short-circuits
 *     entirely whenever an `IntersectionObserver` reports the sculpture is
 *     scrolled out of view, so moving the mouse anywhere else on the page —
 *     including deep in later sections — costs nothing.
 *  2. A scroll-linked translate/scale/opacity tied to the hero section's own
 *     scroll progress (via `sectionRef`), so the object recedes as the hero
 *     scrolls out of view instead of animating on its own timeline. */
const HeroSculpture: React.FC<{ sectionRef: React.RefObject<HTMLElement | null> }> = ({ sectionRef }) => {
  const prefersReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 16, mass: 0.4 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 16, mass: 0.4 });
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 16, mass: 0.4 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 16, mass: 0.4 });

  // Tracks whether the sculpture is actually on screen, so the mousemove
  // listener below can skip all its work once the visitor has scrolled past
  // the hero — otherwise every mousemove on the entire page (even deep in
  // the Services/About/Contact content) would keep paying for a layout read
  // and some arithmetic for an object nobody can see.
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    // rAF-batched so the (cheap but non-zero) rect read + math runs at most
    // once per animation frame, not once per raw mousemove event — some
    // browsers/mice fire mousemove well above 60Hz.
    let rafId = 0;
    let pendingEvent: MouseEvent | null = null;

    const applyTilt = () => {
      rafId = 0;
      const e = pendingEvent;
      const el = wrapperRef.current;
      if (!e || !el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // Intensity falls off with distance so the tilt feels like the object
      // is aware of the cursor nearby rather than tracking it from anywhere
      // on screen — the radius is generous (roughly a hero-section's worth
      // of width) so normal cursor movement near the hero actually reaches it.
      const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / 1100);
      const normX = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
      rotateY.set(normX * 3 * falloff);
      rotateX.set(-normY * 3 * falloff);
      tiltX.set(normX * 10 * falloff);
      tiltY.set(normY * 10 * falloff);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      pendingEvent = e;
      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced, rotateX, rotateY, tiltX, tiltY]);

  // 'center start' (not 'end start') as the end offset so the fade/zoom
  // completes over roughly the first half of the hero's scroll distance —
  // scrollYProgress clamps at 1 past that point, so the effect reads as a
  // deliberate, fairly quick fade rather than a slow drift across the whole
  // section's height.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'center start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  if (prefersReduced) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/hero-sculpture-w.avif"
          alt=""
          aria-hidden="true"
          width={700}
          height={468}
          decoding="async"
          className="max-h-full max-w-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <m.div
      ref={wrapperRef}
      style={{ y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
      className="w-full h-full flex items-center justify-center"
    >
      <div style={{ perspective: 1000 }}>
        <m.img
          src="/hero-sculpture-w.avif"
          alt=""
          aria-hidden="true"
          width={700}
          height={468}
          decoding="async"
          className="max-h-full max-w-full w-auto object-contain"
          style={{ rotateX: springRotateX, rotateY: springRotateY, x: springTiltX, y: springTiltY }}
        />
      </div>
    </m.div>
  );
};

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
  const heroRef = useRef<HTMLElement>(null);

  // The hero sculpture is desktop (lg, 1024px+) only. Gated in JS rather than
  // just CSS (`hidden lg:flex`) so the <img> element never exists in the DOM
  // on mobile/tablet — a CSS-hidden <img> still triggers a network fetch,
  // which would waste the 25KB AVIF download on viewports that never render
  // it. Matches Tailwind's default `lg` breakpoint exactly. Initialized
  // synchronously from matchMedia (this app is CSR-only, so `window` is
  // always available at first render) to avoid a flash of the sculpture
  // mounting on desktop after hydration.
  const [isDesktopViewport, setIsDesktopViewport] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e: MediaQueryListEvent) => setIsDesktopViewport(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const valuePoints: { title: string; sub?: string }[] = [
    { title: 'Mobile Responsive' },
    { title: 'Built for Google', sub: 'SEO-Ready Structure' },
    { title: 'Fast Loading' },
    {
      title: 'Founder-Direct',
      sub: 'No account managers. You work directly with the person building your site.',
    },
  ];

  const [isStartProjectOpen, setStartProjectOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 00 / Hero Monograph */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden border-b border-border-hairline bg-canvas">
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

        {/* Second glow, larger and centered behind the desktop hero visual
            (the vertical mockup-tile marquee) so that column reads as the
            focal point rather than floating on flat black. Desktop-only —
            the mobile/tablet layout doesn't have a dedicated visual column
            for it to sit behind. */}
        <div className="accent-glow hidden lg:block w-[48rem] h-[48rem] top-1/2 -translate-y-1/2 right-[-16rem] opacity-15 z-0" aria-hidden="true" />

        {/* Giant ghosted brand-mark watermark — a near-invisible "W" behind
            the hero content, purely for visual anchor/depth. Kept out of the
            accessibility tree and clipped by the section's own overflow-hidden. */}
        <div
          className="absolute inset-0 z-0 hidden sm:flex items-center justify-end pr-0 overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-sans font-black leading-none text-fg/[0.04] text-[26rem] lg:text-[34rem] tracking-tightest translate-x-1/4">
            W
          </span>
        </div>

        {/* Accent boundary line at the base of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-4xl">
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

            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-6 text-sm sm:text-base text-fg-muted max-w-xl"
            >
              An India-based studio — standard builds delivered in 3–5 days, fully fixed-scope.
            </m.p>

            {/* Value Verification Grid */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {valuePoints.map((point) => (
                <div key={point.title} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-accent-light shrink-0 mt-0.5" />
                  <span className="flex flex-col">
                    <span className="text-xs font-sans text-fg-muted leading-tight font-medium">
                      {point.title}
                    </span>
                    {point.sub && (
                      <span className="text-[10px] font-sans text-fg-faint leading-tight mt-0.5">
                        {point.sub}
                      </span>
                    )}
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
            </m.div>
          </div>

          {/* Hero signature sculpture, desktop only — see HeroSculpture for
              the full rationale, and isDesktopViewport above for why this is
              gated in JS rather than plain `hidden lg:flex`. Purely
              decorative (aria-hidden inside). */}
          {isDesktopViewport && (
            <div className="flex w-full max-w-[31.2rem] shrink-0 items-center justify-center h-[39rem] py-4">
              <HeroSculpture sectionRef={heroRef} />
            </div>
          )}
        </div>

        {/* No mobile/tablet fallback — the sculpture is desktop (lg+) only.
            Below lg it's not rendered at all, not just non-interactive, so
            phones/tablets never download hero-sculpture-w.avif. */}
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
              title="Built for modern businesses & founders."
              description="Four ways to build a site — pick whichever matches what your business needs right now."
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

          <ServiceShowcase prefersReduced={prefersReduced} />
        </div>
      </section>

      {/* 02 / Studio Manifesto Teaser */}
      <section className="py-20 sm:py-24 border-b border-border-hairline bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg leading-tight">
                Built to load fast, stay maintainable, and never lock you in.
              </h2>
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                We hand-code every site in React and TypeScript — no page builder, no bloat. Pages load faster because there&apos;s no framework tax to pay. The codebase stays simple enough to extend two years from now. And none of it runs on a proprietary platform that holds your site hostage if you ever want to leave.
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
                &ldquo;Your website is the one salesperson who never clocks off. It needs to load instantly, look like it belongs to a business worth trusting, and actually get the visitor to reach out — not just admire the layout.&rdquo;
              </p>
              <div className="pt-4 border-t border-border-hairline flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-fg block">wibsity engineering</span>
                  <span className="text-[11px] text-fg-faint font-sans">Founding Principles</span>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-accent-light hover:underline underline-offset-4 -my-3 py-3"
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
