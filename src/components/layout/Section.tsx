import React from 'react';
import { cn } from '../../utils/cn';

/**
 * The page's only layout primitive: gutter, measure, vertical rhythm, and the
 * optional inverted field.
 *
 * Deliberately thin. It owns the three things that must be consistent across
 * the whole site — the side gutter, the maximum measure, and the space between
 * sections — and nothing else, so individual sections can be composed freely
 * inside it without every one of them turning into the same arrangement of
 * heading, paragraph and cards.
 *
 * `rule` draws the site's signature measure line (see `.measure` in index.css)
 * at the top of the section. It marks a real boundary, so the first section on
 * a page and any section that opens a new field do not get one — there is
 * nothing above them to divide from.
 *
 * Every rule also carries `data-draw`, which is only a hook: the stylesheet
 * animates it in as the section arrives where the browser supports
 * scroll-driven animations, and does nothing at all where it does not. There
 * is no JavaScript behind it and no state in which a rule fails to appear.
 */
export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  /** Inverts the whole band to the ink field. Full-bleed. */
  ink?: boolean;
  /** Draws the measure rule at the top of the section. */
  rule?: boolean;
  /** Trims the vertical rhythm for sections that sit tight to their neighbour. */
  tight?: boolean;
  className?: string;
  'aria-labelledby'?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  ink = false,
  rule = false,
  tight = false,
  className,
  ...props
}) => (
  <section id={id} className={cn(ink && 'field-ink', className)} {...props}>
    <div className="mx-auto w-full max-w-[78rem] px-gutter">
      <div
        className={cn(rule && 'measure', tight ? 'py-16 sm:py-20' : 'py-section')}
        data-draw={rule ? '' : undefined}
      >
        {children}
      </div>
    </div>
  </section>
);
