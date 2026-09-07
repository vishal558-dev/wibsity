import React, { useEffect, useState } from 'react';

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
 * and none of them needs a footnote:
 *
 *  - First paint comes from the Paint Timing API, and is omitted entirely if
 *    the document was ever hidden before the reading was taken — a tab opened
 *    in the background defers its first paint until you switch to it, which
 *    would print a meaningless eight-second figure under a headline about
 *    building fast sites. Two honest readings beat three with an asterisk.
 *  - Files and elements are counted, not sampled.
 *
 * A transferred-bytes reading was tried and dropped. Resource Timing reports
 * zero bytes both for cross-origin responses without `Timing-Allow-Origin`
 * and for cache hits, so the figure would silently understate on a repeat
 * visit — and a flattering half-measurement is exactly what this component
 * exists to avoid. Do not add it back without solving that.
 *
 * The labels render before the values do, so the plate reserves its own space
 * and measuring costs no layout shift.
 */

interface Reading {
  label: string;
  value: string;
}

const PLACEHOLDER: Reading[] = [
  { label: 'First paint', value: '—' },
  { label: 'Files loaded', value: '—' },
  { label: 'Page elements', value: '—' },
];

function measure(trustPaint: boolean): Reading[] {
  const paint = performance
    .getEntriesByType('paint')
    .find((entry) => entry.name === 'first-contentful-paint');

  return [
    ...(trustPaint && paint
      ? [{ label: 'First paint', value: `${(paint.startTime / 1000).toFixed(2)}s` }]
      : []),
    // The document itself is not a resource entry, so it is added back.
    { label: 'Files loaded', value: String(performance.getEntriesByType('resource').length + 1) },
    { label: 'Page elements', value: String(document.getElementsByTagName('*').length) },
  ];
}

export const PageSpecimen: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>(PLACEHOLDER);

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
      // work; the plate simply comes up with two rows instead of three.
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

  // Set as a strip along the hero's closing rule rather than three stat tiles.
  // Tiles are the default treatment for any number on any site; this should
  // read like the spec line stamped along a ruler.
  return (
    <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-3 sm:gap-x-14">
      {readings.map((reading) => (
        <div key={reading.label} className="flex items-baseline gap-2.5">
          <dt className="font-sans text-sm text-fg-subtle">{reading.label}</dt>
          <dd className="font-sans text-xl font-medium tracking-tight tnum text-accent">
            {reading.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
