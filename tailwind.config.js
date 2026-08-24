/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#08080a',
          subtle: '#0e0e11',
          surface: '#141418',
          elevated: '#1a1a20',
        },
        border: {
          hairline: '#27272a',
          hover: '#3f3f46',
          active: '#52525b',
        },
        fg: {
          DEFAULT: '#fafafa',
          muted: '#a1a1aa',
          subtle: '#71717a',
          faint: '#52525b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'widest-plus': '0.18em',
      },
      boxShadow: {
        'subtle-card': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'glow-white': '0 0 30px rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
};
