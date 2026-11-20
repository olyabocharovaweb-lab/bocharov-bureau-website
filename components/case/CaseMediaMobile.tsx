import Image from "next/image";
import type { CSSProperties } from "react";
import type { MobileBlock } from "@/content/cases/mobile";
import { MediaCarousel } from "./MediaCarousel";

/** Full mobile content width in the exported files (350 Figma px × 3). Narrower files are not stretched. */
const FULL_WIDTH = 1050;

/**
 * Phone version of a case media block (< 768px): the Figma «… — mobile · <type>» blocks in order — images (width 100%,
 * height auto, radius/sm, bg/surface; files narrower than 1050 keep max-width = width / 1050, centred) and carousels
 * (MediaCarousel). Gap 8 between images, 16 next to a carousel. Hidden from 768px (the desktop image is shown there);
 * every image is lazy, and lazy images that aren't displayed are never fetched — one set per breakpoint.
 */
export function CaseMediaMobile({ blocks, label, alt }: { blocks: MobileBlock[]; label: string; alt: string }) {
  return (
    <div className="flex w-full flex-col items-center md:hidden">
      {blocks.map((b, i) => {
        const prev = blocks[i - 1];
        const space = !prev ? "" : prev.type === "carousel" || b.type === "carousel" ? "pt-16" : "pt-8";
        if (b.type === "carousel") {
          return (
            <div key={i} className={`w-full ${space}`}>
              <MediaCarousel items={b.items} title={b.title} label={label} alt={i === 0 ? alt : ""} />
            </div>
          );
        }
        return (
          <div key={i} className={`flex w-full justify-center ${space}`}>
            <Image
              src={b.src}
              alt={i === 0 ? alt : ""}
              width={b.width}
              height={b.height}
              sizes="(max-width: 767px) calc(100vw - 40px), 0px"
              loading="lazy"
              className="h-auto w-full rounded-sm bg-bg-surface"
              style={b.width < FULL_WIDTH ? ({ maxWidth: `${(b.width / FULL_WIDTH) * 100}%` } as CSSProperties) : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
