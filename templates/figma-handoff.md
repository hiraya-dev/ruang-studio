# Figma to Code Handoff

How design context flows from Figma into AI-built code. The goal: the agent never guesses a visual value.

## Figma file hygiene (your side)

The MCP reads structure, so structure matters:

1. Name frames by section: hero, work-grid, services, cta, footer. Component-ish naming maps 1:1 to component files
2. Use Figma styles/variables for color and type. The agent maps these directly to tokens. Loose hex values force guessing
3. Auto layout everywhere. Padding and gap values in auto layout become spacing tokens; absolute positioning becomes interpretation
4. Design both 1500 and 375 frames for any section whose structure changes. The agent interpolates between the two (see responsive-fluid skill). One frame = the agent derives mobile from rules and flags it
5. Spacing as variables with two modes: a Spacing collection holding space-1 through space-8 + section-space, Desktop mode with the max values (applied to 1500 frames), Mobile mode with the min values (applied to 375 frames). Apply via auto layout gap and padding only, from the variable picker, never typed numbers. Values outside the scale are a conversation with the scale: snap to the nearest token or add one
6. Put motion intent in a frame note or section description: "headline staggers up on load", "images clip-reveal on scroll". Text in the file beats verbal handoff

What needs converting to variables, by leverage: colors and spacing always, type as styles or variables, one-off content measurements (image sizes, logo dimensions) never. Old files convert as sections are touched, not as a retrofit project.

## Per-section build prompt (template)

```
Build the [SECTION] section.
Figma: [frame link]
- Pull design context and a screenshot for both the 1500 and 375 frames
- Map values to tokens in DESIGN.md; list any value with no token before building
- Images: download each one into src/assets/ and render via astro:assets — never a Figma or temporary (localhost:3845) URL (see ASSETS.md)
- Motion: [intent, or "per the frame note"]
- Content source: [hardcoded | Sanity type X]
Follow AGENTS.md, DESIGN.md, and the animation + responsive-fluid skills.
```

## Token sync ritual

When the design system in Figma changes:
1. Agent reads Figma variables/styles
2. Diffs against tokens.css
3. Proposes the token changes (not silent edits)
4. You approve, tokens.css updates, components keep working because they only ever referenced tokens

## Review loop

After each section: agent takes its own rendered screenshot (dev server) and compares against the Figma screenshot at the same widths, lists discrepancies, fixes, repeats. Pixel judgment stays yours; the agent's job is to make the diff list short before you look.
