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
    question: 'why not just use a template or a website builder?',
    answer:
      'for some businesses that is genuinely the right answer, and we will say so rather than sell you something larger. what you give up is control: a template carries code for every feature its author imagined, most of which you will never use, and every change happens inside somebody else’s rules. a built site contains only what it needs, and it can be changed by editing it.',
  },
  {
    id: 'faq-pricing',
    question: 'how does pricing work?',
    answer:
      'fixed price, agreed in writing before anything starts. one conversation gets you a written scope, a number and a date. anything outside that scope is quoted separately, not absorbed into a bill at the end. no retainers, no hourly billing.',
  },
  {
    id: 'faq-timeline',
    question: 'how long does it take?',
    answer:
      'three to five working days for a standard business site, longer for stores and custom functionality. dates are confirmed in writing before the project starts. what usually slows things down is waiting on content, so we tell you exactly what we need up front.',
  },
  {
    id: 'faq-changes',
    question: 'what happens when i need to change something later?',
    answer:
      'small text and image edits can be set up for you to make yourself. anything structural comes back to us as its own quoted job. there is no subscription, and the site keeps working whether or not you keep paying anyone.',
  },
  {
    id: 'faq-ownership',
    question: 'who owns the domain and the site once it is live?',
    answer:
      'the domain is registered in your name — yours to move, renew or transfer without asking us. the site sits on hosting you control. nothing here is designed to make leaving difficult.',
  },
  {
    id: 'faq-content',
    question: 'what if i do not have copy or photographs ready?',
    answer:
      'most clients do not. we shape the copy from what you tell us in conversation, and source photography where it is needed. you approve all of it before launch.',
  },
  {
    id: 'faq-hosting',
    question: 'where does the site actually live?',
    answer:
      'on modern static hosting with a global cdn and automatic ssl. for most small business sites the cost is nil to negligible, with no server for you to maintain or patch.',
  },
  {
    id: 'faq-small-studio',
    question: 'you are very small. is that a risk?',
    answer:
      'it is a fair thing to weigh. you get the person building the site on the phone — the part larger agencies charge more for and deliver less of. what you do not get is a team to absorb a bad week, so we take on a limited number of projects at a time and say no when the calendar is full.',
  },
  {
    id: 'faq-prepare',
    question: 'what do you need from me to start?',
    answer:
      'a sense of what the business does and who you want to reach, your logo and brand materials if they exist, and two or three sites whose quality you admire.',
  },
];
