# DESIGN.md

The design system contract for this project. AI agents: read this before writing any UI. If a value is not in here, it does not go in the code until it is added here first.

## Direction

- Aesthetic: Editorial, monochrome, typographic restraint — warm sage ground with a single near-black ink, no accent color, no radius anywhere.
- The one memorable thing: The typography does all the work. PP Eiko sets a quiet authority; PP Mori handles everything functional. The page feels calm and expensive without any decoration.

## Typography

| Role | Family | Weight | Token |
|---|---|---|---|
| Display | PP Eiko | 500 (Medium) | --font-display |
| Body / UI | PP Mori | 400 (Regular), 600 (SemiBold) | --font-body |

Font loading: self-hosted WOFF2 at `/public/fonts/`. `font-display: swap`. @font-face declarations live in `global.css`, imported before tailwind.

### Type scale (fluid)

All fluid sizes clamp between a 375px floor and a **1920px ceiling** — matching `--container-max`. The Figma 1500px frame shows the mid-scale state, not the maximum. Fixed sizes stay fixed — they're already small. Defined in tokens.css, never inline.

| Token | Mobile min | Desktop max | Font | Usage |
|---|---|---|---|---|
| --text-display | 2.25rem (36px) | 5rem (80px) | PP Eiko Med | Contact section heading (one-off use) |
| --text-h1 | 2rem (32px) | 4rem (64px) | PP Eiko Med | Hero, About, Footer headings |
| --text-h2 | 1.375rem (22px) | 2.5rem (40px) | PP Eiko Med | Values section headings |
| --text-large | 1rem (16px) | 1.125rem (18px) | PP Mori Reg | Body copy, form inputs |
| --text-main | 1rem (16px) | fixed | PP Mori SemiBold | Button text |
| --text-small | 0.875rem (14px) | fixed | PP Mori SemiBold | Nav links, footer labels |
| --text-xs | 0.75rem (12px) | fixed | PP Mori SemiBold | Eyebrow / section labels |

**Tracking:** `--tracking-tight: -0.02em` on all headings and body. `--tracking-wide: 0.02em` on 12px eyebrow labels only (--text-xs).

**Line heights:** `--leading-display: 1.2` for PP Eiko, `--leading-ui: 1.3` for SemiBold labels, `--leading-body: 1.6` for body copy.

Body text max width: use the half-column (720px) as a natural container — no ch hacks needed.

## Color

Semantic tokens only in components. Swatches live one level below and are referenced only by semantic tokens.

```
Swatches:        --swatch-ink-900, --swatch-ink-700, --swatch-paper-100, --swatch-accent-500 ...
Semantic:        --color-bg, --color-bg-2, --color-text, --color-text-muted, --color-border, --color-accent
Theme variants:  .theme-dark and .theme-light remap the semantic tokens on a section
```

**Two values only.** No accent. No dark mode.

| Swatch token | Hex | Role |
|---|---|---|
| --swatch-sand-100 | `#d7d7c8` | Warm sage — every background surface |
| --swatch-ink-900 | `#110f0f` | Near-black — all text, borders, icons |

Semantic tokens (components only ever touch these):

| Token | Value | Usage |
|---|---|---|
| --color-bg | sand-100 | Page and section backgrounds |
| --color-fg | ink-900 | Primary text, icons, borders |
| --color-fg-muted | ink-900 @ 50% | Form placeholders, secondary labels |
| --color-overlay | ink-900 @ 10% | Image tint overlays |
| --color-border | ink-900 | All 1px divider lines |

## Spacing

Fixed scale — all values from the Figma 1500px frame, held constant (no mobile frame to interpolate against).

| Token | Value | Usage |
|---|---|---|
| --space-1 | 0.25rem (4px) | — |
| --space-2 | 0.5rem (8px) | Inline icon gaps, tight padding |
| --space-4 | 1rem (16px) | Project list row gap, form field padding |
| --space-6 | 1.5rem (24px) | Footer sub-sections, value number offset |
| --space-8 | 2rem (32px) | Section padding-y, primary internal gaps |
| --space-20 | 5rem (80px) | Between Values items, footer bottom padding |

Named one-offs (project-specific, not part of the scale):

| Token | Value | Usage |
|---|---|---|
| --space-hero-pt | 7rem (112px) | Hero section top padding |
| --space-project-gap | 9rem (144px) | Horizontal gap between project card images |

Site frame: `--site-margin: 1.25rem` (20px, fixed), `--container-max: 120rem` (1920px). No `--container-narrow` — the design uses explicit half-column (720px ≈ 48% of content width).

## Layout and responsive strategy

Editorial grid, fluid first. Full rules in .claude/skills/editorial-grid/SKILL.md.

1. Grid: 12 columns at the 1500px design frame, 4 columns at the 375px mobile frame. Gutter and margin fixed at 20px (1.25rem), part of the editorial language
2. Cap: container locks at --container-max (93.75rem = 1500px), centered, margins grow beyond. The composition above the cap is exactly the Figma frame
3. Fluid tokens interpolate 375 to 1500. Type and spacing scale with zero media queries
4. Column placements come from the Figma frames: desktop spans from 1500, mobile spans from 375. Tablet derives from the 12-col grid and gets flagged for review
5. Layout switches use container queries on the section container; viewport media queries only for global chrome (nav)
6. Hard floor: nothing breaks at 320px. Touch targets 44px minimum. Hover-only affordances need a mobile equivalent
7. Overlap via shared grid tracks + z-index, full bleed via the breakout wrapper grid, never position: absolute for composition

## Motion

Full rules live in .claude/skills/animation/SKILL.md. Summary of this project's choices:

- Character: Calm and deliberate. Reveals over bounces. Nothing calls attention to itself.
- Default ease: `--ease-out-expo` for enters, ease-in variants for exits
- Page load: one orchestrated reveal on the hero (headline + image), staggered 0.06s to 0.1s
- Scroll: ScrollTrigger reveals start at 85% viewport entry, y offset 1.5rem to 2rem + opacity 0→1
- Never animate width, height, top, left. Transform and opacity only; clip-path for wipe reveals
- prefers-reduced-motion: everything settles to its final state instantly

## Imagery

- Aspect ratios: Hero full-bleed (1460×820, ~16:9), Project cards (350×233, ~3:2), About/Values half-column (720×932, ~3:4 portrait), Contact full-bleed (1000px tall viewport)
- Treatment: No duotone, no grain. Photos are full-color, slightly warm. No filter effects.
- Loading: lazy below the fold; no skeleton (bg is already --color-bg, no jarring flash)

## Components

The component catalogue — anatomy, variants, states, and build status — lives in COMPONENTS.md. Spec each component there before building it, per .claude/skills/component-spec/SKILL.md. DESIGN.md owns the token system; COMPONENTS.md owns the components.
