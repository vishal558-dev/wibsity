import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { faqsData } from '../../data/faqs';
import { Plus, Minus, HelpCircle, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { CONTACT_INFO } from '../../data/contact';

export const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(faqsData[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engagement', 'Process', 'Ownership', 'Technical'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqsData
    : faqsData.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <section id="faq" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            index="05"
            tag="FREQUENTLY ASKED QUESTIONS"
            title="Direct answers to common business questions."
            description="Transparent guidance regarding project scoping, timelines, code ownership, and technical standards."
            className="mb-0"
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans text-xs font-medium px-3.5 py-1.5 border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-fg text-canvas border-fg font-semibold'
                    : 'bg-canvas-surface border-border-hairline text-fg-muted hover:text-fg'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="border-t border-border-hairline divide-y divide-border-hairline max-w-4xl">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div key={faq.id} className="py-6 transition-colors">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-start justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-fg-faint mt-1 shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-fg group-hover:text-neutral-300 transition-colors font-sans">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 border border-border-hairline bg-canvas-surface text-fg-muted group-hover:text-fg group-hover:border-fg shrink-0 transition-colors">
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
                      <div className="mt-4 pl-12 pr-6 text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Connect Help Box */}
        <div className="mt-12 p-6 border border-border-hairline bg-canvas-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
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
    </section>
  );
};
