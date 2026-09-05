/**
 * Per-route SEO metadata. Without this, every route rendered the exact
 * same <title>/description/canonical baked into index.html — which reads
 * to search engines as duplicate content and is why only "/" was indexing
 * (see the 2026-08-27 SEO audit). `useSEO` (hooks/useSEO.ts) applies these
 * to the document head on route change; App.tsx wires the two together.
 */

export const SITE_URL = 'https://wibsity.in';

export interface RouteSEO {
  path: string;
  title: string;
  description: string;
}

export const routeSEO: Record<string, RouteSEO> = {
  '/': {
    path: '/',
    title: 'wibsity — Web Design Studio in India | Founder-Direct Sites',
    description:
      'Founder-led web design studio in India. Fixed-scope pricing, 3–7+ day turnaround, and clean React/TypeScript websites — pay half only after launch.',
  },
  '/services': {
    path: '/services',
    title: 'Web Design & Development Services | wibsity',
    description:
      'Business websites, high-converting landing pages, redesigns, and custom web experiences — fixed-scope web design and engineering for founders and growing brands.',
  },
  '/about': {
    path: '/about',
    title: 'About wibsity — Studio Principles & FAQ',
    description:
      "wibsity's studio principles on speed, clarity, and domain ownership, plus answers to common questions on pricing, timelines, and how we build fixed-scope websites.",
  },
  '/contact': {
    path: '/contact',
    title: 'Contact wibsity — Start a Website Project',
    description:
      'Start a website project with wibsity. Message the founder directly via WhatsApp, call, or email — typical response within hours, 3–5 day delivery for standard builds.',
  },
};

export const NOT_FOUND_SEO: RouteSEO = {
  path: '/404',
  title: 'Page Not Found | wibsity',
  description: 'The page you were looking for could not be found.',
};
