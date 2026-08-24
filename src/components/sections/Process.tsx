import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { Badge } from '../common/Badge';
import { processData } from '../../data/process';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tag="DELIVERY METHODOLOGY"
          title="A transparent 4-step process from discovery to launch."
          description="We eliminate ambiguity through structured milestones, regular design check-ins, and direct founder collaboration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-hairline border border-border-hairline">
          {processData.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-canvas p-8 flex flex-col justify-between group hover:bg-canvas-subtle transition-colors duration-300"
            >
              <div>
                {/* Step Top */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-hairline">
                  <Badge variant="outline">{step.code}</Badge>
                  <span className="font-mono text-xs text-fg-faint">{step.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-fg tracking-tight mb-3">
                  {step.name}
                </h3>
                <p className="text-xs text-fg-muted leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-1.5 pt-4 border-t border-border-hairline/60">
                  <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block mb-2">
                    Milestone Output
                  </span>
                  {step.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[11px] font-mono text-fg-subtle">
                      <span className="text-fg-faint">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border-hairline/40 font-mono text-[10px] text-fg-faint">
                [ STEP {step.step} OF 04 ]
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
