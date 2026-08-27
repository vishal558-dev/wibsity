# wibsity — Project Context for Claude

Web design/dev studio marketing site. React 19 + Vite + TypeScript + Tailwind CSS v4 + react-router-dom.

## Commands
- `npm run dev` — dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- `npm run preview` — preview production build

## Architecture & Routing
`main.tsx` → `App.tsx` (`BrowserRouter` + `AnimatePresence` page transitions) → `pages/*.tsx`, one per route:
`/`, `/services`, `/about`, `/contact`, a `*` 404 catch-all, and `/projects`, `/projects/:slug`, `/work`, `/work/:slug` which all currently redirect to `/` — Projects & Concepts is temporarily hidden from navigation until there's real client work to show (the page, data, and routes are still in the codebase, see the note below).

Pages pull content from `data/*.ts` (typed via `types/index.ts`) and compose `components/{common,layout}`.

## Where page UI actually lives
**Page markup is inlined directly in `pages/*.tsx`, not in reusable section components.** There is no `components/sections/*` directory — a prior dead-code set (Hero, Principles, Portfolio, Services, Process, FAQ, CaseStudyDrawer) and the unused `Badge.tsx` were confirmed to have zero imports anywhere and deleted. To edit what's rendered on a page (hero copy, FAQ, services grid, etc.), edit the relevant `pages/*.tsx` file directly.

`App.tsx` route-splits: `HomePage` is a static import (it's the landing route), every other page (`ProjectsPage`, `CaseStudyPage`, `ServicesPage`, `AboutPage`, `ContactPage`, `NotFoundPage`) is `React.lazy()`-loaded behind a `<Suspense>` in `AnimatedRoutes`. This exists specifically to keep the initial `/` bundle small so the hero's entrance animation isn't competing with parsing/executing the rest of the site's JS on a slow mobile first-load — don't revert to eager imports for those pages without re-checking bundle size (`npm run build` warns if any chunk exceeds 500kB).

## Important shared components
Actually used and consistent across pages — safe to extend:
- `components/common/Button.tsx`, `SectionHeading.tsx`, `WhatsAppIcon.tsx`, `ScrollToTop.tsx`
- `components/layout/Navbar.tsx`, `Footer.tsx`
- `utils/cn.ts` (clsx + tailwind-merge) — use this for all conditional/merged className logic
- `hooks/useLenis.ts` (smooth scroll, exposes `window.__lenis` global consumed by `utils/scroll.ts`) and `hooks/useReducedMotion.ts` (gates Lenis + `motion`; respect this when adding motion)

**Projects & Concepts is unrouted right now.** `/projects` and `/work` (and their `:slug` variants) `<Navigate to="/" replace />` in `App.tsx` — there's no nav or footer link to them either. `data/projects.ts`, `pages/ProjectsPage.tsx`, and `pages/CaseStudyPage.tsx` are all left intact specifically so this can be flipped back on later without a rebuild; don't delete them as "unused."

## Styling / design tokens
**`src/index.css`'s `@theme` block is the authoritative Tailwind v4 token source** (colors, fonts, tracking) — it matches the actual fonts loaded in `index.html`.

**Brand accent color**: extracted directly from the logo mark (`public/logo-mark.png`), not invented — `--color-accent` (`#4B50FE`), `--color-accent-light` (`#7C82FF`), `--color-accent-dark` (`#2432FC`), `--color-accent-fg` (`#F5F6FF`, for text on filled accent backgrounds). Used for `Button`'s `primary` variant (gradient `accent` → `accent-dark`, verified ≥5:1 contrast — do not fade toward `accent-light` in a button fill, that drops contrast below WCAG AA), interactive hover states/borders/glows, the recurring `/` separator in `SectionHeading` and inline eyebrows, and the active nav indicator. Keep it restrained: it's a functional/interactive color, not a default decorative one — most of the page should stay the existing dark/neutral tokens (`canvas`, `canvas-subtle`, `canvas-surface`, `fg`, `fg-muted`, etc.), with accent reserved for the single primary action and brand touchpoints.

**Light/dark theming**: the site supports both themes via a token-swap, not a component-level `dark:` variant — every component already only ever references semantic tokens (`bg-canvas`, `text-fg`, `border-border-hairline`, etc.), so `src/index.css`'s `:root[data-theme="light"] { ... }` block is the *only* place light-mode colors are defined. `data-theme` is set on `<html>` by a blocking inline script in `index.html` (before first paint, to avoid a flash of the wrong theme) and kept in sync by `hooks/useTheme.ts`, which defaults to `prefers-color-scheme` until the viewer clicks the `ThemeToggle` in `Navbar.tsx`, at which point the explicit choice is persisted to `localStorage` (`wibsity-theme`) and the site stops following OS changes. Two tokens are deliberately theme-**invariant** — `--color-ink-fixed` and `--color-paper-fixed` — used only by `CaseStudyPage.tsx`'s per-project contrast picker, which contrasts against an arbitrary project brand color that has nothing to do with the site's own theme; don't redefine these under the light-theme block. When adding a new component, use the existing semantic tokens and it will re-theme for free — don't reach for a Tailwind `dark:` variant, which this codebase doesn't use anywhere. One Tailwind v4 gotcha to know: an opacity-modifier utility on a theme-swapped token (e.g. `bg-canvas/90`) compiles to a color-mix() with the literal value baked in, not a live var() reference, so it won't re-theme — use an arbitrary-value class instead, e.g. `bg-[color:color-mix(in_srgb,var(--color-canvas)_90%,transparent)]` (see `Navbar.tsx`'s scrolled-header background for a real example).

