import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

const splitConfig = {
  lines: { duration: 0.8, stagger: 0.08 },
  words: { duration: 0.6, stagger: 0.06 },
  chars: { duration: 0.4, stagger: 0.01 },
} as const;

type SplitType = keyof typeof splitConfig;

export function initMaskTextScrollReveal() {
  const headings = document.querySelectorAll<HTMLElement>('[data-split="heading"]');
  if (!headings.length) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: reduce)', () => {
    headings.forEach((heading) => gsap.set(heading, { autoAlpha: 1 }));
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      headings.forEach((heading) => {
        gsap.set(heading, { autoAlpha: 1 });

        const type: SplitType =
          (heading.dataset.splitReveal as SplitType | undefined) ?? 'lines';

        const typesToSplit =
          type === 'lines'
            ? ['lines']
            : type === 'words'
              ? ['lines', 'words']
              : ['lines', 'words', 'chars'];

        SplitText.create(heading, {
          type: typesToSplit.join(', '),
          mask: 'lines',
          autoSplit: true,
          linesClass: 'line',
          wordsClass: 'word',
          charsClass: 'letter',
          onSplit(instance) {
            const targets =
              type === 'chars'
                ? instance.chars
                : type === 'words'
                  ? instance.words
                  : instance.lines;

            const config = splitConfig[type];
            const isLoadTrigger = heading.dataset.splitTrigger === 'load';

            return gsap.from(targets ?? [], {
              yPercent: 110,
              duration: config.duration,
              stagger: config.stagger,
              ease: 'expo.out',
              delay: isLoadTrigger ? 0.1 : 0,
              ...(isLoadTrigger
                ? {}
                : {
                    scrollTrigger: {
                      trigger: heading,
                      start: 'clamp(top 80%)',
                      once: true,
                    },
                  }),
            });
          },
        });
      });
    });
  });
}
