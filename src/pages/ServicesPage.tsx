import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';
import { IconArrowRight, IconCheck, IconWhatsApp } from '../components/common/icons';
import { servicesData, customWork } from '../data/services';
import { CONTACT_INFO } from '../data/contact';

/**
 * The catalogue, in depth.
 *
 * The old version was a five-card bento grid where every card collapsed to a
 * title and expanded to reveal what it was — which meant the page whose entire
 * job is to explain the offering opened showing almost none of it. Here each
 * service is a full editorial spread with nothing hidden: what it is, who it
 * is for, the problem it solves, what is included, and how long it takes.
 *
 * The title column is sticky on desktop, so the service you are reading stays
 * named while its detail scrolls. That is the whole interaction on this page.
 */
export const ServicesPage: React.FC = () => (
  <>
    <Section className="pt-6" tight>
      <h1 className="text-3xl max-w-[18ch]">What you can hire us for.</h1>
      <p className="mt-8 text-lg leading-[1.55] max-w-[58ch] text-fg">
        Four kinds of project, described in full rather than summarised into a card.
        Each one is quoted at a fixed price against a written scope, so what you read
        here is what arrives.
      </p>
    </Section>

    {servicesData.map((service) => (
      <Section key={service.id} rule id={service.id} aria-labelledby={`${service.id}-title`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="font-sans text-sm text-fg-subtle tnum">{service.index}</span>
            <h2 id={`${service.id}-title`} className="reveal mt-3 text-2xl">
              {service.title}
            </h2>
            <p className="mt-5 text-fg-muted leading-relaxed max-w-[40ch]">{service.summary}</p>
            <p className="mt-6 font-sans text-sm text-accent">{service.timeline}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="font-sans text-sm text-fg-subtle">Who it is for</dt>
                <dd className="mt-2 leading-relaxed">{service.forWhom}</dd>
              </div>
              <div>
                <dt className="font-sans text-sm text-fg-subtle">The problem it solves</dt>
                <dd className="mt-2 leading-relaxed">{service.problem}</dd>
              </div>
            </dl>

            <h3 className="measure mt-12 pt-7 font-sans text-ui font-medium">What is included</h3>
            <ul className="mt-5 grid gap-3.5">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3.5 leading-relaxed">
                  <IconCheck size={17} className="text-accent shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    ))}

    <Section ink aria-labelledby="custom-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="custom-heading" className="reveal lg:col-span-5 text-2xl">
          {customWork.title}
        </h2>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-fg-muted max-w-[54ch]">{customWork.body}</p>
          <p className="mt-6 leading-relaxed text-fg-subtle max-w-[54ch]">
            Anything outside the agreed scope is quoted as its own small job rather than
            appearing on a bill at the end. That is the entire policy.
          </p>
        </div>
      </div>
    </Section>

    <Section rule aria-labelledby="services-cta">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
        <h2 id="services-cta" className="reveal lg:col-span-6 text-2xl max-w-[20ch]">
          Not sure which of these you need?
        </h2>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="text-fg-muted leading-relaxed max-w-[42ch]">
            Describe the business and what you want it to do. Working out the right scope
            is our job, not yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
              <IconWhatsApp size={15} className="whatsapp-icon" />
              <span>or message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  </>
);