**`useTheme()` is called independently in both `Navbar.tsx` and `Footer.tsx`** (each needs its own `theme` value to pick a logo asset — see below), and each call keeps its own local React state with no Context tying them together. That means `setTheme` alone would only update the caller's own state, leaving sibling components stale until a full reload. The hook fixes this by having `setTheme` broadcast a `wibsity-theme-change` `CustomEvent` on `window`, which every mounted `useTheme()` instance listens for and re-syncs from — if you ever call `useTheme()` from a third component, this is already handled, no extra wiring needed.

**Logo assets are theme-swapped, not CSS-recolored**: `public/logo.png` / `public/logo-mark.png` (dark-mode versions) and `public/logo-light.png` / `public/logo-mark-light.png` (light-mode versions) are separate raster files — `Navbar.tsx` and `Footer.tsx` each pick `theme === 'light' ? '...-light.png' : '...png'`. The light variants exist because the original PNGs encode the wordmark almost entirely via alpha over near-white RGB (fine on the dark canvas, invisible on white); the light versions were generated by recoloring only the non-blue pixels to dark ink while leaving alpha and the blue accent gradient untouched. If the logo art ever changes, both light and dark PNGs need regenerating together — there's no single source of truth to derive one from the other automatically.

**`public/favicon-dark.png`** (opaque `#08080a` backdrop, not transparent) is the canonical source for every small brand icon that renders outside the app's own theme control — `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, and the `og:image`/`twitter:image`/JSON-LD `logo`+`image` fields in `index.html`. These all need an opaque background because they render in contexts the site's `data-theme` can't reach (browser tab chrome, social link-preview cards, Google search results) — a transparent near-white mark disappears there regardless of the site's own theme. `public/favicon.svg` and `public/favicon.png` are unreferenced leftovers (`favicon.svg` isn't even the wibsity mark) — don't wire them in by habit; use `favicon-dark.png` as the source if these ever need regenerating.

**There is no `tailwind.config.js`** — it was confirmed vestigial (never referenced via `@config`, defined conflicting duplicate tokens) and deleted. `src/index.css`'s `@theme` block is the only place to add or change tokens.

**There is no `src/App.css`** — it was unused leftover Vite template boilerplate, never imported, and was deleted.

## Mobile performance conventions
- **`hooks/useLenis.ts` skips initializing Lenis on coarse-pointer (touch) devices**, not just on `prefers-reduced-motion` — mobile already has native momentum scroll, so running Lenis there is CPU/battery cost with no UX benefit. This check runs once at mount (`window.matchMedia('(pointer: coarse)')`), not live — it doesn't need to be, since a device's pointer type doesn't change mid-session in practice. `utils/scroll.ts`'s helpers already fall back to native `window.scrollTo`/`scrollIntoView` whenever `window.__lenis` is absent, so nothing else needs to branch on this.
- **New `<img>` tags should get explicit `width`/`height`** (the image's real intrinsic pixel dimensions, not the display size — CSS still controls display size) to avoid layout shift, plus `decoding="async"`. Below-the-fold images (anything not visible on initial load, e.g. footer content) should also get `loading="lazy"`.
- **Third-party font stylesheets load via the preload+swap pattern** in `index.html` (`rel="preload" as="style" onload="this.rel='stylesheet'"` with a `<noscript>` fallback), not a plain blocking `<link rel="stylesheet">` — keeps them off the critical rendering path on a slow connection. Follow the same pattern if another external stylesheet is ever added.

## Deployment
Vercel is the primary deployment target (`vercel.json` has a catch-all SPA rewrite). A vite-config plugin also copies `dist/index.html` → `dist/404.html` as a static-host fallback, but no Netlify `_redirects` exists in the repo — don't assume Netlify support without verifying.

## Content guardrails
- **Never claim code/IP ownership transfer to the client.** The site does not promise "100% code ownership," "full IP ownership," or that the client receives Wibsity's underlying reusable code/components/tooling. This was deliberately removed from the hero, manifesto, About principles, Contact page, the ownership FAQ, and the process/handover step — don't reintroduce it.
- **Domain ownership stays an explicit, positive claim** ("Domain Ownership", "Always Yours" etc.) — the client does own their domain; that's the one ownership claim the site makes.
- **Projects data (`data/projects.ts`) uses niche/category names, never invented brand names** — e.g. "Surgical Practice," not a fabricated company like "Vanguard Health & Surgery." Each project's `desktopPreview.accentColor` is wired into that project's own mock preview content (nav wordmark, mobile CTA, card swatch) to visually differentiate concepts — don't let two projects' previews render identically again.
- **Never fabricate clients, testimonials, or metrics.** Value/trust claims must trace back to real existing copy (turnaround time, fixed-scope process, founder-direct contact, etc.), not invented numbers.

## Conventions for editing
- Reuse `Button`, `SectionHeading`, `cn()`, and the layout components rather than reinventing patterns already established in `pages/*.tsx`.
- Add design tokens to `src/index.css` `@theme` (there's no `tailwind.config.js` anymore).
- `motion` (`motion/react`) is the only animation library in the project — `animejs` was removed after its two hero-grid effects were reimplemented with `motion`. Don't reintroduce it for new animation; use `motion` instead.
- Preserve the reduced-motion gating pattern when adding new animation.
- **One filled `primary` Button per CTA cluster.** Every other action in the same group should be `ghost` or a plain text link — don't stack multiple bordered/filled buttons of similar visual weight next to each other (this was a deliberate fix; don't regress it).
