// scripts/check-contrast.mjs
// Computes WCAG contrast for every real placement the design system produces.
// Run by hand and in verification: `npm run check:contrast`.
//
// Tokens are parsed out of src/index.css's `@theme` block rather than kept as
// a hardcoded copy here — a hardcoded copy verifies what the author intended,
// not what actually ships, and that gap is exactly how a stale palette
// survives a review. If a check below references a token this file cannot
// find in the stylesheet, it fails loudly naming the missing token rather
// than falling back to a default.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, '..', 'src', 'index.css');
const css = readFileSync(cssPath, 'utf8');

// --- Parse every `--color-*: #rrggbb;` declaration out of the @theme block.
const themeStart = css.indexOf('@theme');
if (themeStart === -1) {
  throw new Error(`Could not find an @theme block in ${cssPath}.`);
}
const braceStart = css.indexOf('{', themeStart);
let depth = 0;
let braceEnd = -1;
for (let i = braceStart; i < css.length; i++) {
  if (css[i] === '{') depth++;
  else if (css[i] === '}') {
    depth--;
    if (depth === 0) {
      braceEnd = i;
      break;
    }
  }
}
if (braceEnd === -1) {
  throw new Error(`@theme block in ${cssPath} is never closed.`);
}
const themeBlock = css.slice(braceStart + 1, braceEnd);

