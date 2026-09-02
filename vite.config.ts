import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { faqsData } from './src/data/faqs.js';
import { NOT_FOUND_SEO, routeSEO, SITE_URL, type RouteSEO } from './src/data/seo.js';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function replaceMeta(html: string, selector: RegExp, value: string) {
  return html.replace(selector, `$1${escapeHtml(value)}$2`);
}

function createRouteHtml(html: string, seo: RouteSEO, noindex = false, jsonLd?: object) {
  const url = seo.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${seo.path}`;
  let routeHtml = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);

  routeHtml = replaceMeta(routeHtml, /(<meta name="description" content=")[^"]*("\s*\/?>)/, seo.description);
  routeHtml = replaceMeta(routeHtml, /(<meta name="robots" content=")[^"]*("\s*\/?>)/, noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  routeHtml = replaceMeta(routeHtml, /(<link rel="canonical" href=")[^"]*("\s*\/?>)/, url);
  routeHtml = replaceMeta(routeHtml, /(<meta property="og:url" content=")[^"]*("\s*\/?>)/, url);
  routeHtml = replaceMeta(routeHtml, /(<meta property="og:title" content=")[^"]*("\s*\/?>)/, seo.title);
  routeHtml = replaceMeta(routeHtml, /(<meta property="og:description" content=")[^"]*("\s*\/?>)/, seo.description);
  routeHtml = replaceMeta(routeHtml, /(<meta name="twitter:url" content=")[^"]*("\s*\/?>)/, url);
  routeHtml = replaceMeta(routeHtml, /(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, seo.title);
  routeHtml = replaceMeta(routeHtml, /(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, seo.description);

  if (jsonLd) {
    const structuredData = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    routeHtml = routeHtml.replace('</head>', `    <script id="route-jsonld" type="application/ld+json">${structuredData}</script>\n  </head>`);
  }

  return routeHtml;
}

function generateStaticRouteHtmlPlugin(): Plugin {
  return {
    name: 'generate-static-route-html',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const indexHtml = fs.readFileSync(indexPath, 'utf8');
      const aboutFaqJsonLd = {
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
      };

      for (const seo of Object.values(routeSEO)) {
        if (seo.path === '/') continue;
        const jsonLd = seo.path === '/about' ? aboutFaqJsonLd : undefined;
        fs.writeFileSync(path.join(distDir, `${seo.path.slice(1)}.html`), createRouteHtml(indexHtml, seo, false, jsonLd));
      }

      fs.writeFileSync(path.join(distDir, '404.html'), createRouteHtml(indexHtml, NOT_FOUND_SEO, true));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    generateStaticRouteHtmlPlugin(),
  ],
  appType: 'spa',
});
