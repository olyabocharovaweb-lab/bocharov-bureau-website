import Image from "next/image";
import { hero } from "@/content/home";

export function Hero() {
  const letters = [...hero.wordmark, "®"];
  return (
    <section aria-labelledby="hero-title" className="flex flex-col gap-6 px-gutter pt-12 md:pt-[72px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <p className="max-w-[460px] text-lead">{hero.intro}</p>
        <div className="flex flex-col gap-[6px] font-mono text-mono tracking-mono text-muted lg:items-end">
          <p>{hero.years}</p>
          <p>{hero.disciplines}</p>
        </div>
      </div>

      <h1 id="hero-title" className="text-wordmark leading-[0.9] whitespace-nowrap">
        <span className="sr-only">Bocharov® Bureau</span>
        {/* clip only the bottom edge, so letters rise from under the baseline */}
        <span aria-hidden className="block [clip-path:inset(-50%_-5%_0_-5%)]">
          {letters.map((ch, i) => (
            <span key={i} className="rise-letter" style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      </h1>

      <ul className="grid grid-cols-2 gap-grid md:grid-cols-4">
        {hero.photos.map((p, i) => (
          <li
            key={p.src}
            className="media-intro relative aspect-[331/450] overflow-hidden rounded-[var(--radius-media)] bg-surface"
            style={{ "--i": i } as React.CSSProperties}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              loading="eager"
              fetchPriority={i < 2 ? "high" : "auto"}
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