const tokens = {};
const tokenRe = /--(color-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g;
let m;
while ((m = tokenRe.exec(themeBlock))) {
  tokens[m[1]] = m[2];
}

/** Looks up `--color-<name>` as parsed from the stylesheet. Fails loudly —
 *  by name — rather than silently defaulting, which is how a renamed or
 *  deleted token would otherwise keep passing an out-of-date check. */
function token(name) {
  const key = `color-${name}`;
  if (!(key in tokens)) {
    throw new Error(
      `Token --${key} is referenced by a contrast check but was not found in ` +
        `${cssPath}'s @theme block. Parsed tokens: ${Object.keys(tokens).join(', ')}`
    );
  }
  return tokens[key];
}

// --- Colour maths -----------------------------------------------------------
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

/** Mirrors CSS color-mix(in srgb, A p%, B) closely enough for a contrast
 *  floor: srgb interpolation is gamma-encoded-space, channel-wise, which is
 *  exactly this weighted average. */
const mix = (a, b, p) => {
  const [ra, ga, ba] = hex(a).map((c) => c * 255);
  const [rb, gb, bb] = hex(b).map((c) => c * 255);
  const f = p / 100;
  const ch = (x, y) => Math.round(x * f + y * (1 - f));
  return `#${[ch(ra, rb), ch(ga, gb), ch(ba, bb)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
};

// --- Tokens, as shipped -------------------------------------------------
const canvas = token('canvas');
const canvasRaised = token('canvas-raised');
const canvasSunken = token('canvas-sunken');
const ink = token('ink');
const inkFg = token('ink-fg');
const petrol = token('petrol-field');
const fg = token('fg');
const fgMuted = token('fg-muted');
const fgSubtle = token('fg-subtle');
const ruleStrong = token('rule-strong');
const accent = token('accent');
const accentWarm = token('accent-warm');
const accentOnDark = token('accent-on-dark');
const accentWarmOnDark = token('accent-warm-on-dark');

// The .field-ink and .field-petrol color-mix percentages, mirrored from
// index.css. These are literal integers in component-layer rules, not
// @theme tokens, so they cannot be parsed the same way — keep them in sync
// with .field-ink / .field-petrol by hand.
const INK_FG_MUTED_PCT = 78;
const INK_FG_SUBTLE_PCT = 64;
const INK_RULE_STRONG_PCT = 45;

const PETROL_FG_MUTED_PCT = 78;
const PETROL_FG_SUBTLE_PCT = 64;
const PETROL_RULE_STRONG_PCT = 45;

// --- Checks, one row per real placement -------------------------------------
// Every row names the rule(s) in index.css/the pages that actually produce
// the pair, not a combination that merely could exist — the previous version
// of this table tested every accent against every ground (pairs no rule
// produces) while missing accent-warm on ink, a pair that ships. A row is
// dropped once nothing in the codebase paints that combination.
const checks = [
  // --- Paper (canvas) and its two tonal steps ---------------------------
  ['fg on canvas', fg, canvas, 4.5, 'default body/heading text'],
  ['fg-muted on canvas', fgMuted, canvas, 4.5, 'secondary paragraphs, chip default text'],
  ['fg-subtle on canvas', fgSubtle, canvas, 4.5, 'footer copy, dt labels, step numerals'],
  ['fg on canvas-raised', fg, canvasRaised, 4.5, '.btn-secondary:hover text over its raised fill'],
  ['fg-muted on canvas-raised', fgMuted, canvasRaised, 4.5, 'PageSpecimen dt labels inside .specimen-panel'],
  ['fg-subtle on canvas-raised', fgSubtle, canvasRaised, 4.5, 'PageSpecimen caption paragraphs'],
  ['fg on canvas-sunken', fg, canvasSunken, 4.5, 'process step name (field-sunken does not remap fg)'],
  ['fg-muted on canvas-sunken', fgMuted, canvasSunken, 4.5, 'process step description, .badge text'],
  ['fg-subtle on canvas-sunken', fgSubtle, canvasSunken, 4.5, 'process step number'],
  ['rule-strong on canvas', ruleStrong, canvas, 3, 'input underlines, secondary-button borders (UI boundary)'],
  ['rule-strong on canvas-sunken', ruleStrong, canvasSunken, 3, 'process step number badge border'],
  ['accent on canvas', accent, canvas, 4.5, 'ServicesPage service.timeline text'],
  ['accent on canvas-raised', accent, canvasRaised, 4.5, 'PageSpecimen figure readings'],
  ['accent-warm on canvas', accentWarm, canvas, 4.5, 'oxide on plain paper'],
  ['accent-warm on canvas-sunken', accentWarm, canvasSunken, 4.5, 'oxide process badges (sunken field leaves accent-warm unmapped)'],

  // --- The accent used as a small fill, not a ground ---------------------
  ['ink-fg on accent', inkFg, accent, 4.5, '::selection background, .btn-primary:hover fill'],

  // --- The ink field -------------------------------------------------------
  ['ink-fg on ink', inkFg, ink, 4.5, '.field-ink base text'],
  ['ink fg-muted on ink', mix(inkFg, ink, INK_FG_MUTED_PCT), ink, 4.5, '.field-ink --color-fg-muted'],
  ['ink fg-subtle on ink', mix(inkFg, ink, INK_FG_SUBTLE_PCT), ink, 4.5, '.field-ink --color-fg-subtle'],
  ['ink rule-strong on ink', mix(inkFg, ink, INK_RULE_STRONG_PCT), ink, 3, '.field-ink --color-rule-strong'],
  ['accent-warm-on-dark on ink', accentWarmOnDark, ink, 4.5, 'oxide inside the ink field (enquiry form numerals)'],

  // --- The petrol field ------------------------------------------------------
  ['ink-fg on petrol', inkFg, petrol, 4.5, '.field-petrol base text'],
  ['petrol fg-muted on petrol', mix(inkFg, petrol, PETROL_FG_MUTED_PCT), petrol, 4.5, '.field-petrol --color-fg-muted'],
  ['petrol fg-subtle on petrol', mix(inkFg, petrol, PETROL_FG_SUBTLE_PCT), petrol, 4.5, '.field-petrol --color-fg-subtle'],
  ['petrol rule-strong on petrol', mix(inkFg, petrol, PETROL_RULE_STRONG_PCT), petrol, 3, '.field-petrol --color-rule-strong'],
  ['accent-on-dark on petrol', accentOnDark, petrol, 4.5, '.field-petrol --color-accent remap'],
  ['accent-warm-on-dark on petrol', accentWarmOnDark, petrol, 4.5, 'oxide inside a petrol field'],
];

let failed = 0;
for (const [name, fgColor, bgColor, floor, why] of checks) {
  const r = ratio(fgColor, bgColor);
  const ok = r >= floor;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1  (need ${floor}:1)  ${name}  — ${why}`);
}

console.log(failed ? `\n${failed} failing pair(s).` : '\nAll pairs pass.');
process.exit(failed ? 1 : 0);
