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
  /** Photo — Figma "override fill" of layer `Photo P3` */
  image: { src: string; alt: string };
  href?: string;
  className?: string;
  /** Image `sizes` hint for next/image */
  sizes?: string;
};

/** Figma: Case card (260:64) — photo 674×760 radius/sm, gap 14, title Heading/H6, number + tags Mono/Body. */
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
      <div className="relative aspect-case-card w-full overflow-hidden rounded-sm">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
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
