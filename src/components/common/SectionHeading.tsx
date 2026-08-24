import React from 'react';
import { motion } from 'motion/react';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 mb-4"
      >
        <Badge variant="outline">
          {index} / {tag}
        </Badge>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg leading-[1.12]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
