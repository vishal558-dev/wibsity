import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, type Variants } from 'motion/react';
import { animate, stagger } from 'animejs';
import { CheckCircle2, Phone, ArrowRight, ShieldCheck, Zap, Code, Layout, Layers, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { servicesData } from '../data/services';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CONTACT_INFO } from '../data/contact';

/** Editorial highlighter-style stroke rendered behind a short headline phrase. */
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block whitespace-nowrap">
    <span className="relative z-10">{children}</span>
    <svg
      className="absolute left-0 right-0 -bottom-0.5 sm:-bottom-1 w-full h-[0.3em]"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4,14 C60,4 120,20 180,10 C220,4 262,17 296,9"
        stroke="var(--color-accent)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  </span>
);

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

const headlineLeadWords = ['We', 'design', 'and', 'build', 'websites', 'that', 'help', 'your', 'business', 'stand', 'out', 'and'];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const HomePage: React.FC = () => {
  const svgLinesRef = useRef<SVGSVGElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !svgLinesRef.current) return;

    const lines = svgLinesRef.current.querySelectorAll('.grid-line');
    if (lines.length > 0) {
      animate(lines, {
        opacity: [0.05, 0.4],
        duration: 1200,
        delay: stagger(100),
        ease: 'inOutSine',
      });
    }
  }, [prefersReduced]);

  const valuePoints = [
    'Direct Founder Collaboration',
    'Sub-Second Performance Target',
    '100% Code & Asset Ownership',
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
            ref={svgLinesRef}
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="currentColor" strokeWidth="1" className="grid-line text-zinc-700" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" className="grid-line text-accent/25" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="1" className="grid-line text-zinc-700" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" className="grid-line text-zinc-700" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" className="grid-line text-accent/25" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="1" className="grid-line text-zinc-700" />
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
                We design and build websites that help your business stand out and{' '}
                <Highlight>win clients.</Highlight>
              </h1>
            ) : (
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
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
                  <Highlight>win clients.</Highlight>
                </motion.span>
              </motion.h1>
            )}

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-8 text-base sm:text-xl text-fg-muted max-w-2xl leading-relaxed"
            >
              High-impact, fast, and modern web design for businesses, founders, practices, and brands. No bloated retainers, no generic templates—just clean digital craft built to give your business an unfair advantage.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

              <Button
                variant="ghost"
                size="lg"
                to="/projects"
                icon={<ArrowRight size={16} />}
                className="text-fg-muted hover:text-accent-light w-full sm:w-auto justify-center"
              >
                Projects & Concepts
              </Button>
            </motion.div>

            {/* Value Verification Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
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

          {/* Quiet architectural mark, desktop only — breaks the single-column hero silhouette */}
          <div className="hidden lg:flex relative w-full max-w-xs shrink-0 items-center justify-center py-12">
            <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full opacity-[0.16]" aria-hidden="true">
              <polygon points="130,30 230,30 190,290 90,290" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-border-hairline bg-canvas-subtle px-5 py-4 shadow-[0_0_40px_-14px_rgba(75,80,254,0.4)]"
            >
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
          </div>
        </div>
      </section>

      {/* 01 / Capabilities Matrix Teaser */}
      <section className="py-20 sm:py-24 border-b border-border-hairline bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              index="01"
              tag="CORE CAPABILITIES"
              title="Built for modern businesses & founders."
              description="We specialize in four distinct digital engineering offerings designed to clarify your message, accelerate load speeds, and convert visitors."
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
                No templates. No slow page builders. 100% code ownership.
              </h2>
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                Most agencies trap businesses in bloated WordPress plugins or slow drag-and-drop systems. We handcraft bespoke React and TypeScript digital flagships that load under 500ms and remain completely in your control forever.
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
                    <ShieldCheck size={14} className="text-accent-light" /> 100%
                  </div>
                  <p className="text-xs text-fg-muted">Code & IP ownership</p>
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

      {/* 03 / Projects & Concepts Teaser Banner (Portfolio Archive) */}
      <section className="py-16 sm:py-20 border-b border-border-hairline bg-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-border-hairline bg-canvas p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted">
                <span className="font-mono text-fg-faint text-[11px]">03</span>
                <span className="text-accent">/</span>
                <span className="tracking-widest text-fg-muted">Portfolio Archive</span>
                <span className="text-border-hover hidden sm:inline">•</span>
                <span className="text-fg-subtle hidden sm:inline text-[11px]">Interactive Viewports</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fg tracking-tight">
                Explore our Projects & Concepts archive.
              </h2>
              <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                Inspect dedicated case studies with live desktop (1440px) vs. mobile (390px) responsive viewport simulations across clinical practices, architectural ateliers, luxury commerce, and SaaS platforms.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 font-mono text-xs text-fg-subtle">
                <span className="flex items-center gap-1.5">
                  <Layout size={14} className="text-accent-light" /> Flagship Concepts
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers size={14} className="text-accent-light" /> Practice Concepts
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-accent-light" /> Brand Experiences
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                to="/projects"
                icon={<ArrowRight size={16} />}
                className="w-full sm:w-auto justify-center"
              >
                View Projects & Concepts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
