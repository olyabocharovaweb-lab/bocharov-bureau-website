import Image from "next/image";
import { reviews } from "@/content/home";

/**
 * Figma: Reviews (256:68612) — pt 140, px 40, gap 48; cards gap 12, p 24, gap 20.
 * Card fill #F9F9F9 has no variable → color/bg/surface; role line = Mono/Body + UPPER (see ds-gaps).
 */
export function Reviews() {
  return (
    <section className="flex w-full flex-col items-start gap-48 px-40 pt-section">
      <div className="flex w-full items-end justify-between whitespace-nowrap">
        <h2 className="text-text-primary display-s">{reviews.title}</h2>
        <div className="flex flex-col items-end gap-4">
          <p className="text-text-primary numeral-m">{reviews.rating}</p>
          <p className="text-text-secondary mono-body">{reviews.ratingNote}</p>
        </div>
      </div>
      <div className="flex w-full items-stretch gap-12">
        {reviews.items.map((r) => (
          <figure key={r.role} className="flex min-w-0 flex-1 items-start gap-20 rounded-md bg-bg-surface p-24">
            <Image src={r.photo} alt="" width={96} height={120} className="shrink-0 rounded-full object-cover" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-14">
              <blockquote className="w-full text-text-primary body-m-small">{r.quote}</blockquote>
              <figcaption className="w-full uppercase text-text-secondary mono-body">{r.role}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
