import Image from "next/image";
import { testimonials } from "@/content/home";

/** Hidden by `siteConfig.flags.showTestimonials` until real Clutch quotes exist. */
export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="flex flex-col gap-12 px-gutter pt-section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="reviews-title" data-split className="text-h-lg font-semibold tracking-display">
          {testimonials.title}
        </h2>
        <div className="flex flex-col gap-1 md:items-end">
          <p className="text-service leading-[1.21] font-semibold tracking-title">{testimonials.rating}</p>
          <p className="label-mono">{testimonials.ratingLabel}</p>
        </div>
      </div>
      <ul className="grid gap-grid md:grid-cols-3">
        {testimonials.items.map((t) => (
          <li key={t.author} data-reveal="fade" className="flex gap-5 rounded-[var(--radius-card)] bg-surface p-6">
            <div className="relative h-[120px] w-24 shrink-0 overflow-hidden rounded-full">
              <Image src={t.photo} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <figure className="flex min-w-0 flex-col gap-[14px]">
              <blockquote className="text-quote">{t.quote}</blockquote>
              <figcaption className="font-mono text-mono tracking-[0.03em] text-muted uppercase">
                {t.author}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
