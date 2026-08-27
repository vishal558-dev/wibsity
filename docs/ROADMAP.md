# Wibsity — Roadmap

## Current State
React 19 + Vite + TypeScript + Tailwind v4 marketing site with 7 routed pages (Home, Projects, CaseStudy, Services, About, Contact, 404). Page content is inlined directly in `pages/*.tsx`. Shared primitives (`Button`, `SectionHeading`, `Navbar`, `Footer`, `cn()`) are consistently used. Deployed on Vercel.

A conversion-focused redesign pass (see Changelog below) is largely complete: brand accent color system, single-CTA hierarchy, de-templatized process/principles sections, a differentiated hero, code-split routing, and corrected ownership messaging.

## Changelog (redesign pass)
Reverse-chronological summary of what changed and why, so a future session doesn't have to re-derive it from `git log`:

- **`e26100a`** — Deleted `components/sections/*` (Hero, Principles, Portfolio, Services, Process, FAQ, CaseStudyDrawer) and `components/common/Badge.tsx`. Confirmed zero imports first; this closes the "duplicated page markup" debt item below.
- **`98e9fc0`** — Projects data: replaced invented brand names ("Vanguard Health & Surgery" etc.) with niche/category names ("Surgical Practice" etc.). Also fixed every project concept preview rendering identically — `desktopPreview.accentColor` existed per-project but was never wired into any rendering; now drives the mock nav wordmark, mobile CTA button, and card swatch, plus the "Section Cards" layout shape now varies by `category` (stat-strip / menu-row / swatch grid / card grid).
- **`e39e33b`** — Hero right panel gained a connected companion stat card and scan-line detail. Ownership messaging reframed sitewide: removed every "100% code/IP ownership" claim (hero, manifesto, Contact, About principles, ownership FAQ, process handover step) and replaced with domain-ownership-only language — see the Content guardrails section in `CLAUDE.md`.
- **`b5fcec2`** — Trimmed the hero headline to end at "...stand out." (dropped "and win clients."), replaced the SVG highlighter-stroke under the highlighted phrase with a plain solid accent-color span. Root-caused and fixed the word-reveal animation not visibly playing on mobile first-load: the whole site shipped as one >500kB JS bundle; route-split every page except `HomePage` behind `React.lazy`/`Suspense` in `App.tsx`, and added a `requestAnimationFrame` gate before the reveal starts as extra insurance.
- **`9a16000`** — First hero "wow factor" pass: replaced the generic gradient-text headline treatment with a word-by-word staggered reveal, a hand-drawn highlighter accent stroke, a magnetic-hover primary CTA, and an asymmetric layout (stat card on the right on `lg+`) — built entirely on the existing `motion` dependency, no new packages.
- **`2e3afd4`** — Enforced one filled primary `Button` per CTA cluster sitewide (hero, footer, services/case-study/projects banners); replaced the identical bordered-card treatment on the delivery-methodology steps with a connected timeline and on the Studio principles with a numbered whitespace-led list, specifically to avoid the site reading as a generic templated agency page.
- **`7d4c4a2`** — Fixed a WCAG contrast failure in the initial accent-color pass (primary button gradient faded to `accent-light`, dropping white label text below 3:1) and dialed back accent overuse on secondary icons/checkmarks back to neutral.
- **`050f0c8`** — Introduced the brand accent color system, extracted by sampling actual pixel colors from `public/logo-mark.png` (not invented): `accent` `#4B50FE`, `accent-light` `#7C82FF`, `accent-dark` `#2432FC`. Threaded through buttons, hover states, borders, and the recurring `/` separator.

## Known Technical Debt
- **Conflicting Tailwind token sources**: `tailwind.config.js` and `src/index.css`'s `@theme` block both define colors/fonts/tracking with different values. `@theme` is the one actually in effect; `tailwind.config.js` is likely vestigial.
- **Stale README**: references files/routes that no longer match the real project structure.
- **`src/App.css` is unused** leftover Vite boilerplate.
- **`animejs` is a narrow-purpose dependency** (hero-grid effect) that overlaps with `motion`, already in use for everything else.
- **Main JS bundle is still ~480kB** (under Vite's 500kB warning threshold after route-splitting, but still the largest chunk) — further splitting (e.g. deferring `motion`/`animejs` off the critical path) hasn't been attempted.

## Current Priority
1. Improve the Wibsity website's UI/UX and conversion quality. *(Substantially underway — see Changelog.)*

## Later
- Resolve the Tailwind config conflict (retire `tailwind.config.js` or reconcile it with `src/index.css`).
- Rewrite the README to match the actual structure.
- Remove unused `src/App.css`.
- Evaluate dropping `animejs` in favor of `motion`.
- Revisit main bundle size further if it approaches the 500kB warning threshold again.
