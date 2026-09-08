export interface Service {
  id: string;
  /** Position in the catalogue. A real fixed set, so the number carries
   *  information rather than decorating the heading. */
  index: string;
  title: string;
  /** One plain sentence: what the thing actually is. */
  summary: string;
  /** Who should be reading this entry. */
  forWhom: string;
  /** The problem it solves, stated as the client would state it. */
  problem: string;
  /** What is in the box. Kept short — five lines a person will read beats
   *  fifteen they will skip. */
  includes: string[];
  /** Real delivery window, matching what faqs.ts tells people. */
  timeline: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  /** What the client does at this stage, as distinct from what we do. Every
   *  step names both, because "what will this cost me in time" is the
   *  unasked question behind every process section. */
  yours: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** One row of the template-versus-built comparison on the homepage. Both
 *  sides are structural facts about how the two things are made, not
 *  performance claims — nothing here asserts a number we have not measured. */
export interface ComparisonRow {
  aspect: string;
  template: string;
  built: string;
}

/** One paired term in the comparison section's glance panel — the same
 *  structural-fact standard as `ComparisonRow`, just compressed to a phrase
 *  rather than a sentence. */
export interface ComparisonGlanceItem {
  template: string;
  built: string;
}
