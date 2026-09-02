import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { Button } from '../common/Button';
import { CONTACT_INFO } from '../../data/contact';
import { smoothScrollToTop } from '../../utils/scroll';
import { useTheme } from '../../hooks/useTheme';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = CONTACT_INFO.whatsappUrl;
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/logo-light.png' : '/logo.png';
  const logoMarkSrc = theme === 'light' ? '/logo-mark-light.png' : '/logo-mark.png';
  // CTA banner is homepage-only — every subpage (services/about/contact)
  // already ends with its own SectionHeading + direct-action content right
  // above this shared footer, so repeating the same pitch again here read
  // as one CTA too many.
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const handleLinkClick = () => {
    smoothScrollToTop(0.9);
  };

  return (
    <footer className="border-t border-border-hairline bg-canvas relative overflow-hidden">
      {/* Upper CTA Banner — homepage only (see isHome above). Full-bleed
          band rather than another boxed card, so it reads as a real section
          break instead of one more bordered rectangle in the stack. */}
      {isHome && (
        <div className="w-full border-b border-border-hairline bg-canvas-subtle relative overflow-hidden">
          <div className="accent-glow w-96 h-96 -top-32 -right-24 opacity-50" aria-hidden="true" />

          <div className="absolute top-0 right-0 p-4 font-sans text-[10px] text-fg-faint uppercase tracking-wider hidden sm:flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            DIRECT INTAKE
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
            <div className="max-w-3xl">
              <span className="font-sans text-xs font-semibold text-accent-light uppercase tracking-wider block mb-3">
                Project Inquiry
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
                Ready to build a website that sets your business apart?
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-fg-muted leading-relaxed">
                We collaborate with businesses, founders, and modern brands who value clean design and fast performance. Connect directly via WhatsApp, phone, or view our contact hub.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<WhatsAppIcon size={18} />}
                  className="w-full sm:w-auto justify-center"
                >
                  Chat on WhatsApp
                </Button>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="font-sans text-xs font-semibold text-fg-muted hover:text-fg underline underline-offset-4 transition-colors -my-3.5 py-3.5"
                >
                  or view contact details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links Row */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8 sm:pt-12 border-t border-border-hairline">
          <div className="space-y-3 max-w-xs">
            <Link to="/" onClick={handleLinkClick} className="inline-block focus:outline-none" aria-label="wibsity home">
              <img
                src={logoSrc}
                alt="wibsity"
                width={938}
                height={296}
                loading="lazy"
                decoding="async"
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-xs text-fg-muted leading-relaxed">
              Digital design and web engineering studio for modern brands and growing practices.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-fg-muted">
            <Link to="/" onClick={handleLinkClick} className="hover:text-fg transition-colors -my-3.5 py-3.5">
              Home
            </Link>
            <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors -my-3.5 py-3.5">
              Services
            </Link>
            <Link to="/about" onClick={handleLinkClick} className="hover:text-fg transition-colors -my-3.5 py-3.5">
              Studio & FAQ
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="hover:text-fg transition-colors -my-3.5 py-3.5">
              Contact
            </Link>
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-fg-muted">
            <a
              href={CONTACT_INFO.phoneHref}
              className="flex items-center gap-2 hover:text-fg transition-colors -my-3.5 py-3.5"
            >
              <Phone size={13} className="text-fg-faint" />
              <span>Call</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-fg transition-colors -my-3.5 py-3.5"
            >
              <WhatsAppIcon size={13} className="text-fg-faint" />
              <span>WhatsApp</span>
            </a>
            <a
              href={CONTACT_INFO.emailHref}
              className="flex items-center gap-2 hover:text-fg transition-colors font-mono -my-3.5 py-3.5"
            >
              <Mail size={13} className="text-fg-faint" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Legal and System Notice */}
        <div className="mt-16 pt-8 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-fg-faint">
          <div className="flex items-center gap-2.5">
            <img
              src={logoMarkSrc}
              alt=""
              aria-hidden="true"
              width={334}
              height={243}
              loading="lazy"
              decoding="async"
              className="h-3.5 w-auto object-contain opacity-75"
            />
            <span>© {currentYear} wibsity. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>WEB DESIGN & ENGINEERING STUDIO</span>
          </div>
        </div>
      </div>

      {/* Typographic Wordmark at bottom */}
      <div className="w-full select-none pointer-events-none overflow-hidden flex justify-center py-4 opacity-[0.06] border-t border-border-hairline">
        <span className="font-sans font-black text-[18vw] leading-none tracking-tighter text-fg lowercase">
          wibsity
        </span>
      </div>
    </footer>
  );
};
