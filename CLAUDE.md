# wibsity — Project Context for Claude

Web design/dev studio marketing site. React 19 + Vite + TypeScript + Tailwind CSS v4 + react-router-dom.

**This file was rewritten in the 2026 redesign.** Almost everything it used to describe — the dark
canvas, the blue-violet accent, the marquees, the 3D hero sculpture, the Framer Motion scroll
reveals, the modal form wizard, the stock photography, `SectionHeading`, `lucide-react`, `lenis` —
no longer exists. If you are looking for why any of that went, `docs/DESIGN-DIRECTION.md` records
the audit and the argument.

## Keep this file current
**Always keep this file accurate with the current state of the codebase — every change that touches
something this file describes updates the relevant section here as part of that same piece of work,
not as a separate follow-up someone has to ask for.** This isn't limited to changes you'd personally
judge "major": if this doc would mislead a future session about a pattern, convention, file, or
asset after your change, it needs updating, full stop. Before writing a claim here, verify it
against the actual code (grep for it, don't just describe intent) — a wrong doc is worse than no
doc.

## Before committing or pushing
**Always ask for explicit confirmation before running `git commit` or `git push` — for every change,
in every session, regardless of what was approved earlier in the conversation — with exactly one
exception: a commit/push where CLAUDE.md is the only file changed may go straight through without
asking.** Any commit that touches code, data, assets, or config (even alongside a CLAUDE.md update)
needs confirmation first: summarize what changed and wait to be told to commit/push. Don't treat a
prior "commit and push it" as blanket permission for a later, different change in the same session.

## Commands
- `npm run dev` — dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- `npm run preview` — preview production build
- `node scripts/generate-brand-assets.mjs` — regenerate favicons, apple-touch-icon and the social
  card. Not part of `npm run build`; run it by hand when the logo geometry, the hero headline or
  `og:description` changes.

## The idea the site is built on
wibsity's differentiator is that a site is *built* rather than *assembled*. That is unprovable in
prose and completely provable in the artifact, so the homepage's one bold moment is a **live
specimen readout** (`components/common/PageSpecimen.tsx`): the page measures its own first paint,
file count and element count in the visitor's browser and prints the result under the headline.

Two consequences bind future work:

1. **The site cannot carry a dependency it does not need.** `motion`, `lenis` and `lucide-react`
   were all removed. The runtime is React, react-dom, react-router-dom, clsx, tailwind-merge and
   `@vercel/analytics`. Adding a library to this project is a positioning decision, not just a
   technical one.
2. **No asserted performance numbers.** The readout is the only performance figure on the site and
   it is measured, not claimed. A bytes-transferred reading was tried and deliberately dropped:
   Resource Timing reports zero bytes both for cross-origin responses without
   `Timing-Allow-Origin` and for cache hits, so it would silently flatter a repeat visit. Don't add
   it back without solving that.

## Architecture & routing
`main.tsx` → `App.tsx` (`BrowserRouter`) → `pages/*.tsx`, one per route: `/`, `/services`, `/about`,
`/contact`, and a `*` 404. `HomePage` is a static import; every other page is `React.lazy()`-loaded
behind a `<Suspense>` whose fallback is `.route-bar`, a pure-CSS hairline sweep at the top of the
viewport.

There are **no route transition animations**. Navigation is instant, which is both faster and the
point.

Nav labels are Services / Studio / Contact — "Studio" points at `/about`, whose path stays as it is
for SEO continuity.

## Where page UI lives
**Page markup is inlined directly in `pages/*.tsx`.** There is no `components/sections/*` directory
and no `SectionHeading` component — the eyebrow-plus-heading-plus-paragraph block it encoded was one
of the patterns the redesign set out to remove. Each section composes its own heading.

The one layout primitive is `components/layout/Section.tsx`. It owns exactly three things — the side
gutter, the maximum measure (`78rem`), and the vertical rhythm — plus two options: `ink` (invert the
band) and `rule` (draw the measure line at the top). Everything else about a section is composed
freely inside it, deliberately, so the page does not turn into the same arrangement six times.

### Homepage composition
Six sections, and **no two are built the same way** — that variety is load-bearing, not incidental:

| # | Section | Shape |
|---|---------|-------|
| 1 | Hero | Display headline, then lead left / CTA right, closing on the specimen strip |
| 2 | What we make | An index at display scale — the titles *are* the composition |
| 3 | What you are choosing between | **Ink field.** Display heading, then a real `<table>` |
| 4 | How it works | Full-width display heading, then a four-column measured sequence |
| 5 | Worth asking | `bg-canvas-sunken`. Header row, then a full-width disclosure list |
| 6 | Tell us what you need | **Ink field.** "What happens next" left, the enquiry form right |

The hero is the only place the type is allowed to be the whole composition
(`--text-hero`, ~121px at 1440). It is deliberately **two lines, not three**: a third line pushes
the specimen strip below the fold on a 14–15" laptop, and the strip is the payoff for the headline.
The whole hero — headline, lead, CTA and strip — fits inside 780px of viewport height; check that
again if any of its type or padding changes.

Sections 2 and 4 both carry display-scale type, for different reasons. The service index is set
large because a list of four small links was the most documentation-like block on the page; the
process heading is set large because three sections opening with heading-left/thing-right in a row
is the composition reading as a template, and "an hour of your time" is the strongest claim after
the hero. Section 4 also inverts its own hierarchy on purpose — what the project costs the client in
time is set larger than what we do.

The page **ends inside the form**. That is why `Footer` no longer carries a CTA band — pointing at a
contact page from underneath a contact form was asking twice.

Section 4's timeline was first built as a 2×2 grid of bordered cells and read as cards; it is now
four columns each opening on their own `.measure` rule. If you find yourself reaching for a bordered
box on this site, that is the pattern to reach for instead.

## The design system (`src/index.css`)
Two inks and a paper, plus one hue used in five places on the whole site. Read the file — it is
commented at the level of *why*, not *what* — but the rules that matter most:

**Nothing is a card.** No bordered boxes, no shadows, no gradients, no glows, no blur, no texture
overlays, `border-radius: 0` everywhere. Rhythm comes from three grounds (`canvas`,
`canvas-sunken`, and the inverted ink field) and from the measure rule.

**`.measure` is the signature device** — a hairline marking a real section boundary with a short run
of accent ticks hanging at its left end, like the scale bar on a drawing. It encodes the grid rather
than decorating the section, so it only appears where a boundary actually is. It is the thing you'd
recognise without the logo.

**`.field-ink` remaps the whole semantic token set on itself**, not just two colours. `text-fg-muted`,
`border-rule` and friends keep working inside it and land at the right contrast automatically. This
matters more than it looks: the obvious way to dim text on an ink band is an opacity utility, but
opacity composites against whatever is behind it, and this field is near-black in the light theme
and paper in the dark one — a single `opacity-50` measures 4.6:1 in one theme and 3.15:1 in the
other. **Do not use opacity utilities for text inside `.field-ink`.** Use the tokens.

`.field-ink` also sets `--color-accent` to its own foreground, which makes *the hue only appears on
paper* a property of the system rather than a rule anyone has to remember.

**The primary button is a field inversion**, never an accent fill — ink on paper in the light theme,
paper on ink in the dark one, and it flips again inside `.field-ink`. This is why no CTA on the site
glows or carries a gradient. The accent's five homes are: link underlines (`.link`), the focus ring,
the specimen readout's figures, the availability dot, and the measure ticks.

**Component classes live in `@layer components`, and they have to.** Unlayered CSS outranks every
layered rule, so while `.btn` sat outside a layer it silently beat the utilities applied alongside
it — `class="btn hidden sm:inline-flex"` stayed visible at every width because
`.btn { display: inline-flex }` won against `.hidden`. The global reduced-motion reset at the bottom
of the file deliberately stays *unlayered*: `!important` inside a layer has its precedence reversed,
and that reset needs to beat everything.

### Colour tokens
**The site is light only.** There is no theme toggle, no `:root[data-theme="dark"]` block, no
`useTheme` hook, and `boot.js` no longer resolves a theme — it was removed so the monochrome
foundation has to stand on its own, and so a colour direction can be layered onto these tokens
deliberately rather than inherited from a second theme nobody was maintaining. If dark mode comes
back it is a decision, not a restoration.

Paper is `#edece6` (a cool limestone, deliberately not the warm cream that reads as a generic
AI-design tell); ink is `#161a19`; the accent is petrol `#0e4b54`.

Two tokens carry contrast maths in their comments and should not be nudged without redoing it:
`--color-fg-subtle` (4.96:1 on canvas — an earlier `#6c7067` measured 4.09:1 and failed AA for the
real text it carries) and `--color-rule-strong` (it draws input underlines and secondary-button
borders, so it is a UI component boundary owing 3:1; the first value measured 2.07:1).

### Typography
Two families, from one host, in a deliberately inverted pairing: **Archivo** (grotesque) for
headlines and all UI, **Newsreader** (serif) for body copy. A precise grotesque headline over warm
serif paragraphs reads as *technical* and *considered* at once, which is the two things this studio
sells, and it escapes the "big bold sans + small grey paragraph" default in one move.

Headlines sit at **weight 550**, not 800/900. Large type is fine; shouted type is not. The scale is
a perfect fourth over a 17px serif body, flattened at the top so display sizes stay usable on a
laptop viewport, plus two display sizes used once each: `--text-hero` (the homepage headline) and
`--text-index` (the service list). Both carry their own leading and tracking, because the defaults
are far too loose at those sizes.

**Archivo is requested with its WIDTH axis** — `Archivo:wdth,wght@62..125,400..600` in index.html.
That is not cosmetic: three separate effects animate `font-stretch`, and dropping the axis from the
font URL kills all three silently, leaving the motion looking broken rather than absent.

JetBrains Mono went with the decorative code panel it existed for; **there is no monospace face on
this site.** If you want one for "technical" flavour, that is the costume the redesign removed.

## Motion
**The motion system has exactly one idea: type being set.** Letterforms carry the animation —
Archivo's width and weight axes — rather than boxes sliding around. It appears in four places and
nowhere else. There are still **no fade-up-on-scroll entrance reveals**; that pattern is why the
first pass read as documentation with good typography.

1. **The headline sets itself on load.** Words wipe up from their own baselines, staggered 48ms,
   while the line widens from 74% to 100%. Last word lands at ~1.05s.
2. **Titles widen under the pointer** (`.widen`, 100% → 113%) — the service index, the FAQ
   questions, the wordmark. The interaction is the letterform, not a colour change.
3. **The hero compresses as it scrolls away** (`--hero-set`, 100% → 85% width plus a small lift).
4. **Measure rules draw themselves** as their section arrives.

Everything else is motion answering a user action: the disclosure, the form, the menu sheet, button
and link hovers.

**The gotcha that cost a build.** `.set-word` originally animated `font-stretch` itself, with
`animation-fill-mode: both` — and a filled animation beats an inherited value, so once the headline
had set, every word was pinned at 100% and the scroll compression never reached the glyphs. It
*looked* correct because the h1 computed 85%; the spans holding the text never moved. Width now
lives in one registered custom property (`@property --set-width`) that both motions feed into via
`calc()` on `.hero-type`: the load animation drives `--set-width`, the scroll handler drives
`--hero-set`, and neither can pin the other. **Never animate `font-stretch` from two places.**

`--hero-set` is written from a rAF-batched scroll handler that is IntersectionObserver-gated and
**quantised to twenty steps** — the property drives `font-stretch`, which re-shapes the line and
re-instances the variable font, and that is real layout work not worth doing 60 times a second for
0.75% of width per step.

The measure draw is a **native scroll-driven CSS animation** (`animation-timeline: view()`) inside
`@supports`, not an IntersectionObserver. No JavaScript, no per-frame work, and no failure mode: a
browser without support simply renders the rule already drawn. Scroll-*position* linking is right
here specifically because a half-drawn hairline is a harmless intermediate state — the same
technique on a text reveal would strand words mid-sentence when someone stops scrolling.

`.enter` and `.set-word` hold their `from` state during their delay, so a printed page would come
out with an invisible hero — there is a `@media print` reset for exactly that.

### The construction overlay
The hero's cursor moment, and the page's one genuinely experimental element. Moving the pointer
across the hero looks through the finished page at the file underneath: the column guides and
baseline grid the type is set on, inside a soft circular mask that follows the cursor with a
hairline crosshair at its centre. It exists because it says something true about the work.

Two repeating gradients under a radial mask — no SVG asset, no canvas, no per-frame layout read.
`--cx`/`--cy` are registered with `@property` (an unregistered custom property is a string and would
jump rather than travel) and written from a rAF-batched `pointermove` handler on the hero element,
straight to `element.style` rather than through React state.

It performs **one automatic sweep on load**, once the headline has set, then hands the guides over
to the cursor — otherwise the best thing on the page sits undiscovered until someone happens to move
the mouse. It renders nothing at all for coarse pointers or under reduced motion.

## Icons and the logo
`components/common/icons.tsx` is the complete icon set — ten inline SVGs sharing a 1.5px stroke
with flat caps and mitred joints, matched to Archivo's terminals. A library's rounded caps read as a
different hand next to this typeface. WhatsApp is the one exception: it is a filled brand glyph at
its official proportions, because redrawing a channel icon in your own hand makes it unrecognisable.

`components/common/Logo.tsx` draws the identity in code — `currentColor` throughout, so there is
nothing to theme-swap. **The four theme-swapped logo PNGs are gone.** The mark is a geometric
lowercase "w" sitting on a rule that runs past the letter on both sides — the same measure device
the site is built on, so the smallest piece of the brand carries its structural idea.

**The mark's geometry lives in three places that must agree**: `Logo.tsx`, `public/favicon.svg`, and
`scripts/generate-brand-assets.mjs`. Redraw it in all three and re-run the generator.

### The asset generator
`scripts/generate-brand-assets.mjs` drives the locally installed Chrome, so there is no image
dependency in `package.json`. Two things in it are hard-won:

- Icons are rasterised by **drawing the SVG into a canvas and reading the data URL back out of the
  DOM**, not by `--screenshot`. Chrome's headless screenshot silently produces a blank frame for
  window sizes in roughly the 96–180px band (48 and 64 are fine, so are 256 and up), which shipped
  two empty icons the first time it ran.
- `favicon.ico` is assembled by hand from the generated PNGs — the ICO container is a 6-byte header
  plus one 16-byte directory entry per frame, and every browser in use accepts PNG-encoded frames.

`public/og-image.png` (1200×630) carries the real headline and the real `og:description` in the
site's own type and colours. Regenerate it when either changes.

### Buttons, and two ways to break them
The primary action's hover is a fill wiping across from the left — the site's one gesture again —
over a **solid resting background**. Both of those words are load-bearing:

- **Every `.btn` label needs its own element.** `.btn-primary::before` is the fill and paints
  straight over a bare text node. The masthead CTA spent a build rendering as an empty white box
  for exactly this reason. `Button.tsx` wraps children for you; hand-rolled `.btn` markup must too.
- **The wipe paints over a resting background, never instead of one.** An earlier version made the
  button transparent and let the ::before *be* the fill. It looked identical and quietly meant the
  label had no real background behind it — invisible under forced colours, and a genuine 1:1
  reading for any contrast checker, which is how the page's own audit caught it.

## Conversion
The primary goal is the **project enquiry form** (`components/common/InquiryForm.tsx`); WhatsApp is
secondary.

The form is **one screen, on the page**, not a four-step modal wizard. Three things about it are
deliberate and should not be undone:

1. **It is not behind a modal.** A form you have to open converts worse than one you can already
   see, and the homepage ends in it. `Modal.tsx` and `StartProjectModal.tsx` were deleted.
2. **The order is inverted.** Project type → budget → name → phone. The old flow asked for a name
   and phone number in steps one and two, before the visitor had said anything about the project and
   so before there was any reason to hand over a phone number. Low-commitment questions first;
   contact details last, once somebody is invested. The phone field says why it is being asked.
3. **Validation runs on submit, not on keystroke.** Being told a field is wrong while still typing it
   is the most irritating thing a form can do. The first invalid field takes focus and its message is
   wired through `aria-describedby`.

Chips wrap a visually-hidden radio input, so a group keeps real radio semantics and arrow-key
navigation. Their focus ring uses `:focus`, not `:focus-visible` — submitting with nothing chosen
moves focus there programmatically, and a programmatic focus does not reliably match
`:focus-visible`, which would leave the person who triggered the error with no visible indication of
where it is.

**WhatsApp is available beside every call to action** — hero, form, services, about, footer, the
mobile menu, and as a first-class channel on `/contact` — but the persistent floating button was
removed. A FAB overpowers the primary journey, which the brief for the redesign explicitly ruled
out. If it is ever wanted back, that is a business call, not a bug fix.

## Responsive
Mobile is designed, not stacked. The menu is a **full-height sheet** with the routes at display
size, not a desktop dropdown squeezed into a phone. The comparison table switches its table elements
to block layout below `md` and repeats the column headings inside each cell — two 40%-wide columns
of running prose on a phone is unreadable.

**The theme toggle is `hidden md:inline-flex` in the header and moves into the mobile sheet**, so the
primary CTA keeps the header slot on a phone. Both do not fit at 390px, and dropping the CTA there
would leave mobile visitors with no visible way to start until they had scrolled most of the page.

**Check above-the-fold work against a realistic laptop viewport (~800–950px tall), not just a large
external display.** This has bitten the hero before.

## Accessibility conventions
Audited at 390px and 1280px, in both themes, with every disclosure open: **zero contrast failures,
no heading-level skips, exactly one `<h1>` per route, no horizontal overflow.** Keep it that way —
the site claims accessibility as a standard on `/about`, so a regression here is a false claim, not
just a defect.

- **Interactive elements target 44×44px.** Where an element must stay visually compact, expand the
  hit area with a negative-margin/padding pair (`-my-2.5 py-2.5`) rather than changing its size.
  Grep for `-my-` next to a matching `py-` for the existing examples.
- `--color-fg-subtle` is safe on `canvas` and `canvas-sunken`. Inside `.field-ink`, use the remapped
  tokens rather than opacity — see the design-system section.
- A skip link sits first in `App.tsx` and targets `<main id="main">`.

## SEO metadata
**Every route's `<title>` and description exist in two places that must stay in sync: `index.html`
and `routeSEO` in `src/data/seo.ts`.** `vite.config.ts`'s `generate-static-route-html` plugin stamps
out `services.html` / `about.html` / `contact.html` / `404.html` from `routeSEO`, but it **skips
`/`** — so the homepage's tags are only whatever is hardcoded in `index.html`, and a homepage copy
change has to be made in both, byte-identical.

The homepage's JSON-LD is hardcoded in `index.html` for the same reason. The shared `@graph` carries
`WebSite` and `ProfessionalService`; the homepage's `FAQPage` node lives in a **separate** script
block (`id="home-faq-jsonld"`) so `createRouteHtml` can strip it by id from every other generated
route.

**That block's three questions are now checked at build time.** `assertHomeFaqJsonLdMatches` in
`vite.config.ts` compares it against `faqsData.slice(0, 3)` and fails the build with the exact
mismatch if they drift. This replaced a comment asking a future editor to remember, and it caught a
real drift (a straight apostrophe against a curly one) the first time it ran. **Prose in
`src/data/*.ts` uses curly apostrophes** — the files use single-quoted TS strings, so a straight one
terminates them.

`/about`'s FAQPage schema is generated from the full `faqsData` array in both `App.tsx` and the vite
plugin, so it never needs manual syncing.

## Deployment
Vercel. `vercel.json` enables clean URLs, strips trailing slashes, redirects `www` to the apex, and
sets response-hardening headers including a CSP with no `'unsafe-inline'` in `script-src` — which is
why the head's setup code is a first-party file rather than an inline block. `connect-src` permits
`https://formspree.io` for the enquiry form's `fetch`; update it if that endpoint ever changes.
Fontshare was removed from the CSP along with the fonts.

**`public/boot.js` is the only first-party script in the head, and it does three jobs**: resolve the
theme before first paint, initialise the GA dataLayer, and promote the preloaded font stylesheet.
They were four separate files (`theme-bootstrap.js`, `gtag-init.js`, `font-styles.js` and
`spa-redirect.js`), split apart purely because of that CSP constraint — which was quietly costing
four blocking requests. The fourth, a GitHub Pages deep-link shim, was deleted outright: this project
has no Pages workflow and no CNAME, and it deploys to Vercel with a Netlify fallback. The theme
section of `boot.js` mirrors `hooks/useTheme.ts` exactly and the two must be changed together.

**There is deliberately no catch-all SPA rewrite** — the static-route plugin emits crawlable
documents and Vercel's native `404.html` handling returns a real HTTP 404 for unknown paths.
`public/_redirects` mirrors this for the Netlify fallback.

Google Analytics (`G-2TCETV3EDR`) is wired via the async gtag.js tag in `index.html` plus the init in
`boot.js`; the ID lives in both and must change together. Vercel Web Analytics renders once in `App.tsx`.

## Content guardrails
- **Never claim code/IP ownership transfer to the client.** Domain ownership is the one ownership
  claim the site makes, and it is stated positively.
- **Never fabricate clients, testimonials, awards, metrics, years, or project counts.** There are
  none. `/about` is designed to earn trust without them — by being specific and checkable, and by
  stating the size of the operation in its first sentence rather than hiding it.
- **No unverified performance numbers.** The specimen readout is measured; everything else is
  structural. `data/studio.ts`'s comparison rows are the easiest place on the site to accidentally
  write a claim that cannot be backed up — every row there is a fact about how the two things are
  made, and it must stay that way.
- The old "Fast Loading" owner override in the hero value grid is moot: the value grid, the
  marquees that repeated it, and the whole `valuePoints` array are gone. The hero now makes a
  measured claim instead of a qualitative one.

## Conventions for editing
- Reuse `Section`, `Button`, `cn()`, and the `.btn` / `.chip` / `.control` / `.measure` classes
  rather than inventing new ones.
- Add design tokens to `src/index.css`'s `@theme`. There is no `tailwind.config.js`.
- **One filled `primary` button per CTA cluster.** Everything else in the group is `secondary` or a
  plain `.link`.
- Before adding a section, ask what question it answers that no existing section does. The page went
  from eight blocks to six in the redesign and should not drift back.
- Before adding motion, ask what user action it is answering. If the answer is "the page loaded" or
  "the user scrolled", the answer is no.
