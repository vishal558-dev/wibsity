# wibsity — Digital Design & Web Engineering Studio

> Clean, fast, high-impact web design for businesses, founders, modern practices, and growing brands.

wibsity is an editorial web design and digital engineering studio website built with **React 19**, **Vite 6**, **TypeScript**, and **Tailwind CSS**. It follows a **Minimalist Swiss Editorial** design system featuring purposeful motion, accessible smooth scrolling, and an interactive portfolio centerpiece with responsive viewport simulation.

---

## ✨ Features

- **Minimalist Swiss Editorial Design**: High-contrast monochrome palette (`#08080a` canvas, `#fafafa` typography, `#27272a` hairline borders, uppercase monospace system tags).
- **Interactive Portfolio & Case Study Centerpiece**:
  - Filterable selected works showcase across Digital Flagships, Practice Portals, Brand Experiences, and Commerce.
  - Interactive **Desktop (1440px) vs Mobile (390px) Viewport Switcher** simulating live responsive layouts.
  - Deep-dive strategic breakdowns (The Challenge, UX Strategy, Architectural Features, Stack).
  - Integrated inquiry action connecting case studies to the project intake modal.
- **Direct, Empowering Copywriting**: Authentic, value-driven positioning tailored for businesses, founders, and modern practices with zero fake social proof.
- **4 Core Capabilities**: Business Websites, High-Converting Landing Pages, Modern Website Redesigns, and Custom Web Experiences.
- **Studio Principles & 4-Step Methodology**: Clear communication of value, sub-second performance, 100% code ownership, and structured delivery.
- **Business FAQ Accordion**: Categorized, searchable answers to scoping, timelines, and technical standards.
- **Project Brief Intake Modal**: Frictionless conversation starter with validation and pre-attached project references.
- **Strictly Domain-Agnostic Routing**: Fully relative paths and internal state triggers ready for immediate custom domain deployment.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Motion**: [Motion (`motion/react`)](https://motion.dev/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) (with `prefers-reduced-motion` compliance)
- **Specialized Geometric Animations**: [Anime.js v4](https://animejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd wibsity

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
wibsity/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts                 # TypeScript definitions (Project, Service, FAQ, Inquiry)
    ├── data/
    │   ├── projects.ts              # Rich case study data & interactive viewports
    │   ├── services.ts              # 4 Core business service offerings
    │   ├── process.ts               # 4-Step delivery methodology
    │   └── faqs.ts                  # Categorized business FAQs
    ├── hooks/
    │   ├── useLenis.ts              # Lenis smooth scroll hook + reduced-motion guard
    │   └── useReducedMotion.ts      # Accessibility preference hook
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx            # Monospace system tag [ 01 // TAG ]
    │   │   ├── Button.tsx           # High-contrast editorial button
    │   │   └── SectionHeading.tsx   # Standardized Swiss editorial section header
    │   ├── layout/
    │   │   ├── Navbar.tsx           # Sticky header with availability badge
    │   │   └── Footer.tsx           # Typographic monolith footer
    │   ├── sections/
    │   │   ├── Hero.tsx             # Customer-focused hero & anime.js gridlines
    │   │   ├── Principles.tsx       # Studio principles & business value
    │   │   ├── Portfolio.tsx        # Filterable selected works showcase
    │   │   ├── CaseStudyDrawer.tsx  # Interactive case study drawer & viewport toggle
    │   │   ├── Services.tsx         # 4 Core services bento grid
    │   │   ├── Process.tsx          # 4-Step delivery methodology
    │   │   └── FAQ.tsx              # Architectural accordion FAQ
    │   └── modals/
    │       └── InquiryModal.tsx     # Direct project conversation modal
    └── utils/
        └── cn.ts                    # Class name merger (clsx + twMerge)
```

---

## 📄 License

MIT © [wibsity](https://wibsity.com)
