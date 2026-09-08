// scripts/check-contrast.mjs
// Computes WCAG contrast for every pair the design spec pins a floor on.
// Run by hand and in Phase 2/3 verification: `npm run check:contrast`.

const hex = (h) => {
  const n = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
};

const lum = (h) =>
  hex(h)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);

const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Mirrors CSS color-mix(in srgb, A p%, B) closely enough for a contrast floor. */
const mix = (a, b, p) => {
  const [ra, ga, ba] = hex(a).map((c) => c * 255);
  const [rb, gb, bb] = hex(b).map((c) => c * 255);
  const f = p / 100;
  const ch = (x, y) => Math.round(x * f + y * (1 - f));
  return `#${[ch(ra, rb), ch(ga, gb), ch(ba, bb)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
};

const T = {
  canvas: '#EFEAE0',
  canvasRaised: '#F8F4ED',
  canvasSunken: '#E4DDD0',
  ink: '#191917',
  inkFg: '#EFEAE0',
  petrol: '#0C3F49',
  fg: '#1A1815',
  fgMuted: '#54504A',
  fgSubtle: '#605B52',
  ruleStrong: '#7C7568',
  accent: '#0E4B54',
  accentWarm: '#9C4B24',
  accentOnDark: '#7FB7BE',
};

// The comparison columns are one elevation step from the petrol field.
const petrolRecessed = mix(T.ink, T.petrol, 22);
const petrolRaised = mix(T.inkFg, T.petrol, 8);

const checks = [
  ['fg on canvas', T.fg, T.canvas, 4.5],
  ['fg-muted on canvas', T.fgMuted, T.canvas, 4.5],
  ['fg-subtle on canvas', T.fgSubtle, T.canvas, 4.5],
  ['fg-subtle on canvas-sunken', T.fgSubtle, T.canvasSunken, 4.5],
  ['fg-subtle on canvas-raised', T.fgSubtle, T.canvasRaised, 4.5],
  ['rule-strong on canvas', T.ruleStrong, T.canvas, 3],
  ['rule-strong on canvas-sunken', T.ruleStrong, T.canvasSunken, 3],
  ['accent on canvas', T.accent, T.canvas, 4.5],
  ['accent-warm on canvas', T.accentWarm, T.canvas, 4.5],
  ['accent-warm on canvas-sunken', T.accentWarm, T.canvasSunken, 4.5],
  ['ink-fg on petrol', T.inkFg, T.petrol, 4.5],
  ['accent-on-dark on petrol', T.accentOnDark, T.petrol, 4.5],
  ['ink-fg on petrol-recessed', T.inkFg, petrolRecessed, 4.5],
  ['ink-fg on petrol-raised', T.inkFg, petrolRaised, 4.5],
  ['petrol muted on recessed col', mix(T.inkFg, petrolRecessed, 78), petrolRecessed, 4.5],
  ['ink-fg on ink', T.inkFg, T.ink, 4.5],
  ['ink fg-muted on ink', mix(T.inkFg, T.ink, 78), T.ink, 4.5],
  ['ink fg-subtle on ink', mix(T.inkFg, T.ink, 64), T.ink, 4.5],
  ['ink rule-strong on ink', mix(T.inkFg, T.ink, 45), T.ink, 3],
];

let failed = 0;
for (const [name, fg, bg, floor] of checks) {
  const r = ratio(fg, bg);
  const ok = r >= floor;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1  (need ${floor}:1)  ${name}`);
}

console.log(`\nDerived: petrol-recessed ${petrolRecessed}, petrol-raised ${petrolRaised}`);
console.log(failed ? `\n${failed} failing pair(s).` : '\nAll pairs pass.');
process.exit(failed ? 1 : 0);
