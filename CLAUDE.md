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
- `npm run check:contrast` — `node scripts/check-contrast.mjs`; a self-contained WCAG contrast
  checker (zero imports) that pins a floor for every foreground/background pair the design spec
  cares about. Not part of `npm run build`; run it by hand after any token-colour change.
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

Route changes fade in over `.route-fade` (a keyed wrapper around `<Routes>` in `App.tsx`) — a
deliberately fast (180ms) transition rather than the "no route transition animations" rule this file
stated before the 2026.1 micro-interaction pass. It stays fast on purpose: the site's pitch is that
navigation is instant, and a slower crossfade would work against that.

Nav labels are Services / Studio / Contact — "Studio" points at `/about`, whose path stays as it is
for SEO continuity.

## Where page UI lives
**Page markup is inlined directly in `pages/*.tsx`.** There is no `components/sections/*` directory
and no `SectionHeading` component — the eyebrow-plus-heading-plus-paragraph block it encoded was one
of the patterns the redesign set out to remove. Each section composes its own heading.

The one layout primitive is `components/layout/Section.tsx`. It owns exactly three things — the side
gutter, the maximum measure (`78rem`), and the vertical rhythm — plus two options: `field`
(`'ink' | 'petrol' | 'sunken' | 'raised'`, inverting the band to one of four grounds — only `ink` is
styled today, `petrol`/`sunken`/`raised` are empty placeholders reserved for a later phase) and
`rule` (draw the measure line at the top). Every rendered `<section>` also carries a `data-field`
attribute mirroring the prop (`"paper"` when it is absent). Everything else about a section is
composed freely inside it, deliberately, so the page does not turn into the same arrangement six
times.

### Homepage composition
Six sections, and **no two are built the same way** — that variety is load-bearing, not incidental:

| # | Section | Shape |
|---|---------|-------|
| 1 | Hero | Display headline, then lead+CTA left / specimen panel right, closing on a measure rule |
| 2 | What we make | An index at display scale — the titles *are* the composition |
| 3 | What you are choosing between | **Ink field.** Inverted opening (lead top-right, heading below-left), then a two-column comparison |
| 4 | How it works | Full-width display heading, then a connected rail of four steps |
| 5 | Worth asking | `bg-canvas-sunken`. Header row, then a full-width disclosure list |
| 6 | Tell us what you need | **Ink field.** "What happens next" left, the enquiry form right |

The hero is the only place the type is allowed to be the whole composition
(`--text-hero`, ~121px at 1440). It is deliberately **two lines, not three**: a third line pushes
the specimen panel below the fold on a 14–15" laptop, and the panel is the payoff for the headline.
The whole hero — headline, lead, CTA and panel — fits inside 780px of viewport height; check that
again if any of its type or padding changes.

The hero's second row is a 12-column split: the lead paragraph and the CTA cluster now stack
together in the left six columns, and `PageSpecimen` — rendering its own `.specimen-panel` chrome —
takes the right five. It used to sit as a full-width strip along the hero's closing rule, read only
once someone scrolled past the fold; putting the live reading beside the headline's own claim,
visible without scrolling, is the point of the arrangement, not an incidental layout choice.

Section 3's comparison used to be a real `<table>` with a bordered `.glance` strip repeating the
same argument underneath it — two devices making one argument, density without hierarchy. It has
been rebuilt as a genuine two-column opposition (`.compare-row`, `.compare-cell-template`,
`.compare-cell-built` in index.css) where **depth carries the hierarchy** instead of a border: the
template column is recessed, the built column is raised. This pass gives those classes structure
only — `field="ink"` stays on the section and the columns render at a neutral tone until a later
task hands them their elevation via `.field-petrol`. The opening block is inverted from the other
heading-led sections: the lead sits top-right, the `<h2>` sits below-left. Dropping the `<table>`
means each aspect is now an `<h3>`, associated with its two treatments by DOM order rather than
`scope="row"`; below `md` the rows stack with the template treatment first and visually muted, same
as the table's block-layout fallback did before it.

Sections 2 and 4 both carry display-scale type, for different reasons. The service index is set
large because a list of four small links was the most documentation-like block on the page; the
process heading is set large because three sections opening with heading-left/thing-right in a row
is the composition reading as a template, and "an hour of your time" is the strongest claim after
the hero.

The page **ends inside the form**. That is why `Footer` no longer carries a CTA band — pointing at a
contact page from underneath a contact form was asking twice.

