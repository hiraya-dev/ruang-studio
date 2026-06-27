# COMPONENTS.md

The component catalogue for this project. The source of truth for what components exist, their states, and their build status. AI agents: spec a component here **before** building it, following `.claude/skills/component-spec/SKILL.md`. DESIGN.md owns the token system; this file owns the components.

A component is done when it matches Figma at both frames, passes the AGENTS.md quality gates, and its status here is checked.

## How to use this file

1. Before building, paste the per-component block (below) filled from the Figma frame
2. Build to the spec
3. Check the status box and the matching line in PLAN.md's build order

Status: `[ ]` not started · `[~]` in progress · `[x]` done.

## Catalogue

### Nav
- **Status:** [x]
- **File:** src/components/layout/Nav.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8062-14
- **Anatomy:** logo (SVG wordmark), nav links (Projects, About, Contact)
- **Variants:** single variant — fixed, always sand-100 bg
- **States:** default, link hover (opacity 0.6)
- **Responsive:** desktop only (mobile nav deferred — no design)
- **Tokens:** --font-body, --text-small, --space-6, --site-margin, --color-bg, --color-fg, --tracking-tight, --leading-display
- **A11y:** `<header role="banner">` + `<nav aria-label="Main navigation">`; logo link has aria-label; links are `<a>`
- **Motion:** link hover: opacity transition, duration-fast, ease-out-quart; reduced-motion respected
- **Content:** src/data/site.ts

### Hero
- **Status:** [x]
- **File:** src/components/section/Hero.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-16
- **Anatomy:** headline (h1), tagline label, full-width interior photo
- **Variants:** single
- **States:** default only
- **Responsive:** desktop absolute layout; mobile collapses to flow (deferred — no mobile frame)
- **Tokens:** --font-display, --text-h1, --leading-display, --tracking-tight, --font-body, --text-small, --leading-ui, --space-hero-pt, --site-margin, --color-bg, --color-fg, --tracking-wide (tagline)
- **A11y:** `<section>` with `<h1>` headline; photo has descriptive alt; tagline is visible text (not hidden)
- **Motion:** deferred to motion pass
- **Content:** src/data/home.ts; image src/assets/hero.jpg

### Footer
- **Status:** [x]
- **File:** src/components/layout/Footer.astro (global — rendered in Base after `<main>`)
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-155
- **Anatomy:** row1 statement (h cols 1–5) + description (cols 7–10); row2 sitemap label + nav; row3 work-with-us label + email; legal row (copyright / privacy+terms / instagram); oversized "Ruang" wordmark stretched to container width
- **Variants:** —
- **States:** link hover (opacity 0.6) + focus-visible; transitions reduced-motion gated
- **Responsive:** `.section_grid` placement; wordmark `width: 100%` so it scales with the container and locks at --container-max (1920). Mobile stack deferred
- **Tokens:** --text-h1, --text-large, --text-small, --text-xs, --space-2/6/8/20, --color-fg/border, --border-width
- **A11y:** `<footer>` landmark; sitemap `<nav aria-label="Footer">`; wordmark `aria-hidden`; external social link `rel="noopener noreferrer"`
- **Motion:** link opacity on hover only
- **Content:** src/data/site.ts → footer (global); reuses src/assets/logo.svg (`?raw`, inlined for currentColor)

### Projects (Selected works)
- **Status:** [x]
- **File:** src/components/section/Projects.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-30
- **Anatomy:** eyebrow, column header (Number/Project/Typology/Date), accordion list of 5 project rows; each row expands to a 3-image gallery
- **Variants:** single
- **States:** row `data-accordion-status` active / not-active; first row (001) open by default; close-siblings on
- **Responsive:** 12-col grid (cols: num 1, name 2–5, type 6–9, date 10–11, icon 12; images 2–4/6–8/10–12). Mobile reflow deferred — no frame
- **Tokens:** --text-xs, --tracking-wide, --leading-ui, --space-2/4/8, --grid-gutter, --border-width, --color-fg, --color-border
- **A11y:** each toggle is a `<button aria-expanded aria-controls>`; panel is `role="region"` with `aria-label`; icon `aria-hidden`; visually-hidden "view project" label
- **Motion:** Osmo CSS accordion — `grid-template-rows: 0fr→1fr` + icon rotate, 0.6s `cubic-bezier(0.625,0.05,0,1)`; reduced-motion disables transition
- **Content:** src/data/home.ts → projects; images src/assets/project-0{1,2,3}.jpg

