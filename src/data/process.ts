import type { ProcessStep } from '../types';

/**
 * Four steps. Each one names what the client has to do as well as what we do —
 * the unasked question behind every process section is "how much of my week
 * does this cost", and the honest answer here is the strongest thing about it.
 *
 * The old version carried a `code` field (STEP_01…STEP_04) that existed only
 * to be printed in a monospace face as decoration, and a `focus` label that
 * restated the step name. Both are gone.
 */
export const processData: ProcessStep[] = [
  {
    step: '01',
    name: 'a conversation',
    yours: 'about 30 minutes.',
    description:
      'what the business does, who should be calling you, and what the site needs to achieve. you leave with a written scope, a fixed price and a delivery date.',
  },
  {
    step: '02',
    name: 'the layout',
    yours: 'one round of comments.',
    description:
      'you see the actual pages, on desktop and phone, before a line of the real site is written — where type, spacing and structure are still cheap to change.',
  },
  {
    step: '03',
    name: 'the build',
    yours: 'nothing.',
    description:
      'the site gets written by hand — no page builder, no theme, no plugin stack. this is where a custom build separates from an assembled one, and you do not need to be present for it.',
  },
  {
    step: '04',
    name: 'live, and yours',
    yours: 'a short walkthrough.',
    description:
      'tested across real devices, connected to your domain, and handed over. the domain is registered in your name — nothing is held hostage to keep you as a client.',
  },
];
