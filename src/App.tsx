import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { useLenis } from './hooks/useLenis';

// Lazy-loaded: keeps the initial bundle for "/" small so the hero's
// entrance animation isn't competing with parsing/executing every
// other page's code on first paint.
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col"
      >
        <Suspense fallback={<div className="flex-1 bg-canvas" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<CaseStudyPage />} />
            <Route path="/work" element={<Navigate to="/projects" replace />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  // Initialize smooth scrolling with reduced-motion fallback
  useLenis();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas text-fg flex flex-col font-sans selection:bg-fg selection:text-canvas">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
