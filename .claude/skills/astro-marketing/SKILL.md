---
name: astro-marketing
description: Conventions for the Astro + Tailwind v4 (+ optional Sanity) marketing site stack. Use when building or editing anything in an Astro project.
---

# Astro Marketing Stack

Astro 4+, Tailwind v4 (CSS-first @theme), optional Sanity, GSAP + Lenis.

## Project shape

```
src/
  components/
    layout/        Nav, Footer, Head
    section/       Hero, Work, Services, CTA (page sections)
    ui/            Button, Tag, Card (reusable atoms)
  layouts/         Base.astro (html shell, fonts, motion entry)
  pages/           file-based routes (layout + composition only, copy imported)
  data/            one typed module per page (home.ts, about.ts) + site.ts (nav/footer/meta)
  content/         optional Astro Content Collections (local structured content, no CMS)
  styles/
    tokens.css     all design tokens (source of truth)
    global.css     resets, base type, Tailwind @theme mapping
  lib/
    sanity/        client, queries (only if Sanity is in)
    motion/        gsap setup, lenis setup, shared animations
public/fonts/      self-hosted WOFF2
```

## Rules

- Zero JS by default. A section ships no script unless it animates or is interactive
- Interactivity ladder: plain HTML/CSS first (details, :focus-within, popover attr), then a vanilla <script> in the .astro file, then a framework island only for genuinely stateful UI. client:visible over client:load
- Motion scripts go through src/lib/motion. Each animated section gets one isolated, guard-first init (scoped to its own data attribute) registered in a single entry and run on load; GSAP work wraps in gsap.context scoped to the section root. Full pattern in the animation skill. With view transitions on, register on astro:page-load and revert on astro:before-swap
- Tailwind v4: tokens defined in tokens.css as plain CSS variables, mapped into @theme in global.css so utilities like text-h1 and gap-5 resolve to the fluid tokens. Arbitrary values in class names are a smell; promote to a token
- Component classes for anything a utility string can't express cleanly. A 12-utility class soup gets refactored into a component class with token-based CSS. Reuse an existing component/class before writing a new one — a repeated element is one component, not one class per section (see AGENTS.md → Reuse/DRY)
- Images: astro:assets Image/Picture, explicit dimensions, lazy below fold, formats avif/webp. Download Figma images into src/assets/ first — never reference a Figma or temporary (localhost:3845) asset URL (see ASSETS.md)
- SEO per page: title, description, canonical, OG image through a shared Head component
- Fonts: preload display face, font-display swap, subset if the family allows

## Performance budget

- Lighthouse performance 95+ on every marketing page
- No layout shift from fonts or images (size everything, use fallback font metrics)
- GSAP loaded once, plugins tree-shaken, no jQuery, ever
