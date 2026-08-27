import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'wibsity-theme';
// Fired whenever any useTheme() instance changes the theme, so every other
// mounted instance (e.g. Navbar and Footer each call this hook separately)
// re-syncs immediately instead of only picking up the change on next mount.
const THEME_CHANGE_EVENT = 'wibsity-theme-change';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#08080a');
  }
}

export function useTheme(): { theme: Theme; setTheme: (next: Theme) => void } {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onThemeChange = (event: Event) => {
      setThemeState((event as CustomEvent<Theme>).detail);
    };
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

    let mediaQuery: MediaQueryList | undefined;
    let onSystemChange: ((event: MediaQueryListEvent) => void) | undefined;
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      onSystemChange = (event) => {
        // Only follow the OS preference live if the viewer hasn't made an explicit choice.
        if (getStoredTheme() === null) {
          setThemeState(event.matches ? 'dark' : 'light');
        }
      };
      mediaQuery.addEventListener('change', onSystemChange);
    }

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
      if (mediaQuery && onSystemChange) {
        mediaQuery.removeEventListener('change', onSystemChange);
      }
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persistence unavailable (storage-blocked context); keep the toggle
      // working for this session even though it won't survive a reload.
    }
    setThemeState(next);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: next }));
  }, []);

  return { theme, setTheme };
}
