"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MobileImage } from "@/content/cases/mobile";
import { cn } from "@/lib/cn";

type Props = { items: MobileImage[]; title?: string; label: string; alt: string };

/**
 * Phone carousel of case media (Figma «Carousel» inside «… — mobile · carousel»): native horizontal scroll-snap —
 * cards min(74vw, 280) (260 at 390), gap 12, snap to start; the track bleeds to the screen edges (−20 / +20) with
 * scroll-padding 20, so the first card sits on the content edge and the next one peeks in on the right. Scrollbar
 * hidden; only the track scrolls, never the page. Below: dots (active = 18 × 6 pill text/primary, others 6 × 6
 * border/default) and «1 / N  Swipe →» (the hint goes after the first swipe). Active card via IntersectionObserver.
 * Keyboard: the track is focusable, ←/→ move one card. No hover effects; motion respects reduced motion.
 */
export function MediaCarousel({ items, title, label, alt }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: el, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    const onScroll = () => {
      if (el.scrollLeft > 4) setSwiped(true);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - pad, behavior: still ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(Math.min(items.length - 1, active + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(Math.max(0, active - 1));
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-12">
      {title && <p className="whitespace-nowrap text-text-secondary mono-label">{title}</p>}
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={title ? `${label} · ${title}` : label}
        tabIndex={0}
        onKeyDown={onKey}
        className="carousel -mx-20 flex items-start gap-12 self-stretch scroll-px-20 px-20 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {items.map((img, i) => (
          <div
            key={img.src}
            data-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="w-carousel-card shrink-0 snap-start"
          >
            <Image
              src={img.src}
              alt={i === 0 ? alt : ""}
              width={img.width}
              height={img.height}
              sizes="280px"
              loading="lazy"
              draggable={false}
              className="h-auto w-full rounded-sm bg-bg-surface"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between gap-16">
        <div className="flex items-center gap-6" aria-hidden="true">
          {items.map((img, i) => (
            <span
              key={img.src}
              className={cn(
                "h-6 rounded-full",
                i === active ? "w-dot-active bg-text-primary" : "w-6 bg-border-default",
              )}
              data-active={i === active ? "" : undefined}
            />
          ))}
        </div>
        <p className="whitespace-pre text-text-secondary mono-label" aria-live="polite">
          {`${active + 1} / ${items.length}`}
          {!swiped && <span aria-hidden="true">{"  Swipe →"}</span>}
        </p>
      </div>
    </div>
  );
}
