---
name: component-spec
description: The process for speccing a component from a Figma frame before building it, so structure, states, and responsive behavior are decided up front rather than ad-libbed. Use before building any new component, and record the result in COMPONENTS.md.
---

# Component Spec

Spec before you build. A component is decided in Figma, recorded in COMPONENTS.md, then coded — never invented at the keyboard. The spec is short; its job is to remove guessing, not to be a document.

## When to spec

- Any new component in `src/components/[section|ui|layout]/`
- Any existing component gaining a variant or state
- Skip for one-off static markup that isn't reused and has no states (note it in the section build instead)

## The process

0. Check first: does this already exist? Scan COMPONENTS.md and `src/components/ui/` for an atom that covers it (button, card, tag, input, eyebrow…). If it does, reuse it or add a variant — do not spec a new component. Only continue if it's genuinely new.
1. Read the Figma frame via MCP (`get_design_context`, `get_screenshot`) at the 1500 and 375 frames
2. Capture the spec fields below. Anything in Figma with no matching token is flagged to the human before building (per AGENTS.md), not hardcoded
3. Paste the filled block into COMPONENTS.md and set status `[ ]`
4. Build to the spec. Check the component off in COMPONENTS.md and the PLAN.md build order only when it passes the AGENTS.md quality gates

## Spec fields

- **Anatomy** — the named parts, top to bottom (e.g. eyebrow, title, subcopy, primary CTA, media). These map to `[component]_[element]` classes
- **Variants** — meaningful configurations that change structure or content (e.g. Hero: with-media / text-only). Not every prop — only what the design actually shows. No speculative variants
- **States** — which of default / hover / focus-visible / active / disabled / loading / empty / error apply, and what each looks like. Pull hover and focus from the Figma frame or the motion/animation skill; never invent a hover
- **Responsive** — how the 1500 layout becomes the 375 layout (reflow, stack order, what hides or moves). Spans come from the Figma frames per the editorial-grid skill; tablet is derived and flagged
- **Tokens** — the type, color, spacing, radius, and motion tokens it consumes. If a needed token doesn't exist, that's a conversation with the token scale first
- **Accessibility** — semantic element, and the pattern from the accessibility skill if interactive (tabs/accordion/modal/menu). Keyboard + ARIA model named, not redescribed
- **Motion** — entrance/scroll/hover intent, per the frame note and the animation skill
- **Figma frame** — permalink to the frame
- **File** — `src/components/.../Name.[astro|tsx]`
- **Content source** — hardcoded / local JSON / Sanity type X

## Per-component block (paste into COMPONENTS.md)

```md
### ComponentName
- **Status:** [ ]
- **File:** src/components/section/ComponentName.astro
- **Figma:** [frame link]
- **Anatomy:** part, part, part
- **Variants:** —
- **States:** default, hover, focus-visible
- **Responsive:** [1500 → 375 behavior]
- **Tokens:** --text-h2, --space-6, --color-bg-2, --ease-out-quart
- **A11y:** semantic element; [pattern from accessibility skill, if interactive]
- **Motion:** [intent, or "per frame note"]
- **Content:** hardcoded | Sanity: typeName
```

## Anti-patterns

- Re-creating an atom that already exists (a second `Button`/`Card`, or `hero_button` next to `cta_button`) instead of reusing it or adding a variant
- Inventing states the design doesn't show (a hover the frame doesn't define)
- Props "for flexibility" that no current usage needs — single-use means no abstraction (AGENTS.md Working principles)
- Speccing pixel values instead of tokens
- Speccing in your head and skipping COMPONENTS.md — the catalogue is how the next session knows the component exists
