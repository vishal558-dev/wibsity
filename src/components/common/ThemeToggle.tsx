import React from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Theme } from '../../hooks/useTheme';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, className }) => {
  const prefersReduced = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'w-11 h-11 shrink-0 text-fg-muted hover:text-fg transition-colors flex items-center justify-center cursor-pointer overflow-hidden',
        className
      )}
    >
      {/* Shows the destination, not the current state — the label already
          says "Switch to X mode", so the icon should match that. A small
          rotate+crossfade acknowledges the click itself, which previously
          swapped icons with an instant jump-cut — same fix applied to the
          Navbar hamburger and AboutPage's FAQ Plus/Minus trigger, the other
          two icon-swap toggles in the app that had the same gap. */}
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={prefersReduced ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: prefersReduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
};
