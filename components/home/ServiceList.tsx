"use client";

import Image from "next/image";
import { useState } from "react";
import { TagList } from "@/components/ui/Tag";
import type { Service } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Service rows. On desktop (≥1024) the hovered / focused row becomes "active":
 * its description turns ink and a photo column opens on the right, as row A in Figma.
 * The last active row stays open, so the list doesn't jump when the cursor leaves it.
 * Below 1024 photos are hidden and rows are static.
 */
export function ServiceList({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <ol className="flex flex-col gap-12">
      {items.map((s, i) => {
        const on = i === active;
        return (
          <li
            key={s.index}
            onMouseEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            className={cn(
              "flex flex-col gap-5 border-t border-line py-8 md:flex-row md:gap-10",
              "lg:grid lg:gap-0 lg:transition-[grid-template-columns] lg:duration-700 lg:ease-out-expo",
              // 560 + 40 gap | flexible | 40 gap + 360 photo  (of 1360)
              on ? "lg:grid-cols-[44.12%_1fr_29.41%]" : "lg:grid-cols-[44.12%_1fr_0%]",
            )}
          >
            <div className="flex gap-6 md:w-[41.18%] md:shrink-0 lg:w-auto lg:pr-10">
              <span className="shrink-0 pt-1 font-mono text-[14px] leading-[1.2] whitespace-nowrap text-muted">
                {s.index}
              </span>
              <h3 className="text-service font-medium tracking-title">{s.title}</h3>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-5">
              <p
                className={cn("text-body-lg transition-colors duration-500", on ? "text-ink" : "text-muted")}
              >
                {s.description}
              </p>
              <TagList tags={s.tags} label={`${s.title} services`} />
            </div>

            {s.image && (
              <div aria-hidden={!on} className="hidden overflow-hidden lg:block">
                <div className="pl-10">
                  <div
                    className={cn(
                      "relative aspect-[360/220] overflow-hidden rounded-[var(--radius-media)] bg-surface",
                      "transition-[opacity,clip-path] duration-700 ease-out-expo",
                      on
                        ? "opacity-100 [clip-path:inset(0_0_0_0_round_6px)]"
                        : "opacity-0 [clip-path:inset(0_0_100%_0_round_6px)]",
                    )}
                  >
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1440px) 360px, 27vw"
                      className={cn(
                        "object-cover transition-transform duration-[1200ms] ease-out-expo",
                        on ? "scale-100" : "scale-110",
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
