import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, m } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { WhatsAppFab } from './components/common/WhatsAppFab';
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
// contributor to first-load JS, and this site needs to load fast on a
// slow mobile connection. LazyMotion below fetches this only after first paint.
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
  const aboutFaqJsonLd = useAboutFaqJsonLd();

  // Routes match a trailing slash the same as without one (React Router's
  // default non-strict matching), so the SEO lookup needs to normalize it
  // too — otherwise "/services/" rendered the Services page under a
  // "Page Not Found" title with noindex, since routeSEO only has "/services".
  const normalizedPathname =
    location.pathname !== '/' && location.pathname.endsWith('/')
      ? location.pathname.slice(0, -1)
      : location.pathname;
  const matchedSEO = routeSEO[normalizedPathname];
  const activeSEO = matchedSEO ?? { ...NOT_FOUND_SEO, path: normalizedPathname };

  // Per-route head tags: without this every route shared the homepage's
  // <title>/description/canonical, which reads as duplicate content to
  // search engines. See src/data/seo.ts and src/hooks/useSEO.ts.
  useSEO({
    title: activeSEO.title,
    description: activeSEO.description,
    path: activeSEO.path,
    jsonLd: normalizedPathname === '/about' ? aboutFaqJsonLd : undefined,
    noindex: !matchedSEO,
  });

  return (
    // initial={false}: skips the enter animation on the very first mount, so
    // first paint never depends on requestAnimationFrame firing — a page
    // opened in a background tab (rAF is paused there) would otherwise stay
    // at this wrapper's opacity:0 until the tab is focused. Route-to-route
    // transitions after that still animate normally since the user is
    // necessarily focused on the tab to trigger navigation.
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col"
      >
        <Suspense
          fallback={
            <div className="flex-1 bg-canvas">
              {/* Route-transition indicator for lazy-loaded pages. Plain CSS
                  keyframe (route-loading.css rule below), not an `m` component —
                  this has to animate the instant a route change fires, which can
                  happen before the async-loaded motion engine chunk resolves. */}
              <div className="route-loading-bar fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-accent via-accent-light to-accent" aria-hidden="true" />
            </div>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
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
          <WhatsAppFab />
        </div>
      </BrowserRouter>
      <Analytics />
    </LazyMotion>
  );
}

export default App;
