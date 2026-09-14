import type { ComparisonRow } from '../types';

/**
 * The anti-template argument, as a comparison rather than a manifesto.
 *
 * Every row is a structural fact about how the two things are made. None of
 * it asserts a speed, a ranking or a conversion figure, because none of that
 * has been measured across client work. No performance number is asserted
 * anywhere on the site (the hero used to carry one, read live in the
 * visitor's own browser — it was removed outright, see CLAUDE.md's "The idea
 * the site is built on"). Keep it that way: this table is the easiest place
 * on the site to accidentally write a claim that cannot be backed up.
 */
export const comparisonRows: ComparisonRow[] = [
  {
    aspect: 'what gets delivered',
    template: 'a theme someone else designed, with your logo applied.',
    built: 'pages drawn for your business, from a blank file.',
  },
  {
    aspect: 'what ships with it',
    template: 'code for every feature the theme author imagined, used or not.',
    built: 'only the code the site needs.',
  },
  {
    aspect: 'making a change',
    template: 'work around the builder’s rules, or add a plugin.',
    built: 'edit the file.',
  },
  {
    aspect: 'where it lives',
    template: 'inside a platform, on its terms and pricing.',
    built: 'on hosting you control.',
  },
  {
    aspect: 'who you talk to',
    template: 'support tickets, or whoever configured it.',
    built: 'the person who wrote it.',
  },
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
    title: 'built, not assembled',
    body:
      'no page builder, no purchased theme, no stack of plugins holding the layout together. every site is written from an empty file, which is the only reason any of the rest of this is possible.',
  },
  {
    id: 'weight',
    title: 'weight is a design decision',
    body:
      'every library added to a page is paid for by the person opening it on a phone, on mobile data, somewhere with two bars. this site carries no dependency it does not need — the same discipline every project gets.',
  },
  {
    id: 'access',
    title: 'usable before it is decorated',
    body:
      'real contrast, keyboard navigation that works, tap targets you can hit, and motion that respects the setting when someone has asked their device to reduce it. checked during the build, not retrofitted after a complaint.',
  },
];

/** Kept honest and short. Everything here is a fact about how the studio
 *  operates — there are no client counts, years, awards or testimonials,
 *  because there are none to report. */
export const studioFacts = [
  { label: 'based in', value: 'india, working remotely' },
  { label: 'who you talk to', value: 'the person who builds it' },
  { label: 'typical delivery', value: '3–5 working days' },
  { label: 'pricing', value: 'fixed, agreed before we start' },
];
