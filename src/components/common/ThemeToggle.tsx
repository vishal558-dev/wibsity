import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Theme } from '../../hooks/useTheme';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, className }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'w-11 h-11 shrink-0 border border-border-hairline bg-canvas-surface text-fg hover:border-fg transition-colors flex items-center justify-center cursor-pointer',
        className
      )}
    >
      {/* Shows the destination, not the current state — the label already
          says "Switch to X mode", so the icon should match that. */}
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};
