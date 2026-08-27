# wibsity — Project Context for Claude

Web design/dev studio marketing site. React 19 + Vite + TypeScript + Tailwind CSS v4 + react-router-dom.

## Commands
- `npm run dev` — dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- `npm run preview` — preview production build

## Architecture & Routing
`main.tsx` → `App.tsx` (`BrowserRouter` + `AnimatePresence` page transitions) → `pages/*.tsx`, one per route:
`/`, `/projects`, `/projects/:slug`, `/services`, `/about`, `/contact`, plus legacy `/work` and `/work/:slug` redirecting to `/projects`, and a `*` 404 catch-all.

Pages pull content from `data/*.ts` (typed via `types/index.ts`) and compose `components/{common,layout}`.

## Where page UI actually lives
**Page markup is inlined directly in `pages/*.tsx`, not in reusable section components.** There is no `components/sections/*` directory — a prior dead-code set (Hero, Principles, Portfolio, Services, Process, FAQ, CaseStudyDrawer) and the unused `Badge.tsx` were confirmed to have zero imports anywhere and deleted. To edit what's rendered on a page (hero copy, FAQ, services grid, etc.), edit the relevant `pages/*.tsx` file directly.

`App.tsx` route-splits: `HomePage` is a static import (it's the landing route), every other page (`ProjectsPage`, `CaseStudyPage`, `ServicesPage`, `AboutPage`, `ContactPage`, `NotFoundPage`) is `React.lazy()`-loaded behind a `<Suspense>` in `AnimatedRoutes`. This exists specifically to keep the initial `/` bundle small so the hero's entrance animation isn't competing with parsing/executing the rest of the site's JS on a slow mobile first-load — don't revert to eager imports for those pages without re-checking bundle size (`npm run build` warns if any chunk exceeds 500kB).

## Important shared components
Actually used and consistent across pages — safe to extend:
- `components/common/Button.tsx`, `SectionHeading.tsx`, `WhatsAppIcon.tsx`, `ScrollToTop.tsx`
- `components/layout/Navbar.tsx`, `Footer.tsx`
- `utils/cn.ts` (clsx + tailwind-merge) — use this for all conditional/merged className logic
- `hooks/useLenis.ts` (smooth scroll, exposes `window.__lenis` global consumed by `utils/scroll.ts`) and `hooks/useReducedMotion.ts` (gates Lenis + anime.js; respect this when adding motion)

## Styling / design tokens
**`src/index.css`'s `@theme` block is the authoritative Tailwind v4 token source** (colors, fonts, tracking) — it matches the actual fonts loaded in `index.html`.

**Brand accent color**: extracted directly from the logo mark (`public/logo-mark.png`), not invented — `--color-accent` (`#4B50FE`), `--color-accent-light` (`#7C82FF`), `--color-accent-dark` (`#2432FC`), `--color-accent-fg` (`#F5F6FF`, for text on filled accent backgrounds). Used for `Button`'s `primary` variant (gradient `accent` → `accent-dark`, verified ≥5:1 contrast — do not fade toward `accent-light` in a button fill, that drops contrast below WCAG AA), interactive hover states/borders/glows, the recurring `/` separator in `SectionHeading` and inline eyebrows, and the active nav indicator. Keep it restrained: it's a functional/interactive color, not a default decorative one — most of the page should stay the existing dark/neutral tokens (`canvas`, `canvas-subtle`, `canvas-surface`, `fg`, `fg-muted`, etc.), with accent reserved for the single primary action and brand touchpoints.

**`tailwind.config.js` appears vestigial**: it redefines the same token names with different values (different font stack, different tracking scale) and is not referenced via `@config` in `index.css`, so it's likely dead/ignored. Do not edit it expecting a visible effect — change tokens in `src/index.css` `@theme` instead. Flag to the user before touching `tailwind.config.js`.

**`src/App.css` is unused** (leftover Vite template boilerplate, never imported). Don't add styles to it.

## Deployment
Vercel is the primary deployment target (`vercel.json` has a catch-all SPA rewrite). A vite-config plugin also copies `dist/index.html` → `dist/404.html` as a static-host fallback, but no Netlify `_redirects` exists in the repo — don't assume Netlify support without verifying.

## Content guardrails
- **Never claim code/IP ownership transfer to the client.** The site does not promise "100% code ownership," "full IP ownership," or that the client receives Wibsity's underlying reusable code/components/tooling. This was deliberately removed from the hero, manifesto, About principles, Contact page, the ownership FAQ, and the process/handover step — don't reintroduce it.
- **Domain ownership stays an explicit, positive claim** ("Domain Ownership", "Always Yours" etc.) — the client does own their domain; that's the one ownership claim the site makes.
- **Projects data (`data/projects.ts`) uses niche/category names, never invented brand names** — e.g. "Surgical Practice," not a fabricated company like "Vanguard Health & Surgery." Each project's `desktopPreview.accentColor` is wired into that project's own mock preview content (nav wordmark, mobile CTA, card swatch) to visually differentiate concepts — don't let two projects' previews render identically again.
- **Never fabricate clients, testimonials, or metrics.** Value/trust claims must trace back to real existing copy (turnaround time, fixed-scope process, founder-direct contact, etc.), not invented numbers.

## Conventions for editing
- Reuse `Button`, `SectionHeading`, `cn()`, and the layout components rather than reinventing patterns already established in `pages/*.tsx`.
- Don't add new tokens to `tailwind.config.js`; add them to `src/index.css` `@theme`.
- Preserve the reduced-motion gating pattern when adding new animation.
- **One filled `primary` Button per CTA cluster.** Every other action in the same group should be `ghost` or a plain text link — don't stack multiple bordered/filled buttons of similar visual weight next to each other (this was a deliberate fix; don't regress it).
