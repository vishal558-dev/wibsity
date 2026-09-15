import { useEffect, useRef } from 'react';

/**
 * The hero's background motion graphic: cut-paper ribbons that weave over and
 * under each other, carry a travelling pinch that reads as a fold/twist to
 * the strip's back face, and briefly merge two strips into one before
 * everything tapers away on a 26-second loop. Canvas 2D via `Path2D`, no
 * WebGL, no primitive shapes-as-decoration — designed to read as reinforcing
 * "built, not assembled" the way the site's `.measure` tick-mark language
 * does, not as a generic animated-background template.
 *
 * This is the third deliberate, continuously-looping exception to the
 * site's "nothing loops without an argument" motion doctrine — see "The
 * hero loop overrides" and "The hero background motion graphic" in
 * CLAUDE.md's Motion section for the first two (the rotating headline word,
 * the spinning ring badge) and the trade-off raised before adding this one.
 *
 * Colors are read from --color-ink / --color-canvas-raised /
 * --color-canvas-sunken / --color-rule / --color-accent-warm via
 * getComputedStyle at mount, not hardcoded, so the graphic tracks the design
 * system's real tokens if the palette ever moves. Two exceptions, both
 * one-off literals scoped to this file only (not licensed for reuse
 * elsewhere, the same precedent as `.timeline-card--yellow`'s
 * `--color-yellow-field`): EMERALD/EMERALD_FIELD, `#064E3B`/`#043826`, on
 * direct instruction to keep petrol out of this graphic while still giving
 * the lead ribbon an accent. The oxide ribbon is kept at its natural
 * --color-accent-warm token — a fourth, documented oxide placement (see
 * "Two accents" in CLAUDE.md), also on direct instruction.
 */

const TOTAL = 26;
// Scene boundaries (seconds into the loop), derived from the authored scene
// durations (Emerge 4, Weave 5, Twist 4, Merge 4, Drift 5.5, Settle 3.5).
const CUES = { emerge: 0, weave: 4, twist: 9, merge: 13, drift: 17, settle: 22.5 };

const EMERALD = '#064E3B';
const EMERALD_FIELD = '#043826';

