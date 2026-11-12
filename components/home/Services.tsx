import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TagList } from "@/components/ui/Tag";
import { services } from "@/content/home";
import { cn } from "@/lib/cn";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="flex flex-col gap-12 px-gutter pt-section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="services-title" data-split className="text-h-lg font-semibold tracking-display">
          {services.title}
        </h2>
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
          <SectionLabel>{services.label}</SectionLabel>
          <ButtonLink href="#brief">{services.cta}</ButtonLink>
        </div>
      </div>

      <ol className="flex flex-col gap-12">
        {services.items.map((s) => {
          const featured = Boolean(s.image);
          return (
            <li
              key={s.index}
              className="group/svc flex flex-col gap-5 border-t border-line py-8 md:flex-row md:gap-10"
            >
              <div className="flex gap-6 md:w-[41.18%] md:shrink-0">
                <span className="shrink-0 pt-1 font-mono text-[14px] leading-[1.2] whitespace-nowrap text-muted">{s.index}</span>
                <h3 className="text-service font-medium tracking-title">{s.title}</h3>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-5">
                <p
                  className={cn(
                    "text-body-lg transition-colors duration-500",
                    featured ? "text-ink" : "text-muted group-hover/svc:text-ink",
                  )}
                >
                  {s.description}
                </p>
                <TagList tags={s.tags} label={`${s.title} services`} />
              </div>
              {s.image && (
                <div
                  data-reveal="media"
                  className="relative hidden aspect-[360/220] overflow-hidden rounded-[var(--radius-media)] bg-surface lg:block lg:w-[26.47%] lg:shrink-0"
                >
                  <div data-reveal-inner className="absolute inset-0">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1440px) 360px, 27vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
