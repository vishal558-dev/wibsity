export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  forWhom: string;
  deliverables: string[];
  scopeType: string;
  iconName: 'Layout' | 'Layers' | 'RefreshCw' | 'Sliders' | 'ShoppingCart';
  /** Root-relative path to a representative stock photo, used by HomePage's
   * hover-driven service showcase (desktop) and tap-accordion (mobile). */
  image: string;
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
