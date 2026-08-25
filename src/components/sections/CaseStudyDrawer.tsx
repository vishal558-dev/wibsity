import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Monitor, Smartphone, CheckCircle2, Layers, Cpu, Compass, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import type { Project } from '../../types';
import { Button } from '../common/Button';
import { CONTACT_INFO } from '../../data/contact';

interface CaseStudyDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({
  project,
  onClose,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="relative w-full max-w-4xl bg-canvas border-l border-border-hairline h-full overflow-y-auto shadow-2xl flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 bg-canvas/95 backdrop-blur-md border-b border-border-hairline p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs font-sans">
              <span className="font-semibold text-fg uppercase tracking-wider">{project.badge}</span>
              <span className="text-border-hover">•</span>
              <span className="text-fg-muted uppercase tracking-wider">{project.categoryLabel}</span>
              <span className="text-border-hover hidden sm:inline">•</span>
              <span className="font-sans text-xs text-fg-subtle truncate max-w-[180px] sm:max-w-none hidden sm:inline">
                Design Study ({project.slug})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-border-hairline bg-canvas-surface text-fg-muted hover:text-fg hover:border-fg transition-colors cursor-pointer"
              aria-label="Close case study drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-12 flex-1">
            {/* Title Block */}
            <div>
              <span className="font-sans text-xs font-semibold text-fg-subtle uppercase tracking-wider block mb-2">
                {project.clientType}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight font-sans">
                {project.title}
              </h2>
              <p className="mt-3 text-lg text-fg-muted leading-relaxed font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Interactive Viewport Switcher & Live Preview */}
            <div className="border border-border-hairline bg-canvas-subtle p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border-hairline">
                <div>
                  <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block">
                    Responsive Viewport Simulator
                  </span>
                  <span className="font-sans text-xs text-fg-muted">
                    Toggle to preview responsive typography and layout behavior
                  </span>
                </div>

                {/* Viewport Toggles */}
                <div className="flex items-center border border-border-hairline bg-canvas-surface p-0.5">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium transition-colors cursor-pointer ${
                      viewportMode === 'desktop'
                        ? 'bg-fg text-canvas font-semibold'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <Monitor size={14} /> Desktop (1440px)
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium transition-colors cursor-pointer ${
                      viewportMode === 'mobile'
                        ? 'bg-fg text-canvas font-semibold'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <Smartphone size={14} /> Mobile (390px)
                  </button>
                </div>
              </div>

              {/* Viewport Display Box */}
              <div className="min-h-[380px] flex items-center justify-center bg-canvas-surface/50 border border-border-hairline p-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  {viewportMode === 'desktop' ? (
                    <motion.div
                      key="desktop-viewport"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full max-w-2xl bg-canvas border border-border-hairline shadow-2xl overflow-hidden rounded-sm"
                    >
                      {/* Browser Chrome */}
                      <div className="bg-canvas-subtle border-b border-border-hairline px-4 py-2 flex items-center justify-between text-[11px] font-mono text-fg-faint">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-neutral-600" />
                          <span className="w-2 h-2 rounded-full bg-neutral-600" />
                          <span className="w-2 h-2 rounded-full bg-neutral-600" />
                        </div>
                        <span className="truncate">{project.slug}.demo</span>
                        <span>100%</span>
                      </div>

                      {/* Desktop Preview Content */}
                      <div className="p-6 space-y-6">
                        {/* Nav Bar */}
                        <div className="flex items-center justify-between border-b border-border-hairline pb-3">
                          <span className="font-sans text-xs font-bold text-fg">
                            {project.title.split(' ')[0]}
                          </span>
                          <div className="flex gap-4">
                            {project.desktopPreview.navLinks.map((link) => (
                              <span key={link} className="font-sans text-[10px] text-fg-muted font-medium">
                                {link}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hero */}
                        <div>
                          <span className="font-sans text-[9px] font-semibold text-fg-faint uppercase tracking-wider block mb-1">
                            Viewport Preview
                          </span>
                          <h4 className="text-xl font-bold text-fg leading-tight font-sans">
                            {project.desktopPreview.heroHeadline}
                          </h4>
                          <p className="mt-2 text-xs text-fg-muted leading-relaxed max-w-lg font-sans">
                            {project.desktopPreview.heroSub}
                          </p>
                        </div>

                        {/* Scope Specs Matrix */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-hairline">
                          {project.desktopPreview.scopeSpecs.map((s) => (
                            <div key={s.label} className="bg-canvas-surface p-2 border border-border-hairline">
                              <span className="font-mono text-[9px] text-fg-faint block uppercase">
                                {s.label}
                              </span>
                              <span className="font-sans text-xs font-semibold text-fg truncate">
                                {s.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Section Cards */}
                        <div className="grid grid-cols-3 gap-3">
                          {project.desktopPreview.sections.map((sec) => (
                            <div key={sec.title} className="bg-canvas-subtle p-3 border border-border-hairline">
                              <span className="font-mono text-[8px] text-fg-faint block uppercase mb-1">
                                {sec.tag}
                              </span>
                              <h5 className="text-[11px] font-bold text-fg mb-1 font-sans">
                                {sec.title}
                              </h5>
                              <p className="text-[9px] text-fg-muted leading-snug font-sans">
                                {sec.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mobile-viewport"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="w-[280px] bg-canvas border-2 border-border-hover shadow-2xl rounded-2xl overflow-hidden relative"
                    >
                      {/* Mobile Top Bar */}
                      <div className="bg-canvas-subtle px-3 py-2 flex items-center justify-between border-b border-border-hairline text-[10px] font-sans font-medium text-fg-faint">
                        <span>9:41</span>
                        <div className="w-12 h-2.5 bg-neutral-800 rounded-full" />
                        <span>5G 100%</span>
                      </div>

                      {/* Mobile Content */}
                      <div className="p-4 space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                          <span className="font-sans text-xs font-bold text-fg">
                            {project.title.split(' ')[0]}
                          </span>
                          <span className="font-sans text-[9px] text-fg-faint font-semibold uppercase">Menu</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-fg leading-tight font-sans">
                            {project.mobilePreview.headline}
                          </h4>
                          <p className="mt-1 text-[11px] text-fg-muted leading-snug font-sans">
                            {project.mobilePreview.highlight}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {project.mobilePreview.sections.map((sec) => (
                            <div key={sec.title} className="p-2 bg-canvas-surface border border-border-hairline flex items-center justify-between">
                              <span className="text-[11px] text-fg font-medium font-sans">{sec.title}</span>
                              <span className="font-mono text-[8px] text-fg-faint">{sec.tag}</span>
                            </div>
                          ))}
                        </div>

                        <button className="w-full bg-fg text-canvas font-sans text-[11px] uppercase font-bold py-2 shadow cursor-pointer">
                          {project.mobilePreview.ctaText}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Strategic Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="border border-border-hairline bg-canvas-subtle p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Compass size={18} className="text-fg-muted" />
                  <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                    01 / Design Challenge
                  </h3>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed font-sans">
                  {project.challenge}
                </p>
              </div>

              <div className="border border-border-hairline bg-canvas-subtle p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={18} className="text-fg-muted" />
                  <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                    02 / UX & Layout Strategy
                  </h3>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed font-sans">
                  {project.strategy}
                </p>
              </div>
            </div>

            {/* Key Feature Architecture */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={18} className="text-fg-muted" />
                <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                  03 / Key Features
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-5 border border-border-hairline bg-canvas-surface flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-fg" />
                        <h4 className="font-bold text-sm text-fg font-sans">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-xs text-fg-muted leading-relaxed font-sans">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Deliverables */}
            <div className="border-t border-border-hairline pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3">
                  Deliverable Scope
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-fg-muted">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="text-fg-faint">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3">
                  Technical Architecture
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs bg-canvas-surface border border-border-hairline text-fg px-2.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Project Inquiry CTA: WhatsApp & Call */}
            <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-fg-subtle uppercase tracking-wider block mb-1">
                  Start a Similar Project
                </span>
                <h4 className="text-lg font-bold text-fg font-sans">
                  Interested in a similar website for your business?
                </h4>
                <p className="text-xs sm:text-sm text-fg-muted mt-1 font-sans">
                  Reach out directly via WhatsApp or phone call to discuss your project requirements with the founder.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="md"
                  href={CONTACT_INFO.phoneHref}
                  icon={<Phone size={15} />}
                  className="text-xs"
                >
                  Call Us
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<WhatsAppIcon size={16} />}
                >
                  Discuss on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