Section 4's timeline was first built as a 2×2 grid of bordered cells and read as cards, then
rebuilt as four columns each opening on its own `.measure` rule with no border beyond that. It has
since been rebuilt again, on direct instruction, into a connected sequence: a shared `.process-rail`
line at `lg` (a native scroll-driven animation on the same primitive as the measure rule's own
draw-in, carrying a marker that travels the row as the section scrolls through view), a numbered
circle badge per step, and the client-time commitment (`step.yours`) shown as a small pill
(`.badge`) rather than as the large standalone line it used to be. That large-`yours` treatment was
this section's previous "hierarchy inverted on purpose" device — what the project costs the client
in time set larger than what we do — and it no longer exists in that form; the number badge and step
name now carry the section's visual weight instead. Below `lg`, where the steps stack in one column,
a rotated arrow icon between steps carries the same flow idea in a shape that reads vertically.

## The design system (`src/index.css`)
Two inks and a paper, plus one hue used in five places on the whole site. Read the file — it is
commented at the level of *why*, not *what* — but the rules that matter most:

**Nothing is a card, with one deliberate exception.** No bordered boxes, no shadows, no gradients,
no glows, no blur, no texture overlays, `border-radius: 0` everywhere else. Rhythm comes from three
grounds (`canvas`, `canvas-sunken`, and the inverted ink field) and from the measure rule.
`.specimen-panel` — the surround for the hero's `PageSpecimen` readout — gets a tonal step
(`--color-canvas-raised`) and a hairline border but keeps `border-radius: 0`, because a live
instrument reading is a different material from the page rather than a grouped strip of terms. It
was added on direct instruction after this rule was raised explicitly, and does not license a
second: nowhere else on the site should reach for a border on the strength of this precedent. (The
homepage comparison table used to carry a second exception, `.glance` — a bordered ✕/✓ strip with a
10px radius — but it was cut in favour of a two-column opposition where depth, not a border, carries
the hierarchy; see "What you are choosing between" in Homepage composition above.)

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
are far too loose at those sizes. `--text-figure` sits one rung below `--text-2xl` for the hero
specimen's readings — prominent without competing with a section heading, and used repeatedly (once
per reading row) rather than once, which is what keeps it out of the "used once" pair above.

**Archivo is requested with its WIDTH axis** — `Archivo:wdth,wght@62..125,400..600` in index.html.
That is not cosmetic: three separate effects animate `font-stretch`, and dropping the axis from the
font URL kills all three silently, leaving the motion looking broken rather than absent.

JetBrains Mono went with the decorative code panel it existed for; **there is no monospace face on
this site.** If you want one for "technical" flavour, that is the costume the redesign removed.

## Motion
**The original motion system had exactly one idea: type being set.** Letterforms carried the
animation — Archivo's width and weight axes — rather than boxes sliding around, in four places and
nowhere else, with no fade-up-on-scroll entrance reveals — that pattern is why the first pass read as
documentation with good typography. A 2026.1 pass added a second, explicitly approved layer of
sitewide micro-interaction on top of that (see "The 2026.1 micro-interaction addendum" below); the
five mechanisms below are the original set and are still the ones "type being set" describes.

1. **The headline sets itself on load.** Words wipe up from their own baselines, staggered 48ms,
   while the line widens from 74% to 100%. Last word lands at ~1.05s.
2. **Titles widen under the pointer** (`.widen`, 100% → 113%) — the service index, the FAQ
   questions, the wordmark. The interaction is the letterform, not a colour change.
3. **The hero shrinks and lifts away as it scrolls past** (`--hero-set`, 100% → 66% width, scale
   1 → 0.86, lifting 3rem) — resolved by about half the hero's own height, not the full height.
4. **Measure rules draw themselves** as their section arrives.
5. **The headline resets into a second statement, once, and back** (`.hero-swap`) — see below.

**The hero headline briefly swaps to a second statement and back, once, automatically.**
`.hero-swap` (index.css) stacks the primary `<h1>` (`.hero-swap__primary`, normal flow, sizes the box)
and a second paragraph (`.hero-swap__alt`, `RevealHeadline` in HomePage.tsx, `position: absolute; inset: 0`
over it) in one box. Once the primary line has finished setting (~1.05s) and held for a further beat, it
wipes away — the same clip-path language `.set-word` opens with, run in reverse — while the alt line
wipes in beneath it; both hold; then it reverses, and the primary line rests there permanently. It never
loops: this plays once per page load, which is what keeps it a considered moment rather than the
rotating-hero-text tic of a template site. Both animations run off one shared percentage timeline (0–36%
primary shown / 36–44% crossfade / 44–76% alt shown / 76–84% crossfade / 84–100% primary shown, staying
there) so they read as a single swap rather than two animations that happen to overlap.

