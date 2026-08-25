import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Principles } from './components/sections/Principles';
import { Portfolio } from './components/sections/Portfolio';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { FAQ } from './components/sections/FAQ';
import { CaseStudyDrawer } from './components/sections/CaseStudyDrawer';
import type { Project } from './types';
import { useLenis } from './hooks/useLenis';

export function App() {
  // Initialize smooth scrolling with reduced-motion fallback
  useLenis();

  // Selected project for interactive case study drawer
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-canvas text-fg flex flex-col font-sans selection:bg-fg selection:text-canvas">
      {/* Fixed Sticky Header with Call and WhatsApp actions */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Principles />
        <Portfolio onSelectProject={(project) => setActiveProject(project)} />
        <Services />
        <Process />
        <FAQ />
      </main>

      {/* Typographic Monolith Footer with direct phone & WhatsApp */}
      <Footer />

      {/* Interactive Case Study Drawer */}
      <CaseStudyDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}

export default App;
