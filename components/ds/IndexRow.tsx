import Link from "next/link";
import { cn } from "@/lib/cn";

export type IndexRowProps = {
  /** Figma text property `Year` */
  year: string;
  /** Figma text property `Client` */
  client: string;
  /** Figma text property `Industry` */
  industry: string;
  /** Figma text property `Services` */
  services: string;
  href?: string;
  className?: string;
  onPointerEnter?: () => void;
  onFocus?: () => void;
};

/**
 * Figma: Index row (260:71) — desktop: top border/default, py 20, gap 24, columns 90 / 450 / 220 / fill / 40
 * (year Mono/Body, client Heading/H5, industry Body/S secondary, services Body/S, ↗ Body/M).
 * Mobile «Row … — mobile» (378:12040): py 16, gap 16 — client over industry (gap 4) on the left, year and ↗ on
 * the right, no services. Tablet: mobile row + services column. One markup: the info block is `display: contents`
 * from 1024 so its cells line up with the desktop columns; CSS order moves the year on smaller screens.
 */
export function IndexRow({ year, client, industry, services, href, className, onPointerEnter, onFocus }: IndexRowProps) {
  const classes = cn(
    "index-row flex w-full items-center gap-16 border-t border-border-default py-16 lg:gap-24 lg:py-20",
    className,
  );
  const cells = (
    <>
      <p className="order-2 shrink-0 whitespace-nowrap text-text-secondary mono-body lg:order-none lg:w-index-year">{year}</p>
      <div className="order-1 flex min-w-0 flex-1 flex-col items-start gap-4 lg:contents">
        <p className="w-full text-text-primary heading-h5 lg:w-index-client lg:shrink-0">{client}</p>
        <p className="w-full text-text-secondary body-s lg:w-index-industry lg:shrink-0">{industry}</p>
      </div>
      <p className="order-1 hidden min-w-0 flex-1 text-text-primary body-s md:block lg:order-none">{services}</p>
      <p className="order-3 w-index-arrow shrink-0 text-text-secondary body-m lg:order-none" aria-hidden="true">
        ↗
      </p>
    </>
  );
  return href ? (
    <Link href={href} className={classes} onPointerEnter={onPointerEnter} onFocus={onFocus}>
      {cells}
    </Link>
  ) : (
    <div className={classes}>{cells}</div>
  );
}
