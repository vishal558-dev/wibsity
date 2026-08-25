import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../common/SectionHeading';
import { projectsData } from '../../data/projects';
import type { Project, ProjectCategory } from '../../types';
import { ArrowUpRight, Smartphone, Monitor } from 'lucide-react';

interface PortfolioProps {
  onSelectProject: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
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

  return (
    <section id="work" className="py-24 border-b border-border-hairline bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            index="02"
            tag="STUDIO CONCEPTS & WORKS"
            title="Design concepts and web architectures."
            description="Explore our interactive studio concepts demonstrating layouts, responsive typography, and navigation UX across different business models. Click any project to open the interactive desktop and mobile preview."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-sans text-xs font-medium px-3.5 py-1.5 border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-fg text-canvas border-fg font-semibold'
                    : 'bg-canvas-surface border-border-hairline text-fg-muted hover:text-fg hover:border-border-hover'
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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
                className="group border border-border-hairline bg-canvas-subtle hover:border-fg/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Preview Container */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="cursor-pointer bg-canvas-surface border-b border-border-hairline p-6 relative overflow-hidden group-hover:bg-canvas-elevated transition-colors"
                >
                  {/* Browser Mockup Chrome Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-hairline">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    </div>
                    <div className="font-mono text-[10px] text-fg-faint truncate max-w-[200px]">
                      {project.slug}.demo
                    </div>
                    <div className="flex items-center gap-2 text-fg-faint">
                      <Monitor size={12} />
                      <Smartphone size={12} />
                    </div>
                  </div>

                  {/* Simulated Desktop Preview Viewport */}
                  <div className="bg-canvas border border-border-hairline p-5 rounded-sm relative shadow-inner">
                    <div className="flex items-center justify-between mb-3 border-b border-border-hairline pb-2">
                      <span className="font-sans text-xs font-bold text-fg tracking-tight">
                        {project.title.split(' ')[0]}
                      </span>
                      <div className="flex gap-2">
                        {project.desktopPreview.navLinks.slice(0, 3).map((link) => (
                          <span key={link} className="font-sans text-[10px] text-fg-faint hidden sm:inline font-medium">
                            {link}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-fg line-clamp-1 mb-1 font-sans">
                      {project.desktopPreview.heroHeadline}
                    </h4>
                    <p className="text-xs text-fg-muted line-clamp-2 mb-4 font-sans">
                      {project.desktopPreview.heroSub}
                    </p>

                    {/* Scope Specs pills in preview (Honest architectural details) */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-hairline/60">
                      {project.desktopPreview.scopeSpecs.map((spec) => (
                        <div key={spec.label} className="bg-canvas-surface p-1.5 border border-border-hairline">
                          <div className="font-mono text-[9px] text-fg-faint uppercase truncate">
                            {spec.label}
                          </div>
                          <div className="font-sans text-xs font-semibold text-fg truncate">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-canvas/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-fg text-canvas font-sans text-xs px-4 py-2 font-semibold shadow-lg flex items-center gap-1.5">
                      Open Responsive Preview & Details <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-sans">
                        <span className="font-semibold text-fg uppercase tracking-wider">
                          {project.badge}
                        </span>
                        <span className="text-border-hover">•</span>
                        <span className="text-fg-muted uppercase tracking-wider">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-fg tracking-tight mb-1.5 font-sans">
                      {project.title}
                    </h3>
                    <p className="text-xs font-sans font-medium text-fg-subtle mb-3">
                      {project.clientType}
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed mb-6 font-sans">
                      {project.summary}
                    </p>

                    {/* Deliverable Scope Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.deliverables.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="font-mono text-[10px] text-fg-muted bg-canvas-surface border border-border-hairline px-2 py-0.5"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trigger Button */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full flex items-center justify-between pt-4 border-t border-border-hairline text-xs font-sans font-semibold uppercase tracking-wider text-fg hover:text-neutral-300 group/btn transition-colors cursor-pointer"
                  >
                    <span>Explore Case Study & Views</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