**`RevealHeadline` is a genuinely different second message, not a re-styled echo of the primary
headline.** The primary line reads "Every site starts as an empty file."; `RevealHeadline` reads "Most
fill it with a template." — same size and weight as the primary headline (`.reveal-type` matches
`.hero-type`'s resting values exactly), because a fainter "draft" treatment undercuts the surprise. It
stays `aria-hidden` and the primary line stays the one real, permanent `<h1>` — the swap is a visual
moment layered on top of the actual content, not a second piece of content in its own right, which
matters more now that it plays automatically for every visitor rather than only the ones who happened to
hover.

This is the third mechanism this spot has held, and the second time a cursor-driven version was replaced
with something else entirely rather than tuned. It went: a pointer-revealed construction-grid overlay
(`ConstructionGrid.tsx`) → a pointer-revealed window onto the same headline in a softer typographic state
→ a pointer-revealed window onto a genuinely different message (`CursorWindow`, `CursorMarks`,
`useCursorField.ts` — all since deleted, not disabled) → the current automatic swap, once direct
feedback asked for it to run without a cursor. If a further redesign is ever wanted here, treat it as a
real design decision again, not a line edit — this spot has never survived unchanged past a single round
of feedback yet.

Everything else is motion answering a user action: the disclosure, the form, the menu sheet, button
and link hovers.

**Two gotchas this effect has already cost a build over — both about the same underlying trap.**
`.set-word` originally animated `font-stretch` itself, with `animation-fill-mode: both` — and a
filled animation beats an inherited value, so once the headline had set, every word was pinned at
100% and the scroll effect never reached the glyphs. It *looked* correct because the h1's own
computed value changed; the spans holding the text never moved. Width now lives in one registered
custom property (`@property --set-width`) that both motions feed into via `calc()` on `.hero-type`:
the load animation drives `--set-width`, the scroll handler drives `--hero-set`, and neither can pin
the other. **Never animate `font-stretch` from two places.**

The second: **a registered custom property's `inherits` flag has to match where it's written versus
where it's read.** `--hero-set` is written by JS onto the `<section>` ref, but consumed by `.hero-type`
on the `<h1>` beneath it — a different element, so it depends on inheritance. `--set-width` is written
and read on the same element and correctly declares `inherits: false`; copying that pattern onto
`--hero-set` silently broke the entire effect, because the child stopped seeing any value and just sat
at its `initial-value` (1, i.e. never compressed) — with no error, since an out-of-range read on a
typed property that has never inherited a value simply resolves to its declared initial value. **Check
`inherits` against the actual write/read elements, not by copying a neighbouring `@property` block.**

**A fourth, unrelated to any of the above:** the headline's per-word wipe-in (`@keyframes set-word`)
used to leave a small negative `clip-path` inset permanently applied at rest
(`inset(-0.4em -0.2em -0.3em -0.08em)`), on the reasoning that a flush `inset(0)` might clip a tall
ascender or the descender on "empty"'s y right at the box edge. In practice that permanent negative
inset on a `will-change: clip-path` layer rendered a faint stray seam right above the first line, at
rest, on every load — worse than the problem it was guarding against. Checked directly against this
exact headline (all seven words, including "empty") with a flat `inset(0)` at rest: nothing clips, and
the seam is gone. If `SetHeadline` is ever reused with different text, recheck this the same way rather
than assuming the margin is unnecessary in general.

`--hero-set` is written from a rAF-batched scroll handler that is IntersectionObserver-gated, at full
precision, on every frame. An earlier version quantised it to twenty steps to limit how often
`font-stretch` re-shapes the line — real work, since it re-instances the variable font — but the
visible staircase that produced was reported as not smooth enough and was worse than the cost it
avoided. **The fix for a JS-driven property reading as choppy is not to throttle the writes further;
it's to register the property via `@property` and put a `transition` on the rule that consumes it.**
A typed, transitioned custom property turns a stream of discrete `element.style.setProperty` calls
into one continuously eased value — the transition retargets smoothly on every new write (the same
interruptible-transition behaviour CSS transitions get for free elsewhere in this file), which reads
as fluid at any write frequency. Reach for that before reaching for a lower write rate.

The measure draw is a **native scroll-driven CSS animation** (`animation-timeline: view()`) inside
`@supports`, not an IntersectionObserver. No JavaScript, no per-frame work, and no failure mode: a
browser without support simply renders the rule already drawn. Scroll-*position* linking is right
here specifically because a half-drawn hairline is a harmless intermediate state — the same
technique on a text reveal would strand words mid-sentence when someone stops scrolling.

`.enter` and `.set-word` hold their `from` state during their delay, so a printed page would come
out with an invisible hero — there is a `@media print` reset for exactly that.

