import { useEffect } from 'react';
import { SITE_URL } from '../data/seo';

const JSON_LD_ELEMENT_ID = 'route-jsonld';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, follow';

interface SEOOptions {
  title: string;
  description: string;
  path: string;
  /** Structured data specific to this route (e.g. FAQPage on /about). Omit for none. */
  jsonLd?: object;
  /** Set true for routes that shouldn't be indexed (e.g. 404). */
  noindex?: boolean;
}

function setMetaContent(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Applies per-route title/description/canonical/OG/Twitter tags and an
 * optional JSON-LD block to the document head. The site is a client-rendered
 * SPA with a single static index.html, so without this every route shares
 * one <title>/description/canonical — see src/data/seo.ts for why that matters.
 */
export function useSEO({ title, description, path, jsonLd, noindex = false }: SEOOptions) {
  useEffect(() => {
    const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    document.title = title;
    setMetaContent('meta[name="description"]', 'content', description);
    setMetaContent('meta[name="robots"]', 'content', noindex ? NOINDEX_ROBOTS : DEFAULT_ROBOTS);
    setMetaContent('link[rel="canonical"]', 'href', url);
    setMetaContent('meta[property="og:url"]', 'content', url);
    setMetaContent('meta[property="og:title"]', 'content', title);
    setMetaContent('meta[property="og:description"]', 'content', description);
    setMetaContent('meta[name="twitter:url"]', 'content', url);
    setMetaContent('meta[name="twitter:title"]', 'content', title);
    setMetaContent('meta[name="twitter:description"]', 'content', description);

    let script = document.getElementById(JSON_LD_ELEMENT_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = JSON_LD_ELEMENT_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, jsonLd, noindex]);
}
