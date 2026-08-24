import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'active' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider transition-colors duration-200 select-none border',
        {
          'text-[10px] px-2 py-0.5': size === 'sm',
          'text-xs px-2.5 py-1': size === 'md',
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
