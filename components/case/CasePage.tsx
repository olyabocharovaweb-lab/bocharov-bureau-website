import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Button, CreditsRow, Cta, Footer, MediaCaption, MetaItem, Nav, SectionIntro, StatCard, Tag } from "@/components/ds";
import { RevealText } from "@/components/home/RevealText";
import { CaseMediaMobile } from "./CaseMediaMobile";
import { caseChain, getNextEntry, getWorkEntry, twoDigits } from "@/content/cases/work";
import type { CaseData, CaseImage, CaseIntro, CaseMedia, CaseSection } from "@/content/cases/types";

/**
 * One template for every case page.
 * Desktop (≥ 1024): «Case — PulseFit» 256:70753. Mobile (≤ 767): «Case — PulseFit · Mobile 390» 331:5241.
 * Tablet (768–1023): mobile structure, page padding 32 (docs/responsive-decisions.md).
 * Sections are composed from design-system components; client media are exported images.
 * Motion: only the Challenge text reveal (as Home Manifesto, client request). The Figma Motion note
 * «лічильники від 0» is in docs/motion-notes.md, not implemented.
 */

/** Content column: 390 − 2×20, 768–1023 − 2×32, 1024–1439 − 2×40, 1360 at 1440. */
const CONTENT_SIZES =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (min-width: 1440px) 1360px, calc(100vw - 80px)";

/** Page padding per breakpoint. */
const PX = "px-20 md:px-32 lg:px-40";

/** Figma placeholders («[юр. назва]», «Name Surname») are kept in the data but never rendered. */
const isPlaceholder = (v: string) => /\[[^\]]*\]|Name Surname/.test(v);

function Intro({ intro, labelClassName }: { intro: CaseIntro; labelClassName?: string }) {
  return <SectionIntro label={intro.label} body={intro.body} spacing={intro.spacing} labelClassName={labelClassName} />;
}

function MediaFigure({ media }: { media: CaseMedia }) {
  return (
    <figure className={`flex w-full flex-col items-start gap-12 pt-40 ${media.gap === "48" ? "lg:pt-48" : "lg:pt-72"} ${PX}`}>
      <Media media={media} />
      <figcaption className="w-full">
        <MediaCaption caption={media.caption} number={media.number} />
      </figcaption>
    </figure>
  );
}

/** Splits the sections into runs that start at an intro (media before the first intro form their own run). */
function groupByIntro(sections: CaseSection[]) {
  const groups: Array<{ intro?: CaseIntro; media: CaseMedia[] }> = [];
  for (const s of sections) {
    if (s.kind === "intro") groups.push({ intro: s, media: [] });
    else if (groups.length === 0) groups.push({ media: [s] });
    else groups[groups.length - 1].media.push(s);
  }
  return groups;
}

/**
 * `stickyLabels`, desktop only: the intro label is copied into a layer that spans the whole run (intro + media)
 * and is position: sticky inside it, 120 below the top (under the scrolled nav pill). The intro's own label is
 * hidden from 1024 so the text isn't doubled; below 1024 the layer is not shown.
 */
function StickyRun({ intro, media }: { intro: CaseIntro; media: CaseMedia[] }) {
  return (
    <div className="relative w-full">
      <div
        className={`pointer-events-none absolute inset-0 z-10 hidden lg:block lg:px-40 ${intro.spacing === "Section" ? "lg:pt-180" : "lg:pt-120"}`}
      >
        <p className="sticky top-120 whitespace-pre text-text-secondary mono-label">{intro.label}</p>
      </div>
      <Intro intro={intro} labelClassName="lg:invisible" />
      {media.map((m, i) => (
        <MediaFigure key={i} media={m} />
      ))}
    </div>
  );
}

type ArtImageProps = {
  image: CaseImage;
  mobile?: Omit<CaseImage, "alt">;
  className: string;
  /** Hero only: preload with high priority. */
  priority?: boolean;
};

/**
 * Desktop image, or — when a `mobile` version exists — a <picture> that swaps it in at ≤ 767px
 * (art direction). Either way width 100% / height auto, so a different ratio never breaks the layout.
 */
function ArtImage({ image, mobile, className, priority = false }: ArtImageProps) {
  const loading = priority ? { preload: true, fetchPriority: "high" as const } : {};
  if (!mobile) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={CONTENT_SIZES}
        {...loading}
        className={className}
      />
    );
  }
  const { props: wide } = getImageProps({ ...image, sizes: CONTENT_SIZES, ...(priority ? { fetchPriority: "high" as const, loading: "eager" as const } : {}) });
  const { props: narrow } = getImageProps({ ...mobile, alt: "", sizes: CONTENT_SIZES });
  return (
    <picture className="block w-full">
      <source
        media="(max-width: 767px)"
        srcSet={narrow.srcSet}
        sizes={narrow.sizes}
        width={mobile.width}
        height={mobile.height}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...wide} className={className} />
    </picture>
  );
}

