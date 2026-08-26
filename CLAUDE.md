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
**Page markup is inlined directly in `pages/*.tsx`, not in reusable section components.** `components/sections/*` (Hero, Principles, Portfolio, Services, Process, FAQ, CaseStudyDrawer) is currently **unused dead code** — zero imports anywhere. `Badge.tsx` is also unused. To edit what's rendered on a page (hero copy, FAQ, services grid, etc.), edit the relevant `pages/*.tsx` file directly — editing `components/sections/*` has no visible effect. Do not assume these files are the live implementation.

## Important shared components
Actually used and consistent across pages — safe to extend:
- `components/common/Button.tsx`, `SectionHeading.tsx`, `WhatsAppIcon.tsx`, `ScrollToTop.tsx`
- `components/layout/Navbar.tsx`, `Footer.tsx`
- `utils/cn.ts` (clsx + tailwind-merge) — use this for all conditional/merged className logic
- `hooks/useLenis.ts` (smooth scroll, exposes `window.__lenis` global consumed by `utils/scroll.ts`) and `hooks/useReducedMotion.ts` (gates Lenis + anime.js; respect this when adding motion)

## Styling / design tokens
**`src/index.css`'s `@theme` block is the authoritative Tailwind v4 token source** (colors, fonts, tracking) — it matches the actual fonts loaded in `index.html`.

**`tailwind.config.js` appears vestigial**: it redefines the same token names with different values (different font stack, different tracking scale) and is not referenced via `@config` in `index.css`, so it's likely dead/ignored. Do not edit it expecting a visible effect — change tokens in `src/index.css` `@theme` instead. Flag to the user before touching `tailwind.config.js`.

**`src/App.css` is unused** (leftover Vite template boilerplate, never imported). Don't add styles to it.

## Deployment
Vercel is the primary deployment target (`vercel.json` has a catch-all SPA rewrite). A vite-config plugin also copies `dist/index.html` → `dist/404.html` as a static-host fallback, but no Netlify `_redirects` exists in the repo — don't assume Netlify support without verifying.

## Conventions for editing
- Reuse `Button`, `SectionHeading`, `cn()`, and the layout components rather than reinventing patterns already established in `pages/*.tsx`.
- Before extracting shared sections out of pages or deleting `components/sections/*`, confirm with the user — this is a known, deliberate cleanup opportunity, not yet actioned.
- Don't add new tokens to `tailwind.config.js`; add them to `src/index.css` `@theme`.
- Preserve the reduced-motion gating pattern when adding new animation.
