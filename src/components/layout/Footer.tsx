import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
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

  const handleLinkClick = () => {
    smoothScrollToTop(0.9);
  };

  return (
    <footer className="border-t border-border-hairline bg-canvas relative overflow-hidden">
      {/* Upper CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="accent-glow w-72 h-72 -top-24 -right-24 opacity-60" aria-hidden="true" />

          <div className="absolute top-0 right-0 p-4 font-sans text-[10px] text-fg-faint uppercase tracking-wider hidden sm:flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            DIRECT INTAKE
          </div>

          <div className="max-w-3xl relative">
            <span className="font-sans text-xs font-semibold text-accent-light uppercase tracking-wider block mb-3">
              Project Inquiry
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
              Ready to build a website that sets your business apart?
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-fg-muted leading-relaxed">
              We collaborate with businesses, founders, and modern brands who value clean design and fast performance. Connect directly via WhatsApp, phone, or view our contact hub.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
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
              <Button
                variant="ghost"
                size="lg"
                href={CONTACT_INFO.phoneHref}
                icon={<Phone size={16} />}
                className="text-sm w-full sm:w-auto justify-center"
              >
                Call Us
              </Button>
              <Button
                variant="ghost"
                size="lg"
                to="/contact"
                onClick={handleLinkClick}
                icon={<ArrowUpRight size={16} />}
                className="text-sm w-full sm:w-auto justify-center"
              >
                Contact Details
              </Button>
              <a
                href={CONTACT_INFO.emailHref}
                className="font-mono text-xs text-fg-muted hover:text-fg underline underline-offset-4 tracking-wider transition-colors px-2 py-3 flex items-center gap-1.5"
              >
                <Mail size={14} /> {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pt-8 sm:pt-12 border-t border-border-hairline">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
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

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-fg-muted">
              <li>
                <Link to="/" onClick={handleLinkClick} className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">00</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">01</span>
                  <span>Services & Process</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleLinkClick} className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">02</span>
                  <span>Studio Principles & FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleLinkClick} className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">03</span>
                  <span>Contact Hub</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Capabilities
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-fg-muted">
              <li>
                <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors">
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors">
                  Website Redesigns
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleLinkClick} className="hover:text-fg transition-colors">
                  Custom Web Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Availability & Timeline
            </span>
            <div className="space-y-2 font-sans text-xs text-fg-muted">
              <p className="flex items-center gap-2 font-medium text-fg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Accepting Projects</span>
              </p>
              <p className="text-fg-faint">Direct Founder Collaboration</p>
              <p className="text-fg-muted leading-relaxed">
                Typical turnaround: 3–5 days standard, 5–7+ days for advanced, customized sites.
              </p>
              <p className="text-[11px] text-fg-faint leading-snug">
                Timelines vary by scope and are confirmed before kickoff.
              </p>
            </div>
          </div>

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Direct Contact
            </span>
            <div className="space-y-2.5 font-sans text-xs text-fg-muted">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-2 text-fg hover:text-fg-muted transition-colors"
              >
                <Phone size={13} className="text-fg-muted" />
                <span>Call Us</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-fg hover:text-fg-muted transition-colors"
              >
                <WhatsAppIcon size={13} className="text-fg-muted" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors font-mono"
              >
                <Mail size={13} className="text-fg-faint" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
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
