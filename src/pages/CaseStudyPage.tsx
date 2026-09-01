import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { m, AnimatePresence } from 'motion/react';
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
import { ConceptPreview } from '../components/projects/ConceptPreview';
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

  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  const whatsappUrl = `${CONTACT_INFO.whatsappUrl}%20regarding%20${encodeURIComponent(project.title)}`;

  const toggleClass = (active: boolean) =>
    `flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-11 px-4 text-xs font-sans transition-colors cursor-pointer ${
      active ? 'bg-accent text-accent-fg font-semibold' : 'text-fg-muted hover:text-fg font-medium'
    }`;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {/* Breadcrumb & concept badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-hairline">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-fg-muted hover:text-fg transition-colors -my-3 py-3"
          >
            <ArrowLeft size={14} />
            <span>All Concepts</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-fg-subtle border border-border-hairline bg-canvas-subtle px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-fg-faint shrink-0" aria-hidden="true" />
            {project.badge}
          </span>
        </div>

        {/* Header */}
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
          <p className="text-sm text-fg-subtle leading-relaxed border-l-2 border-border-hover pl-4 mt-6">
            <span className="font-semibold text-fg-muted">A studio concept, not client work.</span>{' '}
            This business does not exist — the layout, content, and brand below were created by
            wibsity as a design study, and represent no past engagement, client, or result.
          </p>
        </div>

        {/* Viewport simulator */}
        <section className="border border-border-hairline bg-canvas-subtle p-3 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border-hairline">
            <div>
              <span className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block">
                Responsive Viewport Simulator
              </span>
              <span className="font-sans text-xs text-fg-muted">
                The same concept composed for each breakpoint
              </span>
            </div>

            <div className="flex items-center border border-border-hairline bg-canvas-surface p-0.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                aria-pressed={viewportMode === 'desktop'}
                className={toggleClass(viewportMode === 'desktop')}
              >
                <Monitor size={14} aria-hidden="true" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                aria-pressed={viewportMode === 'mobile'}
                className={toggleClass(viewportMode === 'mobile')}
              >
                <Smartphone size={14} aria-hidden="true" /> Mobile
              </button>
            </div>
          </div>

          <div className="min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-canvas-surface)_40%,transparent)] border border-border-hairline p-2 sm:p-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={viewportMode}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={viewportMode === 'desktop' ? 'w-full max-w-3xl' : ''}
              >
                <ConceptPreview
                  preview={project.preview}
                  title={project.title}
                  scale="viewport"
                  device={viewportMode}
                  className="shadow-2xl"
                />
              </m.div>
            </AnimatePresence>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {project.scopeSpecs.map((spec) => (
              <div key={spec.label} className="bg-canvas-surface border border-border-hairline p-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-faint block mb-1">
                  {spec.label}
                </dt>
                <dd className="font-sans text-sm font-semibold text-fg">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Challenge & strategy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-fg-muted" aria-hidden="true" />
              <h2 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                Design Challenge
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          <div className="border border-border-hairline bg-canvas-subtle p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-fg-muted" aria-hidden="true" />
              <h2 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
                UX &amp; Layout Strategy
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-sans">
              {project.strategy}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-fg-muted" aria-hidden="true" />
            <h2 className="font-sans text-xs font-bold text-fg uppercase tracking-wider">
              Architectural Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {project.features.map((feat) => (
              <div
                key={feat.title}
                className="p-5 sm:p-6 border border-border-hairline bg-canvas-surface space-y-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-fg shrink-0" aria-hidden="true" />
                  <h3 className="font-bold text-sm sm:text-base text-fg font-sans">{feat.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables & stack */}
        <section className="border-t border-border-hairline pt-8 sm:pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h2 className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3 sm:mb-4">
              Scope of Deliverables
            </h2>
            <ul className="space-y-2 sm:space-y-2.5 font-sans text-sm text-fg-muted">
              {project.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span className="text-fg-faint font-mono mt-0.5" aria-hidden="true">
                    &rarr;
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold text-fg uppercase tracking-wider block mb-3 sm:mb-4">
              Technical Architecture &amp; Stack
            </h2>
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
              Every concept is built on the same foundations we ship client work on: semantic
              markup, theme-token styling, and WCAG AA-checked contrast throughout.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border border-border-hairline bg-canvas-subtle p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-sans text-xs font-semibold text-fg-subtle uppercase tracking-wider block mb-1">
              Start a Project
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-fg font-sans">
              Want this level of structure for your business?
            </h2>
            <p className="text-xs sm:text-sm text-fg-muted mt-1 font-sans max-w-xl">
              Connect directly with the founder on WhatsApp or phone to review your scope and get a
              fixed-timeline proposal.
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

        {/* Pagination */}
        <nav
          aria-label="Concept pagination"
          className="pt-8 sm:pt-12 border-t border-border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group border border-border-hairline bg-canvas-surface hover:border-accent/60 p-5 sm:p-6 transition-colors"
          >
            <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ArrowLeft size={12} aria-hidden="true" /> Previous Concept
            </span>
            <span className="font-bold text-base text-fg group-hover:text-accent-light transition-colors block">
              {prevProject.title}
            </span>
            <span className="font-mono text-xs text-fg-muted mt-1 block">
              {prevProject.clientType}
            </span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="group border border-border-hairline bg-canvas-surface hover:border-accent/60 p-5 sm:p-6 transition-colors text-left sm:text-right"
          >
            <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider flex items-center sm:justify-end gap-1.5 mb-2">
              Next Concept <ArrowRight size={12} aria-hidden="true" />
            </span>
            <span className="font-bold text-base text-fg group-hover:text-accent-light transition-colors block">
              {nextProject.title}
            </span>
            <span className="font-mono text-xs text-fg-muted mt-1 block">
              {nextProject.clientType}
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};
