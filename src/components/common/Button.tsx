import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/**
 * There are two buttons on this site.
 *
 * `primary` is a field inversion — ink on paper in the light theme, paper on
 * ink in the dark one, and it flips again inside a `.field-ink` section. That
 * is what replaced the old gradient-and-glow CTA, and it is why no call to
 * action here needs a shadow or an accent fill to be the loudest thing on
 * screen. `secondary` is a hairline outline.
 *
 * All the visual work lives in `.btn*` in index.css so the same classes can be
 * applied to a plain `<button>` inside a form without importing this at all.
 *
 * One filled primary per cluster remains the rule: anything else in the same
 * group should be `secondary` or a plain `.link`.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  /** Trailing icon. Leading icons are only used for the submit spinner. */
  icon?: React.ReactNode;
  /** Internal route. */
  to?: string;
  /** External URL. */
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  to,
  href,
  target,
  rel,
  className,
  ...props
}) => {
  const classes = cn(
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    size === 'sm' && 'btn-sm',
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
