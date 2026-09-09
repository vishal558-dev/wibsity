import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../common/Logo';
import { IconWhatsApp, IconArrowUpRight } from '../common/icons';
import { CONTACT_INFO } from '../../data/contact';

/**
 * A quiet colophon, not a second call to action.
 *
 * The old footer carried a full CTA band on the homepage plus a 18vw ghosted
 * "wibsity" wordmark at 6% opacity across the bottom of every page. Both are
 * gone: the homepage now ends *in* the enquiry form, so repeating the pitch
 * underneath it was asking twice, and giant decorative background typography
 * was on the list of things this redesign set out to remove.
 *
 * What is left is the information a footer is for — where to go, how to reach
 * a person, and who made this.
 */
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[78rem] px-gutter py-14 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3 -my-2.5 py-2.5" aria-label="wibsity — home">
              <LogoMark size={26} tone="paper" />
              <span
                className="font-sans text-xl font-semibold lowercase leading-none"
                style={{ letterSpacing: '-0.045em' }}
              >
                wibsity
              </span>
            </Link>
            <p className="mt-4 text-lg font-sans text-fg leading-relaxed">
              A web studio in India. Custom sites, built from an empty file,
              at a fixed price agreed before anything starts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:gap-x-20">
            <nav aria-label="Footer" className="flex flex-col gap-3.5">
              <Link to="/services" className="font-sans text-ui text-fg-muted hover:text-fg transition-colors w-fit -my-2.5 py-2.5">
                Services
              </Link>
              <Link to="/about" className="font-sans text-ui text-fg-muted hover:text-fg transition-colors w-fit -my-2.5 py-2.5">
                Studio
              </Link>
              <Link to="/contact" className="font-sans text-ui text-fg-muted hover:text-fg transition-colors w-fit -my-2.5 py-2.5">
                Contact
              </Link>
            </nav>

            <div className="flex flex-col gap-3.5">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-ui text-fg-muted hover:text-fg transition-colors inline-flex items-center gap-2 w-fit -my-2.5 py-2.5"
              >
                <IconWhatsApp size={15} className="whatsapp-icon" />
                <span>WhatsApp</span>
                <IconArrowUpRight size={13} className="text-fg-subtle" />
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-sans text-ui text-fg-muted hover:text-fg transition-colors tnum w-fit -my-2.5 py-2.5"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="font-sans text-ui text-fg-muted hover:text-fg transition-colors break-all w-fit -my-2.5 py-2.5"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="measure mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-sans text-xs text-fg-subtle tnum">© {year} wibsity</p>
          <p className="font-sans text-xs text-fg-subtle">
            Designed and built in-house, which is rather the point.
          </p>
        </div>
      </div>
    </footer>
  );
};
