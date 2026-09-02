import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { faqsData } from '../data/faqs';
import { principlesData } from '../data/about';
import { Plus, Minus, HelpCircle, Phone, Code, Sparkles, Accessibility, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO } from '../data/contact';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const AboutPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [activeFaqId, setActiveFaqId] = useState<string | null>(faqsData[0].id);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* Page Header */}
        <div>
          <SectionHeading
            as="h1"
            tag="STUDIO & PRINCIPLES"
            title="Practical engineering standards, not design fluff."
            description="In an era where every company is discovered online, your website is your most critical commercial asset. We focus on fundamentals that help your business build trust and grow."
          />

          {/* Studio Manifesto Monograph */}
          <div className="panel-texture border border-border-hairline bg-canvas-subtle p-6 sm:p-10 lg:p-16 relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block">
                The wibsity Ethos
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight">
                Built to replace bloated agencies and sluggish page builders.
              </h2>
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                Most agencies trap businesses in bloated WordPress plugins, proprietary lock-ins, or slow drag-and-drop systems. We take an engineering-first approach: custom React and TypeScript architectures, high-contrast Swiss typography, and direct founder-level execution.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs text-fg-subtle">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-accent-light" /> Swiss Editorial Aesthetic
                </span>
                <span className="flex items-center gap-2">
                  <Accessibility size={14} className="text-accent-light" /> WCAG AA Accessible
                </span>
                <span className="flex items-center gap-2">
                  <Code size={14} className="text-accent-light" /> No Page Builders
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-accent-light" /> Domain Ownership Included
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Principles — literal pillars */}
        <div>
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted">
              <span className="font-mono text-fg-faint text-[11px]">3.1</span>
              <span className="text-accent">/</span>
              <span className="tracking-widest text-fg-muted">Core Foundations</span>
            </div>
            <h3 className="text-2xl font-bold text-fg">
              The 3 Non-Negotiable Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-border-hairline divide-y sm:divide-y-0 sm:divide-x divide-border-hairline">
            {principlesData.map((p, idx) => {
              const Icon = p.icon;
              return (
                <m.div
                  key={p.index}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative flex flex-col items-center text-center px-6 sm:px-8 py-12 sm:py-14 bg-canvas-subtle hover:bg-canvas-surface transition-colors"
                >
                  {/* Capital */}
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-12 bg-accent/50 group-hover:bg-accent transition-colors"
                    aria-hidden="true"
                  />

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border-hairline bg-canvas text-fg-muted group-hover:text-accent-light group-hover:border-accent/50 transition-colors">
                    <Icon size={22} />
                  </div>

                  <span className="font-mono text-xs text-fg-faint mb-3">{p.index}</span>
                  <h4 className="text-lg font-bold text-fg tracking-tight mb-3">{p.title}</h4>
                  <p className="text-sm text-fg-muted leading-relaxed max-w-[15rem]">{p.desc}</p>

                  {/* Base */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-12 bg-accent/50 group-hover:bg-accent transition-colors"
                    aria-hidden="true"
                  />
                </m.div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 text-xs font-sans font-semibold uppercase tracking-wider text-fg-muted">
              <span className="font-mono text-fg-faint text-[11px]">3.2</span>
              <span className="text-accent">/</span>
              <span className="tracking-widest text-fg-muted">Transparent Guidance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-fg">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-fg-muted mt-2 max-w-xl">
              Clear answers to scoping, turnaround expectations, domain ownership, and technical standards.
            </p>
          </div>

          {/* Accordion */}
          <div className="border-t border-border-hairline divide-y divide-border-hairline max-w-4xl mx-auto">
            {faqsData.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between text-left gap-4 group cursor-pointer py-1"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                  >
                    <h4 className="text-base sm:text-lg font-bold text-fg group-hover:text-accent-light transition-colors font-sans pr-2 leading-snug flex-1">
                      {faq.question}
                    </h4>

                    <div className="p-1.5 sm:p-1 border border-accent/25 bg-canvas-surface text-accent-light group-hover:text-accent-fg group-hover:bg-accent group-hover:border-accent-dark shrink-0 transition-colors mt-0.5">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div id={`${faq.id}-panel`} className="mt-3.5 pr-2 sm:pr-8 text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
                          <p>{faq.answer}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Still have questions — same soft brand-glow treatment as Home's
              FAQ teaser and the Footer CTA band; this strip was otherwise the
              one fully neutral block left on the page. */}
          <div className="relative overflow-hidden mt-10 sm:mt-12 p-5 sm:p-6 border border-border-hairline bg-canvas-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="accent-glow w-72 h-72 -bottom-32 -right-16 opacity-15 z-0" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-3">
              <HelpCircle size={20} className="text-accent-light/80 shrink-0" />
              <span className="font-sans text-xs text-fg-muted font-medium">
                Have a specific question not addressed above?
              </span>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-xs font-sans">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-fg hover:text-fg-muted transition-colors flex items-center gap-1.5"
              >
                <WhatsAppIcon size={13} /> WhatsApp
              </a>
              <span className="text-border-hover">|</span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-semibold text-fg hover:text-fg-muted transition-colors flex items-center gap-1.5"
              >
                <Phone size={13} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
