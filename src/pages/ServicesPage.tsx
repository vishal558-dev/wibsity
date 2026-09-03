import React, { useState } from 'react';
import { m } from 'motion/react';
import {
  Check,
  ChevronDown,
  Network,
  LayoutTemplate,
  MonitorSmartphone,
  Rocket,
  Layout,
  Layers,
  RefreshCw,
  Sliders,
  Clock,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { servicesData } from '../data/services';
import { processData } from '../data/process';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO } from '../data/contact';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

/** Bento composition for the 4-card Core Offerings grid at lg+: one wide
 * card per row (2/1 then 1/2 on a 3-col grid). This is a deliberate visual
 * rhythm, not a content-driven size — every service carries equal
 * informational weight (see the accordion below), the grid is just uneven. */
const bentoSpans = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2'];

/** One icon per process step (data/process.ts step codes), giving the
 * methodology timeline a visual anchor instead of a bare number. */
const processIcons: Record<string, LucideIcon> = {
  STEP_01: Network,
  STEP_02: LayoutTemplate,
  STEP_03: MonitorSmartphone,
  STEP_04: Rocket,
};

export const ServicesPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            tag="SERVICES & CAPABILITIES"
            title="Focused web services built for real business needs."
            description="We design and build clean, high-performing websites. No bloated packages or unnecessary complexity—just four core solutions engineered to give your business an unfair digital advantage."
          />

          {/* Core Offerings Grid — bento composition (see bentoSpans above).
              Cards default to a compact summary (index, icon, scope badge,
              title, tagline) and expand via a single-open accordion to
              reveal description/target-profile/deliverables/CTA, following
              the WAI-ARIA accordion pattern (heading wraps the trigger
              button, not the other way around, so the button's content
              model stays valid phrasing content). */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesData.map((service, idx) => {
              const Icon = iconMap[service.iconName];
              const isOpen = expandedId === service.id;
              const contentId = `service-detail-${service.id}`;
              const isWide = bentoSpans[idx] === 'lg:col-span-2';

              return (
                <m.div
                  key={service.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={cn(
                    'border border-border-hairline bg-canvas-subtle p-5 sm:p-8 group hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(75,80,254,0.08),0_20px_48px_-28px_rgba(75,80,254,0.6)] transition-colors',
                    bentoSpans[idx]
                  )}
                >
                  {/* Compact header — always visible */}
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
                        <Icon size={18} className="text-accent-light/70 group-hover:text-accent-light transition-colors shrink-0" />
                      </div>
                    </div>
                    <div className="sm:hidden mt-2 text-xs font-sans text-fg-faint font-medium">
                      {service.scopeType}
                    </div>
                  </div>

                  <h2 className="mb-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : service.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="w-full flex items-start justify-between gap-4 text-left -my-2 py-2"
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-fg tracking-tight font-sans">
                        {service.title}
                      </span>
                      <ChevronDown
                        size={18}
                        className={cn('text-fg-muted shrink-0 mt-2 transition-transform', isOpen && 'rotate-180')}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{isOpen ? 'Hide details' : 'Show details'}</span>
                    </button>
                  </h2>
                  <p className="text-sm font-medium text-fg-muted font-sans">
                    {service.tagline}
                  </p>

                  {/* Expandable detail */}
                  <div
                    id={contentId}
                    className={cn(
                      'grid transition-[grid-template-rows] ease-in-out',
                      prefersReduced ? 'duration-0' : 'duration-300',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mt-5 sm:mt-6 mb-5 sm:mb-6 font-sans">
                        {service.description}
                      </p>

                      {/* Target Audience */}
                      <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-canvas-surface border border-border-hairline border-l-2 border-l-accent/30">
                        <span className="font-sans text-[11px] font-semibold text-fg-faint uppercase tracking-wider block mb-1">
                          Target Profile
                        </span>
                        <p className="text-xs text-fg-muted leading-relaxed font-sans">
                          {service.forWhom}
                        </p>
                      </div>

                      {/* Deliverables */}
                      <div className="mb-2">
                        <span className="font-sans text-[11px] font-semibold text-fg-faint uppercase tracking-wider block mb-2.5">
                          What's Included
                        </span>
                        <ul className={cn('space-y-2', isWide && 'sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0')}>
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-xs text-fg-muted font-sans leading-relaxed py-0.5">
                              <Check size={13} className="text-accent-light shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Action — scope type already shown in the card
                          header above; repeating it here just diluted the CTA. */}
                      <div className="pt-5 sm:pt-6 mt-2 border-t border-border-hairline flex sm:justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          href={`${whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like to ask about ${service.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          icon={<WhatsAppIcon size={14} />}
                          className="w-full sm:w-auto justify-center text-xs"
                        >
                          Inquire on WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* Turnaround Guarantee Banner */}
        <div className="panel-texture p-6 sm:p-8 border border-border-hairline bg-canvas-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Clock size={24} className="text-accent-light shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="font-sans text-base font-bold text-fg">
                Typical turnaround: 3–5 days for standard sites, 5–7+ days for advanced, customized builds.
              </h2>
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
            tag="DELIVERY METHODOLOGY"
            title="A structured 4-step workflow from kickoff to launch."
            description="We keep communication direct and transparent with structured milestones, visual design reviews, and predictable delivery momentum."
          />

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-border-hairline to-transparent hidden sm:block" />

            <div className="space-y-10 sm:space-y-12">
              {processData.map((step, idx) => {
                const StepIcon = processIcons[step.code];
                return (
                <m.div
                  key={step.step}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-8"
                >
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 shrink-0">
                    <div className="relative w-11 h-11 rounded-full bg-canvas border border-accent/50 flex items-center justify-center shrink-0 z-10">
                      <StepIcon size={18} className="text-accent-light" aria-hidden="true" />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-canvas-elevated border border-border-hairline flex items-center justify-center font-mono text-[8px] font-semibold text-fg-muted">
                        {step.step}
                      </span>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
