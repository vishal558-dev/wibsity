---
target: landing page hero
total_score: 20
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\vshl\\Documents\\wibsity\\src\\pages\\HomePage.tsx (hero section)"
timestamp: 2026-09-10T06-51-37Z
slug: src-pages-homepage-tsx-hero-section
closed: true
---
# Design Critique — Homepage Hero

**Method: dual-agent (A: general-purpose · B: general-purpose)**

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Specimen panel gives real, live feedback (placeholder → count-up); nothing else async in the hero |
| 2 | Match System / Real World | 2 | "First paint," "Files loaded," "Page elements" are developer metrics, unglossed, for a non-technical small-business audience |
| 3 | User Control and Freedom | 4 | No traps, standard nav, browser back works |
| 4 | Consistency and Standards | 4 | Uses the site's documented token/component system consistently |
| 5 | Error Prevention | n/a | No inputs or destructive actions live in the hero |
| 6 | Recognition Rather Than Recall | 4 | WhatsApp link pairs icon with visible text, not icon-only |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode hero — no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained overall, but the accent-colored specimen figures rival the CTA for first-glance attention, and the lead paragraph's line-height (1.2) reads tight against the rest of the page |
| 9 | Error Recovery | n/a | No error states reachable from the hero |
| 10 | Help and Documentation | n/a | Mode applicability — landing-page hero |
| **Total** | | **20/24** | **Good (83%)** |

## Design Specificity Verdict

**LLM assessment:** This hero couldn't be dropped into an unrelated studio's site unchanged. `PageSpecimen` is mechanically bespoke — it measures the real page in the real visitor's browser and prints the reading, with copy that explicitly disowns the performance-marketing genre it's rejecting ("Not a claim — a reading"). The headline pairing — "Every site starts as an empty file." reveal-swapping to "Most fill it with a template." — is a direct, specific jab at named competitor categories (Wix/Squarespace/WordPress builders), not interchangeable SaaS copy. Where genericism creeps back in is purely compositional: headline-left / proof-widget-right with a primary-button-plus-secondary-link cluster is a common hero shape. That's an acceptable trade — the shape doesn't need to be different, and the content clears the bar.

**Deterministic scan:** The CLI scan against source (`HomePage.tsx`, `PageSpecimen.tsx`) came back clean (exit 0, no findings). The live-DOM detector, run against the rendered page, flagged 4 items, but 3 don't actually indict the hero as generic:
- `cream-palette` on `body` (`#efeae0`) — this is the site's deliberately chosen "paper" token; CLAUDE.md records that this exact value was picked specifically to stay clear of the generic AI-design cream tell. A considered decision, not an unexamined default.
- `repeating-stripes-gradient` on `body` — traced to `.measure::before`, the signature ruler-tick device at the hero's closing rule, not a decorative background. False positive from selector bubbling.
- `cramped-padding` on `.faq-row` — lives in a different section entirely, out of scope for the hero.
- `tight-leading` on the hero's lead paragraph (`leading-[1.2]` at `text-2xl`, below the detector's 1.3 floor) — this one is real and in-scope; see Priority Issues.

**Visual overlays:** Both assessors got a live browser render. Desktop (~1920×900) showed the documented two-line headline, the 12-column lead/CTA-left / specimen-right split, no overflow, no console errors, and the hero + CTA + specimen panel all fit above the fold with room to spare. Neither assessor could get a genuine 390px mobile render this session — `resize_window` reported success but the viewport never actually changed (a tool limitation in this environment, not a finding about the design). Mobile behavior below is code-derived only, flagged as unverified.

## Overall Impression

The hero's substance is the strongest part of the page: a live, unfakeable proof mechanism paired with copy that's specific to this studio's actual argument. What's underbuilt is the audience translation of that proof — the numbers are honest but speak developer, not small-business-owner — and a couple of hierarchy details (the specimen's visual loudness, the lead paragraph's tightness) that a design pass would normally catch. Nothing here is broken; the biggest opportunity is making the specimen panel land as reassurance for the person actually reading it, not just for people who already agree with the pitch.

## What's Working

- **`PageSpecimen`** is a genuinely unique mechanism tied directly to the brand argument — the pre-emptive "Not a claim — a reading" copy does real work against skepticism.
- **The `.measure` rule** at the hero's close is a recognizable, non-decorative signature that reads as structure, not flourish, confirmed as intentional (not the false-positive "stripes" the detector saw it as).
- **The petrol/oxide semantic split holds even inside a data widget** — the specimen's figures use the "what we make/measure" accent consistently with the rest of the site rather than inventing a new hue.

## Priority Issues

