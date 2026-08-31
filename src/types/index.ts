export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ScopeSpec {
  label: string;
  value: string;
}

/**
 * Fields every concept mock needs regardless of its layout.
 *
 * `accent` is the *mocked business's* brand colour, not wibsity's — an
 * arbitrary hex that has nothing to do with the site's own theme. It may only
 * ever be used as a FILL or a RULE inside a mock, with `readableOn()`
 * (utils/contrast.ts) picking the text laid over it. It must never be used as
 * a text colour directly on the page canvas: a fixed hex cannot clear contrast
 * against both `--color-canvas` values, and the previous version of these mocks
 * rendered the nav wordmark this way, which read at 2.1:1 on the light theme.
 */
interface ConceptPreviewBase {
  accent: string;
  wordmark: string;
  mobileHeadline: string;
  mobileCta: string;
}

/** Appointment-led practice site: low density, wide horizontal rhythm. */
export interface ClinicPreview extends ConceptPreviewBase {
  layout: 'clinic';
  nav: string[];
  headline: string;
  standfirst: string;
  /** Credential signals, rendered as understated microtext rather than badges. */
  trustMarkers: string[];
  bookingCta: string;
  departments: { code: string; name: string; blurb: string }[];
}

/** Editorial architecture monograph: type-dominant, asymmetric, achromatic. */
export interface MonographPreview extends ConceptPreviewBase {
  layout: 'monograph';
  /** Oversized display line — deliberately allowed to run past the frame edge. */
  displayLine: string;
  discipline: string;
  indexEntries: { no: string; project: string; place: string; year: string }[];
}

/** Product storefront: highest density, tight modular grid. */
export interface StorefrontPreview extends ConceptPreviewBase {
  layout: 'storefront';
  promo: string;
  nav: string[];
  cartCount: number;
  /** `roast` is a 1–5 level rendered as filled dots. */
  products: { name: string; origin: string; roast: number; price: string; notes: string }[];
  hours: string;
}

/**
 * Discriminated union, deliberately. Each concept carries a *different data
 * shape*, so the three mocks cannot quietly converge into one template the way
 * they did when all of them rendered a shared `sections: PreviewSection[]`.
 * ConceptPreview.tsx switches on `layout` exhaustively — adding a fourth
 * archetype without a branch is a compile error, not a silent fallback.
 */
export type ConceptPreview = ClinicPreview | MonographPreview | StorefrontPreview;

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Always "Studio Concept" — these are self-initiated studies, not client work. */
  badge: string;
  clientType: string;
  tagline: string;
  summary: string;
  challenge: string;
  strategy: string;
  deliverables: string[];
  features: ProjectFeature[];
  stack: string[];
  scopeSpecs: ScopeSpec[];
  preview: ConceptPreview;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  forWhom: string;
  deliverables: string[];
  scopeType: string;
  iconName: 'Layout' | 'Layers' | 'RefreshCw' | 'Sliders';
}

export interface ProcessStep {
  step: string;
  code: string;
  name: string;
  focus: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Engagement' | 'Process' | 'Ownership' | 'Technical';
}
