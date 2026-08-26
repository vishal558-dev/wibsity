import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../utils/cn';
import { smoothScrollToTop } from '../../utils/scroll';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  href,
  to,
  target,
  rel,
  ...props
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium font-sans transition-all duration-200 cursor-pointer select-none text-center relative group',
    {
      // Variants
      'bg-gradient-to-b from-accent to-accent-dark text-accent-fg hover:from-accent hover:to-accent-dark border border-accent-dark/60 font-semibold shadow-[0_0_0_1px_rgba(75,80,254,0.15),0_8px_24px_-8px_rgba(75,80,254,0.55)] hover:shadow-[0_0_0_1px_rgba(124,130,255,0.3),0_10px_32px_-6px_rgba(75,80,254,0.7)] active:scale-[0.98]':
        variant === 'primary',
      'bg-canvas-surface text-fg hover:bg-canvas-elevated hover:border-accent/50 border border-border-hairline':
        variant === 'secondary',
      'bg-transparent text-fg border border-border-hairline hover:border-accent/60 hover:bg-canvas-surface hover:text-accent-light':
        variant === 'outline',
      'bg-transparent text-fg-muted hover:text-accent-light hover:bg-canvas-surface border border-transparent':
        variant === 'ghost',

      // Sizes
      'text-xs px-3.5 py-1.5 gap-1.5': size === 'sm',
      'text-sm px-5 py-2.5 gap-2': size === 'md',
      'text-base px-7 py-3.5 gap-2.5': size === 'lg',
    },
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={baseClasses}
        onClick={(e) => {
          smoothScrollToTop(0.9);
          if (props.onClick) {
            (props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
          }
        }}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};