### About
- **Status:** [x]
- **File:** src/components/section/About.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-97
- **Anatomy:** left portrait image (cols 1–6); right text column (cols 7–12) with top group (eyebrow + h2) and bottom group (body + featured note), pushed apart with space-between
- **Variants:** single
- **States:** static
- **Responsive:** 6/6 split on `.section_grid`; image `aspect-ratio: 720/932`. Mobile stack deferred — no frame
- **Tokens:** --text-h1, --text-large, --text-xs, --tracking-tight/wide, --leading-display/body/ui, --space-8, --color-fg
- **A11y:** `<section aria-labelledby>`, single `<h2>`, `<figure>` for the image with descriptive alt
- **Motion:** none of its own; page-level Lenis smooth scroll handles anchor nav to #about
- **Content:** src/data/home.ts → about; image src/assets/about-studio.jpg

### ImageDivider
- **Status:** [x]
- **File:** src/components/section/ImageDivider.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-109
- **Anatomy:** full-bleed interior photo (100vw × 100dvh, edge to edge) + 10% ink overlay
- **Variants:** single
- **States:** static image; scroll-driven parallax drift
- **Responsive:** `width: 100vw; height: 100dvh` full-bleed at every width. Parallax always on (no data-parallax-disable)
- **Tokens:** --color-overlay, --color-bg
- **A11y:** decorative — `aria-hidden`, empty alt; parallax skipped under prefers-reduced-motion
- **Motion:** Osmo Global Parallax — masked `trigger` + taller `target` wrapper (inset -10%), `data-parallax-start="6"` `end="-6"` scrub. Driven by src/lib/motion/parallax.ts, synced to Lenis/ScrollTrigger
- **Content:** image src/assets/divider-interior.jpg (decorative, no data)

### Values (What we believe)
- **Status:** [x]
- **File:** src/components/section/Values.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-110
- **Anatomy:** eyebrow; left text list (cols 1–5) of 3 values — each a hanging number + PP Eiko title + body; right portrait image (cols 7–12). Mirror of About
- **Variants:** single
- **States:** static
- **Responsive:** `.section_grid`, text cols 1–5 / image cols 7–12, `align-items: center`; image `aspect-ratio: 720/932`. Mobile stack deferred
- **Tokens:** --text-h2, --text-large, --text-xs, --tracking-tight/wide, --leading-*, --space-20, --space-6, --color-fg. (20px title→body gap is a literal — no scale token at 20px)
- **A11y:** `<section aria-labelledby>`, value titles are `<h3>`, list is `<ul role=list>`, `<figure>` image with alt
- **Motion:** none of its own
- **Content:** src/data/home.ts → values; image src/assets/values-interior.jpg

### Button (ui)
- **Status:** [x]
- **File:** src/components/ui/Button.astro
- **Figma:** contact submit (node 8053-153)
- **Anatomy:** outline box, uppercase label. Renders `<button>` (default) or `<a>` when `href` passed
- **States:** default (outline), hover (fill invert: ink bg / sand text), active (80% ink), focus-visible (2px outline + offset)
- **Tokens:** --border-width, --color-border/fg/bg, --text-main, --tracking-tight, --leading-ui, --duration-fast, --ease-out-quart
- **A11y:** native button/anchor; focus-visible ring; transitions gated on reduced-motion
- **Reuse:** the one button atom — use everywhere a button/CTA appears

### Contact
- **Status:** [x]
- **File:** src/components/section/Contact.astro
- **Figma:** https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/?node-id=8053-130
- **Anatomy:** eyebrow; 80px display heading (full width); two intro columns (cols 1–3, 4–6); form (cols 7–12) = name, email, message textarea, two selects (chevron), submit Button; signoff line with mailto
- **Variants:** single
- **States (fields):** hover (ink 5% wash), focus (inset 2px underline + wash, outline none), active (ink 9% wash); select placeholder muted via `:has(option[value=""]:checked)`
- **Responsive:** section border-block; `.section_grid` placement. Mobile stack deferred
- **Tokens:** --text-display, --text-large, --text-small/xs, --space-2/8/20, --color-fg/-muted/border, --border-width, --duration-fast, --ease-out-quart
- **A11y:** every control has a `<label class="u-visually-hidden">`; selects have a disabled placeholder option; chevron `aria-hidden`; field transitions gated on reduced-motion
- **Content:** src/data/home.ts → contact; email from site.ts. Form has no backend yet (method=post, no action)

<!-- Add new components below, newest at the bottom, using the block from the component-spec skill. -->
