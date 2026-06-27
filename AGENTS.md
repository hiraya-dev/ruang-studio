# AGENTS.md

Instructions for AI agents working in this repository. Read this file fully before writing any code. Read DESIGN.md before writing any UI.

## Project

- Project: ruang-studio
- Client: personal
- Stack: astro-marketing
- Live URL: TBD
- Figma file: https://www.figma.com/design/zlrE0LcJvkscxWBaRUZJZk/Ruang-Studio-%E2%80%94-Discovery-Session-Singapore?node-id=8053-15&t=ieCyVLQVc1iVoPKs-1
- CMS: Sanity [no]

## Source of truth

1. Figma is the source of truth for visual design. Never invent layout, spacing, type sizes, or colors. Pull exact values via the Figma MCP, then map them to tokens.
2. DESIGN.md is the source of truth for the token system, type scale, motion rules, and responsive strategy. If a Figma value has no token, add the token first, then use it.
3. This file is the source of truth for code conventions. When in doubt, ask before deviating.
4. PLAN.md is the source of truth for project state: build order, decisions already made, open questions. Read it at the start of every session. Do not relitigate logged decisions.
5. memory.md is the source of truth for this project's durable rules and gotchas. Read it at the start of every session and obey it. Append a one-line rule when you learn something a future session would otherwise repeat.

Read on demand, not preemptively: pull DESIGN.md before UI, and COMPONENTS/QA/ASSETS/CHANGELOG only when the task calls for them. Skills load themselves when relevant.

## Working principles

Bias to caution over speed; use judgment on trivial tasks.

- **Think before coding.** State assumptions; ask when a Figma value or interaction is ambiguous rather than inventing it. Surface a simpler approach if one exists.
- **Simplicity first.** Minimum markup that matches the design. No speculative variants, props, or abstractions for single-use sections.
- **Surgical changes.** Touch only what the task needs; match existing patterns. Don't refactor adjacent sections. Remove only orphans your change created; flag pre-existing dead code, don't delete it.
- **Goal-driven.** Success = matches Figma at both frames + passes the quality gates. Verify before claiming done (review loop in figma-handoff.md; QA.md at launch).

## Stacks

This project uses one stack (set in Project above). Full conventions live in its skill, loaded when you build.

- **astro-marketing** — static-first marketing sites. Astro 4+, Tailwind v4, optional Sanity, GSAP + Lenis, zero JS by default. → `.claude/skills/astro-marketing`
- **nextjs-app** — sites needing app behavior (auth, dashboards). Next.js App Router, Tailwind v4, Sanity for content, Motion for UI, Server Components by default. → `.claude/skills/nextjs-app`

## Project structure

Scaffold docs (this file, DESIGN.md, etc.) live at the repo root alongside `package.json`; the app lives in `src/`. Root stays flat, no `docs/` folder. The `src/` tree is owned by the stack skill — create it from there. Full layout in README → Structure.

### Page content

Copy is data, not markup. One typed module per page (`src/data/<page>.ts`); the route file imports it and only composes layout. Global copy in `src/data/site.ts`. Repeated/structured content → Sanity (client-edited) or `src/content/` collections; one-off page copy never goes in Sanity.

### Scaffolding a new project

See README → First run. In short: install, create the `src/` tree from the stack skill, copy `templates/tokens.css` → `src/styles/`, fill the brackets, then build section by section per the Workflow.

## Conventions (both stacks)

### Files

- Components: src/components/[section|ui|layout]/ComponentName.[astro|tsx]
- One component per file. Co-locate component CSS only if it cannot be expressed with tokens + utilities
- Sanity schemas: sanity/schemas/, one document type per file, registered in index

### Styling

- Tokens first. All color, spacing, radius, and type come from CSS variables defined in src/styles/tokens.css. Never hardcode a hex, px font size, or magic spacing number
- rem, not px. Fluid values use the clamp tokens in DESIGN.md
- No @media for layout shifts when a fluid token or container query does the job better
- overflow: clip, not overflow: hidden
- background-color, not background shorthand for plain fills

### Naming

- Component classes: [component]\_[element], underscores, max 3 levels: hero_title, card_work_meta
- State: .is-active only. No .is-open, .is-visible variants
- Utilities prefixed u- if we add any

### Reuse before authoring (DRY)

An element used in more than one place is one component, not one class per place. Look for what exists before styling.

- Recurring UI (button, link, tag, card, input, icon, eyebrow, container) is one component in `src/components/ui/`, used everywhere. Never `hero_button` + `cta_button` — there is one `Button`.
- Variations are props/variants or modifier classes (`<Button variant="ghost">`, `.button.is-ghost`), never a new base class per section.
- `[component]_[element]` classes are for section-unique layout only. Writing the same rule block twice = promote it to a ui component or `u-` utility.

### Motion

- Follow .claude/skills/animation/SKILL.md. Do not freestyle easing or durations
- Every scroll-driven or autoplaying animation respects prefers-reduced-motion
- GSAP: register plugins once in a single motion entry file, use gsap.context() scoped to the component, kill on teardown

### Accessibility

- Follow .claude/skills/accessibility/SKILL.md: semantic HTML first, one h1, designed focus, per-pattern keyboard + ARIA models, WCAG AA contrast. Build interactive components to the model there, don't freestyle.

## Workflow

1. Read PLAN.md and memory.md. Confirm what's next; surface any open questions that block it
2. Read the Figma frame via MCP (get_design_context, get_screenshot). Download any images into src/assets/ — never a Figma or temporary URL
3. Map design values to existing tokens. Flag any value that has no token
4. Spec the component in COMPONENTS.md first, per .claude/skills/component-spec/SKILL.md. Reuse an existing ui component before creating one (DRY)
5. Build static structure first (HTML/JSX), mobile to desktop. Pull copy from src/data/<page>.ts, not hardcoded in markup
6. Apply styles using tokens
7. Add motion last, per the animation skill
8. Run the quality gates below, then update PLAN.md (and COMPONENTS.md status)

## Quality gates before claiming done

Run these after the Workflow, before checking off a section. These are per-section gates; the whole-site prelaunch sign-off lives in QA.md.

- [ ] Matches Figma at desktop and mobile frames (compare via Figma MCP screenshot)
- [ ] No horizontal scroll at 320px
- [ ] Lighthouse: 95+ performance on marketing pages
- [ ] No console errors
- [ ] All images have alt text
- [ ] No Figma or temporary (localhost:3845) asset URLs — every image downloaded into the repo and rendered via astro:assets / next/image
- [ ] DRY: no new class or component for an element a shared one already covers; recurring UI reuses the ui atom
- [ ] Accessibility: keyboard sweep + axe clean (per the accessibility skill)
- [ ] Reduced motion verified
- [ ] PLAN.md updated: task checked off, decisions logged, next-up set. A task is not done until this is done

## What you must ask about, never assume

- Adding a dependency
- Creating a new token or changing an existing one
- Restructuring Sanity schemas that already have content
- Anything that changes the deploy or build config
- Pushing to a remote — commit locally, never push unless told (full rules in the git-workflow skill)

## Commands

- Dev: [npm run dev]
- Build: [npm run build]
- Sanity studio: [npm run sanity]
- Type check: [npm run check]
