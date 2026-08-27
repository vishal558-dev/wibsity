# wibsity — Digital Design & Web Engineering Studio

> Clean, fast, high-impact web design for businesses, founders, modern practices, and growing brands.

wibsity is a web design and engineering studio's own marketing site, built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**. It uses a minimalist, high-contrast editorial design system with purposeful motion and accessible smooth scrolling.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (config lives in `src/index.css`'s `@theme` block, not `tailwind.config.js`)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animation & Motion**: [Motion (`motion/react`)](https://motion.dev/) — the only animation library in use
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) (with `prefers-reduced-motion` compliance)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

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

---

## Project Structure

Page markup is inlined directly in `pages/*.tsx` — there is no `components/sections/*` layer. To change what renders on a page (hero copy, FAQ, services grid, etc.), edit the relevant page file directly.

```
wibsity/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx                      # Router root: routes, page transitions, Lenis init
    ├── index.css                    # Tailwind v4 @theme — the single source of design tokens
    ├── pages/
    │   ├── HomePage.tsx             # Landing page (statically imported; every other page is lazy-loaded)
    │   ├── ProjectsPage.tsx         # Projects & Concepts archive (currently unrouted — see note below)
    │   ├── CaseStudyPage.tsx        # Per-project case study with desktop/mobile viewport simulator
    │   ├── ServicesPage.tsx         # Core capabilities & delivery methodology
    │   ├── AboutPage.tsx            # Studio principles & FAQ
    │   ├── ContactPage.tsx          # Direct contact hub
    │   └── NotFoundPage.tsx         # 404 handler
    ├── types/
    │   └── index.ts                 # Project, Service, FAQ, etc. type definitions
    ├── data/
    │   ├── projects.ts              # Project/concept case study content
    │   ├── services.ts              # Core service offerings
    │   ├── process.ts               # Delivery methodology steps
    │   ├── faqs.ts                  # Categorized FAQs
    │   └── contact.ts               # Centralized phone, email, and WhatsApp config
    ├── hooks/
    │   ├── useLenis.ts              # Lenis smooth scroll hook + reduced-motion guard
    │   └── useReducedMotion.ts      # Accessibility preference hook
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx           # Shared button (supports both router `to` and external `href`)
    │   │   ├── ScrollToTop.tsx      # Router scroll-to-top handler
    │   │   ├── SectionHeading.tsx   # Standardized section header
    │   │   └── WhatsAppIcon.tsx     # Branded SVG icon
    │   └── layout/
    │       ├── Navbar.tsx           # Sticky header with active NavLinks & mobile drawer
    │       └── Footer.tsx           # Footer with site directory
    └── utils/
        ├── cn.ts                    # Class name merger (clsx + tailwind-merge)
        └── scroll.ts                # Lenis-aware scroll helpers
```

**Note on Projects & Concepts**: the `/projects` and `/work` routes currently redirect to the homepage — the page is temporarily hidden from navigation until there's real client work to showcase, rather than concept-only placeholders. The page, its data, and its route are all still in the codebase and can be re-enabled by restoring the routes in `App.tsx` and the nav/footer links.

---

## Content Guardrails

- The site never claims code/IP ownership transfer to the client — it does not promise "full ownership of the code" or similar. Domain ownership is the one explicit ownership claim it makes.
- Project entries use niche/category names ("Surgical Practice"), never invented brand names, and are labeled as concept work, not real past clients.
- No fabricated testimonials or metrics — value claims trace back to real, existing copy (turnaround time, fixed-scope process, direct founder contact).

---

## License

MIT © [wibsity](https://wibsity.in)
