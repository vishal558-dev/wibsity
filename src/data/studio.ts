import type { ComparisonGlanceItem, ComparisonRow } from '../types';

/**
 * The anti-template argument, as a comparison rather than a manifesto.
 *
 * Every row is a structural fact about how the two things are made. None of
 * it asserts a speed, a ranking or a conversion figure, because none of that
 * has been measured across client work — the one number the site does show is
 * the hero readout, which the visitor's own browser produces in front of them.
 * Keep it that way: this table is the easiest place on the site to accidentally
 * write a claim that cannot be backed up.
 */
export const comparisonRows: ComparisonRow[] = [
  {
    aspect: 'What gets delivered',
    template: 'A theme somebody else designed, with your logo and colours applied.',
    built: 'Pages drawn for your business, from a blank file.',
  },
  {
    aspect: 'What ships with it',
    template: 'Code for every feature the theme author imagined, whether you use it or not.',
    built: 'Only the code the site needs to do what it does.',
  },
  {
    aspect: 'Making a change',
    template: 'Work around the builder’s rules, or add a plugin and hope.',
    built: 'Edit the file. The whole thing is readable.',
  },
  {
    aspect: 'Where it lives',
    template: 'Inside a platform, on that platform’s terms and pricing.',
    built: 'On hosting you control, as files you hold.',
  },
  {
    aspect: 'Who you talk to',
    template: 'Support tickets, or whoever configured it for you.',
    built: 'The person who wrote it.',
  },
];

/** The comparison section's glance panel — four of the rows above, compressed
 *  to a paired phrase, for a reader who wants the shape of the argument
 *  before the sentences. */
export const comparisonGlance: ComparisonGlanceItem[] = [
  { template: 'Generic structure', built: 'Custom structure' },
  { template: 'A theme', built: 'A blank canvas' },
  { template: 'A stack of plugins', built: 'Only what is needed' },
  { template: 'A page builder', built: 'Readable code' },
];

/**
 * Three standards, written as commitments rather than virtues. Each one is
 * checkable against the site you are reading, which is the point — the old
 * version ("First Impressions Command Trust", "Clarity & Conversion") was
 * three sentiments nobody could disagree with or verify.
 */
export const standardsData = [
  {
    id: 'built',
    title: 'Built, not assembled',
    body:
      'No page builder, no purchased theme, no stack of plugins holding the layout together. Every site is written from an empty file, which is the only reason any of the rest of this is possible.',
  },
  {
    id: 'weight',
    title: 'Weight is a design decision',
    body:
      'Every library added to a page is paid for by the person opening it on a phone, on mobile data, somewhere with two bars. The readout at the top of this page is what that discipline produces, measured live rather than claimed.',
  },
  {
    id: 'access',
    title: 'Usable before it is decorated',
    body:
      'Real contrast, keyboard navigation that works, tap targets you can hit, and motion that respects the setting when someone has asked their device to reduce it. Checked during the build, not retrofitted after a complaint.',
  },
];

/** Kept honest and short. Everything here is a fact about how the studio
 *  operates — there are no client counts, years, awards or testimonials,
 *  because there are none to report. */
export const studioFacts = [
  { label: 'Based in', value: 'India, working remotely' },
  { label: 'Team size', value: 'One. You talk to the builder' },
  { label: 'Typical delivery', value: '3–5 working days' },
  { label: 'Pricing', value: 'Fixed, agreed before we start' },
];
