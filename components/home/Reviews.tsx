import Image from "next/image";
import { homeSections, reviews } from "@/content/home";

/**
 * Figma: Reviews — desktop 256:68612 (pt 140, px 40, gap 48; 3 cards in a row, gap 12, p 24, gap 20,
 * photo 96 × 120 left); mobile 322:6035 (pt 72, px 20, gap 32; title Heading/H2 + rating stacked;
 * 296px cards in a native scroll-snap carousel, photo 64 × 80 above the quote, gap 16).
 * Card fill = color/bg/surface; role line = Mono/Body + UPPER (see ds-gaps).
 * Rendered only when content/home.ts → homeSections.reviews is on.
 */
export function Reviews() {
  if (!homeSections.reviews) return null;
  return (
    <section className="flex w-full flex-col items-start gap-32 px-20 pt-72 md:px-32 lg:gap-48 lg:px-40 lg:pt-section">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between lg:whitespace-nowrap">
        <h2 className="text-text-primary heading-h2 lg:display-s">{reviews.title}</h2>
        <div className="flex flex-col items-end gap-4 whitespace-nowrap">
          <p className="text-text-primary numeral-m">{reviews.rating}</p>
          <p className="text-text-secondary mono-body">{reviews.ratingNote}</p>
        </div>
      </div>
      <div
        role="region"
        aria-label="Client reviews"
        tabIndex={0}
        className="-mr-20 flex w-auto items-stretch gap-12 self-stretch pr-20 max-lg:carousel md:-mr-32 md:pr-32 lg:mr-0 lg:w-full lg:pr-0"
      >
        {reviews.items.map((r) => (
          <figure
            key={r.role}
            className="flex w-review-card shrink-0 flex-col items-start gap-16 rounded-md bg-bg-surface p-24 lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink lg:flex-row lg:gap-20"
          >
            <Image
              src={r.photo}
              alt=""
              width={96}
              height={120}
              sizes="(min-width: 1024px) 96px, 64px"
              className="aspect-review-photo w-review-photo shrink-0 rounded-full object-cover lg:w-review-photo-lg"
            />
            <div className="flex w-full min-w-0 flex-col items-start gap-14 lg:flex-1">
              <blockquote className="w-full text-text-primary body-m-small">{r.quote}</blockquote>
              <figcaption className="w-full uppercase text-text-secondary mono-body">{r.role}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
