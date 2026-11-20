import Image from "next/image";
import type { CSSProperties } from "react";
import type { MobileImage } from "@/content/cases/mobile";

/** Full mobile content width in the exported files (350 Figma px × 3). Narrower files are not stretched. */
const FULL_WIDTH = 1050;

/**
 * Phone version of a case media block (< 768px): the Figma «Mobile media» images one under another, gap 8 —
 * no carousel, no horizontal scroll. Each image: height auto from its own ratio, radius/sm, bg/surface behind it;
 * narrow files (phone screens, ~780 px) keep their size relative to the column — max-width = width / 1050, centred.
 * Lazy-loaded; hidden (display: none) from 768px, where the desktop image is shown instead — lazy images that are
 * not displayed are never fetched, so each breakpoint downloads only its own version.
 */
export function CaseMediaMobile({ images, alt }: { images: MobileImage[]; alt: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-8 md:hidden">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === 0 ? alt : ""}
          width={img.width}
          height={img.height}
          sizes="(max-width: 767px) calc(100vw - 40px), 0px"
          loading="lazy"
          className="h-auto w-full rounded-sm bg-bg-surface"
          style={img.width < FULL_WIDTH ? ({ maxWidth: `${(img.width / FULL_WIDTH) * 100}%` } as CSSProperties) : undefined}
        />
      ))}
    </div>
  );
}
