import React from 'react';
import { Section } from '../components/layout/Section';
import { InquiryForm } from '../components/common/InquiryForm';
import { IconWhatsApp, IconPhone, IconMail, IconArrowUpRight } from '../components/common/icons';
import { CONTACT_INFO, whatHappensNext } from '../data/contact';

/**
 * The primary conversion page.
 *
 * The old version put three bordered channel cards first and hid the enquiry
 * behind one of them, which made the secondary channels compete with the
 * primary one. Here the form is the page — it opens on the ink field, above
 * everything else — and the direct channels sit below it as alternatives for
 * people who would rather not fill anything in.
 */
export const ContactPage: React.FC = () => (
  <>
    <Section field="ink" className="pt-6" aria-labelledby="contact-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h1 id="contact-heading" className="text-3xl max-w-[14ch]">
            Tell us what you need.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-fg-muted max-w-[38ch]">
            Four questions and two fields. No obligation at the end of it, and no sequence
            of follow-up emails.
          </p>

          <ol className="mt-12">
            {whatHappensNext.map((item) => (
              <li key={item.step} className="border-t border-rule py-5 flex gap-5">
                <span className="font-sans text-sm text-fg-subtle tnum shrink-0 pt-1">{item.step}</span>
                <div>
                  <h2 className="font-sans text-ui font-medium">{item.title}</h2>
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

    <Section aria-labelledby="direct-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="direct-heading" className="reveal text-2xl max-w-[16ch]">
            Or skip the form entirely.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed max-w-[40ch]">
            All three reach the same person. WhatsApp is usually fastest.
          </p>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6">
          <li>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-t border-rule py-6 transition-colors hover:bg-canvas-sunken"
            >
              <span className="flex items-center gap-4">
                <IconWhatsApp size={19} className="whatsapp-icon text-fg-subtle shrink-0" />
                <span>
                  <span className="block font-sans text-lg text-fg">WhatsApp</span>
                  <span className="block mt-0.5 font-sans text-sm text-fg-muted tnum">
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </span>
              </span>
              <IconArrowUpRight
                size={17}
                className="text-fg-subtle shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </li>
          <li>
            <a
              href={CONTACT_INFO.phoneHref}
              className="group flex items-center justify-between gap-6 border-t border-rule py-6 transition-colors hover:bg-canvas-sunken"
            >
              <span className="flex items-center gap-4">
                <IconPhone size={19} className="text-fg-subtle shrink-0" />
                <span>
                  <span className="block font-sans text-lg text-fg">Call</span>
                  <span className="block mt-0.5 font-sans text-sm text-fg-muted tnum">
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </span>
              </span>
              <IconArrowUpRight
                size={17}
                className="text-fg-subtle shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </li>
          <li>
            <a
              href={CONTACT_INFO.emailHref}
              className="group flex items-center justify-between gap-6 border-y border-rule py-6 transition-colors hover:bg-canvas-sunken"
            >
              <span className="flex items-center gap-4">
                <IconMail size={19} className="text-fg-subtle shrink-0" />
                <span className="min-w-0">
                  <span className="block font-sans text-lg text-fg">Email</span>
                  <span className="block mt-0.5 font-sans text-sm text-fg-muted break-all">
                    {CONTACT_INFO.email}
                  </span>
                </span>
              </span>
              <IconArrowUpRight
                size={17}
                className="text-fg-subtle shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </li>
        </ul>
      </div>
    </Section>
  </>
);
