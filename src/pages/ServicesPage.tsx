import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { Layout, Layers, RefreshCw, Sliders, Check, Clock, Phone, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO } from '../data/contact';

export const ServicesPage: React.FC = () => {
  const iconMap = {
    Layout: Layout,
    Layers: Layers,
    RefreshCw: RefreshCw,
    Sliders: Sliders,
  };

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Page Header */}
        <div>
          <SectionHeading
            index="02"
            tag="SERVICES & CAPABILITIES"
            title="Focused web services built for real business needs."
            description="We design and build clean, high-performing websites. No bloated packages or unnecessary complexity—just four core solutions engineered to give your business an unfair digital advantage."
          />

          {/* Core Offerings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {servicesData.map((service, idx) => {
              const Icon = iconMap[service.iconName];

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-border-hairline bg-canvas-subtle p-5 sm:p-8 lg:p-10 flex flex-col justify-between group hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(75,80,254,0.08),0_20px_48px_-28px_rgba(75,80,254,0.6)] transition-all"
                >
                  <div>
                    {/* Card Header */}
                    <div className="pb-4 sm:pb-6 mb-5 sm:mb-6 border-b border-border-hairline">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-fg-faint font-semibold">
                            {service.index}
                          </span>
                          <span className="text-border-hover text-xs">/</span>
                          <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                            Capability
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="hidden sm:inline font-sans text-xs text-fg-faint font-medium">
                            {service.scopeType}
                          </span>
                          <Icon size={18} className="text-fg-muted group-hover:text-accent-light transition-colors shrink-0" />
                        </div>
                      </div>
                      <div className="sm:hidden mt-2 text-xs font-sans text-fg-faint font-medium">
                        {service.scopeType}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="text-xl sm:text-2xl sm:text-3xl font-bold text-fg tracking-tight mb-2 font-sans">
                      {service.title}
                    </h2>
                    <p className="text-sm font-medium text-fg-muted mb-3 sm:mb-4 font-sans">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-fg-subtle leading-relaxed mb-5 sm:mb-6 font-sans">
                      {service.description}
                    </p>

                    {/* Target Audience */}
                    <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-canvas-surface border border-border-hairline">
                      <span className="font-sans text-[11px] font-semibold text-fg-faint uppercase tracking-wider block mb-1">
                        Target Profile
                      </span>
                      <p className="text-xs text-fg-muted leading-relaxed font-sans">
                        {service.forWhom}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div className="space-y-2 mb-6 sm:mb-8">
                      <span className="font-sans text-[11px] font-semibold text-fg-muted uppercase tracking-wider block mb-2">
                        Deliverable Scope
                      </span>
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-fg-muted font-sans">
                          <Check size={14} className="text-accent-light shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-5 sm:pt-6 border-t border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-sans text-xs text-fg-faint hidden sm:inline">
                      {service.scopeType}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      href={`${whatsappUrl}%20regarding%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<WhatsAppIcon size={14} />}
                      className="w-full sm:w-auto justify-center text-xs"
                    >
                      Inquire on WhatsApp
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Turnaround Guarantee Banner */}
        <div className="p-6 sm:p-8 border border-border-hairline bg-canvas-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Clock size={24} className="text-accent-light shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-sans text-base font-bold text-fg">
                Typical turnaround: 5–7 days for standard website projects.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-fg-muted leading-relaxed max-w-2xl">
                We work in dedicated, focused sprints with direct founder communication. Timelines are scoped clearly and confirmed in writing prior to project kickoff.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              variant="outline"
              size="md"
              href={CONTACT_INFO.phoneHref}
              icon={<Phone size={14} />}
              className="text-xs flex-1 sm:flex-initial justify-center"
            >
              Call Us
            </Button>
            <Button
              variant="primary"
              size="md"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={14} />}
              className="flex-1 sm:flex-initial justify-center"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        {/* 4-Step Engineering Methodology Section */}
        <div>
          <SectionHeading
            index="03"
            tag="DELIVERY METHODOLOGY"
            title="A structured 4-step workflow from kickoff to launch."
            description="We keep communication direct and transparent with structured milestones, visual design reviews, and predictable delivery momentum."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-hairline border border-border-hairline">
            {processData.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-canvas p-6 sm:p-8 flex flex-col justify-between group hover:bg-canvas-subtle border-t-2 border-t-transparent hover:border-t-accent transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-hairline">
                    <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                      Step {step.step}
                    </span>
                    <span className="font-sans text-xs text-fg-subtle">
                      {step.focus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-fg tracking-tight mb-3 font-sans">
                    {step.name}
                  </h3>
                  <p className="text-xs text-fg-muted leading-relaxed mb-6 font-sans">
                    {step.description}
                  </p>

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
                  {step.step} of 04 // {step.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ready to begin */}
        <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block">
              // PROJECT INITIATION
            </span>
            <h3 className="text-2xl font-bold text-fg">
              Have a project in mind? Let&apos;s evaluate the scope together.
            </h3>
            <p className="text-xs sm:text-sm text-fg-muted">
              Whether you need a full digital flagship, a rapid landing page, or a custom web feature, we provide transparent recommendations and fixed-timeline proposals.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            to="/contact"
            icon={<ArrowRight size={16} />}
            className="w-full sm:w-auto justify-center"
          >
            Open Contact Hub
          </Button>
        </div>
      </div>
    </div>
  );
};
