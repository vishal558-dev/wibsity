# Wibsity — Roadmap

## Current State
React 19 + Vite + TypeScript + Tailwind v4 marketing site with 7 routed pages (Home, Projects, CaseStudy, Services, About, Contact, 404). Page content is inlined directly in `pages/*.tsx`. Shared primitives (`Button`, `SectionHeading`, `Navbar`, `Footer`, `cn()`) are consistently used. Deployed on Vercel.

## Known Technical Debt
- **Duplicated page markup / unused section components**: `components/sections/*` (Hero, Principles, Portfolio, Services, Process, FAQ, CaseStudyDrawer) is dead code — pages reimplement the same UI inline instead, and the two versions have already drifted apart in places.
- **Conflicting Tailwind token sources**: `tailwind.config.js` and `src/index.css`'s `@theme` block both define colors/fonts/tracking with different values. `@theme` is the one actually in effect; `tailwind.config.js` is likely vestigial.
- **Stale README**: references files/routes that no longer match the real project structure.
- **`src/App.css` is unused** leftover Vite boilerplate.
- **`animejs` is a narrow-purpose dependency** (two duplicated hero-grid effects) that overlaps with `motion`, already in use for everything else.

## Current Priority
1. Improve the Wibsity website's UI/UX and conversion quality.

## Later
- Remove or consolidate `components/sections/*` vs. inlined page markup.
- Resolve the Tailwind config conflict (retire `tailwind.config.js` or reconcile it with `src/index.css`).
- Rewrite the README to match the actual structure.
- Remove unused `src/App.css`.
- Evaluate dropping `animejs` in favor of `motion`.
