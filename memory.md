# memory.md

Project-specific rules the agent applies **every session**. Read this at session start alongside AGENTS.md and DESIGN.md.

The three-way split, so nothing here duplicates:
- **AGENTS.md** — conventions identical across *all* ADC projects (the template). Don't copy them here.
- **PLAN.md** — disposable build *state* and the dated decisions journal.
- **memory.md** (this file) — *this* project's durable rules, constraints, and learned gotchas. Rules, not history.

When you learn something that will bite a future session — a constraint, a browser quirk, a client "never do X", a non-obvious project fact — append it to the right section below in one line. Keep it terse. If a rule later becomes false, remove it. If a rule is really a system change (a token, a schema), it belongs in CHANGELOG.md instead.

## Constraints

Hard rules for this project. Things that must always or never happen.

- [e.g. Brand red `--swatch-accent-500` fails AA on text — accent for fills/borders only, never body copy]
- [e.g. No third-party embeds before consent]

## Gotchas

Non-obvious traps discovered during the build.

- Container cap (1920px) uses `max-width + margin-inline: auto + padding-inline: var(--site-margin)`. NEVER `width: calc(100% - margin*2)` — the calc model collapses the 20px margin above the cap and drifts columns 20px outward, breaking alignment with sections. Sections, `.container`, and GridOverlay must all share the padding-inline model.
- One-pager with Lenis: smooth scroll lives in `src/lib/motion/lenis.ts`, initialised once in Base.astro (runs on load + astro:page-load). Any in-page `<a href="#...">` is auto-bound to Lenis scrollTo with nav-height offset — just give the section an `id`. Section ids in use: #projects, #about, #contact. Reduced-motion falls back to native scroll. Lenis is wired to GSAP ScrollTrigger (ticker-driven, lenis.on('scroll', ScrollTrigger.update)).
- Parallax: Osmo attribute-driven setup in `src/lib/motion/parallax.ts`, called from Base's initMotion. Add `data-parallax="trigger"` to any element + optional `data-parallax-start/end/scrub/direction/scroll-start/scroll-end/disable`. For image-in-frame: mask div = trigger (overflow clip), taller inner wrapper (inset -10% = 120%) = `data-parallax="target"`. Skipped under reduced-motion.

## Project specifics

Facts about this project that aren't derivable from the code.

- Stack: [astro-marketing | nextjs-app]
- Sanity dataset: [production], project ID: [id]
- Deploy: [host / branch that ships]
- [Any client/process fact worth remembering]
