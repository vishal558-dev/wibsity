# wibsity — a one-person web studio

> Custom websites, built from scratch. This repository is the studio's own site.

Built with **React 19**, **Vite**, **TypeScript** and **Tailwind CSS v4**. The site's pitch is that a
hand-built site beats an assembled one, so it has to pass its own argument: the homepage measures
itself in the visitor's browser and prints the reading.

---

## Tech stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — tokens live in `src/index.css`'s
  `@theme` block; there is no `tailwind.config.js`
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animation**: none. Every transition on the site is CSS
- **Icons**: none. Ten hand-drawn inline SVGs in `src/components/common/icons.tsx`

`motion`, `lenis` and `lucide-react` were all removed in the 2026 redesign — see
[docs/DESIGN-DIRECTION.md](docs/DESIGN-DIRECTION.md) for why, and `src/App.tsx` for the
short version. The runtime is React and the router.

---

## Getting started

```bash
git clone <your-repo-url>
cd wibsity
npm install
npm run dev
```

### Other scripts

```bash
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run preview  # preview the production build locally
```

Brand raster assets (favicons, the social card) are generated, not hand-edited:

```bash
node scripts/generate-brand-assets.mjs
```

It drives the locally installed Chrome, so there is no image dependency in `package.json`.
Run it after changing the logo geometry, the hero headline, or `og:description`.

---

## Project structure

Page markup is inlined directly in `pages/*.tsx` — there is no `components/sections/*` layer. To
change what renders on a page, edit that page file.

```
wibsity/
├── index.html                       # Homepage <head> — the one route the build does not regenerate
├── vite.config.ts                   # Static per-route HTML + a build-time FAQ/JSON-LD sync check
├── scripts/
│   └── generate-brand-assets.mjs    # Favicons, apple-touch-icon, og-image, from one SVG
└── src/
    ├── main.tsx
    ├── App.tsx                      # Router root, route splitting, per-route SEO
    ├── index.css                    # Design system: tokens, the measure rule, the ink field
    ├── pages/
    │   ├── HomePage.tsx             # Six sections, each a different composition
    │   ├── ServicesPage.tsx         # The four services, in full
    │   ├── AboutPage.tsx            # The studio, its standards, the full FAQ
    │   ├── ContactPage.tsx          # The enquiry form and the direct channels
    │   └── NotFoundPage.tsx
    ├── types/index.ts               # Service, ProcessStep, FAQItem, ComparisonRow
    ├── data/
    │   ├── services.ts              # Four services + the custom-work note
    │   ├── process.ts               # Four steps, each naming the client's own part
    │   ├── faqs.ts                  # Nine questions; the first three are on the homepage
    │   ├── studio.ts                # Comparison rows, standards, studio facts
    │   ├── contact.ts               # Channels + what happens after the form
    │   ├── projectInquiry.ts        # Form options and the Formspree endpoint
    │   └── seo.ts                   # Per-route title/description
    ├── hooks/
    │   ├── useReducedMotion.ts
    │   └── useSEO.ts
    ├── components/
    │   ├── common/
    │   │   ├── Logo.tsx             # Wordmark and mark, drawn in code
    │   │   ├── icons.tsx            # The complete icon set
    │   │   ├── Button.tsx
    │   │   ├── InquiryForm.tsx      # The primary conversion surface
    │   │   ├── PageSpecimen.tsx     # The page measuring itself
    │   │   ├── ConstructionGrid.tsx # The hero's cursor-revealed guides
    │   │   └── ScrollToTop.tsx
    │   └── layout/
    │       ├── Section.tsx          # Gutter, measure, rhythm, the inverted field
    │       ├── Navbar.tsx           # Ink masthead + full-height mobile sheet
    │       └── Footer.tsx
    └── utils/cn.ts
```

---

## Content guardrails

- The site never claims code/IP ownership transfer to the client. Domain ownership is the one
  explicit ownership claim it makes.
- No fabricated clients, testimonials, awards, metrics or case studies. There are none to report,
  and the design is built to earn trust without them.
- **No unverified performance numbers.** The homepage's specimen readout is the only performance
  figure on the site, and it is measured live in the visitor's own browser rather than asserted.

---

## License

MIT © [wibsity](https://wibsity.in)
