import type { Service } from '../types';

/**
 * Three services, down from four.
 *
 * "Landing page" and "Redesign" were folded into "Websites" as capabilities
 * rather than separate entries — both are types of website work, not
 * distinct things a client chooses between at the top level. Their content
 * lives on in `websites.includes` (see below) rather than being lost.
 * "Automation" is new: lead capture, notifications, appointment workflows
 * and the like, stated as business outcomes rather than the technical
 * mechanism behind them, matching this file's existing voice.
 *
 * "Custom Web Experiences & Features" was removed earlier as a standalone
 * entry: it described capability rather than a thing a person decides to
 * buy, and next to concrete offers it read as filler. Nothing left the
 * offering — bespoke features are stated as something layered onto any of
 * these three, which is how they were actually sold anyway (see
 * `customWork` below, rendered under the catalogue on /services and
 * referenced from the homepage).
 *
 * Entries no longer carry `index`: the services are a menu, not a
 * sequence, and numbering a non-sequence encodes nothing.
 */
export const servicesData: Service[] = [
  {
    id: 'websites',
    title: 'Websites',
    summary:
      'The site your business runs on — built new, replaced when it has aged badly, or narrowed to one page for a single campaign.',
    forWhom:
      'Established businesses, clinics, firms and consultancies, and anyone launching a focused offer or replacing a site that is holding them back.',
    problem:
      'People look you up before they call you. If what they find is thin, dated, slow, or awkward on a phone, you lose the enquiry before you knew it existed.',
    includes: [
      'Business websites — home, services, about and contact pages, structured around what you want people to do',
      'Landing pages built around one offer and one action, for launches and paid traffic',
      'Redesigns that rebuild a slow or dated site from scratch, keeping your search rankings intact',
      'Basic SEO — titles, descriptions, sitemap and structured data on every page',
      'Local SEO, so nearby customers searching for what you do find you first',
      'Performance optimization, so pages load fast on the phones your visitors actually use',
    ],
    timeline: '2–7 working days, depending on scope',
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
  {
    id: 'automation',
    title: 'Automation',
    summary:
      'Software that takes over the repetitive parts of running a business — catching leads, sending notifications, and moving information where it needs to go — instead of a person doing it by hand.',
    forWhom:
      'Businesses losing real time to manual follow-ups, data entry, or enquiries that fall through the cracks.',
    problem:
      'A lead who does not hear back within minutes goes to whoever answers first. Most of that delay is not a sales problem — it is nobody having built the plumbing that catches the enquiry, tells the right person, and logs it anywhere.',
    includes: [
      'Lead capture and management, so no enquiry sits unread in an inbox',
      'Automated notifications the moment something needs your attention',
      'Appointment workflows — bookings, reminders and follow-ups without manual chasing',
      'Forms that write straight into a spreadsheet, no retyping',
      'Email automation for replies, confirmations and follow-ups',
      'Everyday business workflow automation, built around how you already work',
    ],
    timeline: '2–5 working days, depending on scope',
  },
];

/**
 * The former fifth service, restated as an add-on. Kept as data rather than
 * inline copy so /services and the homepage stay in step.
 */
export const customWork = {
  title: 'Something that is not on this list',
  body:
    'Calculators, client portals, multi-step configurators, a dashboard behind a login. These get built onto whichever of the three above is the right base, rather than sold as a separate product. If you can describe what should happen, it can usually be built.',
};
