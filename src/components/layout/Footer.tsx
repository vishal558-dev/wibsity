import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-hairline bg-canvas relative overflow-hidden">
      {/* Upper CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="border border-border-hairline bg-canvas-subtle p-8 sm:p-12 lg:p-16 relative">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-fg-faint uppercase tracking-widest hidden sm:block">
            [ DIRECT INTAKE ]
          </div>

          <div className="max-w-3xl">
            <span className="font-mono text-xs text-fg-muted uppercase tracking-wider block mb-3">
              [ 00 // PROJECT INQUIRY ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
              Ready to build a website that sets your business apart?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
              We collaborate with businesses, founders, and modern brands who value clean design and fast performance. Reach out to discuss your project requirements.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenInquiry()}
                icon={<ArrowUpRight size={18} />}
              >
                Start a Conversation
              </Button>
              <a
                href="mailto:hello@wibsity.com"
                className="font-mono text-xs text-fg-muted hover:text-fg underline underline-offset-4 tracking-wider transition-colors px-2 py-3"
              >
                hello@wibsity.com
              </a>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border-hairline">
          <div>
            <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-fg-muted">
              <li>
                <a href="#work" className="hover:text-fg transition-colors">
                  [01] Concept Works
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fg transition-colors">
                  [02] Services & Capabilities
                </a>
              </li>
              <li>
                <a href="#principles" className="hover:text-fg transition-colors">
                  [03] Studio Principles
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-fg transition-colors">
                  [04] 4-Step Process
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-fg transition-colors">
                  [05] Business FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-4">
              Capabilities
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-fg-muted">
              <li>Business Websites</li>
              <li>Landing Pages</li>
              <li>Website Redesigns</li>
              <li>Custom Web Systems</li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-4">
              Availability
            </span>
            <div className="space-y-2 font-mono text-xs text-fg-muted">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Accepting Projects</span>
              </p>
              <p className="text-fg-faint">Direct Founder Collaboration</p>
              <p className="text-fg-faint">Standard Turnaround: 2–5 Weeks</p>
            </div>
          </div>

          <div>
            <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-4">
              Direct Contact
            </span>
            <p className="font-mono text-xs text-fg-muted leading-relaxed mb-3">
              Direct inquiries and project briefs welcome.
            </p>
            <a
              href="mailto:hello@wibsity.com"
              className="inline-block font-mono text-xs text-fg border border-border-hairline bg-canvas-surface px-3 py-1.5 hover:border-fg transition-colors"
            >
              hello@wibsity.com
            </a>
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
        <span className="font-mono font-black text-[18vw] leading-none tracking-tighter text-fg uppercase">
          wibsity
        </span>
      </div>
    </footer>
  );
};
