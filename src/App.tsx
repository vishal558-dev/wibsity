import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { useSEO } from './hooks/useSEO';
import { routeSEO, NOT_FOUND_SEO } from './data/seo';
import { faqsData } from './data/faqs';

// Route-split: "/" is the landing route and ships eagerly, everything else
// arrives on navigation. Worth keeping even though the whole app is now small —
// see the note on dependencies below.
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

/**
 * Three dependencies left this file in the redesign, and it is worth recording
 * why, because each looks load-bearing until you look at what it was doing.
 *
 *  - `motion` (with its LazyMotion/`m`/`AnimatePresence` scaffolding) drove
 *    scroll-triggered entrance reveals on almost every section, a route
 *    crossfade, and a cursor-tilt 3D hero. The reveals are gone by design;
 *    the rest is CSS. It was the single largest chunk in the bundle.
 *  - `lenis` replaced the browser's scrolling with a JS-interpolated one. On a
 *    site whose pitch is that it feels instant, adding latency to the most
 *    common interaction on the page was working against the brief. It also
 *    skipped itself on touch devices, so most visitors never got it anyway.
 *  - `lucide-react` supplied nine icons, which are now drawn in
 *    components/common/icons.tsx in the same hand as the type.
 *
 * The site cannot make a performance argument it does not itself pass — the
 * homepage prints its own measurements, so this is not a rhetorical position.
 */

/** /about carries the full FAQ, so it carries the FAQPage structured data. */
function useAboutFaqJsonLd() {
  return useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }),
    []
  );
}

function AppRoutes() {
  const location = useLocation();
  const aboutFaqJsonLd = useAboutFaqJsonLd();

  // React Router matches a trailing slash the same as without one, so the SEO
  // lookup has to normalise it too — otherwise "/services/" rendered the
  // Services page under a "Page Not Found" title with noindex.
  const normalized =
    location.pathname !== '/' && location.pathname.endsWith('/')
      ? location.pathname.slice(0, -1)
      : location.pathname;
  const matched = routeSEO[normalized];
  const active = matched ?? { ...NOT_FOUND_SEO, path: normalized };

  useSEO({
    title: active.title,
    description: active.description,
    path: active.path,
    jsonLd: normalized === '/about' ? aboutFaqJsonLd : undefined,
    noindex: !matched,
  });

  return (
    <Suspense
      fallback={
        // A hairline sweep at the top of the viewport while a route chunk
        // downloads. Pure CSS so it starts on the frame the navigation
        // happens, and it reserves no layout of its own.
        <div className="flex-1">
          <div className="route-bar" aria-hidden="true" />
        </div>
      }
    >
      {/* Keyed on the path so each route mount gets the same brief fade+rise
          (see `.route-fade` in index.css) — fast enough to read as a
          transition rather than a wait, deliberately, since the site's own
          pitch is that navigation is instant. */}
      <div key={location.pathname} className="route-fade">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas text-fg flex flex-col">
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 btn btn-primary btn-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
