import type { FAQItem } from '../types/index.js';

/**
 * Framed as questions worth asking any studio before hiring one, not as
 * support content about us. That reframing is doing real work: the first
 * entry is the actual objection every visitor has (why not just use a
 * template), and answering it plainly is more persuasive than the old
 * "Frequently Asked Questions" heading over a pricing enquiry.
 *
 * The `category` field was removed — it was never rendered as a filter, only
 * as another small label above each question.
 *
 * ORDER MATTERS. The first three entries are rendered on the homepage and are
 * duplicated by hand into the FAQPage JSON-LD in index.html (id
 * "home-faq-jsonld"). Editing or reordering the first three means editing that
 * block in the same change, or the structured data describes questions the
 * page no longer shows.
 */
export const faqsData: FAQItem[] = [
  {
    id: 'faq-templates',
    question: 'Why not just use a template or a website builder?',
    answer:
      'For some businesses that is genuinely the right answer, and we will say so on the call rather than sell you something larger. What you give up is control. A template arrives carrying code for every feature its author imagined, most of which your site will never use, and every change afterwards happens inside somebody else’s rules. A built site contains what your site needs and nothing else, and it can be changed by editing it.',
  },
  {
    id: 'faq-pricing',
    question: 'How does pricing work?',
    answer:
      'Fixed price, agreed in writing before anything starts. After one conversation you get a written scope, a number and a date. If you later want something outside that scope, it is quoted separately rather than absorbed into a bill you see at the end. There are no retainers and no hourly billing.',
  },
  {
    id: 'faq-timeline',
    question: 'How long does it take?',
    answer:
      'Three to five working days for a standard business site, longer for stores and anything with custom functionality. The dates are confirmed in writing before the project starts. What usually slows a project down is waiting on content, so we tell you exactly what we need from you at the start.',
  },
  {
    id: 'faq-changes',
    question: 'What happens when I need to change something later?',
    answer:
      'Small text and image edits can be set up for you to make yourself. Anything structural, come back to us and it is quoted as its own small job. You are not on a subscription, and the site does not stop working if you stop paying anyone.',
  },
  {
    id: 'faq-ownership',
    question: 'Who owns the domain and the site once it is live?',
    answer:
      'The domain is registered in your name and is yours to move, renew or transfer without asking us. The site is deployed on hosting in your control. Nothing about the arrangement is designed to make leaving difficult.',
  },
  {
    id: 'faq-content',
    question: 'What if I do not have copy or photographs ready?',
    answer:
      'Most clients do not. We work from what you can tell us in conversation and shape it into the copy on the page, and we will source photography where it is needed. You approve all of it before launch.',
  },
  {
    id: 'faq-hosting',
    question: 'Where does the site actually live?',
    answer:
      'On modern static hosting with a global CDN and automatic SSL. For most small business sites the hosting cost is nil to negligible, and there is no server for you to maintain or patch.',
  },
  {
    id: 'faq-small-studio',
    question: 'You are very small. Is that a risk?',
    answer:
      'It is a fair thing to weigh. You get the person building the site on the phone, which is the part larger agencies charge more for and deliver less of. What you do not get is a team to absorb a bad week, so we take on a limited number of projects at a time and say no when the calendar is full rather than quietly slipping your date.',
  },
  {
    id: 'faq-prepare',
    question: 'What do you need from me to start?',
    answer:
      'A sense of what the business does and who you want to reach, your logo and any brand materials if they exist, and two or three sites whose quality you admire. That is enough for the first conversation.',
  },
];
