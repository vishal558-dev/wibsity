import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'active' | 'muted';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-2.5 py-1 transition-colors duration-200 select-none border',
        {
          'bg-canvas-surface border-border-hairline text-fg-muted': variant === 'default',
          'bg-transparent border-border-hairline text-fg-subtle hover:text-fg': variant === 'outline',
          'bg-fg text-canvas border-fg font-semibold': variant === 'active',
          'bg-canvas-subtle border-transparent text-fg-faint': variant === 'muted',
        },
        className
      )}
    >
      {children}
    </span>
  );
};
