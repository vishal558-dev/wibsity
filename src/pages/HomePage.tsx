import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, type Variants } from 'motion/react';
import { CheckCircle2, Phone, ArrowRight, Zap, Globe, Code } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { servicesData } from '../data/services';
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const headlineLeadWords = ['We', 'design', 'and', 'build', 'websites', 'that', 'help', 'your', 'business'];

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
  const [headlineReady, setHeadlineReady] = React.useState(false);

  useEffect(() => {
    // Guarantees the browser paints the pre-animation state as a real frame
    // before the stagger starts, so it isn't swallowed on a congested first-load.
    const id = requestAnimationFrame(() => setHeadlineReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const valuePoints = [
    'Direct Founder Collaboration',
    'Sub-Second Performance Target',
    'Domain Ownership Included',
    'Clear Fixed-Scope Proposals',
  ];

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

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
                <motion.line
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

        {/* Soft brand-color depth glow, kept behind content and heavily blurred */}
        <div className="accent-glow w-[36rem] h-[36rem] -top-40 right-[-10rem] opacity-30 z-0" aria-hidden="true" />

        {/* Accent boundary line at the base of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-4xl">
            {/* Clean Unboxed Eyebrow */}
            <motion.div
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
            </motion.div>

            {/* Headline */}
            {prefersReduced ? (
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-fg leading-[1.08]">
                We design and build websites that help your business{' '}
                <span className="text-accent-light">stand out.</span>
              </h1>
            ) : (
              <motion.h1
                initial="hidden"
                animate={headlineReady ? 'visible' : 'hidden'}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.06 } } }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-fg leading-[1.08]"
              >
                {headlineLeadWords.map((word, i) => (
                  <React.Fragment key={i}>
                    <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                      {word}
                    </motion.span>{' '}
                  </React.Fragment>
                ))}
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  <span className="text-accent-light">stand out.</span>
                </motion.span>
              </motion.h1>
            )}

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-8 text-base sm:text-xl text-fg-muted max-w-2xl leading-relaxed"
            >
              High-impact, fast, and modern web design for businesses, founders, practices, and brands. No bloated retainers, no generic templates—just clean digital craft built to give your business an unfair advantage.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-3.5"
            >
              <MagneticCTA className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<WhatsAppIcon size={18} />}
                  className="w-full sm:w-auto justify-center"
                >
                  Chat on WhatsApp
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

            </motion.div>

            {/* Value Verification Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border-hairline grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {valuePoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-fg shrink-0 mt-0.5" />
                  <span className="text-xs font-sans text-fg-muted leading-tight font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Quiet architectural mark + engineering panel, desktop only — breaks the single-column hero silhouette */}
          <div className="hidden lg:flex relative w-full max-w-xs shrink-0 items-center justify-center py-16">
            <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full opacity-[0.16]" aria-hidden="true">
              <defs>
                <clipPath id="hero-mark-clip">
                  <rect x="90" y="54" width="140" height="250" />
                </clipPath>
              </defs>
              {/* Back viewport — a paired mobile frame, for depth */}
              <rect x="40" y="150" width="90" height="150" rx="10" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.5" />
              {/* Front viewport — a browser window with a chrome bar */}
              <rect x="90" y="30" width="140" height="274" rx="6" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
              <line x1="90" y1="54" x2="230" y2="54" stroke="var(--color-accent)" strokeWidth="1.5" />
              <circle cx="104" cy="42" r="3" fill="var(--color-accent)" />
              <circle cx="116" cy="42" r="3" fill="var(--color-accent)" />
              <circle cx="128" cy="42" r="3" fill="var(--color-accent)" />
              <rect
                x="100"
                y="54"
                width="120"
                height="3"
                fill="var(--color-accent-light)"
                clipPath="url(#hero-mark-clip)"
                opacity="0.7"
                className={prefersReduced ? undefined : 'hero-scan-line'}
              />
            </svg>

            <div className="relative flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="relative border border-border-hairline bg-canvas-subtle px-5 py-4 shadow-[0_0_40px_-14px_rgba(75,80,254,0.4)]"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full bg-accent-light ${prefersReduced ? '' : 'animate-pulse'}`} />
                  <span className="font-mono text-[9px] text-fg-subtle uppercase tracking-widest">
                    System Status · Operational
                  </span>
                </div>
                <span className="block font-mono text-[10px] text-fg-faint uppercase tracking-widest mb-1">
                  Engineering Target
                </span>
                <span className="block font-mono text-2xl font-semibold text-accent-light">
                  &lt; 500ms
                </span>
                <span className="block text-xs text-fg-muted mt-1 max-w-[10rem]">
                  Sub-second load, on every build
                </span>
              </motion.div>

              {/* Connector tick linking the two panel cards */}
              <div className="w-px h-5 ml-8 bg-gradient-to-b from-accent/50 to-transparent" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                className="relative ml-8 border border-border-hairline bg-canvas-subtle px-4 py-3"
              >
                <span className="block font-mono text-[9px] text-fg-faint uppercase tracking-widest mb-0.5">
                  Domain
                </span>
                <span className="block font-mono text-lg font-semibold text-accent-light">
                  Always Yours
                </span>
                <span className="block text-[11px] text-fg-muted mt-0.5 max-w-[9rem]">
                  Domain ownership included
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Ticker — pure-CSS marquee, decorative */}
      <div className="border-b border-border-hairline bg-canvas-subtle overflow-hidden" aria-hidden="true">
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
              index="01"
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
                className="border border-border-hairline bg-canvas p-6 flex flex-col justify-between hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(75,80,254,0.08),0_16px_40px_-24px_rgba(75,80,254,0.6)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-fg-faint">
                      {service.index}
                    </span>
                    <span className="text-[11px] font-sans font-medium text-fg-subtle uppercase tracking-wider">
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted hover:text-accent-light transition-colors pt-4 border-t border-border-hairline"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="border-l border-accent/40 pl-4">
                  <div className="flex items-center gap-2 text-fg font-mono text-sm font-semibold mb-1">
                    <Zap size={14} className="text-accent-light" /> &lt; 500ms
                  </div>
                  <p className="text-xs text-fg-muted">Sub-second load target</p>
                </div>
                <div className="border-l border-accent/40 pl-4">
                  <div className="flex items-center gap-2 text-fg font-mono text-sm font-semibold mb-1">
                    <Globe size={14} className="text-accent-light" /> Domain
                  </div>
                  <p className="text-xs text-fg-muted">Full ownership, always yours</p>
                </div>
                <div className="border-l border-accent/40 pl-4">
                  <div className="flex items-center gap-2 text-fg font-mono text-sm font-semibold mb-1">
                    <Code size={14} className="text-accent-light" /> React 19
                  </div>
                  <p className="text-xs text-fg-muted">Modern frontend stack</p>
                </div>
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light hover:underline underline-offset-4"
                >
                  Read Studio Principles <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
