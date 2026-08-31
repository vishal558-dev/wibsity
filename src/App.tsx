import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, m } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { useLenis } from './hooks/useLenis';
import { useSEO } from './hooks/useSEO';
import { routeSEO, NOT_FOUND_SEO } from './data/seo';
import { faqsData } from './data/faqs';

// Lazy-loaded: keeps the initial bundle for "/" small so the hero's
// entrance animation isn't competing with parsing/executing every
// other page's code on first paint.
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((mod) => ({ default: mod.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((mod) => ({ default: mod.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((mod) => ({ default: mod.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((mod) => ({ default: mod.NotFoundPage })));

// Splits Framer Motion's animation engine into its own chunk instead of
// shipping it in the eager entry bundle — it's the single largest
// contributor to first-load JS on a page whose own headline promises
// sub-second loads. LazyMotion below fetches this only after first paint.
const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);

/**
 * The FAQ content already lives on /about (data/faqs.ts) but wasn't marked
 * up as structured data anywhere. Reusing it here makes /about eligible for
 * FAQ rich results without duplicating any copy.
 */
function useAboutFaqJsonLd() {
  return useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    []
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const matchedSEO = routeSEO[location.pathname];
  const activeSEO = matchedSEO ?? { ...NOT_FOUND_SEO, path: location.pathname };
  const aboutFaqJsonLd = useAboutFaqJsonLd();

  // Per-route head tags: without this every route shared the homepage's
  // <title>/description/canonical, which reads as duplicate content to
  // search engines. See src/data/seo.ts and src/hooks/useSEO.ts.
  useSEO({
    title: activeSEO.title,
    description: activeSEO.description,
    path: activeSEO.path,
    jsonLd: location.pathname === '/about' ? aboutFaqJsonLd : undefined,
    noindex: !matchedSEO,
  });

  return (
    <AnimatePresence mode="wait">
      <m.div
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
            {/* Projects & Concepts is temporarily hidden until there's real client work to show — see data/projects.ts and pages/ProjectsPage.tsx, still intact for re-enabling. */}
            <Route path="/projects" element={<Navigate to="/" replace />} />
            <Route path="/projects/:slug" element={<Navigate to="/" replace />} />
            <Route path="/work" element={<Navigate to="/" replace />} />
            <Route path="/work/:slug" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  );
}

export function App() {
  // Initialize smooth scrolling with reduced-motion fallback
  useLenis();

  return (
    <LazyMotion features={loadMotionFeatures} strict>
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
    </LazyMotion>
  );
}

export default App;
