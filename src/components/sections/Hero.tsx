import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { ArrowDown, CheckCircle2, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CONTACT_INFO } from '../../data/contact';

export const Hero: React.FC = () => {
  const svgLinesRef = useRef<SVGSVGElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !svgLinesRef.current) return;

    const lines = svgLinesRef.current.querySelectorAll('.grid-line');
    if (lines.length > 0) {
      animate(lines, {
        opacity: [0.05, 0.45],
        duration: 1200,
        delay: stagger(100),
        ease: 'inOutSine',
      });
    }
  }, [prefersReduced]);

  const valuePoints = [
    'Direct Founder Collaboration',
    'Mobile-First & Instant Speed',
    '100% Client Code Ownership',
    'Clear Fixed-Scope Proposals',
  ];

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden border-b border-border-hairline bg-canvas">
      {/* Background Architectural SVG Grid Lines (Animated via anime.js v4) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <svg
          ref={svgLinesRef}
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="25%"
            x2="100%"
            y2="25%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
          <line
            x1="0"
            y1="75%"
            x2="100%"
            y2="75%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
          <line
            x1="20%"
            y1="0"
            x2="20%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
          <line
            x1="80%"
            y1="0"
            x2="80%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            className="grid-line text-zinc-700"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Studio Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-6"
          >
            <Badge variant="outline">
              00 / STUDIO INTRODUCTION
            </Badge>
            <span className="font-sans text-xs font-medium text-fg-subtle">
              WEB DESIGN & ENGINEERING
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest text-fg leading-[1.06]"
          >
            We design and build websites that help your business stand out and win clients.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl text-fg-muted max-w-2xl leading-relaxed"
          >
            High-quality, fast, and modern web design for businesses, founders, practices, and brands. No bloated retainers, no generic templates—just clean digital craft built to give your business an unfair advantage.
          </motion.p>

          {/* Action CTAs: Clean WhatsApp, Call, and Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <Button
              variant="primary"
              size="lg"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={18} />}
            >
              Chat on WhatsApp
            </Button>

            <Button
              variant="outline"
              size="lg"
              href={CONTACT_INFO.phoneHref}
              icon={<Phone size={16} />}
              className="text-sm"
            >
              Call Us
            </Button>

            <Button
              variant="ghost"
              size="lg"
              href="#work"
              icon={<ArrowDown size={16} />}
              className="text-fg-muted hover:text-fg"
            >
              Explore Works
            </Button>
          </motion.div>

          {/* Value Verification Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-16 pt-8 border-t border-border-hairline grid grid-cols-2 md:grid-cols-4 gap-4"
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
      </div>
    </section>
  );
};
