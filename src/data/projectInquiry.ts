export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myeyjlye';

/**
 * The enquiry form's options.
 *
 * The form was a four-step modal wizard that asked for a name and a phone
 * number in steps one and two — before the visitor had said anything about the
 * project, and therefore before they had any reason to hand over a phone
 * number. It is now a single screen, on the page rather than behind a modal,
 * and the order is inverted: the two low-commitment questions come first and
 * contact details are asked last, once the person is already invested.
 *
 * `projectTypeOptions` deliberately mirrors `servicesData` plus an escape
 * hatch. It used to be an independently maintained list that had drifted out
 * of step with the catalogue; the ids match the service ids so an enquiry can
 * be read against the service it came from.
 */
export const projectTypeOptions = [
  { id: 'business-website', label: 'Business website' },
  { id: 'landing-page', label: 'Landing page' },
  { id: 'redesign', label: 'Redesign' },
  { id: 'online-store', label: 'Online store' },
  { id: 'something-else', label: 'Something else' },
] as const;

export const budgetOptions = [
  'Under ₹20,000',
  '₹20,000 – ₹50,000',
  '₹50,000+',
  'Not sure yet',
] as const;
