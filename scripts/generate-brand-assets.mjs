/**
 * Regenerates every raster brand asset from a single source of truth.
 *
 * Run with `node scripts/generate-brand-assets.mjs`. It is deliberately not
 * wired into `npm run build` — these assets change roughly never, and a build
 * step that shells out to a browser is a bad trade for that.
 *
 * The mark's geometry lives in three places that must agree: this file,
 * public/favicon.svg, and the `LogoMark` component in
 * src/components/common/Logo.tsx. If the logo is ever redrawn, change all
 * three and re-run this.
 *
 * Rasterising is done by the locally installed Chrome in headless mode, so
 * there is no image-processing dependency in package.json. The .ico is
 * assembled by hand from the generated PNGs — the ICO container is a 6-byte
 * header plus one 16-byte directory entry per frame, and every browser in use
 * accepts PNG-encoded frames inside it.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'wibsity-brand-'));

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error('No Chrome or Edge binary found. Add yours to CHROME_CANDIDATES.');
  process.exit(1);
}

const INK = '#161a19';
const PAPER = '#edece6';

/** The mark's geometry — paper strokes on an ink ground, in a 32-unit square. */
const MARK_BODY =
  `<rect width="32" height="32" fill="${INK}"/>` +
  `<path d="M6 8.5 L10.4 21 L16 12.5 L21.6 21 L26 8.5" fill="none" stroke="${PAPER}" stroke-width="2.9" stroke-linejoin="miter"/>` +
  `<path d="M4 25.4 H28" stroke="${PAPER}" stroke-width="2"/>`;

/**
 * Rasterises the mark at a given size.
 *
 * Not via `--screenshot`: Chrome's headless screenshot silently produces a
 * blank frame for window sizes in roughly the 96-180px band on this machine
 * (48 and 64 are fine, so are 256 and up), which shipped two empty icons the
 * first time this ran. Drawing the SVG into a canvas and reading the data URL
 * back out of the DOM is deterministic at every size, and an SVG `data:` URL
 * does not taint the canvas, so `toDataURL` stays available.
 */
function renderIcons(sizes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="512" height="512">${MARK_BODY}</svg>`;
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><div id="out"></div>
<script>
  (async function () {
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(${JSON.stringify(svg)});
    await img.decode();
    const parts = [];
    for (const size of ${JSON.stringify(sizes)}) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, size, size);
      parts.push(size + '::' + c.toDataURL('image/png').split(',')[1]);
    }
    document.getElementById('out').textContent = parts.join('|||');
  })();
</script></body></html>`;

  const file = path.join(TMP, 'icons.html');
  fs.writeFileSync(file, html);
  const dom = execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--virtual-time-budget=4000',
      '--dump-dom',
      `file:///${file.split('\\').join('/')}`,
    ],
    { maxBuffer: 64 * 1024 * 1024 }
  ).toString();

  const match = dom.match(/<div id="out">([\s\S]*?)<\/div>/);
  if (!match || !match[1].trim()) throw new Error('Icon render produced no output');
  return new Map(
    match[1].split('|||').map((chunk) => {
      const [size, b64] = chunk.split('::');
      return [Number(size), Buffer.from(b64, 'base64')];
    })
  );
}

console.log('Icons');
const ICON_SIZES = [
  [16, 'favicon-16x16.png'],
  [32, 'favicon-32x32.png'],
  [48, null], // embedded in favicon.ico only
  [96, 'favicon-96x96.png'],
  [180, 'apple-touch-icon.png'],
  // Referenced by the ProfessionalService JSON-LD as the square brand mark.
  [512, 'logo-mark-512.png'],
];
const rendered = renderIcons(ICON_SIZES.map(([size]) => size));
for (const [size, name] of ICON_SIZES) {
  if (!name) continue;
  fs.writeFileSync(path.join(PUBLIC, name), rendered.get(size));
  console.log('   public/' + name, rendered.get(size).length + 'B');
}

console.log('favicon.ico');
{
  const frames = [16, 32, 48].map((size) => ({ size, data: rendered.get(size) }));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  const dir = Buffer.alloc(16 * frames.length);
  let offset = header.length + dir.length;
  frames.forEach((frame, i) => {
    const at = i * 16;
    dir.writeUInt8(frame.size, at);
    dir.writeUInt8(frame.size, at + 1);
    dir.writeUInt8(0, at + 2); // palette entries
    dir.writeUInt8(0, at + 3); // reserved
    dir.writeUInt16LE(1, at + 4); // colour planes
    dir.writeUInt16LE(32, at + 6); // bits per pixel
    dir.writeUInt32LE(frame.data.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += frame.data.length;
  });

  fs.writeFileSync(
    path.join(PUBLIC, 'favicon.ico'),
    Buffer.concat([header, dir, ...frames.map((f) => f.data)])
  );
  console.log('   public/favicon.ico');
}

console.log('og-image.png');
{
  // The social card carries the real headline and the real og:description, in
  // the site's own type and colours. If either of those changes in index.html,
  // re-run this so the card does not drift away from the page it links to.
  const og = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300..500&display=swap">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{background:${INK};color:${PAPER};font-family:Archivo,Helvetica,Arial,sans-serif;
       padding:76px 84px;display:flex;flex-direction:column;justify-content:space-between}
  .mark{display:flex;align-items:center;gap:16px}
  .mark svg{width:44px;height:44px}
  .mark span{font-size:34px;font-weight:600;letter-spacing:-0.045em}
  h1{font-size:82px;font-weight:550;letter-spacing:-0.03em;line-height:1.02;max-width:17ch}
  p{font-family:Newsreader,Georgia,serif;font-size:27px;line-height:1.5;color:${PAPER};opacity:.72;max-width:48ch;margin-top:26px}
  .rule{position:relative;border-top:1px solid rgba(237,236,230,.24);padding-top:22px;
        display:flex;justify-content:space-between;align-items:baseline;font-size:20px;color:rgba(237,236,230,.66)}
  .rule::before{content:"";position:absolute;top:0;left:0;width:120px;height:9px;
        background:repeating-linear-gradient(to right,rgba(237,236,230,.55) 0 2px,transparent 2px 17px)}
</style></head><body>
  <div class="mark">
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="${PAPER}"/>
      <path d="M6 8.5 L10.4 21 L16 12.5 L21.6 21 L26 8.5" fill="none" stroke="${INK}" stroke-width="2.9" stroke-linejoin="miter"/>
      <path d="M4 25.4 H28" stroke="${INK}" stroke-width="2"/>
    </svg>
    <span>wibsity</span>
  </div>
  <div>
    <h1>Every site starts as an empty file.</h1>
    <p>A one-person studio in India. Fixed price agreed before anything starts, live in about a week.</p>
  </div>
  <div class="rule"><span>wibsity.in</span><span>Custom websites, built from scratch</span></div>
</body></html>`;
  const file = path.join(TMP, 'og.html');
  fs.writeFileSync(file, og);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=6000',
      `--screenshot=${path.join(PUBLIC, 'og-image.png')}`,
      `file:///${file.replace(/\\/g, '/')}`,
    ],
    { stdio: 'pipe' }
  );
  console.log('   public/og-image.png');
}

fs.rmSync(TMP, { recursive: true, force: true });
// The accent never appears in the icon set on purpose: the mark has to survive
// being reduced to a 16px monochrome favicon, and the hue is reserved for the
// site itself.
console.log('Done.');
