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
      desc: 'Prospective clients evaluate your business caliber within milliseconds. We craft clean, authoritative layouts that immediately convey professionalism and eliminate friction.',
    },
    {
      index: '02',
      icon: Zap,
      title: 'Engineered for Sub-Second Speed',
      desc: 'Over 60% of modern visitors browse on mobile devices. Our codebases are lightweight and optimized for instant loading, keeping bounce rates low and engagement high.',
    },
    {
      index: '03',
      icon: Target,
      title: 'Deliberate Conversion Pathways',
      desc: 'Great design is not just aesthetic—it is functional. Every page is structured with clear visual hierarchy, leading visitors naturally toward consultation or inquiry triggers.',
    },
    {
      index: '04',
      icon: ShieldCheck,
      title: 'Complete Client Autonomy',
      desc: 'You maintain 100% ownership of your source code, domain, and deployment assets. No hidden agency lock-in, no hostage fees, and no proprietary platforms.',
    },
  ];

  return (
    <section id="principles" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          tag="STUDIO PRINCIPLES"
          title="Why quality design is a business imperative."
          description="In an era where every company is discovered online, your website is your most critical commercial asset. We focus on fundamentals that deliver real results."
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
                className="bg-canvas p-8 flex flex-col justify-between group hover:bg-canvas-subtle transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-fg-faint group-hover:text-fg-muted transition-colors">
                      [{p.index}]
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
                  STANDARD // 2025
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
