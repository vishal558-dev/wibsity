import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';
import { IconArrowRight, IconPlus, IconMinus, IconWhatsApp } from '../components/common/icons';
import { standardsData, studioFacts } from '../data/studio';
import { faqsData } from '../data/faqs';
import { CONTACT_INFO } from '../data/contact';

/**
 * The studio page.
 *
 * The old version led with "Practical engineering standards, not design fluff"
 * over a textured panel about "high-contrast Swiss typography" and "The 3
 * Non-Negotiable Pillars" — enterprise-agency register on a one-person studio,
 * which reads as cover rather than confidence. This page does the opposite: it
 * states the size of the operation first, in the first sentence, and treats it
 * as the argument rather than the caveat.
 *
 * Nothing here is invented. There are no clients, testimonials, awards, years
 * or project counts on this page because there are none to report; the trust
 * has to come from being specific and checkable instead, which is what the
 * facts list and the standards are for.
 */
export const AboutPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(faqsData[0].id);

  return (
    <>
      <Section className="pt-6" tight>
        <h1 className="text-3xl max-w-[16ch]">A studio of one.</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <p className="lg:col-span-6 text-lg leading-[1.55] text-fg">
            wibsity is one person who designs and builds the site, answers the phone, and
            is still there six months later when you want something changed. There is no
            account manager between you and the work, because there is nobody to be one.
          </p>
          <p className="lg:col-span-5 lg:col-start-8 text-fg-muted leading-relaxed">
            That is a genuine trade. You get the person doing the work, undivided, at a
            price a studio with a floor of staff could not quote. What you do not get is a
            team to absorb a bad week — so the calendar is kept short on purpose, and a
            date that cannot be met is refused rather than quietly moved.
          </p>
        </div>

        <dl className="measure mt-16 pt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {studioFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-sans text-sm text-fg-subtle">{fact.label}</dt>
              <dd className="mt-2 font-sans text-lg text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section ink aria-labelledby="standards-heading">
        <h2 id="standards-heading" className="text-2xl max-w-[20ch]">
          Three things every site gets, whatever it costs.
        </h2>

        <div className="mt-14">
          {standardsData.map((standard) => (
            <div
              key={standard.id}
              className="measure grid gap-4 lg:grid-cols-12 lg:gap-16 py-9 last:pb-0"
            >
              <h3 className="lg:col-span-4 font-sans text-xl">{standard.title}</h3>
              <p className="lg:col-span-7 lg:col-start-6 text-lg leading-relaxed text-fg-muted max-w-[58ch]">
                {standard.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section rule aria-labelledby="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 id="faq-heading" className="text-2xl max-w-[16ch]">
              Questions worth asking before you hire anyone.
            </h2>
            <p className="mt-5 text-fg-muted leading-relaxed max-w-[40ch]">
              Not just us. These are the ones that decide whether a website project goes
              well, and the answers below are ours.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {faqsData.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="border-t border-rule last:border-b">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${faq.id}-panel`}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left font-sans text-lg text-fg cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="shrink-0 mt-1 text-fg-subtle">
                        {isOpen ? <IconMinus size={18} /> : <IconPlus size={18} />}
                      </span>
                    </button>
                  </h3>
                  <div id={`${faq.id}-panel`} className="disclosure" data-open={isOpen}>
                    <div>
                      <p className="pb-7 pr-6 text-fg-muted leading-relaxed max-w-[62ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section rule aria-labelledby="about-cta">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
          <h2 id="about-cta" className="lg:col-span-6 text-2xl max-w-[20ch]">
            Still have a question that is not here?
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-fg-muted leading-relaxed max-w-[42ch]">
              Ask it directly. You will get a straight answer, including when the answer
              is that we are not the right fit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/contact" className="btn btn-primary">
                <span>Get in touch</span>
                <IconArrowRight size={17} />
              </Link>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-ui link inline-flex items-center gap-2 -my-2.5 py-2.5"
              >
                <IconWhatsApp size={15} />
                <span>or message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
