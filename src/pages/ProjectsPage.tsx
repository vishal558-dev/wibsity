import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { projectsData } from '../data/projects';
import type { ProjectCategory } from '../types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { CONTACT_INFO } from '../data/contact';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Concepts' },
    { id: 'flagship', label: 'Flagship Concepts' },
    { id: 'practice', label: 'Practice Concepts' },
    { id: 'brand', label: 'Brand Concepts' },
    { id: 'commerce', label: 'Commerce Concepts' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            index="01"
            tag="PROJECTS & CONCEPTS"
            title="Design concepts and web architectures."
            description="Explore our interactive studio projects and design concepts demonstrating responsive typography, clinical clarity, and navigation UX across different business models. Select any project to inspect the full case study with live desktop and mobile viewport simulations."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-sans text-xs font-medium px-3.5 py-1.5 border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-accent text-accent-fg border-accent-dark font-semibold'
                    : 'bg-canvas-surface border-border-hairline text-fg-muted hover:text-fg hover:border-accent/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group border border-border-hairline bg-canvas-subtle hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(75,80,254,0.08),0_24px_56px_-32px_rgba(75,80,254,0.65)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Preview Container */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="block bg-canvas-surface border-b border-border-hairline p-4 sm:p-6 relative overflow-hidden group-hover:bg-canvas-elevated transition-colors"
                >
                  {/* Browser Mockup Chrome Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-hairline">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-500 transition-colors" />
                      <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-500 transition-colors" />
                      <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-500 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: project.desktopPreview.accentColor }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Mockup Preview Area */}
                  <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                    <span className="font-mono text-[11px] text-fg-faint block">
                      // {project.clientType}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-fg tracking-tight group-hover:text-accent-light transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-fg-muted line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Scope Specs Bar */}
                  <div className="mt-4 pt-4 border-t border-border-hairline flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans font-semibold text-fg uppercase tracking-wider">
                        {project.badge}
                      </span>
                      <span className="text-border-hover">•</span>
                      <span className="text-[11px] font-sans text-fg-muted">
                        {project.stack.slice(0, 3).join(' • ')}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-light group-hover:translate-x-0.5 transition-transform">
                      Inspect Case Study <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>

                {/* Project Details Footer */}
                <div className="p-5 sm:p-6 bg-canvas flex flex-col justify-between flex-1">
                  <div className="space-y-3">
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.deliverables.slice(0, 3).map((deliv, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] text-fg-subtle bg-canvas-surface border border-border-hairline px-2 py-0.5"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-border-hairline flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono text-fg-faint">
                      ARCHITECTURAL CASE STUDY
                    </span>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-sans font-medium text-fg flex items-center gap-1 group-hover:underline underline-offset-4"
                    >
                      <span>View Full Breakdown</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Project Scoping Note */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 border border-border-hairline bg-canvas-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider block mb-1">
              Custom Requirements
            </span>
            <h4 className="text-lg font-bold text-fg">
              Need a bespoke digital flagship tailored to your exact business?
            </h4>
            <p className="text-xs text-fg-muted max-w-xl">
              We design custom workflows, practice directories, and commerce layouts from scratch. Contact us directly to discuss your project scope.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              variant="primary"
              size="md"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={14} />}
              className="flex-1 sm:flex-initial justify-center"
            >
              Discuss on WhatsApp
            </Button>
            <Button
              variant="ghost"
              size="md"
              to="/contact"
              className="text-xs flex-1 sm:flex-initial justify-center"
            >
              Contact Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
