import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Monitor, Smartphone, ArrowUpRight, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';
import type { Project } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface CaseStudyDrawerProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: (projectReference: string) => void;
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({
  project,
  onClose,
  onOpenInquiry,
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
            <div className="flex items-center gap-3">
              <Badge variant="outline">{project.categoryLabel}</Badge>
              <span className="font-mono text-xs text-fg-subtle truncate max-w-[200px] sm:max-w-none">
                [ CASE STUDY // {project.slug} ]
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-border-hairline bg-canvas-surface text-fg-muted hover:text-fg hover:border-fg transition-colors"
              aria-label="Close case study drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-12 flex-1">
            {/* Title Block */}
            <div>
              <span className="font-mono text-xs text-fg-subtle uppercase tracking-wider block mb-2">
                {project.clientType} ({project.year})
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight">
                {project.title}
              </h2>
              <p className="mt-3 text-lg text-fg-muted leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Interactive Viewport Switcher & Live Preview */}
            <div className="border border-border-hairline bg-canvas-subtle p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border-hairline">
                <div>
                  <span className="font-mono text-xs text-fg uppercase tracking-wider block">
                    Interactive Viewport Simulator
                  </span>
                  <span className="font-mono text-[11px] text-fg-faint">
                    Toggle to preview responsive architecture & layout behavior
                  </span>
                </div>

                {/* Viewport Toggles */}
                <div className="flex items-center border border-border-hairline bg-canvas-surface p-0.5">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-colors ${
                      viewportMode === 'desktop'
                        ? 'bg-fg text-canvas font-semibold'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <Monitor size={14} /> Desktop (1440px)
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-colors ${
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
                        <span className="truncate">https://preview.{project.slug}.com</span>
                        <span>100%</span>
                      </div>

                      {/* Desktop Preview Content */}
                      <div className="p-6 space-y-6">
                        {/* Nav Bar */}
                        <div className="flex items-center justify-between border-b border-border-hairline pb-3">
                          <span className="font-mono text-xs font-bold text-fg">
                            {project.title.split(' ')[0]}
                          </span>
                          <div className="flex gap-4">
                            {project.desktopPreview.navLinks.map((link) => (
                              <span key={link} className="font-mono text-[10px] text-fg-muted">
                                {link}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hero */}
                        <div>
                          <span className="font-mono text-[9px] text-fg-faint uppercase tracking-wider block mb-1">
                            [ PRIMARY VIEWPORT ]
                          </span>
                          <h4 className="text-xl font-bold text-fg leading-tight">
                            {project.desktopPreview.heroHeadline}
                          </h4>
                          <p className="mt-2 text-xs text-fg-muted leading-relaxed max-w-lg">
                            {project.desktopPreview.heroSub}
                          </p>
                        </div>

                        {/* Stats Matrix */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-hairline">
                          {project.desktopPreview.stats.map((s) => (
                            <div key={s.label} className="bg-canvas-surface p-2 border border-border-hairline">
                              <span className="font-mono text-[9px] text-fg-faint block uppercase">
                                {s.label}
                              </span>
                              <span className="font-mono text-sm font-bold text-fg">
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
                                [{sec.tag}]
                              </span>
                              <h5 className="text-[11px] font-bold text-fg mb-1">
                                {sec.title}
                              </h5>
                              <p className="text-[9px] text-fg-muted leading-snug">
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
                      <div className="bg-canvas-subtle px-3 py-2 flex items-center justify-between border-b border-border-hairline text-[10px] font-mono text-fg-faint">
                        <span>9:41</span>
                        <div className="w-12 h-2.5 bg-neutral-800 rounded-full" />
                        <span>5G 100%</span>
                      </div>

                      {/* Mobile Content */}
                      <div className="p-4 space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                          <span className="font-mono text-xs font-bold text-fg">
                            {project.title.split(' ')[0]}
                          </span>
                          <span className="font-mono text-[9px] text-fg-faint">[MENU]</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-fg leading-tight">
                            {project.mobilePreview.headline}
                          </h4>
                          <p className="mt-1 text-[11px] text-fg-muted leading-snug">
                            {project.mobilePreview.highlight}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {project.mobilePreview.sections.map((sec) => (
                            <div key={sec.title} className="p-2 bg-canvas-surface border border-border-hairline flex items-center justify-between">
                              <span className="text-[11px] text-fg font-medium">{sec.title}</span>
                              <span className="font-mono text-[8px] text-fg-faint">[{sec.tag}]</span>
                            </div>
                          ))}
                        </div>

                        <button className="w-full bg-fg text-canvas font-mono text-[10px] uppercase font-bold py-2 shadow">
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
                  <h3 className="font-mono text-xs text-fg uppercase tracking-wider">
                    [ 01 // THE CHALLENGE ]
                  </h3>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="border border-border-hairline bg-canvas-subtle p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={18} className="text-fg-muted" />
                  <h3 className="font-mono text-xs text-fg uppercase tracking-wider">
                    [ 02 // DESIGN & UX STRATEGY ]
                  </h3>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {project.strategy}
                </p>
              </div>
            </div>

            {/* Key Feature Architecture */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={18} className="text-fg-muted" />
                <h3 className="font-mono text-xs text-fg uppercase tracking-wider">
                  [ 03 // ARCHITECTURAL FEATURES ]
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
                        <h4 className="font-bold text-sm text-fg">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-xs text-fg-muted leading-relaxed">
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
                <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-3">
                  Scope & Deliverables
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-fg-muted">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="text-fg-faint">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs text-fg uppercase tracking-wider block mb-3">
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

            {/* Direct Project Inquiry CTA */}
            <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-fg-subtle uppercase tracking-wider block mb-1">
                  [ SIMILAR PROJECT BRIEF ]
                </span>
                <h4 className="text-lg font-bold text-fg">
                  Interested in a similar web architecture?
                </h4>
                <p className="text-xs sm:text-sm text-fg-muted mt-1">
                  Start a direct project conversation and we’ll prepare a scoped blueprint for your business.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onClose();
                  onOpenInquiry(project.title);
                }}
                icon={<ArrowUpRight size={16} />}
                className="shrink-0"
              >
                Discuss a Similar Project
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
