import React from 'react';
import { m } from 'motion/react';
import { Check } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { Layout, Layers, RefreshCw, Sliders, Clock, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO } from '../data/contact';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ServicesPage: React.FC = () => {
  const prefersReduced = useReducedMotion();

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
            as="h1"
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
                <m.div
                  key={service.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-fg tracking-tight mb-2 font-sans">
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium text-fg-muted mb-3 font-sans">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-5 sm:mb-6 font-sans">
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
                  </div>

                  {/* Footer Action — scope type already shown in the card
                      header above; repeating it here just diluted the CTA. */}
                  <div className="pt-5 sm:pt-6 border-t border-border-hairline flex sm:justify-end">
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
                </m.div>
              );
            })}
          </div>
        </div>

        {/* Turnaround Guarantee Banner */}
        <div className="grid-pattern p-6 sm:p-8 border border-border-hairline bg-canvas-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Clock size={24} className="text-accent-light shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-sans text-base font-bold text-fg">
                Typical turnaround: 3–5 days for standard sites, 5–7+ days for advanced, customized builds.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-fg-muted leading-relaxed max-w-2xl">
                We work in dedicated, focused sprints with direct founder communication. Timelines are scoped clearly and confirmed in writing prior to project kickoff.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              variant="ghost"
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

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-border-hairline to-transparent hidden sm:block" />

            <div className="space-y-10 sm:space-y-12">
              {processData.map((step, idx) => (
                <m.div
                  key={step.step}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-8"
                >
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-canvas border border-accent/50 flex items-center justify-center font-mono text-xs font-semibold text-accent-light shrink-0 z-10">
                      {step.step}
                    </div>
                    <span className="sm:hidden font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                      {step.focus}
                    </span>
                  </div>

                  <div className="flex-1 pb-2 sm:pb-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                    <div>
                      <div className="hidden sm:flex items-center gap-3 mb-2">
                        <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                          {step.focus}
                        </span>
                        <span className="font-mono text-[10px] text-fg-faint">
                          {step.code}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-fg tracking-tight mb-2 font-sans">
                        {step.name}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed max-w-2xl font-sans">
                        {step.description}
                      </p>
                    </div>

                    <ul className="space-y-2 lg:pt-7 lg:border-l lg:border-border-hairline lg:pl-8">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-fg-muted font-sans">
                          <Check size={13} className="text-accent-light shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
