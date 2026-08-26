import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2,
  Layers,
  Cpu,
  Compass,
  Phone,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { Button } from '../components/common/Button';
import { projectsData } from '../data/projects';
import { CONTACT_INFO } from '../data/contact';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[currentIndex];

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  const whatsappUrl = `${CONTACT_INFO.whatsappUrl}%20regarding%20${encodeURIComponent(project.title)}`;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-hairline">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects & Concepts</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-sans">
            <span className="font-semibold text-fg uppercase tracking-wider">
              {project.badge}
            </span>
            <span className="text-border-hover">•</span>
            <span className="text-fg-muted uppercase tracking-wider">
              {project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Project Header Monograph */}
        <div className="max-w-4xl space-y-4">
          <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block">
            {project.clientType}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tightest leading-[1.08]">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-fg-muted leading-relaxed pt-2">
            {project.tagline}
          </p>
        </div>

        {/* Interactive Responsive Viewport Simulator */}
        <section className="border border-border-hairline bg-canvas-subtle p-3 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border-hairline">
            <div>
              <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block">
                Responsive Viewport Simulator
              </span>
              <span className="font-sans text-xs text-fg-muted">
                Interactive preview testing typography scale, hierarchy, and navigation behavior
              </span>
            </div>

            {/* Viewport Toggles */}
            <div className="flex items-center border border-border-hairline bg-canvas-surface p-0.5 w-full sm:w-auto">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium transition-colors cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-accent text-accent-fg font-semibold'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Monitor size={14} /> Desktop (1440px)
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium transition-colors cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-accent text-accent-fg font-semibold'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Smartphone size={14} /> Mobile (390px)
              </button>
            </div>
          </div>

          {/* Viewport Display Box */}
          <div className="min-h-[380px] sm:min-h-[440px] flex items-center justify-center bg-canvas-surface/40 border border-border-hairline p-2 sm:p-8 overflow-hidden">
            <AnimatePresence mode="wait">
              {viewportMode === 'desktop' ? (
                <motion.div
                  key="desktop-viewport"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-3xl bg-canvas border border-border-hairline shadow-2xl overflow-hidden rounded-sm"
                >
                  {/* Browser Chrome */}
                  <div className="bg-canvas-subtle border-b border-border-hairline px-3 sm:px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-fg-faint">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                    </div>
                    <span className="truncate">{project.slug}.wibsity.studio</span>
                    <span>100% SCALE</span>
                  </div>

                  {/* Desktop Preview Content */}
                  <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                    {/* Mock Nav Bar */}
                    <div className="flex items-center justify-between border-b border-border-hairline pb-2 sm:pb-3">
                      <span className="font-sans text-xs font-bold text-fg">
                        {project.title.split(' ')[0]}
                      </span>
                      <div className="flex gap-3 sm:gap-4">
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
                        Live Concept Viewport
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-fg leading-tight font-sans">
                        {project.desktopPreview.heroHeadline}
                      </h4>
                      <p className="mt-1.5 sm:mt-2 text-xs text-fg-muted leading-relaxed max-w-lg font-sans">
                        {project.desktopPreview.heroSub}
                      </p>
                    </div>

                    {/* Scope Specs Matrix */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border-hairline">
                      {project.desktopPreview.scopeSpecs.map((s) => (
                        <div key={s.label} className="bg-canvas-surface p-1.5 sm:p-2.5 border border-border-hairline">
                          <span className="font-mono text-[8px] sm:text-[9px] text-fg-faint block uppercase">
                            {s.label}
                          </span>
                          <span className="font-sans text-xs font-semibold text-fg truncate">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Section Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {project.desktopPreview.sections.map((sec) => (
                        <div key={sec.title} className="bg-canvas-subtle p-2.5 sm:p-3 border border-border-hairline">
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
                  className="w-[260px] sm:w-[300px] bg-canvas border-2 border-border-hover shadow-2xl rounded-2xl overflow-hidden relative"
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

                    <div className="pt-2">
                      <div className="w-full bg-gradient-to-b from-accent-light to-accent-dark text-accent-fg font-sans text-[11px] text-center uppercase font-bold py-2 shadow">
                        {project.mobilePreview.ctaText}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Strategic Analysis & UX Challenge */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-fg-muted" />
              <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                01 / Design Challenge
              </h3>
            </div>
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-fg-muted" />
              <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                02 / UX & Layout Strategy
              </h3>
            </div>
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
              {project.strategy}
            </p>
          </div>
        </section>

        {/* Key Features Breakdown */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-fg-muted" />
            <h3 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
              03 / Architectural Features
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {project.features.map((feat) => (
              <div
                key={feat.title}
                className="p-5 sm:p-6 border border-border-hairline bg-canvas-surface flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-fg shrink-0" />
                    <h4 className="font-bold text-sm sm:text-base text-fg font-sans">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-fg-muted leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables & Technical Stack */}
        <section className="border-t border-border-hairline pt-8 sm:pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3 sm:mb-4">
              Scope of Deliverables
            </span>
            <ul className="space-y-2 sm:space-y-2.5 font-sans text-sm text-fg-muted">
              {project.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span className="text-fg-faint font-mono mt-0.5">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3 sm:mb-4">
              Technical Architecture & Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs bg-canvas-surface border border-border-hairline text-fg px-3 py-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-fg-muted leading-relaxed">
              Every concept is built following Swiss minimalist typography, high-contrast monochrome tokens, and sub-500ms performance budgets.
            </p>
          </div>
        </section>

        {/* Direct Project Inquiry CTA */}
        <section className="border border-border-hairline bg-canvas-subtle p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-sans text-xs font-semibold text-fg-subtle uppercase tracking-wider block mb-1">
              Start a Project
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-fg font-sans">
              Interested in a similar digital flagship for your business?
            </h4>
            <p className="text-xs sm:text-sm text-fg-muted mt-1 font-sans max-w-xl">
              Connect directly with the founder on WhatsApp or phone to review your scope and get a fixed-timeline proposal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              variant="ghost"
              size="md"
              href={CONTACT_INFO.phoneHref}
              icon={<Phone size={15} />}
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
              icon={<WhatsAppIcon size={16} />}
              className="flex-1 sm:flex-initial justify-center"
            >
              Discuss on WhatsApp
            </Button>
          </div>
        </section>

        {/* Project Pagination Navigation */}
        <div className="pt-8 sm:pt-12 border-t border-border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group border border-border-hairline bg-canvas-surface hover:border-accent/60 p-5 sm:p-6 transition-colors"
          >
            <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ArrowLeft size={12} /> Previous Concept
            </span>
            <h5 className="font-bold text-base text-fg group-hover:text-neutral-200 transition-colors">
              {prevProject.title}
            </h5>
            <span className="font-mono text-xs text-fg-muted mt-1 block">
              {prevProject.clientType}
            </span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="group border border-border-hairline bg-canvas-surface hover:border-accent/60 p-5 sm:p-6 transition-colors text-left sm:text-right"
          >
            <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider flex items-center sm:justify-end gap-1.5 mb-2">
              Next Concept <ArrowRight size={12} />
            </span>
            <h5 className="font-bold text-base text-fg group-hover:text-neutral-200 transition-colors">
              {nextProject.title}
            </h5>
            <span className="font-mono text-xs text-fg-muted mt-1 block">
              {nextProject.clientType}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
