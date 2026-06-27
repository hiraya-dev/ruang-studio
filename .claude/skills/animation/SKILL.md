---
name: animation
description: Animation principles and tropes for all UI and scroll motion in this project, based on Emil Kowalski's approach (Animations on the Web). Use whenever writing any animation, transition, GSAP timeline, Motion component, or hover state.
---

# Animation

Taste is restraint. Animate less than you think, better than you think.

## The non-negotiables

1. Animate transform and opacity only. Never width, height, top, left, margin, padding. These trigger layout and jank. For size reveals use clip-path or scale; for position use translate
2. Enter with ease-out, exit with ease-in. Things arriving should decelerate, things leaving should get out of the way
3. Exits are faster than enters. If enter is 300ms, exit is 200ms
4. UI feedback lives between 150ms and 300ms. Anything longer feels sluggish on repeated interaction. Larger spatial movements (sheets, page transitions, hero reveals) can go 400ms to 700ms
5. Origin-aware: popovers, menus, and tooltips scale and fade from their trigger (transform-origin set to the trigger side), not from center screen
6. Frequency rule: the more often a user triggers it, the subtler it must be. A hover on a nav link gets almost nothing. A once-per-visit hero reveal can be theatrical
7. prefers-reduced-motion: everything resolves to its final state. Wrap GSAP work in gsap.matchMedia() with a reduced-motion branch

## Easing palette

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);      /* big reveals, hero text */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);      /* default UI enter */
--ease-sheet: cubic-bezier(0.32, 0.72, 0, 1);          /* sheets, drawers, large panels */
--ease-in-out-soft: cubic-bezier(0.45, 0, 0.55, 1);    /* looping, repositioning */
```

Never use the CSS keywords ease or linear for spatial movement. linear is fine for opacity-only crossfades and marquees.

## Springs

Use springs (Motion library) for anything gesture-driven or interruptible: drag, dismiss, toggle states. Springs defined by visual duration and bounce, not stiffness guessing. Default: duration 0.4, bounce 0 to 0.15. No bounce on text or anything users read.

## Tropes we use

- Staggered text reveal: lines masked with overflow clip, translateY(110%) to 0, stagger 0.08, --ease-out-expo. Split by lines, not chars, for body-adjacent text
- Fade-up on scroll: opacity 0 + translateY(1.5rem to 2.5rem) to identity. Trigger at 85% viewport. Once, no scrub, no reverse on scroll up
- Scrubbed reveals (clip-path, parallax, pinned sections): ScrollTrigger scrub: 1, trigger on the parent wrapper, not the animated element
- Image reveal: clip-path inset from one edge, paired with a slight scale(1.08 to 1) on the inner img. Outer clips, inner scales
- Hover: one property change, two max. Color shift, or underline draw, or a 2 to 4px translate. Not all three
- Number counters and progress: only when the number is the content. Otherwise skip

## Tropes we do not use

- Bouncy overshoot on text
- Rotating/3D card flips as default hover
- Scroll-jacking that changes scroll speed
- Animating blur on large surfaces (GPU cost), small surfaces only and sparingly
- Animating everything on the page. If every section animates, nothing does. Pick the moments

## Section initialization (isolation pattern)

Every animated section gets its own init function, registered once and run on load. Isolation is the whole point: adding a new section can never break an existing one.

```js
// one init per section — scoped to its own data attribute, guarded against absence
function initRadialCardsMarquee() {
  const lists = document.querySelectorAll('[data-radial-cards-marquee-list]');
  if (!lists.length) return;            // section not on this page → no-op
  lists.forEach((list) => {
    // ...all logic scoped to this list; reads CSS vars, clones, sets --card, etc.
  });
}

// one place calls them all; add a section = add a function + one line here
document.addEventListener('DOMContentLoaded', () => {
  initRadialCardsMarquee();
  // initNextSection();
});
```

Rules:
1. One `init<Section>()` per animated section. Adding a section means adding a function and one call line — never editing another section's init.
2. **Guard first.** Bail if the section's elements aren't present (`if (!els.length) return;`). This is what makes inits safe to add and remove.
3. **Scope by a unique `data-*` attribute** (`[data-radial-cards-marquee-list]`), never a global tag/class selector that could match another section.
4. **Pause off-screen.** Run the animation only while visible (the marquee toggles `animationPlayState`). Prefer an `IntersectionObserver` over `scroll` + `getBoundingClientRect` for the visibility check — far fewer events, same result.
5. **Reduced motion**: skip or settle the animation in the reduced-motion branch.

## GSAP conventions

- One motion entry point per page or layout registers plugins (gsap.registerPlugin once)
- GSAP inits follow the same isolation shape above: guard-first, data-attr scoped, wrapped in gsap.context() scoped to the section root, ctx.revert() on teardown (Astro view transitions, React unmount)
- Reduced-motion branch lives in gsap.matchMedia()
- ScrollTrigger markers never committed
- Lenis + ScrollTrigger: wire lenis.on('scroll', ScrollTrigger.update) and gsap.ticker
- Astro view transitions: `DOMContentLoaded` does not fire on swaps. Register inits on `astro:page-load` (fires on first load and every navigation) and revert contexts on `astro:before-swap`

## Review checklist

- [ ] Only transform/opacity (or clip-path) animated
- [ ] Durations within the ranges above
- [ ] Exit faster than enter
- [ ] Reduced motion branch exists
- [ ] Nothing animates that the user triggers more than ~10x per session, unless under 200ms and subtle
