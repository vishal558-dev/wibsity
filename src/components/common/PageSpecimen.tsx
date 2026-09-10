import React, { useEffect, useRef, useState } from 'react';

/**
 * The homepage's one bold moment: the page measures itself, in the visitor's
 * browser, and prints the result.
 *
 * This is where the site's whole argument gets settled. wibsity's pitch is
 * that a built site beats an assembled one, and that is unprovable in prose
 * and completely provable in the artifact — so rather than claim a load time
 * (the previous site claimed "< 500ms" in six places, none of it ever
 * measured), the page reports what actually happened on this device, on this
 * connection, a moment ago.
 *
 * Up to three readings, chosen because the browser can state each one exactly
 * and none of them needs a footnote. Labels are plain-language rather than
 * the Web Performance API terms behind them — the audience is a small-business
 * owner, not a developer — but each still names one honest, literal thing:
 *
 *  - "Appeared in" is first paint, from the Paint Timing API, and falls back
 *    to a plain "reload to see" instead of a real number if the document was
 *    ever hidden before the reading was taken — a tab opened in the
 *    background defers its first paint until you switch to it, which would
 *    print a meaningless eight-second figure under a headline about building
 *    fast sites. An honest fallback beats a flattered number.
 *  - "Files it needed" and "Building blocks" (resource count and DOM element
 *    count) are counted, not sampled. "Building blocks" doubles as a nod to
 *    the site's own pitch — built from pieces, not assembled from a template.
 *
 * A transferred-bytes reading was tried and dropped. Resource Timing reports
 * zero bytes both for cross-origin responses without `Timing-Allow-Origin`
 * and for cache hits, so the figure would silently understate on a repeat
 * visit — and a flattering half-measurement is exactly what this component
 * exists to avoid. Do not add it back without solving that.
 *
 * The plate always shows three rows, so the placeholder and final row counts
 * agree and the bordered panel never resizes. When first paint isn't
 * trustworthy — the tab was ever hidden before the reading was taken —
 * "Appeared in" prints a plain-language fallback instead of being dropped
 * silently: a visitor who opened the link in a backgrounded in-app browser
 * (a routine way real traffic arrives) should see that a reading exists and
 * how to get it, not a panel that quietly shipped one fewer row than usual.
 */

interface Reading {
  label: string;
  value: string;
}

const PLACEHOLDERS: Reading[] = [
  { label: 'Appeared in', value: '—' },
  { label: 'Files it needed', value: '—' },
  { label: 'Building blocks', value: '—' },
];

function measure(trustPaint: boolean): Reading[] {
  const paint = performance
    .getEntriesByType('paint')
    .find((entry) => entry.name === 'first-contentful-paint');

  return [
    trustPaint && paint
      ? { label: 'Appeared in', value: `${(paint.startTime / 1000).toFixed(2)}s` }
      : { label: 'Appeared in', value: 'reload to see' },
    // The document itself is not a resource entry, so it is added back.
    { label: 'Files it needed', value: String(performance.getEntriesByType('resource').length + 1) },
    { label: 'Building blocks', value: String(document.getElementsByTagName('*').length) },
  ];
}

/**
 * Ticks a reading's displayed value up from zero the first time it arrives —
 * the number itself is still the one `measure()` reported, this only spreads
 * its reveal over a beat instead of snapping it in. Only the placeholder →
 * first-real-value transition animates; a later correction from the paint
 * observer just replaces the text outright, since the value has already been
 * shown once by then.
 */
function useCountUp(value: string): string {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;
    if (value === prev) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prev !== '—' || !match || reduceMotion) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const suffix = match[2];
    const duration = 700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return display;
}

function Figure({ reading }: { reading: Reading }) {
  const display = useCountUp(reading.value);
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-rule py-3">
      <dt className="font-sans text-sm text-fg-muted">{reading.label}</dt>
      <dd className="font-sans text-figure tnum text-accent">{display}</dd>
    </div>
  );
}

export const PageSpecimen: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>(PLACEHOLDERS);

  useEffect(() => {
    if (typeof performance === 'undefined' || !performance.getEntriesByType) return;

    // A tab that was ever hidden has a first-paint time that says more about
    // when the person switched to it than about the page.
    let paintIsHonest = document.visibilityState === 'visible';
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') paintIsHonest = false;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const read = () => setReadings(measure(paintIsHonest));

    // Reading once on load is not enough: first contentful paint is sometimes
    // recorded a few milliseconds after the component mounts, and the first
    // attempt then finds no paint entry and prints a dash where the headline
    // figure should be. Observing the entry instead means the plate fills in
    // whenever the browser gets round to reporting it, in whichever order.
    let observer: PerformanceObserver | undefined;
    try {
      observer = new PerformanceObserver(read);
      observer.observe({ type: 'paint', buffered: true });
    } catch {
      // Paint Timing unsupported (older Safari). The other two readings still
      // work; "Appeared in" falls back to the same "reload to see" copy the
      // hidden-tab case uses, via `measure()`'s own missing-`paint` branch.
    }

    // Resources are still arriving during mount, so the file count is only
    // honest once the load event has fired.
    if (document.readyState === 'complete') {
      read();
    } else {
      window.addEventListener('load', read, { once: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('load', read);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Set inside a raised panel (.specimen-panel in index.css) rather than as a
  // strip along the hero's closing rule — the readout is a live instrument
  // reading, genuinely a different material from the page, which is what
  // earns it one of the system's deliberate exceptions to "nothing is a
  // card". Rows read label then figure, separated by hairlines, like a spec
  // sheet rather than three stat tiles.
  return (
    <div className="specimen-panel">
      <p className="font-sans text-xs text-fg-subtle">This page, measured in your browser</p>
      <dl className="mt-5 flex flex-col">
        {readings.map((reading) => (
          <Figure key={reading.label} reading={reading} />
        ))}
      </dl>
      <p className="mt-4 font-sans text-xs text-fg-subtle">Not a claim — a reading.</p>
    </div>
  );
};
