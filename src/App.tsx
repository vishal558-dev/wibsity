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
import { InquiryModal } from './components/modals/InquiryModal';
import type { Project } from './types';
import { useLenis } from './hooks/useLenis';

export function App() {
  // Initialize smooth scrolling with reduced-motion fallback
  useLenis();

  // Selected project for interactive case study drawer
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Inquiry modal state
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('');
  const [inquiryProjectRef, setInquiryProjectRef] = useState<string>('');

  const handleOpenInquiry = (serviceOrProject?: string) => {
    if (serviceOrProject) {
      if (
        serviceOrProject.includes('Website') ||
        serviceOrProject.includes('Landing Page') ||
        serviceOrProject.includes('Redesign') ||
        serviceOrProject.includes('Custom')
      ) {
        setInquiryService(serviceOrProject);
        setInquiryProjectRef('');
      } else {
        setInquiryProjectRef(serviceOrProject);
        setInquiryService('');
      }
    } else {
      setInquiryService('');
      setInquiryProjectRef('');
    }
    setInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas text-fg flex flex-col font-sans selection:bg-fg selection:text-canvas">
      {/* Fixed Sticky Header */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenInquiry={() => handleOpenInquiry()} />
        <Principles />
        <Portfolio onSelectProject={(project) => setActiveProject(project)} />
        <Services onOpenInquiry={(service) => handleOpenInquiry(service)} />
        <Process />
        <FAQ />
      </main>

      {/* Typographic Monolith Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      {/* Interactive Case Study Drawer */}
      <CaseStudyDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenInquiry={(projectTitle) => handleOpenInquiry(projectTitle)}
      />

      {/* Project Kickoff / Intake Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialService={inquiryService}
        projectReference={inquiryProjectRef}
      />
    </div>
  );
}

export default App;
