import { useEffect, useRef } from 'react';

/**
 * The hero's background motion graphic: a few hand-authored "cut paper"
 * polygon fragments plus registration-mark ticks/crosshairs, choreographed
 * through named phases rather than a simple loop. Canvas 2D, no WebGL, no
 * primitive shapes-as-decoration — designed to read as reinforcing "built,
 * not assembled" and the site's own `.measure` tick-mark language, not as a
 * generic animated-background template.
 *
 * This is the third deliberate, continuously-looping exception to the
 * site's "nothing loops without an argument" motion doctrine — see "The
 * hero loop overrides" in CLAUDE.md's Motion section for the first two
 * (the rotating headline word, the spinning ring badge) and the trade-off
 * that was raised before adding a third here.
 *
 * Colors are read from --color-ink/--color-accent via getComputedStyle at
 * mount time rather than hardcoded, so the graphic tracks the design
 * system's actual tokens if the palette ever moves.
 */

const CYCLE = 26; // seconds: calm 0-4, enter 4-8, align 8-12, split 12-16, driftAway 16-20, settle 20-26

// Three composition origins (fraction of canvas w/h), cycled round-robin so
// consecutive loops recompose differently without true randomness.
const ORIGINS = [
  { x: 0.8, y: 0.26 },
  { x: 0.88, y: 0.46 },
  { x: 0.74, y: 0.15 },
];

interface Piece {
  color: 'ink' | 'accent';
  fillA: number;
  strokeA: number;
  lw: number;
  points: [number, number][];
  joined: { x: number; y: number; rot: number };
  split: { x: number; y: number; rot: number };
  wobble: { fx: number; fy: number; amp: number; ph: number };
}

// Irregular cropped quads, authored by hand (not primitives). Point lists
// are local offsets; "joined" is the assembled position, "split" is where
// the piece drifts to as the composition breaks apart.
const PIECES: Piece[] = [
  {
    color: 'ink',
    fillA: 0.045,
    strokeA: 0.15,
    lw: 1,
    points: [
      [0, 46],
      [236, 0],
      [268, 318],
      [14, 362],
    ],
    joined: { x: -60, y: -70, rot: -0.02 },
    split: { x: -300, y: -190, rot: -0.13 },
    wobble: { fx: 0.052, fy: 0.041, amp: 5, ph: 0.4 },
  },
  {
    color: 'accent',
    fillA: 0.13,
    strokeA: 0.2,
    lw: 1,
    points: [
      [0, 0],
      [150, 26],
      [128, 186],
      [-14, 164],
    ],
    joined: { x: 200, y: 70, rot: 0.03 },
    split: { x: 350, y: 210, rot: 0.22 },
    wobble: { fx: 0.037, fy: 0.045, amp: 4, ph: 2.1 },
  },
  {
    color: 'ink',
    fillA: 0,
    strokeA: 0.26,
    lw: 1,
    points: [
      [0, 4],
      [402, -34],
      [414, 4],
      [10, 44],
    ],
    joined: { x: -30, y: 250, rot: 0.01 },
    split: { x: -180, y: 350, rot: -0.07 },
    wobble: { fx: 0.043, fy: 0.033, amp: 6, ph: 4.0 },
  },
];

function easeS(x: number) {
  x = Math.min(Math.max(x, 0), 1);
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Returns per-phase scalars for a given point in the CYCLE-second loop.
function phaseParams(localT: number) {
  const BOUNDS = [0, 4, 8, 12, 16, 20, 26];
  const seg = (i: number) => easeS((localT - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]));
  let presence: number;
  let splitAmt: number;
  let markAmt: number;
  if (localT < 4) {
    presence = 0.55 * seg(0);
    splitAmt = 0;
    markAmt = 0;
  } else if (localT < 8) {
    presence = lerp(0.55, 1, seg(1));
    splitAmt = 0;
    markAmt = 0.25 * seg(1);
  } else if (localT < 12) {
    presence = 1;
    splitAmt = 0;
    markAmt = lerp(0.25, 1, seg(2));
  } else if (localT < 16) {
    presence = 1;
    splitAmt = seg(3);
    markAmt = lerp(1, 0.7, seg(3));
  } else if (localT < 20) {
    presence = lerp(1, 0.85, seg(4));
    splitAmt = lerp(1, 1.3, seg(4));
    markAmt = lerp(0.7, 0.15, seg(4));
  } else {
    presence = lerp(0.85, 0, seg(5));
    splitAmt = lerp(1.3, 0, seg(5));
    markAmt = lerp(0.15, 0, seg(5));
  }
  return { presence, splitAmt, markAmt };
}

// Keeps the interesting motion off the headline/paragraph/CTA column.
function clearFactor(x: number, y: number, w: number, h: number) {
  const fx = easeS((x / w - 0.42) / (0.66 - 0.42));
  const fy = easeS((y / h - 0.62) / (0.9 - 0.62));
  return 0.12 + 0.88 * Math.max(fx, fy);
}

