import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { faqsData } from '../data/faqs';
import { Eye, Zap, Target, ShieldCheck, Plus, Minus, HelpCircle, Phone, ArrowRight, Code, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO } from '../data/contact';

export const AboutPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(faqsData[0].id);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const principles = [
    {
      index: '01',
      icon: Eye,
      title: 'First Impressions Command Trust',
      desc: 'When potential clients land on your website, they make an instant judgment about your business. Clean typography, generous spacing, and modern design immediately signal competence and high standards.',
    },
    {
      index: '02',
      icon: Zap,
      title: 'Speed & Mobile Performance',
      desc: 'The vast majority of modern buyers browse on mobile devices. Our code is lightweight and optimized for sub-second loading, so potential customers never bounce due to sluggish performance.',
    },
    {
      index: '03',
      icon: Target,
      title: 'Clarity & Conversion',
      desc: 'Great web design makes it effortless for visitors to understand what you do and take action—whether booking a consultation, requesting a proposal, or initiating contact directly.',
    },
    {
      index: '04',
      icon: ShieldCheck,
      title: '100% Client Ownership',
      desc: 'You own all source code, design files, and domain assets completely. No proprietary website builder lock-in, no hostage maintenance fees, and no monthly platform dependencies.',
    },
  ];

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* Page Header */}
        <div>
          <SectionHeading
            index="03"
            tag="STUDIO & PRINCIPLES"
            title="Practical engineering standards, not design fluff."
            description="In an era where every company is discovered online, your website is your most critical commercial asset. We focus on fundamentals that help your business build trust and grow."
          />

          {/* Studio Manifesto Monograph */}
          <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-10 lg:p-16 relative overflow-hidden">
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
                  <Zap size={14} className="text-accent-light" /> Sub-500ms Performance
                </span>
                <span className="flex items-center gap-2">
                  <Code size={14} className="text-accent-light" /> 100% Clean Code
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Principles Grid */}
        <div>
          <div className="mb-8">
            <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block mb-2">
              Core Foundations
            </span>
            <h3 className="text-2xl font-bold text-fg">
              The 4 Non-Negotiable Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-hairline border border-border-hairline">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-canvas p-6 sm:p-8 flex flex-col justify-between group hover:bg-canvas-subtle border-t-2 border-t-transparent hover:border-t-accent transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-xs font-semibold text-fg-faint group-hover:text-fg-muted transition-colors">
                        {p.index}
                      </span>
                      <Icon size={20} className="text-fg-muted group-hover:text-accent-light transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold text-fg tracking-tight mb-3">
                      {p.title}
                    </h4>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-hairline/50 font-sans text-[11px] text-fg-faint uppercase tracking-wider">
                    Core Standard
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block mb-2">
              Transparent Guidance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-fg">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-fg-muted mt-2 max-w-xl">
              Clear answers to scoping, turnaround expectations, source code ownership, and technical standards.
            </p>
          </div>

          {/* Accordion */}
          <div className="border-t border-border-hairline divide-y divide-border-hairline max-w-4xl">
            {faqsData.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between text-left gap-4 group cursor-pointer focus:outline-none py-1"
                    aria-expanded={isOpen}
                  >
                    <h4 className="text-base sm:text-lg font-bold text-fg group-hover:text-accent-light transition-colors font-sans pr-2 leading-snug flex-1">
                      {faq.question}
                    </h4>

                    <div className="p-1.5 sm:p-1 border border-border-hairline bg-canvas-surface text-fg-muted group-hover:text-accent-fg group-hover:bg-accent group-hover:border-accent-dark shrink-0 transition-colors mt-0.5">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3.5 pr-2 sm:pr-8 text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="mt-10 sm:mt-12 p-5 sm:p-6 border border-border-hairline bg-canvas-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-fg-muted shrink-0" />
              <span className="font-sans text-xs text-fg-muted font-medium">
                Have a specific question not addressed above?
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-fg hover:text-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <WhatsAppIcon size={13} /> WhatsApp
              </a>
              <span className="text-border-hover">|</span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-semibold text-fg hover:text-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <Phone size={13} /> Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Direct CTA */}
        <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block">
              Studio Collaboration
            </span>
            <h3 className="text-2xl font-bold text-fg">
              Ready to elevate your digital presence?
            </h3>
            <p className="text-xs sm:text-sm text-fg-muted">
              Connect directly with our team to discuss your goals and receive a clear proposal.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            to="/contact"
            icon={<ArrowRight size={16} />}
            className="w-full sm:w-auto justify-center"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
};
