---
name: editorial-grid
description: The editorial layout grid for this codebase. 12 columns at the 1920px container cap, 4 columns at the 375px mobile frame, 20px gutter and margin, capped container. Use whenever building any section layout, placing elements on the grid, or translating Figma column positions to code.
---

# Editorial Grid

12-col / 20px gutter / 20px margin, container caps at 1920px. 4-col on mobile, designed at 375. The Figma frames are at 1500px (mid-scale), not the container max. The grid is the design: asymmetry, overlap, and hanging elements are placed deliberately on it, never absolutely positioned.

## The container (Lumos-style cap)

```css
.container {
  max-width: var(--container-max);     /* 120rem = 1920px, margins INCLUDED */
  margin-inline: auto;
  padding-inline: var(--site-margin);  /* 20px margin lives inside the cap */
  container-type: inline-size;
}
```

The 20px margin is `padding-inline` (inside the 1920 cap), NOT `width: calc(100% - 40px)`. The calc model collapses the margin above the cap and shifts the columns 20px outward, so they no longer align with sections that inset content with `left/padding-inline: var(--site-margin)`. Use padding-inline everywhere — sections, container, and the overlay must share one model.

Below 1920: grid scales fluidly with the viewport. Above 1920: composition locks, centered, outer margins grow symmetrically while the 20px gutter-margin stays put. Never let the grid expand past the cap.

## The grid

```css
.section_grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--grid-gutter);
}

@container (width < 50em) {
  .section_grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

- Always minmax(0, 1fr), never bare 1fr (text overflow blows the track otherwise)
- Direct grid children get width: 100% and, when holding text, min-width: 0
- Row gaps come from spacing tokens per section, not a global default
- Tablet (the 35em to 50em zone) keeps the 12-col grid with adjusted spans; there is no tablet Figma frame, so derive spans and flag them for review

## Figma to code span mapping

Desktop spans come from the 1500 frame, mobile spans from the 375 frame. Read element x-positions via the Figma MCP and convert:

- Column width at 1920: (1920 - 2×20 margin - 11×20 gutters) / 12 = 138.33px
- Column width at 1500 (Figma frame): (1500 - 2×20 margin - 11×20 gutters) / 12 = 105px
- An element starting at the left margin spanning 6 columns: grid-column: 1 / span 6
- Read the design's column placement, never approximate from pixel widths alone

Both placements live on the same element:

```css
.work_title {
  grid-column: 1 / span 6;       /* from the 1500 frame */
}
@container (width < 50em) {
  .work_title { grid-column: 1 / span 4; }  /* from the 375 frame */
}
```

If a section uses any @container rule, put ALL of that section's responsive switches in @container blocks. Don't mix mechanisms within one component.

## Editorial patterns

### Asymmetry is the default
Centered 6/6 splits are the exception. Expect placements like text 2-7 with image 9-13, or a narrow 4-col text column against a 7-col visual. Build exactly what the frame shows; do not "balance" compositions the designer left unbalanced.

### Overlap
Elements overlap by sharing grid tracks plus explicit grid-row placement and z-index. Never position: absolute for compositional overlap.

```css
.feature_img   { grid-column: 5 / span 8; grid-row: 1; }
.feature_title { grid-column: 1 / span 6; grid-row: 1; z-index: 2; align-self: end; }
```

### Hanging elements
Captions, meta, and numbers placed in otherwise empty columns (e.g. a caption at column 11-12 beside an image ending at 10). Use align-self to pin them to the top or bottom of their row. This is most of what makes the layout feel designed; keep them.

### Full bleed breakout
For images escaping the container, the section owns a wrapper grid that includes the margins as outer tracks:

```css
.section_bleed {
  display: grid;
  grid-template-columns:
    var(--site-margin)
    repeat(12, minmax(0, 1fr))
    var(--site-margin);
  column-gap: var(--grid-gutter);
}
.section_bleed > * { grid-column: 2 / -2; }      /* default: inside the margins */
.section_bleed .is-bleed { grid-column: 1 / -1; } /* full bleed */
```

Above the cap this needs the locked-width version; prefer keeping bleeds inside sections that are themselves full-width with an inner .container for non-bleed content.

### Text measure
Column spans control layout width, but reading width is still governed by max-width in ch (60-70ch) on the text element itself. A 6-col text block at 1500 can exceed comfortable measure; the ch limit wins.

## Grid overlay (Shift + G)

templates/GridOverlay.astro renders the grid as a toggleable overlay, wired to Shift + G. Include it once in the Base layout. It consumes the same container and grid tokens as real sections, so it doubles as a verification tool: if an element doesn't sit on the overlay's columns, the element is wrong, not the overlay. Use it during the Figma-match quality gate. It persists across page loads within a session and ignores keypresses inside form fields.

## Anti-patterns

- position: absolute for layout (reserved for true decoration only)
- Letting the grid expand past 1920
- Margins or gutters as fluid clamp values (they are fixed 1.25rem by design)
- order to reshuffle mobile (restructure DOM so mobile reads naturally top to bottom)
- Centering or "tidying" asymmetric compositions
- 12 narrow squeezed columns on mobile instead of switching to the 4-col grid
- Pixel-matching element widths instead of reading column spans
