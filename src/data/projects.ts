import type { Project } from '../types';

/**
 * Self-initiated design concepts — not client work. Every entry is titled by
 * its niche ("Surgical Practice"), never by an invented company name, and
 * carries no fabricated testimonials, results, or metrics. The `badge` field is
 * surfaced prominently on both /projects and each case study, and the mock
 * frames themselves carry a "Concept" marker, so a screenshot taken out of
 * context still can't read as a real engagement.
 *
 * Three concepts, three deliberately different site archetypes — an
 * appointment-led practice, an editorial monograph, and a product storefront.
 * Each one's `preview` uses a different data shape (see ConceptPreview in
 * types/index.ts), which is what stops the three mocks drifting back into one
 * shared template with three tints.
 */
export const projectsData: Project[] = [
  {
    id: 'surgical-practice',
    slug: 'surgical-practice',
    title: 'Surgical Practice',
    badge: 'Studio Concept',
    clientType: 'Medical & Surgical Practice Concept',
    tagline: 'A patient-first concept exploring streamlined appointment intake and clinical clarity.',
    summary:
      'A design study exploring how a modern surgical practice can present complex procedural information with reassuring clarity, while making the consultation pathway the most obvious action on every screen.',
    challenge:
      'Medical websites routinely overwhelm patients with dense clinical terminology and scatter contact options across the page. The objective was a calm, reassuring layout where specialist information and the intake pathway are both immediately findable under stress.',
    strategy:
      'A low-density layout with generous whitespace and a wide horizontal rhythm: plain-language department taxonomies, credentials stated as quiet microtext rather than badges, and a booking action pinned so it is never more than one glance away.',
    deliverables: [
      'Practice Flagship & Patient Intake Layouts',
      'Specialist Department & Physician Directory UI',
      'Consultation Scheduling Modal Architecture',
      'Mobile Clinic Location & Wayfinding',
      'Pre-Operative Information Taxonomy',
    ],
    features: [
      {
        title: 'Triage-Guided Intake',
        description:
          'Routes a patient to the relevant specialist from their presenting symptoms in three plain-language steps.',
      },
      {
        title: 'Procedural Clarity Index',
        description:
          'Structured layout covering recovery expectations, physician credentials, and facility detail without clinical jargon.',
      },
      {
        title: 'Persistent Booking Action',
        description:
          'A non-intrusive consultation trigger that stays reachable at every scroll depth and viewport width.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Accessible Forms', 'Motion'],
    scopeSpecs: [
      { label: 'Template Scope', value: '5 Page Layouts' },
      { label: 'Core Focus', value: 'Patient Intake UX' },
      { label: 'Density', value: 'Low / Spacious' },
    ],
    preview: {
      layout: 'clinic',
      accent: '#38bdf8',
      wordmark: 'Surgical Practice',
      nav: ['Departments', 'Surgeons', 'Preparation', 'Locations'],
      headline: 'Advanced surgical care, explained clearly.',
      standfirst:
        'Specialist consultations across orthopedics, cardiovascular, and spine — with preparation guidance written in plain language.',
      trustMarkers: ['Board-Certified Surgeons', 'Same-Week Consultations', 'Accredited Day-Care Theatre'],
      bookingCta: 'Book a Consultation',
      departments: [
        {
          code: '01',
          name: 'Orthopedic & Joint Reconstruction',
          blurb: 'Minimally invasive arthroscopic and restorative joint procedures.',
        },
        {
          code: '02',
          name: 'Cardiovascular Care',
          blurb: 'Endovascular and surgical cardiovascular consultation pathways.',
        },
        {
          code: '03',
          name: 'Spine & Neurological Surgery',
          blurb: 'Precision spinal decompression and microsurgical care.',
        },
      ],
      mobileHeadline: 'Advanced surgical care, explained clearly.',
      mobileCta: 'Book a Consultation',
    },
  },
  {
    id: 'architecture-studio',
    slug: 'architecture-studio',
    title: 'Architecture Studio',
    badge: 'Studio Concept',
    clientType: 'Contemporary Architecture Atelier Concept',
    tagline: 'An editorial monograph concept where type and negative space carry the work.',
    summary:
      'A design study for an architectural practice, demonstrating how a disciplined asymmetric grid and a near-achromatic palette let spatial photography and drawings command the page without competing with the interface around them.',
    challenge:
      'Architecture sites tend toward cluttered galleries that flatten a studio’s point of view into a wall of thumbnails. The goal was a chronological monograph that reads like a printed publication rather than a CMS index.',
    strategy:
      'A type-dominant, deliberately asymmetric composition: an oversized display line allowed to break the frame, image plates set in unequal proportion rather than a uniform grid, and a numbered project index set in tabular figures.',
    deliverables: [
      'Spatial Portfolio System & Monograph Index',
      'Interactive Blueprint & Specification Layout',
      'Commission Inquiry & Brief Flow',
      'Studio Philosophy & Press Archive Layouts',
      'High-Resolution Image Grid Architecture',
    ],
    features: [
      {
        title: 'Asymmetric Plate Composition',
        description:
          'Image slots set in unequal proportion and offset from the type column, so no two projects present identically.',
      },
      {
        title: 'Tabular Project Index',
        description:
          'A numbered chronological index with aligned place and year columns, set in tabular figures so the rows scan cleanly.',
      },
      {
        title: 'Structured Commission Brief',
        description:
          'A qualification flow guiding prospective clients through site typology, area, and timeline before contact.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Lenis Smooth Scroll', 'Motion'],
    scopeSpecs: [
      { label: 'Template Scope', value: 'Portfolio & Atelier' },
      { label: 'Core Focus', value: 'Editorial Composition' },
      { label: 'Density', value: 'Minimal / Type-Led' },
    ],
    preview: {
      layout: 'monograph',
      accent: '#5B6473',
      wordmark: 'Atelier',
      displayLine: 'Spaces engineered for permanence',
      discipline: 'Selected Works — 2019 / 2026',
      indexEntries: [
        { no: '01', project: 'Lakefront Monolith Residence', place: 'Alibaug', year: '2024' },
        { no: '02', project: 'Civic Cultural Pavilion', place: 'Ahmedabad', year: '2023' },
        { no: '03', project: 'Adaptive Reuse Warehouse', place: 'Panjim', year: '2021' },
      ],
      mobileHeadline: 'Spaces engineered for permanence',
      mobileCta: 'Commission a Project',
    },
  },
  {
    id: 'coffee-roastery',
    slug: 'coffee-roastery',
    title: 'Coffee Roastery',
    badge: 'Studio Concept',
    clientType: 'Roastery & Multi-Location Cafe Concept',
    tagline: 'A warm storefront concept balancing single-origin retail against local cafe hours.',
    summary:
      'A design study exploring how an independent roastery can sell subscriptions and single-origin lots alongside its cafe locations, at a much higher information density than the other concepts, without tipping into plugin-heavy storefront clutter.',
    challenge:
      'Independent coffee sites carry a lot of detail per product — origin, process, roast level, tasting notes, price — and usually resolve it by either hiding everything behind a product page or shipping a slow, plugin-heavy storefront.',
    strategy:
      'A tight modular grid that puts the full product signature on the card itself: origin tag, roast level as a scannable dot scale, tasting notes, and price in tabular figures. Warm brand fill carries the promo strip and the cart, so commerce reads as commerce.',
    deliverables: [
      'Single-Origin Subscription Storefront Layout',
      'Interactive Roast & Flavour Profile Guide',
      'Multi-Location Cafe Directory & Seasonal Menu',
      'Wholesale Partner Inquiry Architecture',
      'Mobile-First Quick Ordering Flow',
    ],
    features: [
      {
        title: 'Roast Level Dot Scale',
        description:
          'A five-step roast indicator readable at card size, so lots can be compared without opening a product page.',
      },
      {
        title: 'Cafe Network Directory',
        description:
          'Neighbourhood addresses, opening hours, and the batch currently on bar, laid out as a scannable strip.',
      },
      {
        title: 'Wholesale Partner Onboarding',
        description:
          'A separate inquiry path for restaurants, offices, and cafes seeking a supply relationship rather than retail.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Lenis'],
    scopeSpecs: [
      { label: 'Template Scope', value: 'Storefront & Cafes' },
      { label: 'Core Focus', value: 'Product Comparison' },
      { label: 'Density', value: 'High / Modular' },
    ],
    preview: {
      layout: 'storefront',
      accent: '#C2703D',
      wordmark: 'Roastery',
      promo: 'Free shipping over ₹1,500 · Roasted every Monday',
      nav: ['Current Roasts', 'Subscriptions', 'Cafes', 'Wholesale'],
      cartCount: 3,
      products: [
        {
          name: 'Gedeb Micro-Lot',
          origin: 'Ethiopia',
          roast: 2,
          price: '₹1,450',
          notes: 'Bergamot, jasmine, lemon peel',
        },
        {
          name: 'Pink Bourbon Natural',
          origin: 'Colombia',
          roast: 3,
          price: '₹1,620',
          notes: 'Strawberry, guava, raw honey',
        },
        {
          name: 'Shade-Grown Reserve',
          origin: 'Guatemala',
          roast: 4,
          price: '₹1,280',
          notes: 'Cocoa nib, brown sugar, almond',
        },
      ],
      hours: 'Cafe hours — Mon to Fri 07:30–19:00 · Sat & Sun 08:00–20:00',
      mobileHeadline: 'Small-batch single origins',
      mobileCta: 'Shop Current Roasts',
    },
  },
];
