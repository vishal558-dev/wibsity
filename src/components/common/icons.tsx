import React from 'react';

/**
 * The site's complete icon set, drawn here rather than pulled from a library.
 *
 * This replaced `lucide-react`. Nine icons is not a dependency's worth of
 * icons, and drawing them locally lets every one share the same 1.5px stroke,
 * flat caps and mitred joints as the logo mark and Archivo's terminals — a
 * library's rounded caps read as a different hand next to this typeface.
 *
 * All of them inherit `currentColor` and size from a single `size` prop, and
 * are `aria-hidden` by default: every icon on this site sits beside a real
 * text label or inside a control that carries its own accessible name.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
});

export const IconMenu: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M3.5 8h17M3.5 16h17" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowUpRight: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" />
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg {...base(size)} className={className}>
    <path
      d="M6.5 3.5h3l1.4 3.6-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 3.6 1.4v3a1.5 1.5 0 0 1-1.7 1.5A15.5 15.5 0 0 1 5 5.2 1.5 1.5 0 0 1 6.5 3.5z"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMail: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M3 5.5h18v13H3z" />
    <path d="M3 6l9 6.5L21 6" />
  </svg>
);

/**
 * WhatsApp's glyph is a brand mark, so unlike the rest of the set it is a
 * filled path at its own official proportions rather than a 1.5px stroke —
 * redrawing it in this system's hand would make it unrecognisable, which is
 * the one thing a channel icon must not be.
 */
export const IconWhatsApp: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </svg>
);

/** Submit-in-progress. CSS rotation, not a JS-driven frame loop. */
export const IconSpinner: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg
    {...base(size)}
    className={className}
    style={{ animation: 'spin 720ms linear infinite' }}
  >
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" strokeLinecap="round" />
  </svg>
);
