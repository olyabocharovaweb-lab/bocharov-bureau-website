import Image, { getImageProps } from "next/image";
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
  /**
   * Optional mobile crop (< 768) when Figma's mobile card uses a different framing than a plain
   * 4:5 crop of `image` (art direction via <picture>, e.g. PulseFit 324:5128).
   */
  mobileImage?: { src: string; width: number; height: number };
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
  mobileImage,
  href,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: CaseCardProps) {
  const body = (
    <>
      {mobileImage ? (
        <ArtDirected image={image} mobileImage={mobileImage} sizes={sizes} />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          // Mobile (324:5128): 4:5 crop, object-fit cover. From md: the image's own ratio.
          className="aspect-case-mobile w-full rounded-sm object-cover md:aspect-auto md:h-auto"
        />
      )}
      <div className="flex w-full items-start justify-between">
        <p className="min-w-0 flex-1 text-text-primary heading-h6">{title}</p>
        <p className="shrink-0 whitespace-nowrap text-text-secondary mono-body">{number}</p>
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

/** <picture>: the mobile crop below 768, the regular image from 768. Same classes as the plain image. */
function ArtDirected({
  image,
  mobileImage,
  sizes,
}: {
  image: CaseCardProps["image"];
  mobileImage: NonNullable<CaseCardProps["mobileImage"]>;
  sizes: string;
}) {
  const { props: wide } = getImageProps({ ...image, sizes });
  const { props: narrow } = getImageProps({ ...mobileImage, alt: image.alt, sizes });
  return (
    <picture className="block w-full">
      <source media="(min-width: 768px)" srcSet={wide.srcSet} sizes={wide.sizes} width={image.width} height={image.height} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...narrow} className="aspect-case-mobile w-full rounded-sm object-cover md:aspect-auto md:h-auto" />
    </picture>
  );
}
