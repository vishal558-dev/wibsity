import React from 'react';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { Button } from '../common/Button';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/918448948791?text=Hi%20wibsity,%20I'd%20like%20to%20discuss%20a%20website%20project.";

  return (
    <footer className="border-t border-border-hairline bg-canvas relative overflow-hidden">
      {/* Upper CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="border border-border-hairline bg-canvas-subtle p-8 sm:p-12 lg:p-16 relative">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-fg-faint uppercase tracking-wider hidden sm:block">
            DIRECT INTAKE
          </div>

          <div className="max-w-3xl">
            <span className="font-mono text-xs text-fg-muted uppercase tracking-wider block mb-3">
              00 / PROJECT INQUIRY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
              Ready to build a website that sets your business apart?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
              We collaborate with businesses, founders, and modern brands who value clean design and fast performance. Connect directly via WhatsApp or phone call.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<MessageSquare size={18} />}
              >
                WhatsApp: +91 8448948791
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="tel:+918448948791"
                icon={<Phone size={16} />}
                className="font-mono text-sm"
              >
                Call: +91 8448948791
              </Button>
              <a
                href="mailto:hello@wibsity.com"
                className="font-mono text-xs text-fg-muted hover:text-fg underline underline-offset-4 tracking-wider transition-colors px-2 py-3 flex items-center gap-1.5"
              >
                <Mail size={14} /> hello@wibsity.com
              </a>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border-hairline">
          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-fg-muted">
              <li>
                <a href="#work" className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">01</span>
                  <span>Concept Works</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">02</span>
                  <span>Services & Capabilities</span>
                </a>
              </li>
              <li>
                <a href="#principles" className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">03</span>
                  <span>Studio Principles</span>
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">04</span>
                  <span>4-Step Process</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-fg transition-colors flex items-center gap-2">
                  <span className="font-mono text-fg-faint text-[10px]">05</span>
                  <span>Business FAQ</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-4">
              Capabilities
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-fg-muted">
              <li>Business Websites</li>
              <li>Landing Pages</li>
              <li>Website Redesigns</li>
              <li>Custom Web Systems</li>
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
                Typical turnaround: 5–7 days for standard website projects.
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
                href="tel:+918448948791"
                className="flex items-center gap-2 text-fg hover:text-neutral-300 transition-colors font-mono"
              >
                <Phone size={13} className="text-fg-muted" />
                <span>+91 8448948791</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-fg hover:text-neutral-300 transition-colors font-sans"
              >
                <MessageSquare size={13} className="text-fg-muted" />
                <span>WhatsApp: +91 8448948791</span>
              </a>
              <a
                href="mailto:hello@wibsity.com"
                className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors font-mono"
              >
                <Mail size={13} className="text-fg-faint" />
                <span>hello@wibsity.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal and System Notice */}
        <div className="mt-16 pt-8 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-fg-faint">
          <div>
            © {currentYear} wibsity. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>WEB DESIGN & ENGINEERING STUDIO</span>
          </div>
        </div>
      </div>

      {/* Typographic Wordmark at bottom */}
      <div className="w-full select-none pointer-events-none overflow-hidden flex justify-center py-4 opacity-[0.06] border-t border-border-hairline">
        <span className="font-sans font-black text-[18vw] leading-none tracking-tighter text-fg uppercase">
          wibsity
        </span>
      </div>
    </footer>
  );
};
