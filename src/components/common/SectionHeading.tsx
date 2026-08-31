import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionHeadingProps {
  index: string;
  tag: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  tag,
  title,
  description,
  align = 'left',
  className,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        {
          'text-left': align === 'left',
          'text-center mx-auto max-w-3xl': align === 'center',
        },
        className
      )}
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-3.5 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted"
      >
        <span className="font-mono text-fg-faint text-[11px]">{index}</span>
        <span className="text-accent">/</span>
        <span className="tracking-widest text-fg-muted">{tag}</span>
      </motion.div>

      <motion.h2
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-fg leading-[1.14]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-fg-muted max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
