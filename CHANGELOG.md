# CHANGELOG.md

Durable record of design-system and structural changes — the history of how the system itself moved, so a design↔code sync is never a mystery. This is **not** the build journal: day-to-day build state and sequencing decisions live in PLAN.md. Log here only when something the whole project depends on changes.

## What goes here

- Token changes: added/renamed/removed/retuned values in `src/styles/tokens.css` (and the Figma variable they sync from)
- Sanity schema changes: new/changed/removed document types or fields, and any content migration needed
- Breaking visual changes: a system-level shift (type scale, grid, color semantics) that affects many components
- Dependency changes that affect the build or output (framework, motion lib, image pipeline)

Skip: routine component work, copy edits, single-section tweaks — those are PLAN.md / git.

## Format

Newest on top. One entry per change.

```
## [YYYY-MM-DD] Short title
- Change: what changed
- Reason: why (Figma sync, a11y fix, perf, client request)
- Impact: what it touches / migration needed / breaking?
```

## Log

## [YYYY-MM-DD] Scaffold initialized
- Change: project created from the ADC web scaffold
- Reason: new build
- Impact: baseline — tokens, skills, and contracts in place, awaiting Figma values
