import React from 'react';
import { m } from 'motion/react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Home, Mail } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative pt-32 pb-24 bg-canvas min-h-[80vh] flex items-center justify-center overflow-hidden panel-texture">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-extrabold text-accent/10 leading-none text-[9rem] sm:text-[14rem] md:text-[18rem] tracking-tighter"
      >
        404
      </span>

      <m.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl mx-auto px-4 sm:px-6 text-center"
      >
        <SectionHeading
          as="h1"
          align="center"
          tag="404 — PAGE NOT FOUND"
          title="This page wandered off-brief."
          description="The route you're looking for doesn't exist, or it's moved. Let's get you back on track."
          className="mb-8"
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="md" to="/" icon={<Home size={15} />}>
            Return Home
          </Button>
          <Button variant="ghost" size="md" to="/contact" icon={<Mail size={15} />}>
            Contact Us
          </Button>
        </div>
      </m.div>
    </div>
  );
};
