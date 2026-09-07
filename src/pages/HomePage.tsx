import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';
import { PageSpecimen } from '../components/common/PageSpecimen';
import { ConstructionGrid } from '../components/common/ConstructionGrid';
import { InquiryForm } from '../components/common/InquiryForm';
import { IconArrowRight, IconWhatsApp } from '../components/common/icons';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { faqsData } from '../data/faqs';
import { comparisonRows } from '../data/studio';
import { whatHappensNext, CONTACT_INFO } from '../data/contact';

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
 * Writes the hero's scroll progress to a custom property so the headline can
 * compress as it leaves (see `.hero-type`).
 *
 * Deliberately narrow: one rAF-batched listener, one property, and an
 * IntersectionObserver gate so scrolling the rest of the page costs nothing.
 * It does not run at all under reduced motion — the type simply stays set.
 */
function useHeroSetProgress() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = true;
    let frame = 0;

    let last = -1;

    const paint = () => {
      frame = 0;
      const height = el.offsetHeight || 1;
      // 1 at the top of the hero, 0 once it has scrolled a full height away.
      const progress = Math.min(Math.max(1 - window.scrollY / height, 0), 1);
      // Quantised to twenty steps. This property drives `font-stretch`, which
      // re-shapes the line and re-instances the variable font — real layout
      // work, and not worth doing every frame for 0.75% of width per step.
      const stepped = Math.round(progress * 20) / 20;
      if (stepped === last) return;
      last = stepped;
      el.style.setProperty('--hero-set', String(stepped));
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
 * type sets itself on load, widens under the pointer, compresses as the hero
 * leaves, and section rules draw when they arrive. Nothing fades up on scroll —
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
          action — and, under the pointer, the construction the page is set on.
          The specimen strip sits along the closing rule as the reward for the
          first scroll rather than competing with the headline.
          ------------------------------------------------------------------ */}
      <section ref={heroRef} className="relative overflow-hidden">
        <ConstructionGrid />

        <div className="relative mx-auto w-full max-w-[78rem] px-gutter">
          <div className="pt-[clamp(2.25rem,9vh,7.5rem)] pb-[clamp(2.5rem,8vh,5.5rem)]">
            <h1 className="hero-type text-hero max-w-[13ch] text-fg">
              <SetHeadline text={HEADLINE} />
            </h1>

            <div className="mt-[clamp(2.5rem,7vh,4.5rem)] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
              <p className="enter enter-1 lg:col-span-7 text-2xl leading-[1.2] text-fg max-w-[26ch]">
                Hand-built websites for businesses that care how they look.
              </p>

              <div className="enter enter-2 lg:col-span-4 lg:col-start-9">
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Start a project</span>
                    <IconArrowRight size={17} />
                  </Link>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-ui link inline-flex items-center gap-2 -my-2.5 py-2.5"
                  >
                    <IconWhatsApp size={15} />
                    <span>or WhatsApp</span>
                  </a>
                </div>
                <p className="mt-5 font-sans text-sm text-fg-muted">
                  A one-person studio in India. Accepting new projects.
                </p>
              </div>
            </div>
          </div>

          <div className="enter enter-3 measure pt-6 pb-14 sm:pb-20 flex flex-col gap-5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-12">
            <PageSpecimen />
            <p className="font-sans text-sm text-fg-subtle lg:text-right max-w-[34ch]">
              This page, measured in your browser just now. Not a claim — a reading.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          What we make. An index set at display size, not a list of small text —
          the titles are the composition, and each row's rule draws under the
          pointer while its letterforms widen.
          ------------------------------------------------------------------ */}
      <Section aria-labelledby="build-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-12">
          <h2 id="build-heading" className="text-2xl max-w-[16ch]">
            Four things you can hire us for.
          </h2>
          <Link to="/services" className="btn btn-secondary btn-sm shrink-0">
            <span>See what each includes</span>
            <IconArrowRight size={15} />
          </Link>
        </div>

        <ul className="mt-14 sm:mt-20">
          {servicesData.map((service) => (
            <li key={service.id} className="last:border-b last:border-rule">
              <Link to="/services" className="index-row group py-7 sm:py-9">
                <div className="flex items-start gap-6 sm:gap-10">
                  <span className="font-sans text-sm text-fg-subtle tnum shrink-0 pt-2 sm:pt-4">
                    {service.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="widen text-index text-fg">{service.title}</h3>
                    <p className="mt-3 text-fg-muted leading-relaxed max-w-[52ch]">
                      {service.summary}
                    </p>
                  </div>
                  <span className="index-marker text-fg-subtle shrink-0 pt-2 sm:pt-4">
                    <IconArrowRight size={20} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------------
          The anti-template argument, as a comparison rather than a manifesto.
          On the inverted field, which is what marks it as the page's strongest
          statement — no glow, no gradient, no accent needed.
          ------------------------------------------------------------------ */}
      <Section ink aria-labelledby="choice-heading">
        <h2 id="choice-heading" className="text-3xl max-w-[20ch]">
          What you are actually choosing between.
        </h2>
        <p className="mt-7 text-lg leading-relaxed text-fg-muted max-w-[46ch]">
          Not design taste. The difference is structural, and you feel it a year later
          rather than on launch day.
        </p>

        {/* Genuinely tabular data, so it is a table. Below md the table elements
            switch to block layout and the column headings are repeated inside
            each cell — two 40%-wide columns of running prose on a phone is
            unreadable, and dropping to one column per row keeps the comparison
            legible without giving up the semantics. */}
        <table className="mt-16 w-full text-left border-collapse block md:table">
          <caption className="sr-only">
            A template-based website compared with one built from scratch
          </caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-rule-strong">
              <th scope="col" className="sr-only">
                Aspect
              </th>
              <th
                scope="col"
                className="py-4 pr-8 font-sans text-ui font-medium text-fg-subtle align-bottom w-[39%]"
              >
                A template
              </th>
              <th scope="col" className="py-4 font-sans text-ui font-medium align-bottom w-[39%]">
                Built for you
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {comparisonRows.map((row) => (
              <tr
                key={row.aspect}
                className="block md:table-row border-t border-rule md:border-t-0 md:border-b md:border-rule align-top pt-7 pb-2 md:py-0"
              >
                <th
                  scope="row"
                  className="block md:table-cell md:py-6 md:pr-8 text-left font-sans text-sm font-normal text-fg-subtle md:w-[22%]"
                >
                  {row.aspect}
                </th>
                <td className="block md:table-cell pt-3 md:py-6 md:pr-8 text-fg-muted leading-relaxed">
                  <span className="md:hidden font-sans text-sm text-fg-subtle">Template: </span>
                  {row.template}
                </td>
                <td className="block md:table-cell pt-2 pb-5 md:py-6 leading-relaxed">
                  <span className="md:hidden font-sans text-sm text-fg-subtle">Built: </span>
                  {row.built}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* ------------------------------------------------------------------
          Process. A genuine sequence, which is the only reason it is numbered.
          The hierarchy is inverted on purpose: what the project costs the client
          in time is set larger than what we do, because that is the part worth
          reading and the part nobody else states.
          ------------------------------------------------------------------ */}
      <Section rule aria-labelledby="process-heading">
        {/* Set at display scale and full width rather than as another
            heading-left / paragraph-right row: three sections in a row opening
            the same way is the composition reading as a template, and this
            claim — an hour of your time — is the strongest thing on the page
            after the hero. */}
        <h2 id="process-heading" className="text-3xl max-w-[24ch]">
          About a week. And about an hour of your time.
        </h2>
        <p className="mt-8 ml-auto text-fg-muted leading-relaxed max-w-[38ch] lg:text-right">
          The parts that need you are short and specific. The rest happens without you
          having to chase it.
        </p>

        <ol className="mt-16 grid gap-y-14 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {processData.map((step) => (
            <li key={step.step} className="measure pt-6" data-draw>
              <div className="flex items-baseline gap-3 font-sans text-sm text-fg-subtle">
                <span className="tnum">{step.step}</span>
                <h3 className="font-normal text-fg-subtle">{step.name}</h3>
              </div>
              <p className="mt-4 font-sans text-xl leading-tight text-fg">{step.yours}</p>
              <p className="mt-4 text-fg-muted leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------------
          Questions. Framed as what to ask anyone, not as support content —
          which turns an FAQ into a trust device, and puts objection handling
          directly above the ask.
          ------------------------------------------------------------------ */}
      <Section rule className="bg-canvas-sunken" aria-labelledby="questions-heading">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div>
            <h2 id="questions-heading" className="text-2xl max-w-[22ch]">
              Worth asking whoever you hire.
            </h2>
            <p className="mt-5 text-fg-muted leading-relaxed max-w-[46ch]">
              Including us. Here are the three that matter most, answered plainly.
            </p>
          </div>
          <Link to="/about" className="btn btn-secondary btn-sm shrink-0">
            <span>All nine questions</span>
            <IconArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-14 max-w-[68ch]">
          {homeFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="border-t border-rule last:border-b">
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
                    <p className="pb-7 pr-10 text-fg-muted leading-relaxed max-w-[62ch]">
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
      <Section ink id="start" aria-labelledby="start-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="start-heading" className="text-3xl max-w-[12ch]">
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
