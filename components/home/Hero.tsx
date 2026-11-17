import Image from "next/image";
import { hero } from "@/content/home";

/**
 * Figma: Hero — desktop 256:68184 (pt 72, px 40, gap 24); mobile 322:5636 (pt 32, px 20, gap 24).
 * Mobile/tablet: meta stacked left (lede Body/L, then years + disciplines Mono/Body, gap 16);
 * wordmark Display/Wordmark S; photos 264 × 352 in a native scroll-snap carousel that bleeds
 * to the right edge. Desktop: as before.
 */
export function Hero() {
  return (
    <section className="flex w-full flex-col items-start gap-24 px-20 pt-32 md:px-32 lg:px-40 lg:pt-72">
      <div className="flex w-full flex-col items-start gap-16 lg:flex-row lg:justify-between lg:gap-0">
        <p className="w-full text-text-primary body-l lg:w-hero-lede">{hero.lede}</p>
        <div className="flex flex-col items-start gap-6 text-text-secondary mono-body lg:items-end lg:whitespace-nowrap">
          <p>{hero.years}</p>
          <p>{hero.disciplines}</p>
        </div>
      </div>
      <h1 className="w-full text-text-primary display-wordmark-s lg:display-wordmark">{hero.wordmark}</h1>
      <div
        role="region"
        aria-label="Selected images"
        tabIndex={0}
        className="-mr-20 flex w-auto items-start gap-12 self-stretch pr-20 max-lg:carousel md:-mr-32 md:pr-32 lg:mr-0 lg:w-full lg:pr-0"
      >
        {hero.photos.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={662}
            height={900}
            preload={i === 0}
            fetchPriority={i === 0 ? "high" : undefined}
            sizes="(min-width: 1440px) 331px, (min-width: 1024px) 25vw, 264px"
            className="aspect-hero-photo w-hero-photo shrink-0 rounded-sm object-cover lg:aspect-auto lg:h-auto lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink"
          />
        ))}
      </div>
    </section>
  );
}
