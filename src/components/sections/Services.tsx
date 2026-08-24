import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { Badge } from '../common/Badge';
import { servicesData } from '../../data/services';
import { Layout, Layers, RefreshCw, Sliders, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '../common/Button';

interface ServicesProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  const iconMap = {
    Layout: Layout,
    Layers: Layers,
    RefreshCw: RefreshCw,
    Sliders: Sliders,
  };

  return (
    <section id="services" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          tag="SERVICES & CAPABILITIES"
          title="Focused web services built for real business needs."
          description="We design and build clean, high-performing websites. No bloated packages or unnecessary complexity—just four core solutions tailored to your goals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => {
            const Icon = iconMap[service.iconName];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-border-hairline bg-canvas-subtle p-8 sm:p-10 flex flex-col justify-between group hover:border-fg/40 transition-colors"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-hairline">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{service.index}</Badge>
                      <span className="font-mono text-xs text-fg-subtle">
                        // CAPABILITY
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-fg-faint">
                        {service.turnaround}
                      </span>
                      <Icon size={20} className="text-fg-muted group-hover:text-fg transition-colors" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-fg tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-fg-muted mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-fg-subtle leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Who this is for */}
                  <div className="mb-6 p-3.5 bg-canvas-surface border border-border-hairline">
                    <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block mb-1">
                      Who This Is For
                    </span>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {service.forWhom}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-8">
                    <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-fg-muted">
                        <Check size={14} className="text-fg shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                  <span className="font-mono text-xs text-fg-faint">
                    TURNAROUND: {service.turnaround}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenInquiry(service.title)}
                    icon={<ArrowUpRight size={14} />}
                  >
                    Inquire About This
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
