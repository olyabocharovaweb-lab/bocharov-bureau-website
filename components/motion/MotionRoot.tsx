"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Smooth scroll (Lenis) + scroll-driven reveals (GSAP ScrollTrigger / SplitText).
 *
 * Sections stay server components and only opt in with data attributes:
 *   [data-split]               → text revealed line by line
 *   [data-reveal="media"]      → clip reveal; optional [data-reveal-inner] child eases its scale
 *   [data-reveal="fade"]       → fade + rise
 *   [data-reveal="line"]       → top rule draws in (process steps)
 *
 * Libraries are loaded lazily after hydration so they never block first paint / LCP.
 * With prefers-reduced-motion nothing is initialised and content is shown as is.
 */

type Motion = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
  Lenis: typeof import("lenis").default;
};

let motionPromise: Promise<Motion> | null = null;
function loadMotion() {
  motionPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
    import("lenis"),
  ]).then(([g, st, sp, l]) => {
    g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText, Lenis: l.default };
  });
  return motionPromise;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    loadMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ anchors: true, lerp: 0.1, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);
  return null;
}

function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    const root = document.documentElement;

    // Wait for an idle moment after hydration, then set up one element per task so the
    // main thread never sees a long task (keeps TBT/INP low).
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200);
    const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));

    idle(async () => {
      const { gsap, ScrollTrigger, SplitText } = await loadMotion();
      if (cancelled) return;
      root.classList.add("js");
      const once = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });
      const ctx = gsap.context(() => {});
      revert = () => ctx.revert();

      const tasks: Array<() => void> = [];

      // Text: split into masked lines shortly before the block scrolls into view, then reveal.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) =>
        tasks.push(() =>
          ctx.add(() => {
            const split = () =>
              ctx.add(() =>
                SplitText.create(el, {
                  type: "lines",
                  mask: "lines",
                  linesClass: "split-line",
                  aria: "none", // lines are whole words: screen readers read them naturally
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.lines, {
                      yPercent: 110,
                      duration: 1.15,
                      ease: "expo.out",
                      stagger: 0.09,
                      scrollTrigger: once(el),
                    }),
                }),
              );
            ScrollTrigger.create({ trigger: el, start: "top bottom+=50%", once: true, onEnter: split });
          }),
        ),
      );

      // Media: clip from bottom, inner image settles from a slight zoom
      gsap.utils.toArray<HTMLElement>('[data-reveal="media"]').forEach((el) =>
        tasks.push(() =>
          ctx.add(() => {
            const tl = gsap.timeline({ scrollTrigger: once(el, "top 92%") });
            tl.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0% round 6px)" },
              { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.4, ease: "expo.out" },
            );
            const inner = el.querySelector("[data-reveal-inner]");
            if (inner) tl.fromTo(inner, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
          }),
        ),
      );

      // Fade + rise
      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) =>
        tasks.push(() =>
          ctx.add(() => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: once(el, "top 92%") },
            );
          }),
        ),
      );

      // Process steps: rule draws in, content follows
      tasks.push(() =>
        ctx.add(() => {
          ScrollTrigger.batch('[data-reveal="line"]', {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              batch.forEach((el, i) => {
                gsap.delayedCall(i * 0.1, () => el.classList.add("is-in"));
              }),
          });
        }),
      );

      for (const task of tasks) {
        if (cancelled) return;
        task();
        await yieldToMain();
      }

      // Layout can shift once web fonts / images settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
      revert = () => {
        ctx.revert();
        window.removeEventListener("load", refresh);
      };
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}

export function MotionRoot() {
  return (
    <>
      <SmoothScroll />
      <Reveals />
    </>
  );
}
