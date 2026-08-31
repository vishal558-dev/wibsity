import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowUpRight, Info } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { ConceptPreview } from '../components/projects/ConceptPreview';
import { projectsData } from '../data/projects';
import { CONTACT_INFO } from '../data/contact';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Project } from '../types';

/**
 * There is deliberately no category filter here. Three concepts do not need
 * five filter pills — the previous version filtered five projects into buckets
 * that held one item each, which was interaction cost with no payoff.
 */

const Eyebrow: React.FC<{ index: string; label: string }> = ({ index, label }) => (
  <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider">
    <span className="font-mono text-fg-faint text-[11px] tabular-nums">{index}</span>
    <span className="text-accent">/</span>
    <span className="tracking-widest text-fg-muted">{label}</span>
  </div>
);

const ConceptBadge: React.FC<{ badge: string }> = ({ badge }) => (
  <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-fg-subtle border border-border-hairline bg-canvas-subtle px-2.5 py-1">
    <span className="w-1.5 h-1.5 bg-fg-faint shrink-0" aria-hidden="true" />
    {badge}
  </span>
);

const CaseStudyLink: React.FC<{ project: Project }> = ({ project }) => (
  <Link
    to={`/projects/${project.slug}`}
    className="group/link inline-flex items-center gap-1.5 font-sans text-sm font-medium text-fg hover:text-accent-light transition-colors -my-3 py-3"
  >
    <span className="border-b border-border-hover group-hover/link:border-accent-light transition-colors">
      Read the {project.title} breakdown
    </span>
    <ArrowUpRight size={15} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
  </Link>
);

const SpecRow: React.FC<{ project: Project; dense?: boolean }> = ({ project, dense }) => (
  <dl className={dense ? 'grid grid-cols-3 gap-3' : 'space-y-3'}>
    {project.scopeSpecs.map((spec) => (
      <div key={spec.label} className={dense ? '' : 'flex items-baseline justify-between gap-4 border-b border-border-hairline pb-2'}>
        <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-faint block">
          {spec.label}
        </dt>
        <dd className="font-sans text-xs font-semibold text-fg">{spec.value}</dd>
      </div>
    ))}
  </dl>
);

/**
 * Each concept gets its own band composition, not a mirrored left/right
 * template — an alternating layout is still one layout, and the point of these
 * three is that they don't share one.
 */
const ShowcaseBand: React.FC<{ project: Project; index: string }> = ({ project, index }) => {
  const prefersReduced = useReducedMotion();

  const reveal = {
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    whileInView: prefersReduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  const heading = (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fg tracking-tight leading-[1.12]">
      {project.title}
    </h2>
  );

  /* Spacious two-up: the mock leads, meta sits beside it with room to breathe. */
  if (project.preview.layout === 'clinic') {
    return (
      <m.article {...reveal} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <ConceptPreview preview={project.preview} title={project.title} scale="card" />
        </div>
        <div className="lg:col-span-5 space-y-5">
          <Eyebrow index={index} label={project.clientType} />
          {heading}
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">{project.tagline}</p>
          <p className="text-sm text-fg-subtle leading-relaxed">{project.summary}</p>
          <SpecRow project={project} />
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <CaseStudyLink project={project} />
            <ConceptBadge badge={project.badge} />
          </div>
        </div>
      </m.article>
    );
  }

  /* Editorial stack: a wide masthead, then the mock running the full measure. */
  if (project.preview.layout === 'monograph') {
    return (
      <m.article {...reveal} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end">
          <div className="md:col-span-7 space-y-4">
            <Eyebrow index={index} label={project.clientType} />
            {heading}
          </div>
          <div className="md:col-span-5">
            <p className="text-base sm:text-lg text-fg-muted leading-relaxed">{project.tagline}</p>
          </div>
        </div>

        <ConceptPreview preview={project.preview} title={project.title} scale="card" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start pt-1">
          <p className="md:col-span-6 text-sm text-fg-subtle leading-relaxed">{project.summary}</p>
          <div className="md:col-span-4">
            <SpecRow project={project} />
          </div>
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <ConceptBadge badge={project.badge} />
          </div>
        </div>

        <CaseStudyLink project={project} />
      </m.article>
    );
  }

  /* Commerce: mock across the top, then a dense spec row beneath it. */
  return (
    <m.article {...reveal} className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end">
        <div className="md:col-span-8 space-y-4">
          <Eyebrow index={index} label={project.clientType} />
          {heading}
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>
        <div className="md:col-span-4 flex md:justify-end">
          <ConceptBadge badge={project.badge} />
        </div>
      </div>

      <ConceptPreview preview={project.preview} title={project.title} scale="card" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-t border-border-hairline pt-6">
        <p className="md:col-span-5 text-sm text-fg-subtle leading-relaxed">{project.summary}</p>
        <div className="md:col-span-4">
          <SpecRow project={project} dense />
        </div>
        <div className="md:col-span-3 flex md:justify-end items-start">
          <CaseStudyLink project={project} />
        </div>
      </div>
    </m.article>
  );
};

export const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          index="01"
          tag="PROJECTS & CONCEPTS"
          title="Three concepts, three different kinds of website."
          description="Self-initiated design studies exploring how the same studio approach adapts to genuinely different business models — an appointment-led practice, an editorial portfolio, and a product storefront. Each one is a full layout system, not a colour variation on the last."
          className="mb-8 sm:mb-10 max-w-4xl"
        />

        {/* Stated plainly and early: these are studies, not client engagements.
            The same disclosure repeats on every band, in every mock frame, and
            on each case study — it should be impossible to mistake. */}
        <div className="flex items-start gap-3 border border-border-hairline bg-canvas-subtle p-4 sm:p-5 mb-16 sm:mb-24 max-w-3xl">
          <Info size={16} className="text-fg-faint shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
            <span className="font-semibold text-fg">These are studio concepts, not client work.</span>{' '}
            Every layout, business, and piece of content below was created by wibsity as a design
            study. They are here to show how we structure and build — not to represent past
            engagements, and they carry no client names, testimonials, or results.
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {projectsData.map((project, i) => (
            <React.Fragment key={project.id}>
              {i > 0 && <hr className="border-border-hairline" />}
              <ShowcaseBand project={project} index={String(i + 1).padStart(2, '0')} />
            </React.Fragment>
          ))}
        </div>

        {/* Closing CTA — one filled action, one plain link. */}
        <div className="mt-20 sm:mt-28 border-t border-border-hairline pt-10 sm:pt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block">
              Your Business
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-fg tracking-tight">
              None of these are your business. That&rsquo;s the point.
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed">
              Each concept started from how a specific kind of business actually works. Tell us how
              yours does, and we&rsquo;ll scope the layout system around it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 shrink-0">
            <Button
              variant="primary"
              size="md"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={15} />}
            >
              Discuss on WhatsApp
            </Button>
            <Link
              to="/contact"
              className="font-sans text-sm font-medium text-fg-muted hover:text-fg transition-colors border-b border-transparent hover:border-border-hover -my-3 py-3"
            >
              All contact options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
