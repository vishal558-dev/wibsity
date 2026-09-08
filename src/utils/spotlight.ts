import type React from 'react';

/**
 * Writes the pointer position, as percentages of the element's own box, to
 * `--mx`/`--my` — read by `.spotlight` in index.css to recentre a radial
 * tint under the cursor. Kept as plain style properties rather than React
 * state so the row does not re-render on every mouse-move.
 */
export function trackSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}
