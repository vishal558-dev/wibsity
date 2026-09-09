import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Service } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface ServiceTimelineProps {
  services: Service[];
}

/**
 * The service index's entrance: each row is a flat petrol card (reusing
 * `.field-petrol`'s already contrast-verified token remap, not a one-off
 * color) that slides in from off-screen left, staggered, landing in a
 * staircase — a direct, on-instruction reinterpretation of gsap.com's own
 * homepage "GSAP Timeline" demo, built with GSAP's real Timeline/ScrollTrigger
 * API rather than a CSS lookalike. See CLAUDE.md's Motion section for the
 * trade-off this overrides and why.
 *
 * Scrubbed (`scrub: true`), not played-once-on-enter: the timeline's
 * progress is bound directly to scroll position across the section's whole
 * transit through the viewport, so scrolling forward advances it, scrolling
 * back reverses it, and stopping mid-scroll pauses it exactly where it is —
 * real-time, in both directions, on direct instruction.
 */
export function ServiceTimeline({ services }: ServiceTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRef = useRef<HTMLSpanElement>(null);
  const markerTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // gsap.context scopes every tween/ScrollTrigger created inside it so
    // ctx.revert() undoes all of it in one call — safe under both
    // StrictMode's dev-only double-invoke and a real route unmount.
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            end: 'bottom 15%',
            // 1:1 with scroll, no smoothing lag — scrolling stops, the
            // timeline stops. This is what makes it pausable/reversible in
            // real time rather than a triggered one-shot.
            scrub: true,
          },
          defaults: { ease: 'power3.out' },
        });

        tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power2.out' })
          .fromTo(cards, { x: -64, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.16 }, 0.1)
          .fromTo(
            markerTrackRef.current,
            { yPercent: 0 },
            { yPercent: 100, duration: 1.15, ease: 'power2.inOut' },
            0.1
          );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Not part of the waiver: lands everything in its rest state, zero motion.
        gsap.set([...cards, lineRef.current, markerTrackRef.current], { clearProps: 'all' });
      });
    }, root);

    return () => ctx.revert();
  }, [services]);

  return (
    <div ref={rootRef} className="relative">
      <div aria-hidden="true" className="timeline-playhead hidden lg:block">
        <span ref={lineRef} className="timeline-playhead-line" />
        <div ref={markerTrackRef} className="timeline-playhead-marker-track">
          <span className="timeline-playhead-marker" />
        </div>
        <div className="timeline-ruler">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="timeline-ruler-tick" />
          ))}
        </div>
      </div>

      <ul className="lg:pl-14 flex flex-col gap-5 sm:gap-6">
        {services.map((service, i) => (
          <li key={service.id} style={{ '--card-index': i } as React.CSSProperties}>
            <Link
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              to="/services"
              className="timeline-card field-petrol group"
            >
              <div className="flex items-start gap-6 sm:gap-10">
                <span className="timeline-card-figure shrink-0">
                  <span className="sr-only">Delivery: </span>
                  {service.timelineShort}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="widen text-index text-fg">{service.title}</h3>
                  <p className="mt-3 text-fg-muted leading-relaxed max-w-[52ch]">
                    {service.summary}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
