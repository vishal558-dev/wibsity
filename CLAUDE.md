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
- `npm run check:contrast` — `node scripts/check-contrast.mjs`; a WCAG contrast checker that parses
  every `--color-*` token straight out of `src/index.css`'s `@theme` block rather than keeping a
  hardcoded copy, so it verifies what actually ships rather than what the author intended, and pins a
  floor for every real foreground/background pair the design spec cares about. Not part of
  `npm run build`; run it by hand after any token-colour change.
- `node scripts/generate-brand-assets.mjs` — regenerate favicons, apple-touch-icon and the social
  card. Not part of `npm run build`; run it by hand when the logo geometry, the hero headline or
  `og:description` changes.

## The idea the site is built on
wibsity's differentiator is that a site is *built* rather than *assembled*. The homepage now carries
that argument through copy and structure alone: the headline's claim ("Every site starts as an empty
file."), its automatic swap to the honest second half ("Most fill it with a template.", see Motion
below), and the structural template-versus-built comparison in section 3 (see "Homepage composition").

**A live specimen readout used to sit in the hero as the mechanical proof of that argument** — a
component (`components/common/PageSpecimen.tsx`) that measured its own first paint, file count and
element count in the visitor's browser and printed the result beside the headline. It was removed
outright on direct instruction: the component, its `.specimen-panel` styling, the `--text-figure`
type token, and every other reference to it are gone from the codebase, not hidden or disabled. The
hero's second row lost the 12-column split this created — the lead paragraph and CTA cluster are now
a single full-width block (see "Homepage composition" below). If a live-measurement device is ever
wanted back, treat it as a fresh design decision with its own layout, not a restoration of this one.

Two consequences still bind future work:

1. **The site cannot carry a dependency it does not need.** `motion`, `lenis` and `lucide-react`
   were all removed. The runtime is React, react-dom, react-router-dom, clsx, tailwind-merge,
   `@vercel/analytics` and `gsap`. Adding a library to this project is a positioning decision, not
   just a technical one. `gsap` is the one exception: added on direct instruction to match
   gsap.com's own homepage timeline demo closely for the service index's entrance (see
   `ServiceTimeline.tsx` and "Homepage composition" below) — a positioning decision made explicitly
   for one feature, not a general license to reach for animation libraries elsewhere. Every other
   motion on the site is still CSS.
2. **No asserted performance numbers.** There is currently no performance figure anywhere on the
   site — don't add a load-time claim, a Lighthouse score, or similar without a real measurement
   behind it, taken live in the visitor's own browser the way the specimen readout was, never a
   hardcoded number. A bytes-transferred reading was tried for that readout and deliberately
   dropped before it was removed entirely: Resource Timing reports zero bytes both for cross-origin
   responses without `Timing-Allow-Origin` and for cache hits, so it would silently flatter a repeat
   visit. Don't reintroduce that specific measurement without solving that problem first.

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
(`'ink' | 'petrol' | 'sunken' | 'raised'`, inverting the band to one of four grounds — all four are
real: `.field-ink` and `.field-petrol` remap the whole token set to an inverted ground, `.field-sunken`
and `.field-raised` are tonal steps on the same paper that deliberately leave foregrounds unremapped)
and `rule` (draw the measure line at the top). Every rendered `<section>` also carries a `data-field`
attribute mirroring the prop (`"paper"` when it is absent). Everything else about a section is
composed freely inside it, deliberately, so the page does not turn into the same arrangement six
times.

### Homepage composition
Six sections, and **no two are built the same way** — that variety is load-bearing, not incidental:

| # | Section | Shape |
|---|---------|-------|
| 1 | Hero | Display headline, then a full-width lead+CTA block, closing on a measure rule |
| 2 | What we make | GSAP-animated cards (yellow / white / black / petrol cycle), staggered into a staircase, led by a playhead + ruler |
| 3 | What you are choosing between | **Petrol field.** Inverted opening (lead top-right, heading below-left), then a two-column comparison |
| 4 | How it works | **`field="sunken"`.** Inverted opening (small paragraph left, display heading right-aligned), then a connected rail of four steps |
| 5 | Worth asking | No field — stays on paper. The list's own top rule carries the heading and the link; rows run full width |
| 6 | Tell us what you need | **Ink field.** "What happens next" left, the enquiry form right |