const easeOutQuart = (t: number) => {
  const u = t - 1;
  return 1 - u * u * u * u;
};
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const enter = (u: number) => easeOutQuart(clamp(u, 0, 1));
const draw = (u: number) => easeInOutCubic(clamp(u, 0, 1));
const ramp = (t: number, a: number, b: number) => draw((t - a) / (b - a));
const bell = (t: number, a: number, b: number) => {
  const u = clamp((t - a) / (b - a), 0, 1);
  return draw(u < 0.5 ? u * 2 : (1 - u) * 2);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function hexAlpha(hex: string, a: number) {
  const v = hex.trim().replace('#', '');
  const r = parseInt(v.substring(0, 2), 16);
  const g = parseInt(v.substring(2, 4), 16);
  const b = parseInt(v.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${clamp(a, 0, 1)})`;
}

/* ---- geometry: smooth curves through drifting anchors ------------------ */
type Pt = [number, number];

function crEval(pts: Pt[], u: number): Pt {
  const n = pts.length;
  const seg = Math.min(Math.floor(u * (n - 1)), n - 2);
  const t = u * (n - 1) - seg;
  const p0 = pts[Math.max(seg - 1, 0)];
  const p1 = pts[seg];
  const p2 = pts[seg + 1];
  const p3 = pts[Math.min(seg + 2, n - 1)];
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    0.5 *
      (2 * p1[0] +
        (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
    0.5 *
      (2 * p1[1] +
        (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
  ];
}

// Closed Catmull-Rom as cubic beziers — the cut-paper forms' outlines.
function closedSplinePath(pts: Pt[]): Path2D {
  const n = pts.length;
  const path = new Path2D();
  const at = (k: number) => pts[((k % n) + n) % n];
  path.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    path.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    );
  }
  path.closePath();
  return path;
}

// One side of a band, then back along the other — the strip's cut outline.
function bandPath(pts: Pt[], hw: number[], i0: number, i1: number): Path2D {
  const top: Pt[] = [];
  const bot: Pt[] = [];
  for (let i = i0; i <= i1; i++) {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, pts.length - 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    top.push([pts[i][0] + nx * hw[i], pts[i][1] + ny * hw[i]]);
    bot.push([pts[i][0] - nx * hw[i], pts[i][1] - ny * hw[i]]);
  }
  const path = new Path2D();
  path.moveTo(top[0][0], top[0][1]);
  for (let i = 1; i < top.length; i++) path.lineTo(top[i][0], top[i][1]);
  for (let i = bot.length - 1; i >= 0; i--) path.lineTo(bot[i][0], bot[i][1]);
  path.closePath();
  return path;
}

/* ---- the strips ---------------------------------------------------------
   Five drifting anchor sets per strip (not a sinusoid), a half-width curve
   with pointed ends and a travelling pinch (the "twist"), and a window that
   rides along each strip so it passes over one neighbour and under the next
   — the weave. Colors are resolved against live tokens in `Tokens`. */
const AX = [-340, 300, 960, 1620, 2260];

type Orb = [number, number, number, number, number, number];

interface Strip {
  id: 'far' | 'paper' | 'emerald' | 'ink' | 'oxide';
  w: number;
  ay: [number, number, number, number, number];
  orb: [Orb, Orb, Orb, Orb, Orb];
  tw: [number, number];
  depth: number;
  over: number;
}

const STRIPS: Strip[] = [
  {
    id: 'far',
    w: 250,
    ay: [520, 296, 252, 412, 630],
    orb: [
      [52, 74, 0.061, 0.047, 0.4, 2.1],
      [44, 86, 0.053, 0.071, 1.9, 0.6],
      [60, 92, 0.043, 0.059, 3.4, 4.2],
      [48, 78, 0.067, 0.051, 5.1, 2.8],
      [56, 70, 0.049, 0.063, 0.9, 5.5],
    ],
    tw: [0.113, 0.6],
    depth: 0.25,
    // Was live-blurred (ctx.filter) for a "distance" cue; dropped for
    // performance — a per-frame Gaussian blur over this shape was the
    // single most expensive draw call, and it barely read at this strip's
    // 5.5%/9.5% alpha anyway. ponytail: crisp edges instead of blurred,
    // revisit with a pre-rendered/cached blur if this strip ever needs to
    // read as genuinely out-of-focus.
    over: 0,
  },
  {
    id: 'paper',
    w: 196,
    ay: [60, 286, 566, 836, 1036],
    orb: [
      [58, 66, 0.047, 0.069, 2.6, 1.2],
      [50, 88, 0.071, 0.043, 0.3, 3.9],
      [64, 74, 0.055, 0.061, 4.7, 0.2],
      [42, 90, 0.039, 0.073, 1.4, 4.8],
      [60, 68, 0.063, 0.049, 3.1, 2.4],
    ],
    tw: [0.089, 2.4],
    depth: 0.45,
    over: 0.071,
  },
  {
    id: 'emerald',
    w: 158,
    ay: [772, 604, 474, 372, 296],
    orb: [
      [46, 80, 0.069, 0.051, 1.1, 4.4],
      [62, 72, 0.041, 0.067, 3.8, 1.7],
      [54, 94, 0.059, 0.045, 0.5, 3.2],
      [50, 76, 0.073, 0.057, 2.9, 5.9],
      [58, 84, 0.051, 0.065, 4.4, 0.8],
    ],
    tw: [0.101, 4.1],
    depth: 0.75,
    over: 0.053,
  },
  {
    id: 'ink',
    w: 132,
    ay: [1016, 812, 542, 292, 76],
    orb: [
      [54, 70, 0.043, 0.073, 5.6, 2.2],
      [48, 84, 0.061, 0.047, 2.2, 0.4],
      [66, 78, 0.055, 0.069, 0.8, 4.9],
      [44, 88, 0.071, 0.041, 4.1, 2.7],
      [52, 74, 0.047, 0.059, 1.6, 5.2],
    ],
    tw: [0.079, 1.3],
    depth: 0.6,
    over: 0.061,
  },
  {
    id: 'oxide',
    w: 36,
    ay: [196, 392, 626, 814, 964],
    orb: [
      [60, 86, 0.057, 0.063, 3.3, 1.9],
      [52, 76, 0.045, 0.071, 0.2, 4.6],
      [58, 92, 0.067, 0.049, 4.9, 2.1],
      [46, 80, 0.053, 0.061, 1.8, 0.7],
      [64, 72, 0.073, 0.043, 3.6, 5.1],
    ],
    tw: [0.127, 5.2],
    depth: 1.15,
    over: 0.083,
  },
];

const STRIP_TIERS: Record<Tier, Strip['id'][]> = {
  mobile: ['paper', 'emerald'],
  tablet: ['paper', 'emerald', 'ink', 'oxide'],
  desktop: ['far', 'paper', 'emerald', 'ink', 'oxide'],
};

// Path resolution (segments per strip) per tier — fewer points means less
// crEval/widthsOf/bandPath work every frame, which matters most on the
// weaker CPUs that also happen to hit the 'mobile'/'tablet' tiers.
const TIER_N: Record<Tier, number> = { mobile: 72, tablet: 112, desktop: 168 };

function anchorsOf(r: Strip, T: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < 5; i++) {
    const o = r.orb[i];
    out.push([AX[i] + o[0] * Math.sin(T * o[2] + o[4]), r.ay[i] + o[1] * Math.sin(T * o[3] + o[5])]);
  }
  return out;
}

// Half-width along the strip: pointed ends, an asymmetric swell, and the
// travelling pinch that reads as a twist. `n` is the tier's path resolution
// (TIER_N) — fewer segments on mobile/tablet, where the CPU doing this math
// every frame is weaker.
function widthsOf(r: Strip, T: number, scale: number, twist: number, n: number) {
  const c = 0.5 + 0.28 * Math.sin(T * r.tw[0] + r.tw[1]);
  const hw: number[] = [];
  for (let i = 0; i <= n; i++) {
    const s = i / n;
    // Math.sin(PI*s) is non-negative over [0,1], so sqrt (cheaper than a
    // fractional Math.pow) is exact here, not an approximation.
    let taper = Math.sqrt(Math.sin(Math.PI * s));
    taper *= 0.76 + 0.36 * Math.sin(Math.PI * s + r.tw[1] * 0.5);
    // right-biased swell: the strips are thin where they cross the copy
    // column and carry their real weight out in the open frame
    taper *= 0.46 + 0.74 * Math.sin(Math.PI * Math.pow(s, 1.5));
    const q = (s - c) / 0.05;
    const pinch = 1 - 0.94 * twist * Math.exp(-q * q);
    hw.push(r.w * 0.5 * scale * taper * pinch);
  }
  return { hw, k: Math.round(c * n) };
}

interface Tokens {
  ink: string;
  canvasRaised: string;
  canvasSunken: string;
  rule: string;
  accentWarm: string;
}

function faceStyle(ctx: CanvasRenderingContext2D, id: Strip['id'], pts: Pt[], tk: Tokens) {
  if (id === 'far') return hexAlpha(tk.ink, 0.055);
  if (id === 'paper') return hexAlpha(tk.canvasRaised, 0.94);
  if (id === 'ink') return hexAlpha(tk.ink, 0.085);
  if (id === 'oxide') return hexAlpha(tk.accentWarm, 0.66);
  // emerald: a soft gradient across the strip's own bounding box, the one
  // licensed gradient face in the system (background-only, see CLAUDE.md).
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of pts) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const w = maxX - minX || 1;
  const h = maxY - minY || 1;
  const grad = ctx.createLinearGradient(minX, minY + 0.1 * h, minX + w, minY + 0.9 * h);
  grad.addColorStop(0, hexAlpha(EMERALD, 0.1));
  grad.addColorStop(0.55, hexAlpha(EMERALD, 0.3));
  grad.addColorStop(1, hexAlpha(EMERALD_FIELD, 0.52));
  return grad;
}

function backStyle(id: Strip['id'], tk: Tokens) {
  if (id === 'far') return hexAlpha(tk.ink, 0.095);
  if (id === 'paper') return hexAlpha(tk.canvasSunken, 0.96);
  if (id === 'ink') return hexAlpha(tk.ink, 0.03);
  if (id === 'oxide') return hexAlpha(tk.accentWarm, 0.24);
  return hexAlpha(EMERALD_FIELD, 0.46);
}

function strokeStyle(id: Strip['id'], tk: Tokens): string | null {
  if (id === 'paper') return hexAlpha(tk.rule, 0.85);
  if (id === 'ink') return hexAlpha(tk.ink, 0.26);
  return null;
}

interface Built {
  r: Strip;
  pts: Pt[];
  g: { hw: number[]; k: number };
  a: number;
  tx: number;
  ty: number;
  face: CanvasGradient | string;
  back: string;
  stroke: string | null;
  // Built once per frame and reused for both the base draw and the
  // "weave" overlay redraw — a strip with `over` set gets drawn twice a
  // frame, and rebuilding these from bandPath() a second time (a ~170-point
  // loop) was pure waste, since the points and widths never change between
  // the two draws.
  facePath: Path2D;
  backPath: Path2D;
}

function drawStripBody(ctx: CanvasRenderingContext2D, b: Built, twist: number, ink: string) {
  ctx.fillStyle = b.face;
  ctx.fill(b.facePath);
  ctx.fillStyle = b.back;
  ctx.fill(b.backPath);
  if (b.stroke) {
    ctx.strokeStyle = b.stroke;
    ctx.lineWidth = 1;
    ctx.stroke(b.facePath);
    ctx.stroke(b.backPath);
  }
  // the fold: a fine crease line right at the pinch, so the turn reads as a
  // paper fold rather than a soft width dip. Fades in with the twist.
  if (twist > 0.03) {
    const k = b.g.k;
    const n = b.pts.length - 1;
    const a2 = b.pts[Math.max(k - 1, 0)];
    const b2 = b.pts[Math.min(k + 1, n)];
    const dx = b2[0] - a2[0];
    const dy = b2[1] - a2[1];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const hw = b.g.hw[k] + 3;
    ctx.strokeStyle = hexAlpha(ink, 0.1 + 0.22 * twist);
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(b.pts[k][0] + nx * hw, b.pts[k][1] + ny * hw);
    ctx.lineTo(b.pts[k][0] - nx * hw, b.pts[k][1] - ny * hw);
    ctx.stroke();
  }
}

function drawRibbons(
  ctx: CanvasRenderingContext2D,
  T: number,
  pres: number,
  twist: number,
  merge: number,
  px: number,
  py: number,
  lift: number,
  tk: Tokens,
  active: Strip['id'][],
  frame: number,
  n: number,
) {
  if (pres <= 0.002) return;
  const strips = STRIPS.filter((r) => active.includes(r.id));
  const geo = strips.map((r) => ({ r, anchors: anchorsOf(r, T) }));

  // the morph: the oxide thread is drawn into the emerald strip's path and
  // released again — two strips briefly becoming one form.
  const emeraldGeo = geo.find((o) => o.r.id === 'emerald');
  const oxideGeo = geo.find((o) => o.r.id === 'oxide');
  if (merge > 0.001 && emeraldGeo && oxideGeo) {
    for (let i = 0; i < 5; i++) {
      oxideGeo.anchors[i][0] = mix(oxideGeo.anchors[i][0], emeraldGeo.anchors[i][0], merge * 0.92);
      oxideGeo.anchors[i][1] = mix(oxideGeo.anchors[i][1], emeraldGeo.anchors[i][1], merge * 0.92);
    }
  }

  const built: Built[] = [];
  geo.forEach((o, idx) => {
    const r = o.r;
    const grow = enter((pres - idx * 0.055) / 0.7);
    if (grow <= 0.004) return;
    const pts: Pt[] = [];
    for (let i = 0; i <= n; i++) pts.push(crEval(o.anchors, i / n));
    const scale = grow * (1 - lift * 0.18) * (r.id === 'oxide' ? 1 + merge * 1.9 : 1);
    const g = widthsOf(r, T, scale, twist, n);
    const tx = px * 28 * r.depth;
    const ty = py * 16 * r.depth - lift * 42 * r.depth;
    const a = Math.min(1, pres * 1.9) * Math.min(1, grow * 1.4) * frame;
    built.push({
      r,
      pts,
      g,
      a,
      tx,
      ty,
      face: faceStyle(ctx, r.id, pts, tk),
      back: backStyle(r.id, tk),
      stroke: strokeStyle(r.id, tk),
      facePath: bandPath(pts, g.hw, 0, g.k),
      backPath: bandPath(pts, g.hw, g.k, n),
    });
  });

  built.forEach((b) => {
    ctx.save();
    ctx.globalAlpha = b.a;
    ctx.translate(b.tx, b.ty);
    drawStripBody(ctx, b, twist, tk.ink);
    ctx.restore();
  });

  // the weave: each strip is redrawn on top inside a window that rides along
  // it, so it passes over its neighbours there and under them everywhere
  // else. The window drifts, so who is over whom keeps changing.
  built.forEach((b) => {
    if (!b.r.over) return;
    const os = 0.5 + 0.34 * Math.sin(T * b.r.over * 4.6 + b.r.tw[1] + 1.7);
    const oi = clamp(os * n, 0, n);
    const oi0 = Math.floor(oi);
    const oi1 = Math.min(oi0 + 1, n);
    const ofrac = oi - oi0;
    const cx = mix(b.pts[oi0][0], b.pts[oi1][0], ofrac) + b.tx;
    const cy = mix(b.pts[oi0][1], b.pts[oi1][1], ofrac) + b.ty;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 230, 0, Math.PI * 2);
    ctx.clip();
    ctx.globalAlpha = b.a;
    ctx.translate(b.tx, b.ty);
    drawStripBody(ctx, b, twist, tk.ink);
    ctx.restore();
  });
}

/* ---- the cut-paper forms underneath -------------------------------------
   Three large forms morphing on their own slow clocks, overlapping in
   neutral ground tones — the whole depth system, deliberately colorless so
   the ribbons above carry the only accent color. */
interface Form {
  ax: number[];
  ay: number[];
  orb: [number, number, number, number][];
  depth: number;
  at: number;
  fillToken: 'canvasSunken' | 'canvasRaised' | 'ink';
  fillAlpha: number;
  strokeToken: 'rule' | null;
  strokeAlpha: number;
}

const FORMS: Form[] = [
  {
    ax: [320, 700, 1240, 1720, 1460, 460],
    ay: [372, 108, 54, 404, 872, 916],
    orb: [
      [34, 46, 0.037, 0.051],
      [40, 38, 0.059, 0.043],
      [30, 52, 0.047, 0.061],
      [44, 40, 0.041, 0.055],
      [36, 48, 0.063, 0.039],
      [42, 44, 0.049, 0.067],
    ],
    depth: 0.16,
    at: 0.1,
    fillToken: 'canvasSunken',
    fillAlpha: 0.92,
    strokeToken: null,
    strokeAlpha: 0,
  },
  {
    ax: [880, 1480, 1980, 1860, 1240, 840],
    ay: [648, 412, 704, 1010, 1080, 968],
    orb: [
      [38, 42, 0.043, 0.057],
      [32, 50, 0.061, 0.039],
      [46, 36, 0.051, 0.063],
      [34, 48, 0.039, 0.047],
      [42, 40, 0.067, 0.053],
      [30, 46, 0.055, 0.041],
    ],
    depth: 0.3,
    at: 0.35,
    fillToken: 'canvasRaised',
    fillAlpha: 0.9,
    strokeToken: 'rule',
    strokeAlpha: 0.5,
  },
  {
    ax: [1300, 1780, 2120, 1900, 1420],
    ay: [104, 48, 356, 632, 468],
    orb: [
      [40, 44, 0.049, 0.061],
      [36, 38, 0.037, 0.053],
      [44, 46, 0.063, 0.041],
      [32, 50, 0.055, 0.047],
      [38, 42, 0.043, 0.059],
    ],
    depth: 0.42,
    at: 0.6,
    fillToken: 'ink',
    fillAlpha: 0.05,
    strokeToken: null,
    strokeAlpha: 0,
  },
];

const FORM_TIERS: Record<Tier, number> = { mobile: 1, tablet: 2, desktop: 3 };

function drawForms(
  ctx: CanvasRenderingContext2D,
  T: number,
  pres: number,
  px: number,
  py: number,
  lift: number,
  tk: Tokens,
  count: number,
  frame: number,
) {
  if (pres <= 0.002) return;
  FORMS.slice(0, count).forEach((fm, idx) => {
    const p = enter((pres - fm.at * 0.4) / 0.72);
    if (p <= 0.004) return;
    const pts: Pt[] = fm.ax.map((x, i) => {
      const o = fm.orb[i];
      return [
        x + o[0] * Math.sin(T * o[2] + i * 1.7 + idx),
        fm.ay[i] + o[1] * Math.sin(T * o[3] + i * 2.3 + idx * 0.7),
      ];
    });
    const sc = mix(0.9, 1, p);
    const path = closedSplinePath(pts);
    const tx = px * 16 * fm.depth;
    const ty = py * 10 * fm.depth - lift * 26 * fm.depth;
    ctx.save();
    ctx.globalAlpha = Math.min(1, pres * 1.9) * p * frame;
    ctx.translate(tx, ty);
    ctx.translate(960, 540);
    ctx.scale(sc, sc);
    ctx.translate(-960, -540);
    ctx.fillStyle = hexAlpha(tk[fm.fillToken], fm.fillAlpha);
    ctx.fill(path);
    if (fm.strokeToken) {
      ctx.strokeStyle = hexAlpha(tk[fm.strokeToken], fm.strokeAlpha);
      ctx.lineWidth = 1;
      ctx.stroke(path);
    }
    ctx.restore();
  });
}

interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/* Keeps the headline/paragraph/CTA column legible: a soft destination-out
   hole punched over the real, measured `[data-hero-copy]` DOM rect, the
   same idea as the design package's own blurred SVG mask rect — applied
   once to the whole already-drawn composition rather than as a per-shape
   opacity guess. A per-shape sample (this file's first pass) is wrong for
   ribbons this long: one strip can run from deep inside the copy column to
   well clear of it, and a single alpha for the whole shape either exposes
   it over the text or crushes it everywhere else. Punching the hole in
   screen space after drawing dims exactly the pixels that are actually
   behind the text, regardless of which strip put them there.

   The blur itself only runs into `maskCtx` when `copyRect` changes (resize),
   not every animation frame — a `ctx.filter` Gaussian blur is one of the
   more expensive things Canvas 2D can do, and this rectangle is static
   between resizes, so paying for it 60 times a second bought nothing. Each
   frame just composites the already-blurred bitmap in with `drawImage`. */
function paintMask(maskCtx: CanvasRenderingContext2D, w: number, h: number, rect: Rect) {
  const maskCanvas = maskCtx.canvas;
  maskCanvas.width = Math.max(1, Math.round(w));
  maskCanvas.height = Math.max(1, Math.round(h));
  if (rect.right <= rect.left || rect.bottom <= rect.top) return;
  const pad = 48;
  maskCtx.save();
  maskCtx.filter = 'blur(72px)';
  maskCtx.fillStyle = 'rgba(0,0,0,0.92)';
  maskCtx.fillRect(
    rect.left - pad,
    rect.top - pad,
    rect.right - rect.left + pad * 2,
    rect.bottom - rect.top + pad * 2,
  );
  maskCtx.restore();
}

type Tier = 'mobile' | 'tablet' | 'desktop';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const tk: Tokens = {
      ink: styles.getPropertyValue('--color-ink').trim() || '#191917',
      canvasRaised: styles.getPropertyValue('--color-canvas-raised').trim() || '#fbf9f4',
      canvasSunken: styles.getPropertyValue('--color-canvas-sunken').trim() || '#e9e4d8',
      rule: styles.getPropertyValue('--color-rule').trim() || '#d2cbbd',
      accentWarm: styles.getPropertyValue('--color-accent-warm').trim() || '#8f4420',
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = { w: 1, h: 1 };
    let copyRect: Rect = { left: 0, top: 0, right: 0, bottom: 0 };
    let tier: Tier = 'desktop';
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };
    let raf = 0;
    const STATIC_T = 6; // an "interesting" frame to hold on before animation starts, or forever under reduced motion

    const maskCtx = document.createElement('canvas').getContext('2d');

    const drawFrame = (time: number) => {
      const { w, h } = size;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const T = time - Math.floor(time / TOTAL) * TOTAL;
      const pres = Math.min(ramp(T, 0, CUES.weave + 0.6), 1 - ramp(T, CUES.settle + 0.6, TOTAL));
      const twist =
        ramp(T, CUES.twist - 1.2, CUES.twist + 2.2) * (1 - 0.35 * ramp(T, CUES.settle, TOTAL - 1));
      const merge = bell(T, CUES.merge - 0.6, CUES.drift + 0.4);
      const scroll = ramp(T, CUES.settle, CUES.settle + 2.2);
      const px = mouseCurrent.x;
      const py = mouseCurrent.y;

      // a gentle full-composition breathing zoom across the loop, plus a
      // quick fade at the very start/end so the loop's wrap point never cuts
      const cam = 1 + (0.02 * (1 - Math.cos((2 * Math.PI * T) / TOTAL))) / 2;
      const camY = -9 * Math.sin((2 * Math.PI * T) / TOTAL);
      const frame = Math.min(ramp(T, 0, 0.4), 1 - ramp(T, TOTAL - 0.6, TOTAL));

      const scale = w / 1920;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(cam, cam);
      ctx.translate(-w / 2, -h / 2 + camY * scale);
      ctx.scale(scale, scale);

      drawForms(ctx, T, pres, px, py, scroll, tk, FORM_TIERS[tier], frame);
      drawRibbons(ctx, T, pres, twist, merge, px, py, scroll, tk, STRIP_TIERS[tier], frame, TIER_N[tier]);
      ctx.restore();

      // back in plain dpr-scaled CSS-px space here, matching copyRect and
      // the pre-blurred maskCtx bitmap
      if (maskCtx) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(maskCtx.canvas, 0, 0);
        ctx.restore();
      }

      ctx.restore();
    };

    const copyEl = container.querySelector<HTMLElement>('[data-hero-copy]');

    const resize = () => {
      const containerRect = container.getBoundingClientRect();
      const w = Math.max(containerRect.width, 1);
      const h = Math.max(containerRect.height, 1);
      size = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      tier = w < 620 ? 'mobile' : w < 980 ? 'tablet' : 'desktop';
      if (copyEl) {
        const r = copyEl.getBoundingClientRect();
        copyRect = {
          left: r.left - containerRect.left,
          top: r.top - containerRect.top,
          right: r.right - containerRect.left,
          bottom: r.bottom - containerRect.top,
        };
      }
      if (maskCtx) paintMask(maskCtx, w, h, copyRect);
      if (reduced || !raf) drawFrame(STATIC_T);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    if (copyEl) resizeObserver.observe(copyEl);

    // Ambient background motion nobody can see is wasted battery — pause the
    // draw loop entirely once the hero has scrolled out of view, the same
    // idea `useHeroSetProgress`'s own IntersectionObserver gate already uses
    // for the hero's scroll listener.
    let heroVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        heroVisible = entries[entries.length - 1]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(container);

    let onPointerMove: ((e: PointerEvent) => void) | undefined;
    if (!coarse && !reduced) {
      onPointerMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseTarget.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    if (reduced) {
      drawFrame(STATIC_T);
      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
      };
    }

    // This is a slow, ambient 26s loop — nothing about it needs to match a
    // 60/120/144Hz display's own refresh rate. Capping the actual redraws to
    // ~30fps (while still advancing `t` and the pointer-lean smoothing every
    // real tick, so motion speed and responsiveness stay correct) roughly
    // halves the fill/stroke work on a high-refresh-rate screen for no
    // visible difference in a composition this gentle.
    const FRAME_INTERVAL_MS = 1000 / 30;
    let lastDrawMs = 0;
    let last = performance.now();
    let t = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden || !heroVisible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      if (now - lastDrawMs < FRAME_INTERVAL_MS) return;
      lastDrawMs = now;
      drawFrame(t);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
