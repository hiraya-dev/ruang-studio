import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Motion entry point: register GSAP plugins once here.
gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Expose the instance for sections that need to stop/start scroll (modals, etc.). */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * One-pager smooth scroll + anchor navigation, wired to GSAP ScrollTrigger.
 * - Lenis drives momentum scrolling (skipped under prefers-reduced-motion).
 * - ScrollTrigger reads the real window scroll Lenis updates; we only sync its
 *   update timing to Lenis and share GSAP's ticker so the two never race.
 * - In-page anchors scroll via Lenis, offset by the fixed nav height.
 */
export function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && !lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    });

    // Keep ScrollTrigger in sync with Lenis' smoothed scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share one clock (no rAF race).
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);
  }

  bindAnchors(prefersReduced);

  // Recalculate trigger positions once layout + this init have settled.
  ScrollTrigger.refresh();
}

// GSAP ticker time is in seconds; Lenis expects milliseconds.
function lenisRaf(time: number) {
  lenis?.raf(time * 1000);
}

function navOffset(): number {
  const header = document.querySelector('header');
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

function bindAnchors(prefersReduced: boolean) {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    if (link.dataset.anchorBound === 'true') return;
    link.dataset.anchorBound = 'true';

    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = -navOffset();

      if (lenis && !prefersReduced) {
        lenis.scrollTo(target as HTMLElement, { offset });
      } else {
        const top =
          (target as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      }

      history.pushState(null, '', href);
    });
  });
}