The hero is the only place the type is allowed to be the whole composition
(`--text-hero`, ~121px at 1440). It is deliberately **two lines, not three**: a third line pushes
the CTA cluster below the fold on a 14–15" laptop. The whole hero — headline, lead and CTA — fits
inside 780px of viewport height; check that again if any of its type or padding changes.

The hero's second row is a single full-width block (the lead paragraph and the CTA cluster stacked
together) rather than a grid split — it used to share this row with a live specimen readout in a
right-hand column, removed outright on direct instruction (see "The idea the site is built on"
above). Don't reintroduce a 12-column split here without something real to put in the second column;
an empty or decorative one would just be recreating the gap the removal was meant to close.

Section 2's rows used to be a plain `.index-row` list — a bordered row whose rule drew from the
left on hover, with a `.spotlight` pointer-tracked tint underneath the text (`trackSpotlight` in
`utils/spotlight.ts`). Watching a clip of gsap.com's own homepage "GSAP Timeline" demo — pill
labels sliding in staggered from the left, landing in a staircase, next to a vertical
playhead/marker over a ticked ruler axis — prompted a direct, on-instruction reinterpretation of
that demo for this section, close enough to override several of this file's own defaults on
purpose: each row is now a full card (`.timeline-card`), animated in by GSAP's real Timeline +
ScrollTrigger API (`ServiceTimeline.tsx`) rather than a CSS lookalike — the one motion mechanism on
the site built with a JS library. The fill went through two direct-instruction rounds: first a
single flat `.field-petrol` fill at a small 4px radius (a two-tone `linear-gradient(petrol, oxide)`
was tried first and dropped after a design pass — frontend-design, ui-ux-pro-max, apple-design,
emil-design-eng, impeccable — converged on flat colour plus a considered radius reading as more
premium than a soft two-tone card); then, on a second direct instruction, a four-colour cycle
(`.timeline-card--yellow` → `.timeline-card--white` → `.field-ink` → `.field-petrol`, one per card)
at a larger 22px radius, with each card restructured into a numeral, a title, a divider and a 3-item
bullet list rather than the single paragraph the flat-petrol version showed. The card briefly also
carried a summary paragraph and a delivery-time figure ("3–5 days") below the bullets; both were cut
on direct instruction, since together with the staircase's per-card width shrink (see below) they
made the row of four read as progressively getting smaller rather than deliberately stepping —
`timelineShort` was removed from `Service`/`data/services.ts` entirely once nothing rendered it.
The staircase itself — `margin-left`/`width` in `index.css`'s `@media (min-width: 64rem)` block —
still steps each card right of the last, but width is now fixed at 100% minus the *maximum* step
(three cards' worth) rather than each card's own index, so all four are the same size regardless of
position. See "Nothing is a card" and the Motion section below for what this overrides and why.
`.index-row`/`.spotlight`/`utils/spotlight.ts` were deleted outright rather than kept
alongside the new treatment, since nothing else on the site used them.

Section 3's comparison used to be a real `<table>` with a bordered `.glance` strip repeating the
same argument underneath it — two devices making one argument, density without hierarchy. It has
been rebuilt as a genuine two-column opposition (`.compare-row`, `.compare-cell-template`,
`.compare-cell-built` in index.css) where **depth carries the hierarchy** instead of a border: the
template column is recessed (`--color-canvas-sunken`), the built column is raised
(`--color-canvas-raised`). The section itself is `field="petrol"`, not `field="ink"` — the brand
argument, on the brand colour — so both columns' elevation steps are computed against petrol's own
remapped grounds, not paper's. The opening block is inverted from the other heading-led sections: the
lead sits top-right, the `<h2>` sits below-left. Dropping the `<table>` means each aspect is now an
`<h3>`, associated with its two treatments by DOM order rather than `scope="row"`; below `md` the rows
stack with the template treatment first and visually muted, same as the table's block-layout fallback
did before it.

Sections 2 and 4 both carry display-scale type, for different reasons. The service index is set
large because a list of four small links was the most documentation-like block on the page; the
process heading is set large because "an hour of your time" is the strongest claim after the hero.
Section 4's opening is now inverted from the other heading-led sections — a small paragraph sits
left (`lg:col-span-4`), the display `<h2>` sits right and right-aligned
(`lg:col-span-7 lg:col-start-6 lg:text-right`) — specifically so it no longer opens the same way as
section 2 or section 3; three sections in a row all leading with heading-left was itself reading as
the composition being a template.

The page **ends inside the form**. That is why `Footer` no longer carries a CTA band — pointing at a
contact page from underneath a contact form was asking twice.

Section 4's timeline was first built as a 2×2 grid of bordered cells and read as cards, then
rebuilt as four columns each opening on its own `.measure` rule with no border beyond that. It has
since been rebuilt again, on direct instruction, into a connected sequence: a shared `.process-rail`
line at `lg` (a native scroll-driven animation on the same primitive as the measure rule's own
draw-in, carrying a marker that travels the row as the section scrolls through view), a plain
accent-coloured step numeral, and the client-time commitment (`step.yours`) shown as a small pill
(`.badge`) rather than as the large standalone line it used to be. That large-`yours` treatment was
this section's previous "hierarchy inverted on purpose" device — what the project costs the client
in time set larger than what we do — and it no longer exists in that form; the step numeral and step
name now carry the section's visual weight instead. The numeral was briefly a bordered circle
(`rounded-full border`) — dropped because it was an undocumented, unregistered break from the
system's own `border-radius: 0` rule, and because a border on `--color-fg-subtle` was quieter than
a device meant to carry visual weight has any business being. It is now `text-accent` (petrol, tying
it to the rail it sits beside) with no shape around it at all — closer to the plain numerals `/contact`
and section 6 already use for their own step lists than to a badge. Below `lg`, where the steps stack
in one column,
a rotated arrow icon between steps carries the same flow idea in a shape that reads vertically.

At `lg` the four steps also stagger in as the section scrolls into view, timed to the same
`.process-rail` marker rather than firing on their own independent scroll visibility — the site's
one deliberate exception extending `.reveal`'s single-heading rule to a list of items. See "The
2026.1 micro-interaction addendum" below for why this one was judged narrow enough to allow.

Section 4 also carries `field="sunken"` as of the grounds-table mapping — a real, visible tonal step
down from paper (`.field-sunken`'s `background-color` reads a `:root`-level `--canvas-sunken-ambient`
alias rather than `--color-canvas-sunken` directly, since the latter would be self-referential inside
a rule that also redefines it; see the field definition in `src/index.css`).

Section 5's heading used to be a separate block above the disclosure list, sitting on
`bg-canvas-sunken`. It has been rebuilt so there is no separate heading block and no field/tint at
all — it stays on the page's own paper: the heading and the "All nine questions" link now sit inside
the same wrapper as the list, above a `border-b border-rule-strong` that reads as the list's own
opening rule, and the rows below it run full width (`max-w-[68ch]` on the list was removed; the
per-answer paragraph's measure widened from `max-w-[62ch]` to `max-w-[72ch]` to use the extra width).

## The design system (`src/index.css`)
Two inks and a paper, two accents with a hard semantic split, and four fields. Read the file — it is
commented at the level of *why*, not *what* — but the rules that matter most:

**Nothing is a card, with one deliberate exception.** No bordered boxes, no shadows, no gradients,
no glows, no blur, no texture overlays, `border-radius: 0` everywhere except `.control` and `.chip`
(2px — enough to read as touchable, not enough to read as a card), `.badge` (999px — a tag-shaped
pill, used only for the process steps' client-time commitment, so it reads as a label rather than a
touchable control), and `.timeline-card` (22px — the service index's four cards, see below). Rhythm
comes from three elevations
(`--color-canvas-raised`, `--color-canvas`, `--color-canvas-sunken`) expressed as ground tone alone —
never a shadow — plus the four full-bleed fields (`.field-ink`, `.field-petrol`, `.field-sunken`,
`.field-raised`) and the measure rule. An element may move at most one elevation step from its parent
field, which is the rule that keeps the page from turning into stacked cards.

Two other border exceptions were tried and cut, not kept as precedent: `.specimen-panel` (a tonal
step plus a hairline border around the hero's live specimen readout) was removed along with the
whole readout it surrounded (see "The idea the site is built on" above), and `.glance` (a bordered
✕/✓ strip in the homepage comparison table, 10px radius) was cut in favour of a two-column
opposition where depth, not a border, carries the hierarchy (see "What you are choosing between" in
Homepage composition above). Neither licenses reaching for a border elsewhere.

`.timeline-card` is the one exception — a 22px-radius card used only for the service index's four
rows (numeral, title, a divider and a 3-item bullet list — the summary paragraph and the delivery-time
figure that used to sit under the bullets were both cut on direct instruction, since a card's height
was tracking copy length and, combined with the staircase's per-card width shrink below, made the row
read as the cards progressively getting smaller rather than deliberately stepping),
added on direct instruction to match gsap.com's own homepage "GSAP Timeline" demo (see "Homepage
composition" above and "The service-timeline entrance (GSAP)" under Motion below). It went through
two direct-instruction rounds: first a single flat `.field-petrol` fill at 4px (a two-tone
`linear-gradient(petrol, oxide)` was tried and replaced with that flat fill after a design pass —
frontend-design, ui-ux-pro-max, apple-design, emil-design-eng, impeccable — flagged the gradient as
the generic "SaaS-card" look those skills warn against); then, on a second direct instruction, a
four-colour cycle at the larger 22px radius — `.timeline-card--yellow`, `.timeline-card--white`,
`.field-ink` and `.field-petrol`, one per card in that order — which is itself the "SaaS-card" look
the first round moved away from, deliberately reintroduced here and nowhere else. `.timeline-card--yellow`
and `.timeline-card--white` are new, one-off grounds scoped to exactly these two cards (see the color
tokens note below); `.field-ink` and `.field-petrol` reuse the sitewide fields unchanged. Every card
still gets its title/list/hover contrast for free from whichever field it carries — no
separate contrast math per card — and the oxide numeral/bullet-dot colour (`--color-accent-warm`)
resolves to the correct on-light/on-dark value automatically on all four. There is still no gradient
anywhere in the system. None of this licenses a second card treatment: nowhere else on the site
should reach for a full-radius fill, a fifth ground colour, or this card's numeral/divider/bullet-list
shape on the strength of this precedent.

**`.measure` is the signature device** — a hairline marking a real section boundary with a short run
of accent ticks hanging at its left end, like the scale bar on a drawing. It encodes the grid rather
than decorating the section, so it only appears where a boundary actually is. It is the thing you'd
recognise without the logo.

**`.field-ink` and `.field-petrol` each remap the whole semantic token set on themselves**, not just
two colours. `text-fg-muted`, `border-rule` and friends keep working inside either and land at the
right contrast automatically. This matters more than it looks: the obvious way to dim text on a dark
band is an opacity utility, but opacity composites against whatever is behind it, and these fields are
not always painted directly on the page's own canvas — a raised or sunken sub-elevation inside one is
a different ground again. **Do not use opacity utilities for text inside `.field-ink` or
`.field-petrol`.** Use the tokens — see `npm run check:contrast`'s per-field rows for the measured
ratios, which are re-derived whenever `--color-ink` or the petrol ground moves rather than carried
over. `.field-sunken` and `.field-raised`, by contrast, deliberately do *not* remap foregrounds — they
are tonal steps on the same paper, not an inverted field someone should read as "dark".

`.field-ink` sets `--color-accent` to its own foreground and `.field-petrol` sets it to
`--color-accent-on-dark` (petrol cannot be its own accent), which makes *petrol only appears on paper*
a property of the system rather than a rule anyone has to remember. Both dark fields also remap
`--color-accent-warm` to `--color-accent-warm-on-dark` for the same reason — oxide's paper-tuned value
fails contrast on either dark ground.

**The primary button is a field inversion**, never an accent fill — ink on paper in the light theme,
and it flips to paper on ink inside `.field-ink` or `.field-petrol` (the wipe becomes ink-on-paper
inside either dark field, the same gesture inverted). This is why no CTA on the site glows or carries
a gradient.

**Two accents, with a semantic split that is what keeps the second one from becoming decoration:**
petrol (`--color-accent`) marks what the studio makes and measures — link underlines (`.link`), the
focus ring, the "built for you" side of the comparison, the measure ticks, and the process section's
step numerals. (The specimen readout's figures and the service index's delivery figures were two
other petrol placements; both are gone along with the elements that carried them — the specimen
readout was removed outright, see "The idea the site is built on" above, and the service index's
per-card delivery figure was cut earlier, see `.timeline-card` under "Nothing is a card" above.)
Oxide
(`--color-accent-warm`) marks what the visitor gives or does, in exactly three placements: the
process steps' client-time badges, and the "what happens next" numerals on both the homepage and
`/contact`. Neither is ever a button fill; the primary action stays a field inversion. Grep
`accent-warm` before adding a fourth placement — it is not meant to spread.

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

Paper is `#efeae0` (warm bone, warmed from the redesign's original cool limestone `#edece6` while
staying clear of the `#f4f1ea` cream that reads as a generic AI-design tell); ink is `#191917` (warm
near-black, from the original cool `#161a19`); the two accents are petrol `#0e4b54` and oxide
`#8f4420` — see "Two accents" above for the semantic split.

`--color-yellow-field` (`#fbdb85`, a pale warm gold) is a one-off exception to the two-accent-only
rule, scoped to exactly `.timeline-card--yellow` — the first of the service index's four cards (see
"Homepage composition" and "Nothing is a card" above). `.timeline-card--white`'s pure `#fff` fill is
a literal value, not a token, since it needs no reuse elsewhere. Neither is licensed for use outside
those two cards.

Two tokens carry contrast maths in their comments and should not be nudged without redoing it:
`--color-fg-subtle` (5.62:1 on canvas, per `npm run check:contrast`) and `--color-rule-strong` (it
draws input underlines and secondary-button borders, so it is a UI component boundary owing 3:1, not
text's 4.5:1; 3.81:1 on canvas). Both figures move whenever paper or ink moves — re-run
`npm run check:contrast` after any token-colour change rather than trusting the numbers written here.

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

`--text-figure` no longer exists: it sized the hero specimen readout's readings, and was deleted
along with the readout itself (see "The idea the site is built on" above) rather than left as an
orphaned token.

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
rotating-hero-text tic of a template site. Both animations run off one shared percentage timeline (0–34%
primary shown / 34–46% crossfade / 46–74% alt shown / 74–86% crossfade / 86–100% primary shown, staying
there) so they read as a single swap rather than two animations that happen to overlap. The crossfade
was widened from 400ms/0.15em to 600ms/0.3em on direct instruction after a hero critique found the swap
read as a possible glitch rather than a deliberate moment — the wipe needed to be slow and displaced
enough to actually be seen and tracked as a wipe. The mechanic itself (once-per-load, `aria-hidden`,
`.set-word`'s clip-path language) is unchanged; only the transition's own legibility moved.

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
- **Route changes fade** via `.route-fade` — see Architecture & routing above.
- **`.reveal`** fades and lifts a section heading in as it enters view, on the same scroll-driven-
  animation primitive as the measure rule (`animation-timeline: view()`, no IntersectionObserver).
  Applied to one heading per section, never to running body copy.
- **`.faq-row`** grows a left accent bar in behind the open question, on top of the existing
  grid-rows disclosure transition (both the homepage and `/about` FAQ implementations).
- **`.whatsapp-icon`** wiggles on hover, applied to every WhatsApp icon on the site via one shared
  class and rule (`a:hover .whatsapp-icon`) rather than a bespoke animation per call-to-action.
- **Elevation transitions**, added with the stratigraphy field system: `.faq-row[data-open="true"]`
  steps down to `--color-canvas-sunken` on open (ground, not colour, marks "active"), and
  `header[data-over]` cross-fades its background/border as the page scrolls between grounds. Both
  transitions are merged into each selector's own existing rule rather than appended later in the
  file — a duplicate selector further down would silently win and make the cascade unreadable; see
  the top-of-file layering note above for why that matters here in particular. (`.index-row` carried
  a third instance of this same device — a step to `--color-canvas-sunken` on hover, plus a
  font-weight step on its `h3.widen` — until the GSAP timeline pass replaced the whole row with
  `.timeline-card`; that specific hover treatment was not carried over, since `.timeline-card`
  answers "hovered" with its own ground-shift-plus-lift instead (`.field-petrol`'s own
  `--color-canvas-raised` step, the same idiom in miniature), see "The service-timeline entrance
  (GSAP)" below.)
- **`.chip:hover` lifts one pixel**, the same `translateY(-1px)` `.btn:hover` uses, so the project-type
  and budget chips in the enquiry form answer a hover with the same physical response as the button
  beside them.
- **`.btn-content`** fades+lifts (reusing `route-fade-in`) each time the enquiry form's submit
  button's label/icon content is keyed by `InquiryForm.tsx`'s `Phase`, so `Send enquiry → Sending →
  Sent` reads as a state change rather than a text swap — answers the submit click itself, not a
  timer or a scroll.
- **`.process-step-0` through `.process-step-3`** are the one deliberate exception extending
  `.reveal`'s single-heading rule to a list of items: the four "How it works" steps stagger in at
  `lg` and up, sharing a named view-timeline (`.process-track`'s `view-timeline-name:
  --process-scroll` in index.css) with the existing `.process-rail` marker rather than each
  animating on its own independent scroll visibility — chosen specifically because it ties to a
  scroll mechanism the site already treats as legitimate, not because "the user scrolled" is
  reason enough on its own. **Do not generalise this to the site's other static lists** (FAQ rows,
  checklists, comparison rows, contact channels) without raising that trade-off again, explicitly,
  the way this one was. (The service index rows *do* now carry a stagger entrance — via a separate
  mechanism, GSAP, not by extending `.process-step-N`'s CSS pattern; see "The service-timeline
  entrance (GSAP)" below. That is the trade-off this note asks to be raised explicitly before
  generalising — it was, on direct instruction, and it deliberately stayed a distinct
  implementation rather than stretching this one to cover a fifth case.)

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

### The service-timeline entrance (GSAP)
Added on direct instruction, after the trade-off against "one motion idea" and "nothing is a card"
was raised explicitly and overridden on purpose — this is not drift, and it is a third layer on top
of the original five mechanisms and the 2026.1 addendum, not a replacement for either. It is also
the one motion mechanism on the site built with a JS library rather than CSS: GSAP's real Timeline
+ ScrollTrigger, not a lookalike. It still respects `prefers-reduced-motion` (via
`gsap.matchMedia()`, landing every card/playhead element directly in its rest state with
`gsap.set(..., { clearProps: 'all' })` when set) and still answers a real action — scrolling the
section into view — exactly like `.reveal` and `.process-step-N`. `ServiceTimeline.tsx` owns the
whole effect: a `gsap.context()` scopes every tween/ScrollTrigger it creates so a `useLayoutEffect`
cleanup can `ctx.revert()` all of it in one call (safe under both React StrictMode's dev-only
double-invoke and a real route unmount). The trigger is the component's own root element, and the
timeline is **scrubbed** (`scrub: 0.5`) across the section's transit through the viewport
(`start: 'top 85%'`, `end: 'bottom 15%'`) rather than played once on entry — its progress tracks
scroll position directly, so scrolling forward advances it, scrolling back reverses it, and stopping
mid-scroll settles it to where it is. The `0.5` is a small smoothing lag (GSAP eases the timeline's
playhead toward the scroll-derived position over that many seconds) rather than a rigid `scrub: true`
1:1 snap — changed on direct instruction because the un-smoothed version read as mechanical rather
than fluid; it still stays scroll-linked and fully reversible in both directions, it just no longer
jumps frame-for-frame with the scrollbar. This is a
deliberate departure from the rest of the site's scroll motion (`.reveal`, `.process-step-N`, which
play once and hold) — on direct instruction, and specific to this one GSAP-driven effect; it is not
a precedent for scrubbing other sections. It does not free-run on an interval the way gsap.com's own
demo auto-loops while stationary in view — there is no "stationary" state here, since it only moves
while the scrollbar does. See
`.timeline-card`/`.timeline-playhead`/`.timeline-playhead-line`/`.timeline-playhead-marker`/
`.timeline-ruler` in index.css for the static shape these tweens animate.

## Icons and the logo
`components/common/icons.tsx` is the complete icon set — ten inline SVGs sharing a 1.5px stroke
with flat caps and mitred joints, matched to Archivo's terminals. A library's rounded caps read as a
different hand next to this typeface. WhatsApp is the one exception: it is a filled brand glyph at
its official proportions, because redrawing a channel icon in your own hand makes it unrecognisable.

**As of the 2026.2 rebrand, `components/common/Logo.tsx` no longer draws the identity in code.**
The geometric code-drawn "w" (a `currentColor` SVG, theme-swap-free) is gone, replaced on direct
instruction by a supplied photoreal 3D chrome ribbon mark — a finished brand board, not vector
geometry, so there is nothing left to redraw in code. `LogoMark` now renders an `<img
src="/logo-mark.png">`; the prop API (`size`) is unchanged, so `Navbar.tsx` and `Footer.tsx` needed
no changes. This is a real material shift, not just an asset swap: the rest of the site is flat,
gradient-free and 3D-free by design (see "Nothing is a card" and the "no unnecessary dependency"
rule up top), and a photoreal chrome render is the opposite of that on purpose, per direct
instruction — it does not license 3D or gradient treatments anywhere else on the site.

**Every logo asset is a raster crop from that one supplied board image, not a redrawable source.**
There is no vector master and no regeneration script for the mark itself:
- `public/logo-mark.png` — a flat white silhouette of the mark alone, alpha-keyed to a transparent
  background, used by `LogoMark` (header, mobile nav sheet, footer). **Not** the board's
  rounded-square app-icon composition: that version was tried first and dropped because its
  baked-in ambient shadow (part of the board's "icon on a device" rendering) showed as a visible
  grey halo once placed on the site's own flat grounds, and its chrome gradient lost definition at
  the ~24px size the header/footer actually use — a flat single-tone shape reads clean at that size
  where a gradient doesn't. `LogoMark` sizes by height only, letting width follow the mark's real
  (non-square, ~1.76:1) aspect ratio. The asset is white-only, which only reads on a dark ground:
  `LogoMark`'s `tone` prop defaults to `"ink"` (as-shipped, for the header/sheet's `field-ink`
  ground) and CSS-inverts to a dark mark under `tone="paper"`, which the footer passes since it
  isn't an inverted field — it sits on plain paper, where the white asset alone is nearly invisible
  (a real regression the first version of this fix shipped and had to be caught and corrected).
- `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`,
  `apple-touch-icon.png` — all cropped/resized from the board's dark-rounded-square icon variant.
- `public/logo-mark-512.png` — cropped from the board's higher-resolution "3D render" panel (the
  mark + sphere alone, no square container), used for the JSON-LD `logo`/`image` URLs in
  `index.html`.
- **There is no `favicon.svg` any more** — an svg favicon can't be built from a raster source, and
  serving a stale vector "w" next to a raster one would have browsers that prefer SVG favicons
  showing the *old* mark. The `<link rel="icon" type="image/svg+xml">` tag was removed from
  `index.html` along with the file.

If the mark is ever redrawn or a new board is supplied, re-crop all of the above from it by hand
(or write a fresh script) — `scripts/generate-brand-assets.mjs` is **stale** for the mark itself: it
still drives headless Chrome to rasterise a hardcoded SVG copy of the old geometric "w", which
nothing on the site references any more. Its `og-image.png` step (below) is unaffected and still
valid.

### The asset generator
`scripts/generate-brand-assets.mjs` drives the locally installed Chrome, so there is no image
dependency in `package.json`. It is now **partially stale** — see the note above; its favicon/mark
rasterisation targets a logo that no longer exists in code. Two things in it are still hard-won and
still apply to any future Chrome-rasterisation step (e.g. a redrawn og-image):

- Icons are rasterised by **drawing the SVG into a canvas and reading the data URL back out of the
  DOM**, not by `--screenshot`. Chrome's headless screenshot silently produces a blank frame for
  window sizes in roughly the 96–180px band (48 and 64 are fine, so are 256 and up), which shipped
  two empty icons the first time it ran.
- `favicon.ico` is assembled by hand from the generated PNGs — the ICO container is a 6-byte header
  plus one 16-byte directory entry per frame, and every browser in use accepts PNG-encoded frames.
  (The current `favicon.ico` was instead built with Pillow's native multi-size ICO writer, since its
  source is already a raster crop — see above.)

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

The submit button itself steps through three states on a successful submit — `Send enquiry` →
`Sending` → `Sent` — via `InquiryForm.tsx`'s `Phase` state machine, which holds a `confirming`
phase for ~600ms after the fetch resolves so `Sent` actually gets seen before the confirmation
panel replaces the form; without that hold, phase would jump straight from `submitting` to the
panel and the third state would never render. See `.btn-content` in the 2026.1 micro-interaction
addendum (Motion, above).

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
  opening on what the client actually gets (direct access to whoever builds the site, no account
  manager in between) rather than a headcount claim.
- **Team size is not stated anywhere on the site.** The hero used to close on "A one-person studio in
  India. Accepting new projects."; `/about` opened "A studio of one." and named the headcount as the
  reason there is no account manager. Both were removed on direct instruction and replaced with the
  same underlying claims — direct access, no account manager, still there later — stated without a
  number attached. Don't reintroduce a headcount figure (a specific number, "solo", "one-person",
  etc.) into hero, footer, `/about`, or any meta/SEO/JSON-LD string without asking first.
- **No unverified performance numbers.** There is currently no performance figure anywhere on the
  site — the homepage's live specimen readout, which used to be the one measured figure, was removed
  outright (see "The idea the site is built on" above); don't add a load-time, ranking, or similar
  numeric claim back without a real measurement behind it. `data/studio.ts`'s `comparisonRows` (the
  homepage comparison) is the easiest place on the site to accidentally write a claim that cannot be
  backed up — every entry is a fact about how the two things are made, and it must stay that way.
- The old "Fast Loading" owner override in the hero value grid is moot: the value grid, the
  marquees that repeated it, and the whole `valuePoints` array are gone. The hero made a measured
  claim instead of a qualitative one for a while (the specimen readout); it now makes neither — the
  argument is carried by copy and structure alone, see "The idea the site is built on" above.

## Conventions for editing
- Reuse `Section`, `Button`, `cn()`, and the `.btn` / `.chip` / `.control` / `.measure` classes
  rather than inventing new ones. The 2026.1 addendum added `.badge`, `.process-rail`,
  `.reveal`, `.route-fade`, `.faq-row`, `.whatsapp-icon`, `.btn-content`, `.process-track` and
  `.process-step-N` to that set; the comparison rebuild added `.compare-row` /
  `.compare-cell-template` / `.compare-cell-built`; the GSAP timeline pass added `.timeline-card`,
  which each of the four cards pairs with one of `.timeline-card--yellow`, `.timeline-card--white`,
  `.field-ink` or `.field-petrol` for its ground (reuse `text-fg`/`text-fg-muted`/`text-accent-warm`
  inside it, not new custom properties — every field resolves them correctly already), plus
  `.timeline-card-number`, `.timeline-card-divider`, `.timeline-card-dot`,
  `.timeline-playhead`, `.timeline-playhead-line`, `.timeline-playhead-marker` and `.timeline-ruler`
  (`.index-row` and `.spotlight` were deleted, replaced outright). Reuse those for anything in the same family (a
  pill, a scroll-driven reveal, a two-column opposition) rather than writing a sixth variant of one
  — the `.timeline-card` set specifically is not a general-purpose card/pill system, see "one
  deliberate exception" under "Nothing is a card" above. Do not add a cursor-tracked tint back —
  see "A sitewide cursor-following tint" under Motion above, and do not extend `.process-step-N`'s
  stagger to another list without raising that trade-off explicitly — see the addendum bullet above.
- Add design tokens to `src/index.css`'s `@theme`. There is no `tailwind.config.js`.
- **One filled `primary` button per CTA cluster.** Everything else in the group is `secondary` or a
  plain `.link`.
- Before adding a section, ask what question it answers that no existing section does. The page went
  from eight blocks to six in the redesign and should not drift back.
- Before adding motion, ask what user action it is answering. If the answer is "the page loaded" or
  "the user scrolled", the answer is no.
