# PLAN.md

Living state of the build. AI agents: read this at session start, work top to bottom through Build order, and update this file before claiming any task done. This file is disposable per project; AGENTS.md and DESIGN.md are the contracts, this is the scratchpad with authority.

## Status

- Phase: building
- Last session: 2026-06-26 — Footer (global in Base, oversized wordmark reuses logo.svg). ALL sections built. Next: SEO pass + motion polish + QA
- Next up: SEO pass (meta, OG, sitemap, robots)

## Build order

Sequenced. Check off only when the section passes the quality gates in AGENTS.md.

- [x] Project setup (tokens.css filled, fonts loaded, Base layout)
- [x] Nav
- [x] Footer
- [x] Hero
- [x] Projects (Selected works — accordion table)
- [x] About
- [x] ImageDivider (parallax)
- [x] Values (what we believe)
- [x] Contact (+ Button ui atom)
- [ ] [page: contact]
- [ ] Sanity schemas + Studio (if applicable)
- [ ] SEO pass (meta, OG, sitemap, robots)
- [ ] Motion polish pass (whole-site rhythm review)
- [ ] Final QA — work the full prelaunch checklist in QA.md

## Decisions log

One line per decision, with the reason. Newest on top. Do not relitigate anything here without the human asking. Design-system changes (tokens, schemas, breaking visual shifts) go in CHANGELOG.md, not here.

- 2026-06-26 No mobile frame — fluid clamp ranges estimated from Figma desktop (1500px) with sensible mobile floors; to be refined if a mobile frame is provided.
- 2026-06-26 Spacing one-offs used (--space-hero-pt, --space-project-gap) instead of extending the scale: project-specific outliers don't belong in a reusable scale.
- 2026-06-26 No border-radius tokens: the design is entirely sharp corners throughout.
- 2026-06-26 Projects accordion uses the Osmo CSS grid-rows (0fr→1fr) mechanism, data-accordion-* attributes preserved; added button semantics + aria-expanded + reduced-motion (project a11y contract overrides Osmo's "don't improve" note).
- 2026-06-26 Project images 002–005 reuse 001's three photos as placeholders — only 001's set is in Figma.
- 2026-06-26 One-pager: page-level Lenis smooth scroll in src/lib/motion/lenis.ts, wired in Base. Anchor links (#projects/#about/#contact) scroll via lenis.scrollTo offset by nav height; disabled under reduced-motion (falls back to native scroll).

## Open questions

Blocked items. Move to Decisions log once answered.

- [ ] Contact form has no backend — needs a submit endpoint (Formspree / Netlify Forms / custom). Markup is `method=post` with no action. (waiting on: Neil)
- [ ] 20px gap recurs (Values title→body, possibly elsewhere) — add `--space-5: 1.25rem` to the scale? (waiting on: Neil)
- [ ] Footer placeholder routes/URL: /privacy, /terms pages don't exist; instagram URL is a guess. (waiting on: Neil)

## Deferred / out of scope

Things explicitly cut or pushed to a later phase, so they don't creep back in silently.

- [item]: [why deferred]