**[P1] Specimen labels are unglossed developer jargon for a non-technical audience**
- **Why it matters:** PRODUCT.md's audience is small-business owners/founders, not engineers. "First paint," "Files loaded," "Page elements" carry no inherent meaning to that reader — the hero's flagship proof-point risks landing as noise instead of persuasion for the actual buyer.
- **Fix:** Reframe labels in plain outcome language while keeping the honest underlying measurement (e.g., something closer to "How fast it showed up" than "First paint"), or add a one-line gloss under the panel.
- **Suggested command:** `/impeccable clarify`

**[P2] Specimen figures visually outcompete the primary CTA**
- **Why it matters:** The count-up numbers are the highest-contrast, most saturated objects in the hero, sitting at the same height as "Start a project." For a page whose stated primary goal is the enquiry form, splitting first-glance attention with a supporting proof element works against conversion.
- **Fix:** Reduce the figures' visual weight slightly (smaller `--text-figure`, or a less saturated accent step) so the panel reads as instrumentation beside the ask, not a competing headline.
- **Suggested command:** `/impeccable layout`

**[P2] Hero lead paragraph's line-height is measurably tight**
- **Why it matters:** `leading-[1.2]` on a `text-2xl` serif paragraph sits below the 1.3 floor that reads comfortably at that size, and visually the three lines stack noticeably tighter than the rest of the page's typography.
- **Fix:** Bump to at least `1.3`, or make a deliberate documented exception if the compactness is intentional at this exact size.
- **Suggested command:** `/impeccable typeset`

**[P2] The automatic headline swap has no visible "why"**
- **Why it matters:** At ~3s the `<h1>` silently replaces itself with a second statement then reverts, `aria-hidden`, with no accompanying cue that this is deliberate. A first-time visitor skimming has a real chance of reading this as a glitch rather than a considered reveal — worth noting CLAUDE.md's own history shows this exact spot has been rebuilt four times and never survived a round of feedback unchanged.
- **Fix:** Either add a subtle motion tell that clearly signals intent, or reconsider whether a permanent two-line subhead delivers the same "honest second half" idea without the ambiguity risk.
- **Suggested command:** `/impeccable delight`

**[P3] The specimen panel silently drops its headline row on a backgrounded page load**
- **Why it matters:** Confirmed directly by Assessment A — an automated tab load rendered only 2 of the panel's 3 rows ("First paint" absent), with nothing on-page indicating a reading was skipped. By design the code refuses to print a dishonest paint time, but real visitors regularly open links via in-app/social browsers that background-load, meaning a real slice of traffic never sees the headline metric with no indication one exists.
- **Fix:** Add a fallback line when the row is dropped instead of silently omitting it.
- **Suggested command:** `/impeccable harden`

## Persona Red Flags

**Jordan (Confused First-Timer):** Doesn't know if "41 files" or "405 elements" is good or bad — no comparison point ("vs. a typical template site") is offered, so the number is present but not yet persuasive without domain literacy. The self-changing headline is exactly the kind of unfamiliar, unexplained behavior this persona hesitates on in the first 3–5-second window they're documented to abandon in.

**Riley (Deliberate Stress Tester):** Directly reproduced the dropped "First paint" row on a backgrounded load with zero on-screen acknowledgment. Most of Riley's usual surface (long strings, multi-tab state loss) doesn't apply here since the hero has no user input — this specimen-panel edge case is the one real hit.

**Casey (Distracted Mobile User):** Neither assessment could get a genuine 390px render this session (a tool limitation, not a design defect) — flagging this as unverified rather than passed. Code review shows the `clamp()` headline sizing and the WhatsApp link's 44px hit-target pattern are consistent with the responsive conventions CLAUDE.md documents, but real-device stacking and spacing should be checked directly before treating mobile as clean.

## Minor Observations

- The headline's word-splitting (`SetHeadline`) correctly preserves real spaces for copy/paste and accessible-name computation — small but real engineering care.
- "or WhatsApp" reads slightly terse next to "Start a project" — likely intentional brevity, worth a quick gut-check.
- Three motions fire in the hero's first ~1.2s (word-wipe headline, `.enter-1`/`.enter-2` fade-ups, then the swap queued right behind at 1200ms) — each is documented as serving a distinct purpose, but worth sanity-checking that the very first impression isn't three separate things settling before anything is readable at rest.

## Questions to Consider

1. Has the specimen panel's copy been tested with an actual non-technical small-business owner, or only with people who already know what "first paint" means?
2. If the specimen figures are meant to support the CTA rather than compete with it, why do they carry the single highest-contrast color treatment in the hero?
3. What evidence exists that an automatic, unexplained once-per-load headline swap converts better than simply stating both lines as a permanent two-line subhead — especially given this spot has already been rebuilt four times?
