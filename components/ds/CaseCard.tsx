import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type CaseCardProps = {
  /** Figma text property `Title` */
  title?: string;
  /** Figma text property `Number` */
  number?: string;
  /** Figma text property `Tags` */
  tags?: string;
  /**
   * Photo — Figma "override fill" of layer `Photo P3` (frame height 760, width fill).
   * width/height = the exported image size, so the ratio equals the Figma frame.
   */
  image: { src: string; alt: string; width: number; height: number };
  href?: string;
  className?: string;
  /** Image `sizes` hint for next/image */
  sizes?: string;
};

/** Figma: Case card (260:64) — photo (h 760, w fill) radius/sm, gap 14, title Heading/H6, number + tags Mono/Body. */
export function CaseCard({
  title = "IndustryLens — look closer",
  number = "02",
  tags = "B2B SaaS · Brand identity · Guidelines",
  image,
  href,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: CaseCardProps) {
  const body = (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="h-auto w-full rounded-sm"
      />
      <div className="flex w-full items-start justify-between">
        <p className="text-text-primary heading-h6">{title}</p>
        <p className="whitespace-nowrap text-text-secondary mono-body">{number}</p>
      </div>
      {/* Figma: no text style on this layer (Mono/Body + UPPER) — see docs/ds-gaps.md */}
      <p className="w-full uppercase text-text-secondary mono-body">{tags}</p>
    </>
  );
  const classes = cn("flex flex-col items-start gap-14", className);
  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
