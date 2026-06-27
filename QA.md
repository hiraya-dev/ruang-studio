# QA.md

Prelaunch quality gate. The per-section quality gates in AGENTS.md run on every task; this is the whole-site sign-off before the site goes live. Nothing here is optional. Copy this list into PLAN.md (or a release issue) and check it off against the real, production build (`npm run build && npm run preview`), not the dev server.

## Responsive

- [ ] No horizontal scroll at 320px (hard gate)
- [ ] Swept at 320, 375, 768, 1024, 1500, and one width above 1500 (cap holds, margins grow, composition matches the Figma frame)
- [ ] Touch targets ≥ 44×44px; hover-only affordances have a tap equivalent
- [ ] Layout survives 200% zoom with no clipping or loss of content

## Cross-browser

- [ ] Chrome (desktop)
- [ ] Safari (desktop) — check backdrop-filter, clip-path, sticky, gradient banding
- [ ] Firefox (desktop)
- [ ] iOS Safari — check 100svh/dvh, momentum scroll, tap delay, form zoom
- [ ] Android Chrome

## Performance budgets

Measured on the production build, marketing routes, mobile throttling.

- [ ] Lighthouse performance 95+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No font swap layout shift (display face preloaded, `font-display: swap`)
- [ ] No image layout shift (every image has width/height or aspect-ratio — see ASSETS.md)
- [ ] Page weight within budget; no oversized or unoptimized assets shipped
- [ ] No render-blocking third-party scripts above the fold

## Accessibility

Full method in `.claude/skills/accessibility/SKILL.md`. This is the sign-off:

- [ ] axe / Lighthouse a11y: 0 violations on every template
- [ ] Keyboard-only sweep of the whole site: focus visible, logical order, no traps, Esc closes overlays and returns focus
- [ ] Screen-reader smoke test (VoiceOver) on home + one content template
- [ ] Contrast verified in every theme variant (`.theme-dark`, `.theme-light`)
- [ ] One h1 per page, heading order never skips

## SEO

- [ ] Unique title + meta description per page
- [ ] Open Graph + Twitter card tags, with a present OG image (1200×630)
- [ ] Canonical URLs correct
- [ ] sitemap.xml generated and submitted
- [ ] robots.txt correct (not blocking production)
- [ ] Structured data where relevant, validates
- [ ] No stray `noindex` on production pages

## Analytics & consent

- [ ] Analytics loads and key events fire (verify in the provider's real-time/debug view)
- [ ] Consent/cookie banner behaves; nothing fires before consent where required
- [ ] No PII in URLs or event payloads

## Assets & links

- [ ] All images have correct `alt` (decorative = `alt=""`) — see ASSETS.md
- [ ] No broken links or images (run a link check)
- [ ] Custom 404 page; redirects for any changed/removed URLs
- [ ] Favicons (full set) and app icons present

## Final

- [ ] Content proofread (typos, real copy not lorem, correct contact details)
- [ ] Reduced-motion verified across the site (everything settles to final state)
- [ ] Zero console errors/warnings on every template
- [ ] Forms submit and confirm; error states reachable and accessible
- [ ] PLAN.md updated, CHANGELOG.md current, deploy/env config confirmed
