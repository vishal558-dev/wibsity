import React from 'react';
import { m } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../../data/contact';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Persistent floating WhatsApp shortcut for mobile, where the header's own
 * WhatsApp button (`hidden md:flex` in Navbar.tsx) isn't present — a
 * deliberate icon-only floating button rather than a full sticky bar. Reuses
 * Button.tsx's primary-variant gradient/shadow treatment verbatim so it reads
 * as the same brand CTA everywhere else, not a new visual pattern.
 */
export const WhatsAppFab: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <m.a
      href={CONTACT_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with wibsity on WhatsApp"
      initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex md:hidden items-center justify-center fixed right-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-30 w-14 h-14 rounded-full bg-gradient-to-b from-accent to-accent-dark border border-accent-dark/60 shadow-[0_0_0_1px_rgba(75,80,254,0.15),0_8px_24px_-8px_rgba(75,80,254,0.55)] hover:shadow-[0_0_0_1px_rgba(124,130,255,0.3),0_10px_32px_-6px_rgba(75,80,254,0.7)] transition-shadow"
    >
      <WhatsAppIcon size={26} className="text-accent-fg" />
    </m.a>
  );
};
