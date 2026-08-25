import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { Eye, Zap, Target, ShieldCheck } from 'lucide-react';

export const Principles: React.FC = () => {
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
      desc: 'The majority of your visitors will browse on mobile devices. Our code is lightweight and optimized for instant loading, so potential customers never bounce due to sluggish performance.',
    },
    {
      index: '03',
      icon: Target,
      title: 'Clarity & Conversion',
      desc: 'Great web design makes it effortless for visitors to understand what you do and take action—whether booking a consultation, requesting a quote, or getting in touch directly.',
    },
    {
      index: '04',
      icon: ShieldCheck,
      title: '100% Client Ownership',
      desc: 'You own all source code, design files, and domain assets completely. No proprietary website builder lock-in, no hostage fees, and no monthly platform dependencies.',
    },
  ];

  return (
    <section id="principles" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          tag="STUDIO PRINCIPLES"
          title="Practical business fundamentals, not design fluff."
          description="In an era where every company is discovered online, your website is your most critical commercial asset. We focus on principles that actually help your business grow."
        />

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
                className="bg-canvas p-6 sm:p-8 flex flex-col justify-between group hover:bg-canvas-subtle transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-semibold text-fg-faint group-hover:text-fg-muted transition-colors">
                      {p.index}
                    </span>
                    <Icon size={20} className="text-fg-muted group-hover:text-fg transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-fg tracking-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border-hairline/50 font-mono text-[10px] text-fg-faint uppercase tracking-wider">
                  Core Principle
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
