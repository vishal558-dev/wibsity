import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout/Section';
import { IconArrowRight } from '../components/common/icons';

/**
 * An empty screen is an invitation to act, so this one offers the three places
 * worth going rather than an apology. The giant ghosted "404" that used to sit
 * behind this page went with the rest of the decorative background typography.
 */
export const NotFoundPage: React.FC = () => (
  <Section className="pt-6">
    <p className="font-sans text-sm text-fg-subtle tnum">404</p>
    <h1 className="mt-4 text-3xl max-w-[16ch]">This page is not here.</h1>
    <p className="mt-7 text-lg leading-relaxed text-fg-muted max-w-[46ch]">
      Either the address is wrong or the page has moved. Everything on the site is one of
      these three.
    </p>

    <nav aria-label="Site sections" className="mt-14 max-w-xl">
      {[
        { to: '/', label: 'Home', desc: 'What the studio does, and how it works.' },
        { to: '/services', label: 'Services', desc: 'The three kinds of project, in full.' },
        { to: '/contact', label: 'Contact', desc: 'Start a project, or just ask.' },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="group flex items-center justify-between gap-6 border-t border-rule last:border-b py-6 transition-colors hover:bg-canvas-sunken"
        >
          <span>
            <span className="block font-sans text-lg text-fg">{item.label}</span>
            <span className="block mt-1 text-fg-muted">{item.desc}</span>
          </span>
          <IconArrowRight
            size={17}
            className="text-fg-subtle shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      ))}
    </nav>
  </Section>
);
