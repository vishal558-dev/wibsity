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
    name: 'A conversation',
    yours: 'About 30 minutes.',
    description:
      'What the business does, who you want calling you, and what the site has to achieve. By the end of it you have a written scope, a fixed price and a delivery date — not an estimate that moves later.',
  },
  {
    step: '02',
    name: 'The layout',
    yours: 'One round of comments.',
    description:
      'You see the actual pages, on desktop and phone, before a line of the real site is written. Type, spacing and structure get settled here, where changing them is cheap.',
  },
  {
    step: '03',
    name: 'The build',
    yours: 'Nothing.',
    description:
      'The site gets written by hand — no page builder, no theme, no plugin stack. This is the part where a custom build separates from an assembled one, and the part you do not have to be present for.',
  },
  {
    step: '04',
    name: 'Live, and yours',
    yours: 'A short walkthrough.',
    description:
      'Tested across real devices, connected to your domain, and handed over. The domain is registered in your name. Nothing about the site is held hostage to keep you as a client.',
  },
];
