---
name: responsive-fluid
description: Responsive strategy for this codebase. Fluid tokens first, container queries second, viewport media queries last. Use whenever building layout, sizing type, or handling any breakpoint behavior.
---

# Responsive (Fluid First)

Most "responsive design" should be zero media queries. The token system does the scaling.

## Order of operations

1. Fluid token: does a clamp() token already handle this? Type and spacing always do
2. Intrinsic layout: can flex-wrap, minmax(), auto-fit, or aspect-ratio solve it with no query at all?
3. Container query: layout changes inside a component respond to the container, not the viewport. Containers are the section's inner .container element (container-type: inline-size)
4. Viewport media query: only for global chrome (nav, cookie bar) or full-page behavior

## Fluid token formula

Tokens interpolate between a 375px floor and a 1500px ceiling:

```css
/* slope = (max - min) / (93.75 - 23.4375); clamp(min, intersection + slope*100vw, max) */
--text-h1: clamp(2.25rem, 1.667rem + 2.489vw, 4rem);
```

Generate with the helper in templates/tokens.css. Never write a raw clamp() inline in a component; promote it to a token.

## Rules

- rem everywhere. px never. Text measure in ch. Query breakpoints in em
- Breakpoints when needed: 20em, 35em, 50em, 64em
- Grids: repeat(12, minmax(0, 1fr)). Always minmax(0, 1fr) to prevent overflow. Direct grid children get width: 100%
- Collapse grids by changing spans, keep DOM order. Avoid order; if visual order must change on mobile, restructure the DOM so mobile is the natural order
- min-width: 0 on flex children holding text to stop overflow
- svh for full-height heroes, never vh (mobile URL bar)
- Test floor is 320px wide. No horizontal scroll there, ever
- Hover affordances need a non-hover path: anything revealed on hover is visible or tappable on touch
- Touch targets 44px minimum, even when the visual is smaller (expand the hit area with padding or a pseudo target)
- Images: explicit width/height or aspect-ratio so layout never shifts. sizes attribute matches the actual rendered width per breakpoint, not 100vw by default

## Figma to responsive mapping

Figma gives fixed frames (usually 1500 and 375). The job is interpolation, not duplication:

1. Read both frames for the same component
2. For each value that differs, create or reuse a fluid token (min from the 375 frame, max from the 1500 frame)
3. For structural differences (3 columns to 1), decide container query vs intrinsic layout
4. If only one frame exists, derive the mobile behavior from the rules here and flag it for review rather than guessing silently

## Anti-patterns

- A wall of @media blocks re-declaring font sizes per breakpoint (the fluid scale's whole job)
- vw units directly on font-size with no clamp (accessibility: blocks user zoom scaling)
- Hiding content on mobile to dodge a layout problem
- display: none duplicated desktop/mobile DOM for the same content, except where structure is genuinely different (nav)
- Fixed heights on text containers
