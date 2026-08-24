export type ProjectCategory = 'all' | 'flagship' | 'brand' | 'practice' | 'commerce';

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ScopeSpec {
  label: string;
  value: string;
}

export interface PreviewSection {
  title: string;
  desc: string;
  tag: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  badge: string; // e.g. "Studio Concept"
  clientType: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  summary: string;
  challenge: string;
  strategy: string;
  deliverables: string[];
  features: ProjectFeature[];
  stack: string[];
  desktopPreview: {
    heroHeadline: string;
    heroSub: string;
    navLinks: string[];
    accentColor: string;
    scopeSpecs: ScopeSpec[];
    sections: PreviewSection[];
  };
  mobilePreview: {
    headline: string;
    ctaText: string;
    highlight: string;
    sections: { title: string; tag: string }[];
  };
}

export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  forWhom: string;
  deliverables: string[];
  turnaround: string;
  iconName: 'Layout' | 'Layers' | 'RefreshCw' | 'Sliders';
}

export interface ProcessStep {
  step: string;
  code: string;
  name: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Engagement' | 'Process' | 'Ownership' | 'Technical';
}

export interface InquiryFormState {
  name: string;
  email: string;
  businessName: string;
  serviceInterest: string;
  projectReference: string;
  projectBrief: string;
  timeline: string;
}
