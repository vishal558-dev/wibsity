/**
 * Picking readable text over an arbitrary, non-theme colour.
 *
 * The concept mocks in `components/projects/ConceptPreview.tsx` fill surfaces
 * with each mocked business's own brand colour, which is a plain hex with no
 * relationship to wibsity's theme tokens. `readableOn()` decides whether ink or
 * paper goes on top of it, using the theme-invariant `--color-ink-fixed` /
 * `--color-paper-fixed` poles declared in index.css.
 */

/**
 * WCAG 2.x relative luminance.
 *
 * The channels must be gamma-linearised *before* they're weighted. An earlier
 * version of this weighted the raw sRGB values and compensated with a
 * hand-tuned `> 0.6` threshold; that misjudged mid-tone warm colours. On the
 * roastery's terracotta (#C2703D) it returned 0.493 and so picked near-white
 * text at 3.58:1 — below AA — where the correct value of 0.234 picks ink at
 * 5.4:1.
 */
export function relativeLuminance(hex: string): number {
  const c = hex.replace('#', '');
  const channel = (pair: string) => {
    const v = parseInt(pair, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(c.slice(0, 2)) +
    0.7152 * channel(c.slice(2, 4)) +
    0.0722 * channel(c.slice(4, 6))
  );
}

/**
 * Returns the CSS value for text laid over `hex`.
 *
 * 0.179 is the luminance at which black and white text contrast equally
 * (`sqrt(1.05 * 0.05) - 0.05`), so it's the correct crossover point rather than
 * an eyeballed one. Current concept accents, all clearing AA:
 *
 *   #38bdf8 sky        L 0.440 -> ink,   9.3:1
 *   #5B6473 graphite   L 0.126 -> paper, 5.8:1
 *   #C2703D terracotta L 0.234 -> ink,   5.4:1
 */
export function readableOn(hex: string): string {
  return relativeLuminance(hex) > 0.179
    ? 'var(--color-ink-fixed)'
    : 'var(--color-paper-fixed)';
}
