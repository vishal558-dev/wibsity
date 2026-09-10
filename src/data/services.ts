import type { Service } from '../types';

/**
 * Four services, down from five.
 *
 * "Custom Web Experiences & Features" was removed as a standalone entry: it
 * described capability rather than a thing a person decides to buy, and next
 * to four concrete offers it read as filler. Nothing left the offering — bespoke
 * features are now stated as something layered onto any of these four, which is
 * how they were actually sold anyway (see `customWork` below, rendered under
 * the catalogue on /services and referenced from the homepage).
 *
 * The old entries also carried `scopeType`, `iconName`, `image` and a
 * five-to-six-line `deliverables` list each. The icons went with lucide; the
 * stock photography went with the redesign; the deliverables were trimmed to
 * the five lines a buyer actually reads.
 *
 * Entries no longer carry `index`: the four services are a menu, not a
 * sequence, and numbering a non-sequence encodes nothing.
 */
export const servicesData: Service[] = [
  {
    id: 'business-website',
    title: 'Business website',
    summary:
      'The main site for a business: a handful of pages covering what you do, who you are, and how to reach you.',
    forWhom: 'Established businesses, clinics, firms and consultancies.',
    problem:
      'People look you up before they call you. If what they find is thin, dated, or awkward on a phone, you lose the enquiry before you knew it existed.',
    includes: [
      'Home, services, about and contact pages, structured around what you want people to do',
      'Written and laid out for phones first, because that is where most of your visitors are',
      'Enquiry form routed straight to your inbox or WhatsApp',
      'Search-engine groundwork: titles, descriptions, sitemap, structured data',
      'An editable setup if you want to change your own copy later',
    ],
    timeline: '3–5 working days',
  },
  {
    id: 'landing-page',
    title: 'Landing page',
    summary:
      'One page with one job: turn the traffic you are already paying for into enquiries.',
    forWhom: 'Anyone running ads, a launch, or a single focused offer.',
    problem:
      'Sending paid traffic to a general homepage wastes most of it. A visitor who arrived for one specific thing should land on that one specific thing.',
    includes: [
      'A single page built around one offer and one action',
      'Copy structure and hierarchy worked out with you before anything is designed',
      'Form or WhatsApp handoff, whichever converts better for your audience',
      'Built light so it opens fast on mobile data',
      'Ready to point a campaign at on day one',
    ],
    timeline: '2–4 working days',
  },
  {
    id: 'redesign',
    title: 'Redesign',
    summary:
      'Replacing a site that has aged badly, runs slowly, or no longer matches the business behind it.',
    forWhom: 'Businesses with a site they have stopped sending people to.',
    problem:
      'Most old sites are not broken, they are just embarrassing — heavy, cluttered, and clearly built years ago. That reads to a customer as neglect.',
    includes: [
      'A read of what is on the current site and what is worth keeping',
      'A rebuild from scratch rather than a new skin on the old system',
      'Existing page addresses preserved so you keep your search rankings',
      'Content carried over and edited down, not just pasted across',
      'A clean handover of the new site and the domain',
    ],
    timeline: '4–7 working days',
  },
  {
    id: 'online-store',
    title: 'Online store',
    summary:
      'A storefront that takes orders and payments, sized to the catalogue you actually have.',
    forWhom: 'Businesses selling products directly rather than through a marketplace.',
    problem:
      'Marketplaces take a cut and own the customer. Selling from your own site means the relationship, the margin and the data stay with you.',
    includes: [
      'Product listings and categories set up around how you sell',
      'Cart, checkout and a payment gateway wired end to end',
      'Order notifications that reach you where you actually work',
      'A product structure you can add to without a developer',
      'Checkout tested on the phones your customers use',
    ],
    timeline: '5–10 working days',
  },
];

/**
 * The former fifth service, restated as an add-on. Kept as data rather than
 * inline copy so /services and the homepage stay in step.
 */
export const customWork = {
  title: 'Something that is not on this list',
  body:
    'Booking flows, calculators, client portals, intake forms that branch, a dashboard behind a login. These get built onto whichever of the four above is the right base, rather than sold as a separate product. If you can describe what should happen, it can usually be built.',
};
