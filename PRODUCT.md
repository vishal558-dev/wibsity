# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners and founders — established companies, consultancies, clinics, professional firms, and founders launching a new service or campaign — who need a credible, professional website and don't have in-house design/dev capacity, or who are losing time to manual lead follow-up and repetitive admin work. They arrive needing one of: a website (a multi-page business site, a focused landing page for a launch, or a redesign of an outdated/slow existing site — all sold under one "Websites" service), an online store, or business automation (lead capture, notifications, appointment workflows, form-to-spreadsheet, email automation). Custom interactive features (calculators, client portals, multi-step configurators) are sold as additions to one of those three rather than as a fourth service.

## Product Purpose

Wibsity is a web design/dev studio that builds fixed-scope websites for these clients on a fast, predictable timeline (3–5 days for standard sites, 5–7+ for advanced custom builds), with the scope, timeline, and price agreed in writing before work starts. Success is a live site the client can point to as evidence of competence and that reliably captures inquiries/leads for their business.

## Positioning

Every site is hand-coded with real React/TypeScript rather than assembled on template page-builders (Wix, Squarespace, WordPress themes). This is the mechanism behind the studio's concrete claims — a codebase that stays maintainable as the client's needs grow, and no proprietary-platform lock-in — neither of which a template-based competitor can truthfully claim.

The 2026 redesign made this the whole spine of the site, carried by a structural template-versus-built comparison further down the homepage rather than a manifesto. The homepage headline itself now names what the studio builds — "We build websites / automations / digital experiences / and more.", cycling continuously — rather than making the template-versus-built case directly; that argument moved entirely to the comparison section once the headline changed. (Note: as of the service-catalogue restructure, "automations" now names a real listed service; "digital experiences" still doesn't map to one of the three service lines listed under Capabilities and Constraints below — the closest existing hook is the custom-work add-on copy.) A live specimen readout that measured the page's own first paint, file count and element count in the visitor's browser used to sit in the hero as mechanical proof of the argument; it was removed outright (component, styling, and every reference) on direct instruction. No performance number is asserted anywhere on the site as a result — if a measured figure is ever reintroduced, it must be read live in the visitor's own browser the way the specimen readout was, never a hardcoded claim.

## Operating Context

Engagement runs as: initial discovery conversation → fixed-scope written proposal (timeline + price) → build sprint → handover. Communication is direct with the founder/engineer-designer building the site, not routed through an account manager. Deployment targets modern hosting (Vercel/Netlify) with CDN + automated SSL; a headless CMS is integrated when the client needs to self-edit content later.

The primary conversion is the project enquiry form, which is now a single screen on the page (not a modal wizard) asking project type → budget → name → phone, in that order — the two low-commitment questions first, contact details last. It closes the homepage and is the whole of /contact. WhatsApp is the secondary channel: available beside every call to action, but no longer a floating button competing with the primary journey.

## Capabilities and Constraints

- Three service lines: Websites (business sites, landing pages, and redesigns — sold as one service, with basic SEO, local SEO and performance optimization included as capabilities rather than upsells), Online store (catalogue, checkout, payments), and Automation (lead capture and management, automated notifications, appointment workflows, form-to-spreadsheet automation, email automation, and general business workflow automation — described in business-outcome terms for a small-business audience, never in technical terms like "webhooks" or "API integrations"). Custom interactive work — calculators, client portals, multi-step configurators — is built onto whichever of those three is the right base rather than sold separately.
- Fixed-scope pricing is a hard commitment — no hidden fees, scope agreed before start.
- Domain is always registered in the client's name and is theirs to keep/transfer (a real, positive ownership claim the site makes).
- The studio does **not** transfer code/IP ownership of its own reusable components/tooling to clients — this is a deliberate, existing content guardrail (see CLAUDE.md) and must not be contradicted by future copy.
- No numeric/unverified performance claims (e.g. "<500ms load") may be made without a real measurement behind them. There are currently no performance figures anywhere on the site — the homepage's live specimen readout, which used to produce the one measured figure directly in the visitor's own browser, was removed outright. (A bytes-transferred reading was tried for that readout and deliberately dropped before its removal, because Resource Timing reports zero for cache hits and would have flattered a repeat visit — relevant again only if a measured figure is ever reintroduced.)

## Brand Commitments

- Name: wibsity, always lowercase. The 2026 redesign replaced the identity outright: the palette is limestone paper, ink, and a single petrol accent (`#0e4b54`, `#7cc3cb` in dark mode) used in five places on the whole site and never as a button fill; the logo is drawn in code rather than shipped as raster art; the type pairing is Archivo for headlines and UI over Newsreader for body copy. See CLAUDE.md's Styling section for the token set and docs/DESIGN-DIRECTION.md for the reasoning.
- Voice is plain, declarative and specific, sized honestly to a one-person studio. The redesign removed the enterprise-agency register ("authoritative digital flagships", "The 3 Non-Negotiable Pillars") because inflated language on a small offer reads as cover rather than confidence. /about now opens by stating the size of the operation in its first sentence and treats it as the argument.

## Evidence on Hand

None yet. There are no real client sites, testimonials, or case studies to reference — future design and content work must not fabricate any client names, testimonials, metrics, or case studies. All trust-building claims must trace back to real, already-stated facts (turnaround time, fixed-scope process, founder-direct contact, WCAG AA accessibility work actually done).

## Product Principles

1. Fixed scope and price agreed in writing before work starts — no surprises, no hidden fees.
2. Fast, predictable turnaround (3–5 days standard, 5–7+ for custom) via focused sprints and direct founder communication.
3. Real hand-coded engineering (React/TypeScript, not template builders) as the substance behind every maintainability/no-lock-in claim — and the site itself is the work sample, so it may not carry a dependency it does not need.
4. Never fabricate trust signals — value claims must trace to real, current facts, not invented metrics or testimonials.
5. Never claim client transfer of Wibsity's own underlying code/IP; domain ownership is the one ownership claim the site makes.

## Accessibility & Inclusion

Every build targets WCAG AA contrast and full keyboard navigation from day one, treated as a real, checkable claim rather than a retrofit — this is already implemented practice on the current site (see CLAUDE.md's Accessibility conventions section) and should be preserved in future work.
