"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

/**
 * Figma: «Floating CTA — Book a call» (314:5029 on every page) — Button Primary,
 * label «Book a call» + →. Fixed bottom-right: 40 / 40 (16 / 16 below md), above content.
 *
 * - Over a dark section (any element with data-surface="dark") it switches to the
 *   inverse tone: fill bg/page, label text/primary.
 * - Hidden while the Contact form (#contact) is in view, so it does not double the CTA.
 * - No animation: state changes are instant.
 *
 * Link: /#contact for now; to be replaced with Calendly.
 */
export function FloatingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [inverse, setInverse] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Dark sections under the button: a thin observation band at the button's height.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const darks = Array.from(document.querySelectorAll<HTMLElement>('[data-surface="dark"]'));
    if (darks.length === 0) return;
    const r = el.getBoundingClientRect();
    const fromBottom = window.innerHeight - r.bottom;
    // rootMargin shrinks the viewport to the strip the button occupies.
    const over = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) over.add(e.target);
          else over.delete(e.target);
        }
        setInverse(over.size > 0);
      },
      { rootMargin: `-${Math.round(r.top)}px 0px -${Math.round(fromBottom)}px 0px`, threshold: 0 },
    );
    darks.forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, []);

  // Hide while the Contact form is visible.
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0 });
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("fixed right-16 bottom-16 z-50 md:right-40 md:bottom-40", hidden && "invisible")}
      aria-hidden={hidden || undefined}
    >
      <Button variant="Primary" label="Book a call" href="/#contact" inverse={inverse} />
    </div>
  );
}
