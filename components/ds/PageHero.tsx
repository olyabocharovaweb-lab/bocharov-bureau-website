import type { ReactNode } from "react";

export type PageHeroProps = {
  /** Body/L lede, 480 wide on desktop */
  lede: string;
  /** Mono/Body lines on the right (desktop) / under the lede (mobile) */
  meta: readonly string[];
  /** The h1 (each page sets its own size) */
  children: ReactNode;
};

/**
 * Inner-page hero (About 421:6182 / 424:6359, Contact 432:6251 / 432:6411): desktop pt 72, gap 28 — lede left,
 * Mono lines right (bottom-aligned), then the title; mobile pt 32, gap 24 — lede and Mono stacked, then the title.
 */
export function PageHero({ lede, meta, children }: PageHeroProps) {
  return (
    <section className="flex w-full flex-col items-start gap-24 px-20 pt-32 md:px-32 lg:gap-28 lg:px-40 lg:pt-72">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
        <p className="w-full text-text-primary body-l lg:w-page-lede">{lede}</p>
        <div className="flex flex-col items-start gap-6 whitespace-nowrap text-text-secondary mono-body lg:items-end">
          {meta.map((m) => (
            <p key={m}>{m}</p>
          ))}
        </div>
      </div>
      {children}
    </section>
  );
}