/**
 * Client media. With phone versions (`mobile`): below 768 the Figma mobile images in a column (CaseMediaMobile),
 * from 768 the desktop image — each lazy and display:none on the other side, so only one set is downloaded.
 * Without them the desktop image scales down at every width.
 */
function Media({ media }: { media: CaseMedia }) {
  const desktop = media.plain ? "h-auto w-full" : "h-auto w-full rounded-sm";
  if (!media.mobile?.length) return <ArtImage image={media.image} className={desktop} />;
  return (
    <>
      <CaseMediaMobile images={media.mobile} alt={media.image.alt} />
      <ArtImage image={media.image} className={`${desktop} max-md:hidden`} />
    </>
  );
}

export function CasePage({ data }: { data: CaseData }) {
  const { hero, overview, challenge, sections, delivered, credits, cta, stickyLabels } = data;
  const titleEms = hero.titleEms ?? hero.title.length * 0.62;
  // Number, total and the Next case come from content/cases/work.ts (published cases, by case number).
  const total = caseChain.length;
  const caseNumber = getWorkEntry(data.slug)?.caseNumber ?? 0;
  const nextEntry = getNextEntry(data.slug);
  const next = {
    href: `/work/${nextEntry.slug}`,
    heading: data.next.heading,
    counter: `( ${twoDigits(nextEntry.caseNumber)} / ${total} )`,
    title: nextEntry.workCard.title,
    tags: `${nextEntry.workCard.tags}  →`,
    // the next case's hero when it has a page, otherwise its Work card photo
    image: nextEntry.page?.hero.image ?? nextEntry.workCard.image,
  };
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main>
          {/* Hero — desktop 256:70761 (pt 72, px 40, gap 28); mobile 331:5243 (pt 32, px 20, gap 28):
              breadcrumb and case index stacked on the left (gap 8); «Next →» only from 1024 (not in the
              mobile layout — the Next project block covers it); photo 4:5 cover on phones. */}
          <section className={`flex w-full flex-col items-start gap-28 pt-32 lg:pt-72 ${PX}`}>
            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
              <div className="flex items-start gap-10">
                <Link href="/work" className="whitespace-nowrap text-text-primary label-m">
                  {hero.back}
                </Link>
                <p className="whitespace-pre text-text-secondary body-s">{hero.category}</p>
              </div>
              <div className="flex flex-col items-start gap-6 whitespace-nowrap mono-body lg:items-end">
                <p className="text-text-secondary">{`${hero.year} · Case ${twoDigits(caseNumber)} / ${total}`}</p>
                <Link href={next.href} className="text-text-primary max-lg:hidden">
                  {hero.nextLabel}
                </Link>
              </div>
            </div>
            <h1
              className="case-title w-full text-text-primary lg:display-xl"
              style={{ "--title-ems": titleEms } as CSSProperties}
            >
              {hero.title}
            </h1>
            <ArtImage
              image={hero.image}
              mobile={hero.mobile}
              priority
              className={
                hero.natural
                  ? "h-auto w-full rounded-sm"
                  : "aspect-case-mobile w-full rounded-sm object-cover object-center md:aspect-auto md:h-auto"
              }
            />
          </section>

          {/* Overview — desktop 256:70771 (pt 140, label column 560 + content, gap 24);
              mobile 331:5253 (pt 72, label above, gap 16; lead Heading/H5; facts 2 × 2, gap 20; button full width). */}
          <section className={`flex w-full flex-col items-start gap-16 pt-72 lg:flex-row lg:gap-24 lg:pt-section ${PX}`}>
            <div className="flex w-full flex-col items-start lg:w-intro-label lg:shrink-0">
              <p className="whitespace-nowrap text-text-secondary mono-label">{overview.label}</p>
            </div>
            <div className="flex w-full min-w-0 flex-col items-start gap-28 lg:flex-1">
              <p className="w-full text-text-primary heading-h5 lg:heading-h4">{overview.lead}</p>
              <div className="flex w-full flex-wrap items-start gap-8">
                {overview.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
              <div className="grid w-full grid-cols-2 gap-20 md:grid-cols-4 lg:flex lg:items-start lg:gap-24">
                {overview.facts.filter((f) => !isPlaceholder(f.value)).map((f) => (
                  <MetaItem key={f.label} label={f.label} value={f.value} className="min-w-0 lg:flex-1" />
                ))}
              </div>
              {overview.action && (
                overview.actionHref ? (
                  <Button variant="Link" label={overview.action} href={overview.actionHref} className="w-full lg:w-auto" />
                ) : (
                  <Button variant="Link" arrow={false} label={overview.action} disabled className="w-full lg:w-auto" />
                )
              )}
            </div>
          </section>

          {/* Challenge — desktop 256:70805 (pt 160, gap 32, Heading/H1; client: all text/primary + scroll reveal);
              mobile 331:5271 (pt 72, gap 32, Heading/H5 Large; first sentence primary, the rest secondary). */}
          <section className={`flex w-full flex-col items-start gap-32 pt-72 lg:pt-160 ${PX}`}>
            <p className="whitespace-nowrap text-text-secondary mono-label">{challenge.label}</p>
            <RevealText
              className="w-full heading-h5-large lg:heading-h1"
              segments={[
                { text: challenge.lead, className: "text-text-primary" },
                { text: challenge.rest, className: "text-text-secondary lg:text-text-primary" },
              ]}
            />
          </section>

          {/* Intros + client media (media: desktop pt 72 or 48, gap 12; mobile 331:5275 pt 40). */}
          {stickyLabels
            ? groupByIntro(sections).map((g, i) =>
                g.intro ? (
                  <StickyRun key={i} intro={g.intro} media={g.media} />
                ) : (
                  g.media.map((m, j) => <MediaFigure key={`${i}-${j}`} media={m} />)
                ),
              )
            : sections.map((s, i) => (s.kind === "intro" ? <Intro key={i} intro={s} /> : <MediaFigure key={i} media={s} />))}

          {/* Delivered — Section intro + Result cards. Desktop 256:71916: 4 in a row, gap 12, pt 32;
              mobile 331:6330: 2 × 2, gap 12, pt 32; tablet: 4 in a row. */}
          <Intro intro={delivered.intro} />
          <div className={`grid w-full grid-cols-2 items-start gap-12 pt-32 md:grid-cols-4 ${PX}`}>
            {delivered.stats.map((st) => (
              <StatCard key={st.label} value={st.value} label={st.label} note={st.note} className="min-w-0" />
            ))}
          </div>
          {delivered.footnote && (
            // 256:71933 / 331:6335: pt 12 — Mono/Caption, text/tertiary, original case
            <p className={`pt-12 normal-case text-text-tertiary mono-caption ${PX}`}>{delivered.footnote}</p>
          )}

          {/* Credits — desktop 256:71948 (pt 140, label column 560 + rows, gap 24);
              mobile 331:6348 (pt 72, label above, gap 16). */}
          <section className={`flex w-full flex-col items-start gap-16 pt-72 lg:flex-row lg:gap-24 lg:pt-section ${PX}`}>
            <div className="flex w-full flex-col items-start lg:w-intro-label lg:shrink-0">
              <p className="whitespace-nowrap text-text-secondary mono-label">{credits.label}</p>
            </div>
            <div className="flex w-full min-w-0 flex-col items-start lg:flex-1">
              {credits.rows.filter((r) => !isPlaceholder(r.name)).map((r) => (
                <CreditsRow key={r.role} role={r.role} name={r.name} />
              ))}
            </div>
          </section>

          <Cta heading={cta.heading} />

          {/* Next project — desktop 256:71984 (pt 200, gap 14, Display/S, photo 1360 × 620);
              mobile 331:6361 (pt 72, gap 14, Heading/H2, photo 4:5, title and tags stacked). One link. */}
          {/* pb 72 below 1024: white space before the black mobile footer (section spacing); desktop as Figma (0). */}
          <section className={`w-full pt-72 pb-72 lg:pt-200 lg:pb-0 ${PX}`}>
            <Link href={next.href} className="flex w-full flex-col items-start gap-14">
              <div className="flex w-full items-end justify-between gap-16">
                <h2 className="text-text-primary heading-h2 lg:whitespace-nowrap lg:display-s">{next.heading}</h2>
                <p className="shrink-0 whitespace-nowrap text-text-secondary mono-label">{next.counter}</p>
              </div>
              <Image
                src={next.image.src}
                alt={next.image.alt}
                width={next.image.width}
                height={next.image.height}
                sizes={CONTENT_SIZES}
                className="aspect-case-mobile w-full rounded-sm object-cover md:aspect-next-photo"
              />
              <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
                <p className="w-full text-text-primary heading-h6 lg:w-auto lg:whitespace-nowrap">{next.title}</p>
                <p className="w-full whitespace-pre-wrap text-text-secondary mono-caption lg:w-auto lg:whitespace-pre">
                  {next.tags}
                </p>
              </div>
            </Link>
          </section>
        </main>
      </div>
      {/* Footer is full-bleed (its fill spans wider screens); its content stays 1440 inside. */}
      <Footer />
    </>
  );
}
