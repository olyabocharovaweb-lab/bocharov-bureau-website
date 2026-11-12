"use client";

import { useEffect, useRef } from "react";

/**
 * Turns the footer dark once the visitor reaches the very end of the page.
 * A 1px sentinel sits at the bottom of the footer; when it scrolls into view,
 * the footer gets `data-dark` (colours cross-fade in CSS, see .site-footer).
 */
export function FooterTheme() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = ref.current;
    const footer = sentinel?.closest("footer");
    if (!sentinel || !footer) return;
    const io = new IntersectionObserver(
      ([entry]) => footer.toggleAttribute("data-dark", entry.isIntersecting),
      { rootMargin: "0px 0px 80px 0px" },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />;
}
