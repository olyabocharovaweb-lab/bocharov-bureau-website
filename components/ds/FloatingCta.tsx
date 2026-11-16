"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

/**
 * Figma: «Floating CTA — Book a call» (314:5029 on every page) — Button Primary,
 * label «Book a call» + →. Fixed bottom-right: 40 / 40 (16 / 16 below md), above content.
 *
 * - Over a dark surface (an element whose data-surface is "dark" — the Footer switches
 *   itself to dark while scrolling in) it uses the inverse tone: bg/page fill, text/primary.
 * - Hidden while the Contact form (#contact) is in view, so it does not double the CTA.
 * - Hidden when an element marked data-cta-avoid (the Footer legal line) reaches it.
 * - No animation: state changes are instant.
 *
 * Link: /#contact for now; to be replaced with Calendly.
 */
export function FloatingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [inverse, setInverse] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [avoid, setAvoid] = useState(false);

  // What is under the button: observe surfaces and avoid-zones in the strip it occupies.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-surface]"));
    const avoids = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-avoid]"));
    if (surfaces.length === 0 && avoids.length === 0) return;

    const r = el.getBoundingClientRect();
    const rootMargin = `-${Math.round(r.top)}px 0px -${Math.round(window.innerHeight - r.bottom)}px 0px`;
    const under = new Set<Element>();
    const recompute = () => {
      setInverse(surfaces.some((s) => under.has(s) && s.dataset.surface === "dark"));
      setAvoid(avoids.some((a) => under.has(a)));
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) under.add(e.target);
          else under.delete(e.target);
        }
        recompute();
      },
      { rootMargin, threshold: 0 },
    );
    [...surfaces, ...avoids].forEach((n) => io.observe(n));
    // A surface can turn dark while it stays under the button (the Footer does).
    const mo = new MutationObserver(recompute);
    surfaces.forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ["data-surface"] }));
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Hide while the Contact form is visible.
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(([e]) => setContactInView(e.isIntersecting), { threshold: 0 });
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  const hidden = contactInView || avoid;
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