### The 2026.1 micro-interaction addendum
Added on direct instruction, after the trade-off against "one motion idea" and "nothing is a card"
was raised explicitly and overridden on purpose — this is not drift. Each item still answers a real
action (a hover, a scroll, a route change) rather than "the page loaded", still respects
`prefers-reduced-motion`, and still reads from the system's own tokens. All of it lives in the "2026
micro-interaction addendum" block at the bottom of index.css's `@layer components`.

- **`.btn:hover` lifts one pixel** on top of the existing fill-wipe and arrow-slide.
- **`.spotlight`** tracks the pointer within a row (the service index) and tints a small radius
  under it via `--mx`/`--my`, written on `mousemove` by `trackSpotlight` in `utils/spotlight.ts`.
  No blur filter — the softness is the gradient's own falloff.
- **`PageSpecimen`'s readings count up** from zero the one time each first resolves from its
  placeholder (`useCountUp` in `PageSpecimen.tsx`) — the number itself is still exactly what
  `measure()` reported; this only spreads its reveal over ~700ms instead of snapping it in.
- **Route changes fade** via `.route-fade` — see Architecture & routing above.
- **`.reveal`** fades and lifts a section heading in as it enters view, on the same scroll-driven-
  animation primitive as the measure rule (`animation-timeline: view()`, no IntersectionObserver).
  Applied to one heading per section, never to running body copy.
- **`.faq-row`** grows a left accent bar in behind the open question, on top of the existing
  grid-rows disclosure transition (both the homepage and `/about` FAQ implementations).
- **`.whatsapp-icon`** wiggles on hover, applied to every WhatsApp icon on the site via one shared
  class and rule (`a:hover .whatsapp-icon`) rather than a bespoke animation per call-to-action.

**A sitewide cursor-following tint (`.cursor-glow`) was tried here and removed.** It was the
*fourth* attempt at a cursor-following element on this site — after `ConstructionGrid`,
`CursorWindow`/`CursorMarks`, and `useCursorField` (see the hero-swap history further up) — and,
like the three before it, it was removed rather than tuned. All four shared the same failure mode:
a pointer-tracked effect only exists while someone is moving the mouse over it, so the page's own
screenshot — the state a visitor lands on, shares, or is judged by first — never shows the thing
that was built, and the effect answers "the pointer moved somewhere on the page" rather than any
specific action on any specific control. That is a decoration, not an interaction, by this site's
own definition of the difference. A pointer-tracking effect is now considered **settled against**
on this site rather than an open question — it fails both of the site's own tests (must read as a
considered design at a single static screenshot; motion must answer a user action, not "the page is
being looked at") on every attempt, not just this one. Do not re-propose the idea without treating
that as the thing to argue against, not rediscover.

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

A one-pixel `translateY` lift on hover (`.btn:hover` in the 2026.1 addendum, see Motion above) sits
on top of both of the above and does not change either constraint.

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
out. If it is ever wanted back, that is a business call, not a bug fix. Every WhatsApp icon on the
site carries `.whatsapp-icon` and wiggles on hover — see the 2026.1 micro-interaction addendum under
Motion.

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
  structural. `data/studio.ts`'s `comparisonRows` (the homepage comparison) is the easiest place on
  the site to accidentally write a claim that cannot be backed up — every entry is a fact about how
  the two things are made, and it must stay that way.
- The old "Fast Loading" owner override in the hero value grid is moot: the value grid, the
  marquees that repeated it, and the whole `valuePoints` array are gone. The hero now makes a
  measured claim instead of a qualitative one.

## Conventions for editing
- Reuse `Section`, `Button`, `cn()`, and the `.btn` / `.chip` / `.control` / `.measure` classes
  rather than inventing new ones. The 2026.1 addendum added `.badge`, `.spotlight`, `.process-rail`,
  `.reveal`, `.route-fade`, `.faq-row` and `.whatsapp-icon` to that set; the comparison rebuild added
  `.compare-row` / `.compare-cell-template` / `.compare-cell-built`. Reuse those for anything in the
  same family (a pill, a scroll-driven reveal, a two-column opposition) rather than writing a sixth
  variant of one. Do not add a cursor-tracked tint back — see "A sitewide
  cursor-following tint" under Motion above.
- Add design tokens to `src/index.css`'s `@theme`. There is no `tailwind.config.js`.
- **One filled `primary` button per CTA cluster.** Everything else in the group is `secondary` or a
  plain `.link`.
- Before adding a section, ask what question it answers that no existing section does. The page went
  from eight blocks to six in the redesign and should not drift back.
- Before adding motion, ask what user action it is answering. If the answer is "the page loaded" or
  "the user scrolled", the answer is no.
