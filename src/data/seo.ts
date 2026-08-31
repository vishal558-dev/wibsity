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
    title: 'wibsity — Digital Design & Web Engineering Studio',
    description:
      'wibsity is a modern web design and digital engineering studio. We build clean, fast, high-impact websites for businesses, founders, modern practices, and growing brands.',
  },
  '/projects': {
    path: '/projects',
    title: 'Projects & Concepts — Web Design Case Studies | wibsity',
    description:
      'Three studio design concepts showing how wibsity structures genuinely different kinds of website — an appointment-led medical practice, an editorial architecture portfolio, and a coffee storefront.',
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

/**
 * Per-concept metadata for /projects/:slug.
 *
 * These pages are deliberately `noindex, follow` (see CASE_STUDY_NOINDEX). Each
 * one carries roughly 300 words of unique prose about a *hypothetical* business,
 * laid out in a section structure identical across all three — which is thin
 * enough that three near-parallel pages would compete with /projects rather than
 * add anything a searcher wants to land on. /projects is the canonical portfolio
 * page and carries all three concepts; `follow` keeps the case-study links
 * crawlable so nothing is orphaned.
 *
 * Revisit this once concepts are replaced by real client work with distinct
 * outcomes, imagery, and substance to justify standalone results.
 */
export const CASE_STUDY_NOINDEX = true;

export function caseStudySEO(project: {
  slug: string;
  title: string;
  clientType: string;
  summary: string;
}): RouteSEO {
  return {
    path: `/projects/${project.slug}`,
    title: `${project.title} — Studio Concept | wibsity`,
    description: project.summary,
  };
}
