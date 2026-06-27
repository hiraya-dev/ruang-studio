---
name: accessibility
description: The accessibility contract for this codebase. Semantic HTML, per-pattern keyboard and ARIA models, WCAG AA contrast, focus management, and the test process. Use whenever building any interactive component, form, or navigation, and before claiming a section done.
---

# Accessibility

Accessible by construction, not by audit. Semantic HTML does most of the work; ARIA only fills the gaps it leaves.

## The non-negotiables

1. Semantic HTML first. A real `<button>`, `<a>`, `<nav>`, `<dialog>` before any `<div role>`. ARIA is a patch for what HTML can't express, never a replacement for it
2. One `<h1>` per page. Heading levels never skip (h2 → h4 is a bug). Headings describe structure, not styling — size comes from tokens
3. Landmarks wrap everything: `<header>`, `<nav>`, `<main>` (one per page), `<footer>`. Multiple navs get `aria-label`
4. Interactive means `<button>` (in-page action) or `<a href>` (navigation). Never `<div onclick>`. If it's keyboard-focusable and clickable, it's already one of these two
5. Visible focus always. Never `outline: none` without a designed `:focus-visible` replacement. Focus order follows DOM order
6. Every input has a programmatic label (`<label for>` or wrapping). Placeholder is not a label
7. Contrast meets WCAG AA: 4.5:1 for body text, 3:1 for large text (≥24px or ≥18.66px bold) and meaningful UI/icon boundaries. Verify against the resolved semantic tokens in DESIGN.md, in every theme variant (`.theme-dark`, `.theme-light`)
8. Reduced motion is an accessibility requirement — see the animation skill. Nothing essential is conveyed by motion alone

## Per-pattern keyboard + ARIA models

Build these to the model. If a pattern isn't here, follow the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/).

| Pattern | Keys | ARIA wiring |
|---|---|---|
| Disclosure (show/hide) | Enter / Space toggles | trigger `<button aria-expanded>` + `aria-controls` the region |
| Accordion | Enter/Space toggle; ↑/↓ move between headers (optional) | each header is a `<button aria-expanded aria-controls>` inside the heading; panel `role="region" aria-labelledby` |
| Tabs | ←/→ between tabs, Home/End to ends; tab activates panel | `role="tablist"` → `role="tab" aria-selected aria-controls` (roving tabindex); `role="tabpanel" aria-labelledby` |
| Modal / dialog | Esc closes; Tab cycles **within**; focus moves in on open, **returns to trigger** on close | prefer native `<dialog>`; else `role="dialog" aria-modal="true" aria-labelledby`; trap focus, mark background `inert` |
| Menu / dropdown | ↑/↓ between items, Esc closes and returns focus, Enter activates | trigger `aria-expanded aria-haspopup`; `role="menu"` → `role="menuitem"` (roving tabindex). A nav of links is **not** a menu — just a `<ul>` of `<a>` |
| Carousel | prev/next are real buttons; pause control if autoplaying | label each control; `aria-live="polite"` on the slide region; autoplay must be pausable and respects reduced-motion |

Roving tabindex: one item `tabindex="0"`, the rest `-1`; arrow keys move the 0. Don't put every item in the Tab sequence.

## Forms

- Label every field. Group related fields in `<fieldset>` with `<legend>`
- Errors: tie the message to the field with `aria-describedby`, set `aria-invalid` on the field, and move focus to the first error on submit. Don't rely on color alone to signal an error
- Required: native `required`; mark visually too, not only with an asterisk's color
- Submit is a real `<button type="submit">`; the form works without JS where the stack allows (progressive enhancement)

## Content & media

- Images: meaningful → descriptive `alt`; decorative → `alt=""` (see ASSETS.md). Never omit the attribute
- Link and button text makes sense out of context ("Read the 2024 report", not "click here")
- Don't disable zoom; layout must survive 200% zoom and 320px reflow with no loss of content or function (the responsive-fluid skill already enforces the 320px floor)
- Touch targets ≥ 44×44px

## Test process (before claiming a section done)

1. Keyboard-only sweep: unplug the mouse. Tab through — everything reachable, visible focus throughout, logical order, no traps, Esc closes overlays and returns focus
2. axe / Lighthouse accessibility pass: 0 violations (Lighthouse a11y is a quality gate in AGENTS.md)
3. Contrast: spot-check text and UI against the resolved tokens in each theme
4. Screen-reader smoke test: VoiceOver (⌘F5) through the section — landmarks announced, headings navigable, controls state their role/name/state
5. 200% zoom + 320px reflow: no horizontal scroll, nothing clipped or overlapping

## Anti-patterns

- `role` on something that already has that semantic (`<button role="button">`)
- `aria-label` on a `<div>` to fake a button — use a button
- `tabindex` greater than 0 (breaks natural order)
- Removing focus outlines globally
- Color as the only signal for state (error, active, required)
- Hiding content from everyone with `display:none` when you meant to hide it visually only (`.sr-only`)
