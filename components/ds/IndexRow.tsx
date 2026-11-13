import Link from "next/link";
import { cn } from "@/lib/cn";

export type IndexRowProps = {
  /** Figma text property `Year` */
  year?: string;
  /** Figma text property `Client` */
  client?: string;
  /** Figma text property `Industry` */
  industry?: string;
  /** Figma text property `Services` */
  services?: string;
  href?: string;
  className?: string;
};

/** Figma: Index row (260:71) — top border/default, py 20, gap 24, columns 90/360/220/fill/40. */
export function IndexRow({
  year = "2026",
  client = "Hotel Aurelia",
  industry = "Hospitality",
  services = "Brand, Website, AI concierge",
  href,
  className,
}: IndexRowProps) {
  const classes = cn("flex w-full items-center gap-24 border-t border-border-default py-20", className);
  const cells = (
    <>
      <p className="w-index-year shrink-0 text-text-secondary mono-body">{year}</p>
      <p className="w-index-client shrink-0 text-text-primary heading-h5">{client}</p>
      <p className="w-index-industry shrink-0 text-text-secondary body-s">{industry}</p>
      <p className="min-w-0 flex-1 text-text-primary body-s">{services}</p>
      <p className="w-index-arrow shrink-0 text-text-secondary body-m" aria-hidden="true">
        ↗
      </p>
    </>
  );
  return href ? (
    <Link href={href} className={classes}>
      {cells}
    </Link>
  ) : (
    <div className={classes}>{cells}</div>
  );
}
