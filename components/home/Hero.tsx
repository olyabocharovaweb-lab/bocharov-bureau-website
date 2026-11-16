import Image from "next/image";
import { hero } from "@/content/home";

/** Figma: Hero (256:68184) — pt 72, px 40, gap 24. */
export function Hero() {
  return (
    <section className="flex w-full flex-col items-start gap-24 px-40 pt-72">
      <div className="flex w-full items-start justify-between">
        <p className="w-hero-lede text-text-primary body-l">{hero.lede}</p>
        <div className="flex flex-col items-end gap-6 whitespace-nowrap text-text-secondary mono-body">
          <p>{hero.years}</p>
          <p>{hero.disciplines}</p>
        </div>
      </div>
      <h1 className="w-full text-text-primary display-wordmark">{hero.wordmark}</h1>
      <div className="flex w-full items-start gap-12">
        {hero.photos.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={662}
            height={900}
            priority={i < 4}
            sizes="(min-width: 1440px) 331px, 25vw"
            className="h-auto min-w-0 flex-1 rounded-sm"
          />
        ))}
      </div>
    </section>
  );
}
