import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'vanguard-health',
    slug: 'vanguard-health',
    title: 'Vanguard Health & Surgery',
    clientType: 'Specialized Medical & Surgical Practice',
    category: 'practice',
    categoryLabel: 'Practice Portal',
    year: '2025',
    tagline: 'A patient-first digital ecosystem uniting clinical authority with seamless intake UX.',
    summary: 'A surgical center required a complete digital transformation to transition from legacy phone-based inquiries to a streamlined patient intake and specialist consultation architecture.',
    challenge: 'Patients often felt overwhelmed by complex surgical jargon and fragmented scheduling channels. The practice needed a clean, reassuring digital experience that communicated clinical precision while making appointment inquiries effortless.',
    strategy: 'We established a disciplined editorial structure pairing reassuring whitespace with clear procedural taxonomies. Key clinical staff profiles, surgical preparation guides, and a multi-step triage scheduling modal were engineered to provide instant clarity.',
    deliverables: [
      'Digital Flagship & Patient Portal UI',
      'Specialist Department & Physician Index',
      'Interactive Consultation Scheduling Flow',
      'HIPAA-Compliant Patient Intake Architecture',
      'Mobile-Optimized Clinic Locator & Wayfinding',
    ],
    features: [
      {
        title: 'Triage-Guided Booking',
        description: 'Directs prospective patients to the exact surgical specialist based on procedural needs in three simple clicks.',
      },
      {
        title: 'Clinical Transparency Index',
        description: 'Structured layout detailing surgical recovery timelines, physician credentials, and facility accreditations.',
      },
      {
        title: 'Instant Mobile Direct Line',
        description: 'Sticky emergency nurse-line and pre-op confirmation triggers accessible on all mobile viewports.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Accessible Headless Forms', 'Motion'],
    desktopPreview: {
      heroHeadline: 'Advanced Surgical Excellence. Compassionate Care.',
      heroSub: 'Board-certified specialists delivering precision surgical procedures across four regional clinical centers.',
      navLinks: ['Departments', 'Surgeons', 'Patient Guides', 'Locations', 'Book Intake'],
      accentColor: '#38bdf8', // Sky
      stats: [
        { label: 'Specialist Centers', value: '04' },
        { label: 'Board Surgeons', value: '18+' },
        { label: 'Patient Inquiries / Mo', value: '1.2k' },
      ],
      sections: [
        { title: 'Orthopedic & Joint Reconstruction', desc: 'Minimally invasive arthroscopic and robotic joint restoration.', tag: 'DEPT_01' },
        { title: 'Cardiovascular Surgery', desc: 'State-of-the-art endovascular and open cardiac interventions.', tag: 'DEPT_02' },
        { title: 'Neurological & Spine Care', desc: 'Precision spinal decompression and cranial microsurgery.', tag: 'DEPT_03' },
      ],
    },
    mobilePreview: {
      headline: 'Surgical Precision & Patient Intake',
      ctaText: 'Schedule Consultation',
      highlight: 'Direct access to 18 board-certified specialists with sub-24h intake response.',
      sections: [
        { title: 'Orthopedics & Joint', tag: 'SURGICAL' },
        { title: 'Spine & Neurology', tag: 'SURGICAL' },
        { title: 'Patient Preparation Portal', tag: 'GUIDE' },
      ],
    },
  },
  {
    id: 'apex-architecture',
    slug: 'apex-architecture',
    title: 'Apex Urban Architecture',
    clientType: 'Contemporary Architecture & Spatial Atelier',
    category: 'flagship',
    categoryLabel: 'Digital Flagship',
    year: '2025',
    tagline: 'An architectural digital monolith showcasing civic, residential, and commercial spaces.',
    summary: 'Apex required a website that felt as intentional and monolithic as the structures they design. The site serves as both a high-value portfolio and a project brief intake system.',
    challenge: 'Previous portfolio websites relied on chaotic masonry grids that diluted the studio’s architectural narrative. They needed a structured, high-contrast system that allows photography and spatial blueprints to command focus.',
    strategy: 'We implemented a Swiss grid blueprint layout with 1px structural hairline borders, rigorous typographic scale, and an interactive architectural project viewer with blueprint overlay toggles.',
    deliverables: [
      'Spatial Portfolio System & Monograph Index',
      'Interactive Blueprint & Specification Viewer',
      'Commission Inquiry & RFP Submission Architecture',
      'Studio Philosophy & Press Editorial Engine',
      'Ultra-Fast Image Optimization Pipeline',
    ],
    features: [
      {
        title: 'Spatial Blueprint Overlay',
        description: 'Interactive toggle switching between finished structural photography and technical architectural drafts.',
      },
      {
        title: 'Chronological Project Matrix',
        description: 'Filterable taxonomy spanning residential monoliths, civic centers, and commercial adaptive reuse.',
      },
      {
        title: 'Project Brief Intake Flow',
        description: 'Structured qualification form guiding prospective clients through site typology, square footage, and budget parameters.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Lenis Smooth Scroll', 'Motion'],
    desktopPreview: {
      heroHeadline: 'Form Follows Silence. Spaces Engineered for Permanence.',
      heroSub: 'An international architecture atelier crafting brutalist civic infrastructure and contemporary residential residences.',
      navLinks: ['Selected Works', 'Atelier', 'Monographs', 'Blueprint Index', 'Inquire'],
      accentColor: '#e4e4e7', // Zinc Light
      stats: [
        { label: 'Built Projects', value: '42' },
        { label: 'Design Monographs', value: '08' },
        { label: 'Global Offices', value: 'Zurich // Tokyo' },
      ],
      sections: [
        { title: 'Haus Am See — Lucerne', desc: 'Monolithic exposed concrete residential volume hovering over Lake Lucerne.', tag: 'RESIDENTIAL' },
        { title: 'Kyoto Cultural Pavilion', desc: 'Charred cedar timber pavilion integrating historical tea gardens with modern steel frame.', tag: 'CIVIC' },
        { title: 'Aether Tower — Frankfurt', desc: '34-story commercial tower featuring passive solar facades and kinetic louvers.', tag: 'COMMERCIAL' },
      ],
    },
    mobilePreview: {
      headline: 'Architectural Monograph & Portfolio',
      ctaText: 'Commission a Project',
      highlight: '42 built works across Zurich, Tokyo, and Frankfurt. Spatial inquiry system.',
      sections: [
        { title: 'Haus Am See', tag: 'LUCERNE' },
        { title: 'Kyoto Pavilion', tag: 'JAPAN' },
        { title: 'Aether Tower', tag: 'FRANKFURT' },
      ],
    },
  },
  {
    id: 'forge-and-timber',
    slug: 'forge-and-timber',
    title: 'Forge & Timber Crafts',
    clientType: 'Custom Architectural Millwork & Fabrication',
    category: 'brand',
    categoryLabel: 'Brand Experience',
    year: '2024',
    tagline: 'Bridging timeless woodworking heritage with modern commercial interior commissions.',
    summary: 'A bespoke fabrication shop wanted to move upmarket to secure high-ticket architectural millwork contracts with interior designers and commercial developers.',
    challenge: 'Their existing website looked like a casual hobbyist blog rather than a precision industrial millwork workshop capable of delivering $250k+ commercial fit-outs.',
    strategy: 'We crafted an industrial editorial website emphasizing materials taxonomy (walnut, white oak, blackened steel), laser-precision joinery details, and an interactive architectural sample request flow.',
    deliverables: [
      'Commercial Portfolio & Joinery Catalog',
      'Material & Finish Interactive Specifier',
      'Commercial Estimating & Trade Sample Request Flow',
      'Workshop Virtual Walkthrough Architecture',
      'High-Resolution Texture & Detail Inspection Viewports',
    ],
    features: [
      {
        title: 'Material Specifier Matrix',
        description: 'Interactive visual library of timber species, grain patterns, and durable architectural matte finishes.',
      },
      {
        title: 'Trade Partner Portal',
        description: 'Dedicated intake funnel for general contractors and architects to upload CAD drawings for fabrication quotes.',
      },
      {
        title: 'Craft Detail Viewport',
        description: 'Deep-zoom inspections of dovetail joinery, mortise-tenon connections, and welded steel subframes.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Anime.js'],
    desktopPreview: {
      heroHeadline: 'Architectural Millwork. Raw Timber. Uncompromising Joinery.',
      heroSub: 'Crafting bespoke commercial fixtures, monolithic tables, and architectural woodwork for discerning interior environments.',
      navLinks: ['Craft & Workshop', 'Materials', 'Commercial Works', 'Trade Portal', 'Request Sample'],
      accentColor: '#d97706', // Amber
      stats: [
        { label: 'Timber Species Stocked', value: '14+' },
        { label: 'Commercial Fit-Outs', value: '120+' },
        { label: 'Tolerance Precision', value: '0.5mm' },
      ],
      sections: [
        { title: 'Bespoke Executive Boardroom Table', desc: '18-foot solid claro walnut slab with integrated blackened steel cable spine.', tag: 'COMMERCIAL' },
        { title: 'Acoustic Slat Wall Paneling', desc: 'Precision CNC-machined white oak acoustic baffles for flagship tech headquarters.', tag: 'ACOUSTIC' },
        { title: 'Architectural Wine Sanctuary', desc: 'Climate-controlled smoked glass and charred ash cabinetry with concealed LED tracks.', tag: 'HOSPITALITY' },
      ],
    },
    mobilePreview: {
      headline: 'Architectural Millwork & Joinery',
      ctaText: 'Request Trade Samples',
      highlight: 'Handcrafted architectural timber fixtures built to 0.5mm industrial tolerance.',
      sections: [
        { title: 'Claro Walnut Boardroom', tag: 'FIXTURE' },
        { title: 'Oak Acoustic Paneling', tag: 'WALLS' },
        { title: 'Trade Sample Kit', tag: 'INQUIRY' },
      ],
    },
  },
  {
    id: 'solstice-roastery',
    slug: 'solstice-roastery',
    title: 'Solstice Coffee Roastery',
    clientType: 'Specialty Roastery & Multi-Location Cafe Network',
    category: 'commerce',
    categoryLabel: 'Commerce & Brand',
    year: '2024',
    tagline: 'A clean, high-velocity digital flagship for single-origin coffees and neighborhood cafes.',
    summary: 'Solstice required a digital home that seamlessly balanced direct-to-consumer bean subscriptions with dynamic store hours, seasonal drink menus, and wholesale trade accounts.',
    challenge: 'Typical e-commerce platforms were bloated and slow, causing drop-offs on mobile and failing to convey the craft behind single-origin coffee lot sourcing.',
    strategy: 'We engineered a lightweight, instant-loading digital storefront with a custom 3-step coffee taste finder, live seasonal cafe menus, and clean wholesale inquiry routing.',
    deliverables: [
      'Direct-to-Consumer Subscription Storefront UI',
      'Interactive Roast & Flavor Profile Finder',
      'Dynamic Cafe Network & Live Menu Index',
      'Wholesale Partner Application Architecture',
      'Mobile-First One-Thumb Ordering Experience',
    ],
    features: [
      {
        title: 'Flavor Radar & Roast Matrix',
        description: 'Interactive tasting notes visualizer mapping acidity, body, sweetness, and processing method.',
      },
      {
        title: 'Cafe Network Live Status',
        description: 'Real-time open status, seasonal batch brew currently on tap, and seating availability across 4 locations.',
      },
      {
        title: 'Wholesale Partner Engine',
        description: 'Streamlined onboarding for cafes, restaurants, and offices seeking premium coffee programs.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Lenis'],
    desktopPreview: {
      heroHeadline: 'Direct-Trade Single Origins. Small-Batch Roasted.',
      heroSub: 'Sourcing micro-lots from sustainable producer cooperatives in Ethiopia, Colombia, and Guatemala. Roasted weekly in small batches.',
      navLinks: ['Current Roasts', 'Subscriptions', 'Cafe Locations', 'Wholesale', 'Taste Finder'],
      accentColor: '#10b981', // Emerald
      stats: [
        { label: 'Origin Cooperatives', value: '22' },
        { label: 'Neighborhood Cafes', value: '04' },
        { label: 'Roast Turnaround', value: '48 hrs' },
      ],
      sections: [
        { title: 'Yirgacheffe Gedeb Lot #4', desc: 'Washed process with notes of bergamot, jasmine blossom, and candied lemon peel.', tag: 'ETHIOPIA' },
        { title: 'Huila Pink Bourbon Micro-Lot', desc: 'Anaerobic natural fermentation yielding wild strawberry, guava, and raw honey.', tag: 'COLOMBIA' },
        { title: 'Huehuetenango San Pedro', desc: 'High-elevation shade grown with dark cocoa nibs, brown sugar, and toasted almond.', tag: 'GUATEMALA' },
      ],
    },
    mobilePreview: {
      headline: 'Specialty Roastery & Subscription',
      ctaText: 'Explore Coffee Lots',
      highlight: 'Single-origin coffees roasted within 48h and delivered direct to your door.',
      sections: [
        { title: 'Yirgacheffe Lot #4', tag: 'ETHIOPIA' },
        { title: 'Pink Bourbon Anaerobic', tag: 'COLOMBIA' },
        { title: 'Find Your Nearest Cafe', tag: 'LOCATIONS' },
      ],
    },
  },
  {
    id: 'opal-wealth',
    slug: 'opal-wealth',
    title: 'Opal Wealth & Advisory',
    clientType: 'Independent Wealth Advisory & Tax Counsel',
    category: 'practice',
    categoryLabel: 'Practice Portal',
    year: '2025',
    tagline: 'Authoritative Swiss editorial design establishing trust and discretion for private advisory clients.',
    summary: 'A fiduciary wealth management practice required a website that projected timeless security, intellectual rigor, and discretion for business founders and family offices.',
    challenge: 'Financial websites often drown in stock photos and confusing tables. Opal needed a clear, authoritative editorial design that made complex wealth structures understandable.',
    strategy: 'We built a typography-led, monochrome publication-style website featuring structured service pillars, macroeconomic commentary, and a secure client discovery questionnaire.',
    deliverables: [
      'Institutional Practice Website & Typography System',
      'Client Discovery & Wealth Profile Questionnaire',
      'Macroeconomic Insights & Quarterly Review Engine',
      'Secure Client Portal Single Sign-On Gateway',
      'Compliance & Fiduciary Regulatory Disclosures Architecture',
    ],
    features: [
      {
        title: 'Fiduciary Wealth Pillars',
        description: 'Clear structural breakdown of wealth planning, tax-advantaged structuring, and generational transfer.',
      },
      {
        title: 'Editorial Insights Reader',
        description: 'Distraction-free reading experience for quarterly macroeconomic letters and policy analyses.',
      },
      {
        title: 'Confidential Discovery Intake',
        description: 'Structured consultation request respecting client privacy with immediate partner matching.',
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    desktopPreview: {
      heroHeadline: 'Fiduciary Wealth Strategy. Built for Generational Permanence.',
      heroSub: 'Fee-only advisory counsel protecting and expanding capital for business founders, private estates, and family offices.',
      navLinks: ['Philosophy', 'Wealth Structuring', 'Quarterly Letters', 'Fiduciary Team', 'Client Intake'],
      accentColor: '#a1a1aa', // Zinc
      stats: [
        { label: 'Advisory Experience', value: '25+ Yrs' },
        { label: 'Fiduciary Standard', value: '100% Fee-Only' },
        { label: 'Client Retention', value: '99.2%' },
      ],
      sections: [
        { title: 'Business Succession & Liquidity Events', desc: 'Pre-sale optimization, tax-efficient restructuring, and founder transition strategies.', tag: 'CORPORATE' },
        { title: 'Multi-Generational Estate Architecture', desc: 'Trust design, legacy endowment planning, and family governance frameworks.', tag: 'FAMILY' },
        { title: 'Direct Indexing & Private Markets', desc: 'Custom core equity indexing with tax-loss harvesting and selective private allocations.', tag: 'INVESTMENT' },
      ],
    },
    mobilePreview: {
      headline: 'Private Wealth & Advisory Counsel',
      ctaText: 'Schedule Confidential Intake',
      highlight: '100% fee-only fiduciary counsel for founders and family offices.',
      sections: [
        { title: 'Business Succession Planning', tag: 'PILLAR' },
        { title: 'Estate & Trust Frameworks', tag: 'PILLAR' },
        { title: 'Q1 Macroeconomic Review', tag: 'INSIGHTS' },
      ],
    },
  },
];
