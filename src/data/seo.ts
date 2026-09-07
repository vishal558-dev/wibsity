/**
 * Per-route SEO metadata.
 *
 * Two things depend on this file. `hooks/useSEO.ts` applies it client-side on
 * every route change, and `vite.config.ts`'s `generate-static-route-html`
 * plugin stamps out crawlable services.html / about.html / contact.html /
 * 404.html at build time from it.
 *
 * The plugin explicitly skips "/", so the homepage's tags are whatever is
 * hardcoded in index.html. A homepage title or description change has to be
 * made in BOTH places, byte-identical, or the raw HTML and the hydrated page
 * disagree about what the page is called.
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
    title: 'wibsity — custom websites, built from scratch | India',
    description:
      'A one-person web studio in India building custom websites by hand — no page builder, no bought theme. Fixed price agreed before we start, live in about a week.',
  },
  '/services': {
    path: '/services',
    title: 'Services — business websites, landing pages, redesigns, stores | wibsity',
    description:
      'Four kinds of project, described in full: business websites, landing pages, redesigns and online stores. Fixed-scope web design and development from an India-based studio.',
  },
  '/about': {
    path: '/about',
    title: 'The studio, and the questions worth asking | wibsity',
    description:
      'wibsity is one person who designs and builds the site and answers the phone. What every project gets, plus straight answers on pricing, timelines, ownership and changes.',
  },
  '/contact': {
    path: '/contact',
    title: 'Start a project | wibsity',
    description:
      'Tell us what you need building. Four questions, two fields, and a reply from the person who would build the site — usually the same day. Or message on WhatsApp.',
  },
};

export const NOT_FOUND_SEO: RouteSEO = {
  path: '/404',
  title: 'Page not found | wibsity',
  description: 'This page is not here. Either the address is wrong or the page has moved.',
};
