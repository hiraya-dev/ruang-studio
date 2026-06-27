# ASSETS.md

Asset export, naming, and optimization conventions. The authoritative rules for any image, icon, font, or favicon that ships. README.md says where assets live; this file says how they're made and named.

## Where things live

| Location | What | Processing |
|---|---|---|
| `src/assets/` | All design imagery that renders on the page and the client does **not** edit | Processed by astro:assets — AVIF/WebP conversion, resize, enforced dimensions (no layout shift) |
| `public/` | Fonts, favicons, OG images, anything served verbatim by URL | None — served as-is |
| Sanity CDN | Client-editable imagery (case studies, blog, team) | Through the Sanity image URL builder, with hotspot + required alt |

The rule: **if it renders on the page and the client doesn't edit it, it goes in `src/assets/`, never `public/`.** `public/` is for files that need a stable URL or can't be processed.

## Naming

- kebab-case, descriptive, no spaces, no uppercase: `hero-cityscape.avif`, `icon-arrow-right.svg`
- Prefix by role where it helps scanning: `icon-`, `logo-`, `og-`, `bg-`
- No dimensions or device names baked into source filenames (`hero@2x`, `hero-mobile`) — astro:assets generates the responsive variants. Source is the highest-quality original

## Imagery

- Format: author as high-quality source (PNG/JPG/original); let astro:assets emit AVIF with WebP fallback. Never hand-export final-format images into `src/assets/`
- Always render through the `Image`/`Picture` component with explicit `width`, `height`, and `alt` — this is what prevents CLS
- Provide `sizes` for anything not a fixed width so the right variant is served
- Loading: `loading="lazy"` below the fold, eager only for the LCP image. Non-transparent images get a skeleton background of `--color-bg-2`
- Aspect ratios come from the Figma frames (see DESIGN.md → Imagery); don't crop arbitrarily

### Getting images out of Figma

When a frame has an image, **download it into the repo** — never reference where Figma served it from.

- Export/download every image fill or asset from the frame into `src/assets/` (Figma MCP `download_assets`, or Dev Mode export), named per the conventions above
- **Never** ship a Figma URL, the MCP's temporary asset URL (`http://localhost:3845/...`, `figma://…`), or any remote design-tool link in committed code. They expire, break the build, and bypass `astro:assets`
- After downloading, render it like any other asset: through `astro:assets` (Astro) / `next/image` (Next) with explicit dimensions and `alt`
- SVGs from Figma: bring them in as inline SVG / icon components, not as a hotlinked image (see Icons)
- Real client-editable imagery still comes from Sanity, not Figma — Figma assets are the design's placeholders/art, committed to `src/assets/`

## Icons

- Inline SVG (component or `astro-icon`), not icon fonts, not `<img>` for UI icons — inline SVG inherits `currentColor` and scales cleanly
- Optimize with SVGO; strip width/height in favor of `viewBox` so size comes from CSS
- Decorative icons: `aria-hidden="true"`. Meaningful standalone icons (icon-only button) get an accessible name on the control, per the accessibility skill

## Fonts

- Self-hosted WOFF2 in `public/fonts/`. No third-party font CDNs (privacy + a layout-shift/perf risk)
- `font-display: swap`; preload the display face only (per DESIGN.md). Subset to the languages used
- Declare `@font-face` once; reference via the `--font-*` tokens, never by family name in components

## Favicons & social

- Favicon set in `public/`: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` (180×180), and a web manifest with maskable icons (192/512)
- OG image: 1200×630, in `public/`, referenced by the SEO/Head component. A per-page OG image where it adds value, a sane default otherwise

## Alt text

- Meaningful image → concise descriptive `alt` (what it shows / why it's there), no "image of"
- Decorative image (texture, divider, redundant with adjacent text) → `alt=""`
- Never omit the `alt` attribute. Client-uploaded Sanity images require alt at the schema level (see the sanity-content skill)

## Anti-patterns

- Final-format, pre-resized images dumped in `src/assets/` (defeats astro:assets)
- Images in `public/` that the client doesn't edit (no optimization, no dimension enforcement)
- Icon fonts or sprite hacks for UI icons
- Background images for content that conveys meaning (it has no alt and isn't in the a11y tree)
