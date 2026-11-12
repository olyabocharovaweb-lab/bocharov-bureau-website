import Image from "next/image";
import Link from "next/link";
import { type CaseStudy, caseMeta, caseTitle } from "@/content/cases";
import { cn } from "@/lib/cn";

const aspect = {
  wide: "aspect-[1360/720]",
  half: "aspect-[674/760]",
} as const;

const sizes = {
  wide: "(min-width: 1440px) 1360px, calc(100vw - 2 * var(--gutter, 16px))",
  half: "(min-width: 768px) 50vw, 100vw",
} as const;

export function CaseCard({ item, index }: { item: CaseStudy; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="group/case">
      <Link
        href={`/work/${item.slug}`}
        className="flex flex-col gap-[14px] rounded-[var(--radius-media)]"
      >
        <div
          data-reveal="media"
          className={cn(
            "relative w-full overflow-hidden rounded-[var(--radius-media)] bg-surface",
            aspect[item.layout],
          )}
        >
          <div data-reveal-inner className="absolute inset-0">
            <Image
              src={item.cover.src}
              alt={item.cover.alt}
              fill
              sizes={sizes[item.layout]}
              className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover/case:scale-[1.035] motion-reduce:transition-none"
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-case font-medium tracking-soft">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-out-expo group-hover/case:bg-[length:100%_1px] group-focus-visible/case:bg-[length:100%_1px]">
              {caseTitle(item)}
            </span>
          </h3>
          <span className="pt-1 font-mono text-mono tracking-mono text-muted" aria-hidden>
            {number}
          </span>
        </div>
      </Link>
      <p className="label-mono mt-[14px]">{caseMeta(item)}</p>
    </article>
  );
}
