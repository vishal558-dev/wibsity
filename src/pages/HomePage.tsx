import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';
import { PageSpecimen } from '../components/common/PageSpecimen';
import { InquiryForm } from '../components/common/InquiryForm';
import { IconArrowRight, IconWhatsApp } from '../components/common/icons';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { faqsData } from '../data/faqs';
import { comparisonRows } from '../data/studio';
import { whatHappensNext, CONTACT_INFO } from '../data/contact';
import { trackSpotlight } from '../utils/spotlight';

const HEADLINE = 'Every site starts as an empty file.';

/**
 * Splits the headline into word spans so each one can set itself on its own
 * delay (see `.set-word` in index.css).
 *
 * The gaps are REAL trailing space characters, not a CSS margin. A margin looks
 * identical and makes selecting or copying the line yield a run-together
 * string, and risks the accessible name computing as one token.
 */
function SetHeadline({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="set-word" style={{ '--i': i } as React.CSSProperties}>
            {word}
          </span>{' '}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * The hero's second statement (see `.hero-swap` in index.css): a genuinely
 * different message, not a re-styled echo of the primary headline. "Every
 * site starts as an empty file." is the promise; this is the part most
 * studios don't say out loud — the honest half of the same thought.
 *
 * This used to be revealed by moving the cursor over the headline. It is now
 * shown automatically, once, to every visitor: `.hero-swap` sets it in after
 * a held beat on the primary line, holds it in turn, then swaps back and
 * rests on the primary line permanently. Automatic means every visitor sees
 * it rather than only the ones who happened to hover, which is also why this
 * stays `aria-hidden` and the primary headline stays the one real, permanent
 * `<h1>` — the swap is a visual moment layered on top of the actual content,
 * not a second piece of content in its own right.
 *
 * Set at `.reveal-type`, which matches `.hero-type`'s resting weight, stretch
 * and colour exactly — full strength, not a fainter "draft" treatment — so it
 * lands as an equally real statement. The surprise lives entirely in the
 * words.
 *
 * The line break is hardcoded, the same reasoning `SetHeadline` uses for the
 * primary line: a headline-scale statement gets an art-directed break, not
 * whatever the viewport happens to produce.
 */
function RevealHeadline() {
  return (
    <p className="reveal-type hero-swap__alt text-hero max-w-[13ch]" aria-hidden="true">
      Most fill it
      <br />
      with a template.
    </p>
  );
}

/**
 * Writes the hero's scroll progress to a custom property so the headline can
 * shrink and lift away as it leaves (see `.hero-type`).
 *
 * Deliberately narrow: one rAF-batched listener, one property, and an
 * IntersectionObserver gate so scrolling the rest of the page costs nothing.
 * It does not run at all under reduced motion — the type simply stays set.
 *
 * Two things make the result feel continuous rather than stepped, which an
 * earlier version of this effect did not:
 *
 *  - `--hero-set` is written at full precision on every rAF tick. A previous
 *    pass rounded it to twenty steps to limit how often `font-stretch`
 *    re-shapes the line, which is real work — but the visible staircase that
 *    produced was worse than the cost it was avoiding.
 *  - `--hero-set` is registered via `@property` in index.css specifically so
 *    the `transition` declared on `.hero-type` can act on it. Transitioning a
 *    typed custom property turns this stream of discrete JS writes into one
 *    continuously eased value — the actual fix, not the raw write frequency.
 */
function useHeroSetProgress() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = true;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const height = el.offsetHeight || 1;
      // 1 at the top of the hero, 0 by the time it has scrolled about half its
      // own height away — deliberately faster than a 1:1 mapping to the full
      // height, which read as sluggish against how little the page had moved.
      const progress = Math.min(Math.max(1 - window.scrollY / (height * 0.52), 0), 1);
      el.style.setProperty('--hero-set', progress.toFixed(4));
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { threshold: 0 }
    );
    observer.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    paint();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/**
 * Six sections. Each answers one question a visitor arrives with, and no two
 * are built the same way — a display-scale index, an inverted comparison table,
 * a measured sequence, a disclosure list, a form.
 *
 * The motion is one idea used four times (see the MOTION block in index.css):
 * type sets itself on load, widens under the pointer, shrinks and lifts away
 * as the hero leaves, and section rules draw when they arrive. The hero
 * headline also, once, resets into a second statement and back — the same
 * "type being set" wipe, just run twice more. Nothing fades up on scroll —
 * that pattern is why the previous pass read as documentation with good
 * typography rather than as something made on purpose.
 */
export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(faqsData[0].id);
  const homeFaqs = faqsData.slice(0, 3);
  const heroRef = useHeroSetProgress();

  return (
    <>
      {/* ------------------------------------------------------------------
          Hero. One statement at display scale, one line of positioning, one
          action — and, once settled, a brief automatic swap onto a second,
          different statement and back (see .hero-swap / RevealHeadline). The
          specimen panel sits beside the lead and CTA rather than below them,
          so the live reading is visible without scrolling; a closing measure
          rule marks the real boundary into the next section.
          ------------------------------------------------------------------ */}
      <section ref={heroRef} className="relative overflow-hidden" data-field="paper">
        <div className="relative mx-auto w-full max-w-[78rem] px-gutter">
          <div className="pt-[clamp(2.25rem,9vh,7.5rem)] pb-[clamp(2.5rem,8vh,5.5rem)]">
            <div className="hero-swap">
              <div className="hero-swap__primary">
                <h1 className="hero-type text-hero max-w-[13ch] text-fg">
                  <SetHeadline text={HEADLINE} />
                </h1>
              </div>
              <RevealHeadline />
            </div>

            <div className="mt-[clamp(2.5rem,7vh,4.5rem)] grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="enter enter-1 lg:col-span-6">
                <p className="text-2xl leading-[1.2] text-fg max-w-[26ch]">
                  Hand-built websites for businesses that care how they look.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Start a project</span>
                  </Link>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-ui link inline-flex items-center gap-2 -my-2.5 py-2.5"
                  >
                    <IconWhatsApp size={15} className="whatsapp-icon" />
                    <span>or WhatsApp</span>
                  </a>
                </div>
                <p className="mt-6 font-sans text-sm text-fg-muted">
                  A one-person studio in India. Accepting new projects.
                </p>
              </div>

              <div className="enter enter-2 lg:col-span-5 lg:col-start-8">
                <PageSpecimen />
              </div>
            </div>
          </div>

          <div className="measure pb-4" />
        </div>
      </section>

      {/* ------------------------------------------------------------------
          What we make. The heading holds as a sticky margin rail while the
          list scrolls past beside it, set at display size — the titles are
          the composition, and each row's rule draws under the pointer while
          its letterforms widen. No numbering: four services are a menu, not
          a sequence, so the one figure worth showing per row is delivery
          time, not position in a list.
          ------------------------------------------------------------------ */}
      <Section aria-labelledby="build-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 id="build-heading" className="reveal text-2xl">
                Four things you can hire us for.
              </h2>
              <Link to="/services" className="btn btn-secondary btn-sm mt-7">
                <span>See what each includes</span>
              </Link>
            </div>
          </div>

          <ul className="lg:col-span-8 lg:col-start-5">
            {servicesData.map((service) => (
              <li key={service.id} className="last:border-b">
                <Link
                  to="/services"
                  className="index-row spotlight group py-7 sm:py-9"
                  onMouseMove={trackSpotlight}
                >
                  {/* The row's own content sits in a positioned child so the
                      spotlight tint (an absolutely positioned pseudo-element,
                      see .spotlight in index.css) paints behind it. */}
                  <div className="flex items-start gap-6 sm:gap-10">
                    <span className="font-sans text-sm text-accent tnum shrink-0 pt-2 sm:pt-4">
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
      </Section>

      {/* ------------------------------------------------------------------
          The anti-template argument, as a two-column opposition rather than
          a manifesto or a spreadsheet. On the petrol field — the page's one
          chromatic climax — no glow, no gradient, no accent needed. Depth
          carries the hierarchy: the template column is recessed
          (.compare-cell-template), the built column is raised
          (.compare-cell-built). Padding is more generous than its neighbours
          on purpose, so the colour reads as a considered plate with air
          rather than a banner; the heading stays at text-3xl and never rises
          toward hero scale.
          ------------------------------------------------------------------ */}
      <Section field="petrol" className="py-2" aria-labelledby="choice-heading">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <p className="lg:col-span-4 lg:col-start-9 lg:row-start-1 text-lg leading-relaxed text-fg-muted">
            Not design taste. The difference is structural, and you feel it a year later
            rather than on launch day.
          </p>
          <h2 id="choice-heading" className="reveal text-3xl max-w-[20ch] lg:col-span-6 lg:row-start-2">
            What you are actually choosing between.
          </h2>
        </div>

        {/* This drops <table> semantics: the content is a comparison rather
            than data anyone reads across axes, and the heading-per-aspect
            structure below keeps it navigable. Each cell carries its own
            sr-only "As a template: " / "Built for you: " label, so the
            template/built distinction is announced on every row rather than
            relying on visual column position. The header row below is purely
            decorative and stays aria-hidden — since every cell now labels
            itself, the header would only duplicate what a screen reader
            already hears. Below md each aspect stacks with the template
            treatment first and visually muted. */}
        <div className="mt-10">
          <div className="compare-row" aria-hidden="true">
            <div className="hidden md:block px-6 py-2" />
            <div className="compare-cell-template py-2">
              <span className="font-sans text-sm text-fg-subtle">A template</span>
            </div>
            <div className="compare-cell-built py-2">
              <span className="font-sans text-lg font-medium text-fg">Built for you</span>
            </div>
          </div>

          {comparisonRows.map((row) => (
            <div key={row.aspect} className="compare-row">
              <h3 className="px-6 pt-4 pb-2 md:py-4 font-sans text-sm font-normal text-fg-subtle">
                {row.aspect}
              </h3>
              <div className="compare-cell-template">
                <p className="text-sm text-fg-muted leading-relaxed">
                  <span className="sr-only">As a template: </span>
                  {row.template}
                </p>
              </div>
              <div className="compare-cell-built">
                <p className="text-lg text-fg leading-relaxed">
                  <span className="sr-only">Built for you: </span>
                  {row.built}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Process. A genuine sequence, which is the only reason it is numbered.
          The hierarchy is inverted on purpose: what the project costs the client
          in time is set larger than what we do, because that is the part worth
          reading and the part nobody else states.
          ------------------------------------------------------------------ */}
      <Section rule field="sunken" aria-labelledby="process-heading">
        {/* Inverted from a heading-left / paragraph-right row: the small
            paragraph sits left, the display heading sits right and
            right-aligned, so this section no longer opens the same way as
            "What we make" or "What you are choosing between". */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <p className="lg:col-span-4 text-fg-muted leading-relaxed max-w-[38ch]">
            The parts that need you are short and specific. The rest happens without you
            having to chase it.
          </p>
          <h2
            id="process-heading"
            className="reveal text-3xl lg:col-span-7 lg:col-start-6 lg:text-right"
          >
            About a week. And about an hour of your time.
          </h2>
        </div>

        {/* A connected sequence rather than four separate cards: a shared
            rail at lg carries a marker that travels the row as the section
            scrolls through view (see .process-rail in index.css, built on
            the same scroll-driven-animation primitive as the measure rule's
            own draw-in), and each step still opens on its own measure rule —
            main line plus station, not either instead of the other. Below
            lg, where the steps stack in one column instead of a row, an
            arrow between each one carries the same "this leads to that"
            idea in a shape that reads vertically. */}
        <div className="mt-16">
          <div className="process-rail hidden lg:block" data-draw />

          <ol className="mt-0 lg:mt-9 flex flex-col gap-y-10 lg:flex-row lg:items-start lg:gap-y-0 lg:gap-x-10">
            {processData.map((step, i) => (
              <React.Fragment key={step.step}>
                <li className="measure pt-6 lg:flex-1" data-draw>
                  <div className="flex items-center gap-3">
                    <span className="tnum flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule-strong font-sans text-sm text-fg-subtle">
                      {step.step}
                    </span>
                    <h3 className="font-sans text-lg font-medium text-fg">{step.name}</h3>
                  </div>
                  <span className="badge mt-4">{step.yours}</span>
                  <p className="mt-4 text-fg-muted leading-relaxed">{step.description}</p>
                </li>
                {i < processData.length - 1 && (
                  <li aria-hidden="true" className="pl-4 text-fg-subtle lg:hidden">
                    <IconArrowRight size={18} className="rotate-90" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Questions. Framed as what to ask anyone, not as support content —
          which turns an FAQ into a trust device, and puts objection handling
          directly above the ask.
          ------------------------------------------------------------------ */}
      <Section rule aria-labelledby="questions-heading">
        {/* No separate heading block: the list's own top rule carries the
            heading and the link, and the rows run full width beneath it —
            this stays on paper, unlike the process section above it. */}
        <div className="flex flex-col gap-4 border-b border-rule-strong pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div>
            <h2 id="questions-heading" className="reveal text-2xl">
              Worth asking whoever you hire.
            </h2>
            <p className="mt-3 text-fg-muted leading-relaxed max-w-[46ch]">
              Including us. Here are the three that matter most, answered plainly.
            </p>
          </div>
          <Link to="/about" className="btn btn-secondary btn-sm shrink-0">
            <span>All nine questions</span>
            <IconArrowRight size={15} />
          </Link>
        </div>

        <div>
          {homeFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="faq-row border-t border-rule last:border-b"
                data-open={isOpen}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                    className="group w-full flex items-start justify-between gap-6 py-6 text-left font-sans text-lg text-fg cursor-pointer"
                  >
                    <span className="widen">{faq.question}</span>
                    <span className="cross shrink-0 mt-2" data-open={isOpen} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${faq.id}-panel`} className="disclosure" data-open={isOpen}>
                  <div>
                    <p className="pb-7 pr-10 text-fg-muted leading-relaxed max-w-[72ch]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          The close. The page ends inside the form rather than pointing at a
          contact page — which is why the footer carries no CTA band.
          ------------------------------------------------------------------ */}
      <Section field="ink" id="start" aria-labelledby="start-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="start-heading" className="reveal text-3xl max-w-[12ch]">
              Tell us what you need.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-fg-muted max-w-[34ch]">
              Four questions and two fields. No obligation at the end of it, and no
              sequence of follow-up emails.
            </p>

            <ol className="mt-12">
              {whatHappensNext.map((item) => (
                <li key={item.step} className="border-t border-rule py-5 flex gap-5">
                  <span className="font-sans text-sm text-fg-subtle tnum shrink-0 pt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-sans text-ui font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-fg-muted leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <InquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
};
