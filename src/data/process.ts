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
      'what the business does, who you want calling you, and what the site has to achieve. by the end of it you have a written scope, a fixed price and a delivery date — not an estimate that moves later.',
  },
  {
    step: '02',
    name: 'the layout',
    yours: 'one round of comments.',
    description:
      'you see the actual pages, on desktop and phone, before a line of the real site is written. type, spacing and structure get settled here, where changing them is cheap.',
  },
  {
    step: '03',
    name: 'the build',
    yours: 'nothing.',
    description:
      'the site gets written by hand — no page builder, no theme, no plugin stack. this is the part where a custom build separates from an assembled one, and the part you do not have to be present for.',
  },
  {
    step: '04',
    name: 'live, and yours',
    yours: 'a short walkthrough.',
    description:
      'tested across real devices, connected to your domain, and handed over. the domain is registered in your name. nothing about the site is held hostage to keep you as a client.',
  },
];
