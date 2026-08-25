import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { processData } from '../../data/process';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tag="HOW WE WORK"
          title="A clear, collaborative 4-step workflow from kickoff to launch."
          description="We keep communication direct and transparent with structured milestones, visual design reviews, and predictable momentum."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-hairline border border-border-hairline">
          {processData.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-canvas p-6 sm:p-8 flex flex-col justify-between group hover:bg-canvas-subtle transition-colors duration-300"
            >
              <div>
                {/* Step Top */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-hairline">
                  <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                    Step {step.step}
                  </span>
                  <span className="font-sans text-xs font-semibold text-fg-subtle">{step.focus}</span>
                </div>

                <h3 className="text-lg font-bold text-fg tracking-tight mb-3 font-sans">
                  {step.name}
                </h3>
                <p className="text-xs text-fg-muted leading-relaxed mb-6 font-sans">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-1.5 pt-4 border-t border-border-hairline/60">
                  <span className="font-sans text-[11px] font-semibold text-fg-faint uppercase tracking-wider block mb-2">
                    Milestone Output
                  </span>
                  {step.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-xs text-fg-subtle font-sans">
                      <span className="text-fg-faint font-mono mt-0.5">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border-hairline/40 font-mono text-[10px] text-fg-faint">
                {step.step} of 04
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