function hexAlpha(hex: string, a: number) {
  const v = hex.trim().replace('#', '');
  const r = parseInt(v.substring(0, 2), 16);
  const g = parseInt(v.substring(2, 4), 16);
  const b = parseInt(v.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

type Tier = 'mobile' | 'tablet' | 'desktop';

function activePieces(tier: Tier) {
  if (tier === 'mobile') return [PIECES[1]];
  if (tier === 'tablet') return [PIECES[0], PIECES[1]];
  return PIECES;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const inkHex = styles.getPropertyValue('--color-ink').trim() || '#191917';
    const accentHex = styles.getPropertyValue('--color-accent').trim() || '#0e4b54';
    const colorFor = (c: 'ink' | 'accent') => (c === 'ink' ? inkHex : accentHex);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = { w: 1, h: 1 };
    let tier: Tier = 'desktop';
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };
    let raf = 0;
    const STATIC_T = 10; // an "interesting" frame to hold on before animation starts, or forever under reduced motion

    const drawFrame = (time: number) => {
      const { w, h } = size;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const mx = mouseCurrent.x;
      const my = mouseCurrent.y;

      // Faint drifting guide lines — present everywhere at very low intensity.
      if (tier !== 'mobile') {
        ctx.strokeStyle = hexAlpha(inkHex, 0.045);
        ctx.lineWidth = 1;
        [0.62, 0.84].forEach((fx, i) => {
          const x = fx * w + Math.sin(time * 0.05 + i * 2) * 6 + mx * 4;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        });
        const gy = 0.15 * h + Math.cos(time * 0.04) * 5;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      const cycleIndex = Math.floor(time / CYCLE);
      const localT = time - cycleIndex * CYCLE;
      const origin = ORIGINS[cycleIndex % ORIGINS.length];
      const { presence, splitAmt, markAmt } = phaseParams(localT);
      const ox = origin.x * w;
      const oy = origin.y * h;

      activePieces(tier).forEach((piece, i) => {
        const wob = piece.wobble;
        const wx = Math.sin(time * wob.fx + wob.ph) * wob.amp;
        const wy = Math.cos(time * wob.fy + wob.ph * 1.3) * wob.amp;
        const jx = lerp(piece.joined.x, piece.split.x, Math.min(splitAmt, 1.6));
        const jy = lerp(piece.joined.y, piece.split.y, Math.min(splitAmt, 1.6));
        const rot = lerp(piece.joined.rot, piece.split.rot, Math.min(splitAmt, 1.6));
        const px = ox + jx + wx + mx * (6 + i * 3);
        const py = oy + jy + wy + my * (6 + i * 3);
        const scale = 0.72 + 0.28 * presence;
        const cf = clearFactor(px, py, w, h);
        const alpha = presence * cf;
        if (alpha <= 0.002) return;

        const color = colorFor(piece.color);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rot);
        ctx.scale(scale, scale);
        ctx.beginPath();
        piece.points.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.closePath();
        if (piece.fillA > 0) {
          ctx.fillStyle = hexAlpha(color, piece.fillA * alpha);
          ctx.fill();
        }
        ctx.strokeStyle = hexAlpha(color, piece.strokeA * alpha);
        ctx.lineWidth = piece.lw;
        ctx.stroke();
        ctx.restore();
      });

      // Registration-mark micro-details: ticks, a small cross, a coordinate
      // label — anchored around the cluster, fading with the align phase.
      if (tier !== 'mobile' && markAmt > 0.01) {
        const drawTick = (x: number, y: number, alpha: number) => {
          if (alpha <= 0.01) return;
          const a = alpha * clearFactor(x, y, w, h);
          ctx.strokeStyle = hexAlpha(inkHex, 0.5 * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 14);
          ctx.stroke();
          for (let k = 0; k < 5; k++) {
            ctx.beginPath();
            ctx.moveTo(x + 6 + k * 7, y + 5);
            ctx.lineTo(x + 6 + k * 7, y + 9);
            ctx.strokeStyle = hexAlpha(accentHex, 0.4 * a);
            ctx.stroke();
          }
        };
        const drawCross = (x: number, y: number, alpha: number) => {
          if (alpha <= 0.01) return;
          const a = alpha * clearFactor(x, y, w, h);
          ctx.strokeStyle = hexAlpha(inkHex, 0.5 * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - 6, y);
          ctx.lineTo(x + 6, y);
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x, y + 6);
          ctx.stroke();
        };
        const drawLabel = (x: number, y: number, text: string, alpha: number) => {
          if (alpha <= 0.01) return;
          const a = alpha * clearFactor(x, y, w, h);
          ctx.font = '10px Archivo, monospace';
          ctx.fillStyle = hexAlpha(inkHex, 0.5 * a);
          ctx.fillText(text, x, y);
        };

        drawTick(ox - 40 + mx * 5, oy - 110 + my * 5, markAmt * 0.55);
        drawTick(ox + 260, oy + 260 + my * 4, markAmt * 0.4);
        drawCross(ox + 40 + mx * 6, oy - 40, markAmt * 0.5);
        drawLabel(ox - 90, oy + 300, '04 · 26', markAmt * 0.5);
      }

      // A small always-on accent indicator traveling a short guide path —
      // the one continuously-alive signal, deliberately understated.
      if (tier === 'desktop') {
        const lx = ox - 96;
        const ly0 = oy - 150;
        const ly1 = oy + 120;
        const travel = Math.sin(time * 0.11) * 0.5 + 0.5;
        const ly = lerp(ly0, ly1, travel);
        ctx.strokeStyle = hexAlpha(inkHex, 0.07);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx, ly0);
        ctx.lineTo(lx, ly1);
        ctx.stroke();
        ctx.fillStyle = hexAlpha(accentHex, 0.55 * clearFactor(lx, ly, w, h));
        ctx.beginPath();
        ctx.arc(lx, ly, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      size = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      tier = w < 620 ? 'mobile' : w < 980 ? 'tablet' : 'desktop';
      if (reduced || !raf) drawFrame(STATIC_T);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

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
      return () => resizeObserver.disconnect();
    }

    let last = performance.now();
    let t = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      drawFrame(t);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
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
