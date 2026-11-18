"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, CaseCard, Cta, IndexRow, Tag } from "@/components/ds";
import { services, workEntries, type Service, type WorkEntry } from "@/content/cases";
import { work } from "@/content/work";
import { cn } from "@/lib/cn";

/**
 * /work — desktop «Work — Variant 1b (light)» (256:68713), mobile «Work — Mobile 390» (378:11795),
 * tablet: mobile structure, 2-column grid, padding 32 (docs/responsive-decisions.md).
 * State lives in the URL: ?service=product-design|brand-identity|web-design and ?view=list (desktop only).
 * No animation (the Figma Motion notes are in docs/motion-notes.md).
 */

export type WorkViewState = { service: Service | null; view: "grid" | "list" };

const PX = "px-20 md:px-32 lg:px-40";
const FULL =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (min-width: 1440px) 1360px, calc(100vw - 80px)";
const HALF = "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 38px), (min-width: 1440px) 674px, calc(50vw - 46px)";

const href = (e: WorkEntry) => `/work/${e.slug}`;
const two = (n: number) => String(n).padStart(2, "0");

export function WorkView({ service, view }: WorkViewState) {
  const router = useRouter();
  const pathname = usePathname();

  const setParams = (next: Partial<WorkViewState>) => {
    const s = next.service !== undefined ? next.service : service;
    const v = next.view ?? view;
    const q = new URLSearchParams();
    if (s) q.set("service", s);
    if (v === "list") q.set("view", "list");
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const matches = (e: WorkEntry) => !service || e.services.includes(service);
  const byOrder = [...workEntries].sort((a, b) => a.order - b.order);
  const shown = byOrder.filter(matches);
  const featured = shown.find((e) => e.featured);
  const grid = shown.filter((e) => !e.featured);
  // Desktop: two columns, alternating by number (02 left, 03 right, 04 left …), right column offset.
  const left = grid.filter((_, i) => i % 2 === 0);
  const right = grid.filter((_, i) => i % 2 === 1);
  const indexRows = [...workEntries].sort((a, b) => a.caseNumber - b.caseNumber).filter(matches);
  const count = (id: Service) => workEntries.filter((e) => e.services.includes(id)).length;
  const cardsHidden = view === "list" ? "lg:hidden" : "";

  return (
    <>
      {/* Hero — desktop 256:68721 (pt 72, gap 28); mobile 378:11797 (pt 32, gap 28, meta stacked) */}
      <section className={`flex w-full flex-col items-start gap-28 pt-32 lg:pt-72 ${PX}`}>
        <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
          <p className="w-full text-text-primary body-l lg:w-hero-lede">
            {work.lede} {work.selectedFrom}
          </p>
          <div className="flex flex-col items-start gap-6 whitespace-nowrap text-text-secondary mono-body lg:items-end">
            <p>{work.years}</p>
            <p>{work.selectedProjects(workEntries.length)}</p>
          </div>
        </div>
        <h1 className="w-full text-text-primary display-wordmark-s lg:display-wordmark">{work.title}</h1>

        {/* Filters (256:68728): Primary = active, Secondary = the rest; Grid / List on the right (desktop only).
            Mobile: one swipeable row bleeding to the right edge. */}
        <div className="flex w-full items-center justify-between gap-24">
          <div
            role="group"
            aria-label="Filter projects by service"
            className="-mr-20 flex min-w-0 flex-1 items-start gap-8 pr-20 max-lg:carousel md:-mr-32 md:pr-32 lg:mr-0 lg:pr-0"
          >
            <Button
              variant={service ? "Secondary" : "Primary"}
              label={`${work.all} ${workEntries.length}`}
              pressed={!service}
              onClick={() => setParams({ service: null })}
            />
            {services.map((s) => (
              <Button
                key={s.id}
                variant={service === s.id ? "Primary" : "Secondary"}
                label={`${s.label} ${count(s.id)}`}
                pressed={service === s.id}
                onClick={() => setParams({ service: s.id })}
              />
            ))}
          </div>
          <div
            role="group"
            aria-label="Layout"
            className="hidden shrink-0 items-start gap-4 rounded-full border border-border-strong p-4 lg:flex"
          >
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setParams({ view: v })}
                className={cn("rounded-full", view === v && "bg-bg-surface")}
              >
                <Tag label={work.views[v]} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — desktop 256:68752 (pt 24, gap 14; title Heading/H5 Large, tags; number + metric on the right);
          mobile 378:11814: an ordinary card (4:5 photo, title + number, tags below, no metric). */}
      {featured && (
        <section className={cn(`w-full pt-40 lg:pt-24 ${PX}`, cardsHidden)}>
          <Link href={href(featured)} className="flex w-full flex-col items-start gap-14">
            <FeaturedImage entry={featured} />
            <div className="flex w-full items-start justify-between gap-16">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-14 lg:gap-6">
                <p className="w-full text-text-primary heading-h6 lg:heading-h5-large">{featured.workCard.title}</p>
                <p className="w-full uppercase text-text-secondary mono-body">{featured.workCard.tags}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-6 whitespace-nowrap">
                <p className="text-text-secondary mono-body">{two(featured.order)}</p>
                {featured.metric && <p className="hidden text-text-primary label-m lg:block">{featured.metric}</p>}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Case grid — desktop 256:68761 (pt 120; two columns gap 12, cards gap 72, right column 200 lower);
          mobile one column by number, gap 40; tablet 2 columns without the offset. The column wrappers are
          `display: contents` below 1024 so CSS order restores the numeric order. */}
      {grid.length > 0 && (
        <section className={cn(`w-full pt-40 lg:pt-120 ${PX}`, cardsHidden)}>
          <div className="flex w-full flex-col gap-40 md:grid md:grid-cols-2 md:gap-x-12 lg:flex lg:flex-row lg:items-start lg:gap-12">
            {[left, right].map((col, c) => (
              <div key={c} className={cn("contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-72", c === 1 && "lg:pt-200")}>
                {col.map((e) => (
                  <CaseCard
                    key={e.slug}
                    title={e.workCard.title}
                    number={two(e.order)}
                    tags={e.workCard.tags}
                    image={e.workCard.image}
                    mobileImage={e.workCard.mobileImage}
                    natural={e.workCard.natural}
                    href={href(e)}
                    sizes={HALF}
                    className="w-full min-w-0"
                    style={{ order: e.order }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <IndexSection rows={indexRows} />

      <Cta heading={work.cta.heading} primary={work.cta.button} secondary={null} spacing="200" />
    </>
  );
}

/** Featured photo: wide desktop image; the Figma mobile crop (4:5) below 768. */
function FeaturedImage({ entry }: { entry: WorkEntry }) {
  const { image, mobileImage } = entry.workCard;
  const className = "aspect-case-mobile w-full rounded-sm object-cover md:aspect-auto md:h-auto";
  if (!mobileImage) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={FULL}
        preload
        fetchPriority="high"
        className={className}
      />
    );
  }
  const { props: wide } = getImageProps({ ...image, sizes: FULL, fetchPriority: "high", loading: "eager" });
  const { props: narrow } = getImageProps({ ...mobileImage, alt: "", sizes: FULL });
  return (
    <picture className="block w-full">
      <source media="(max-width: 767px)" srcSet={narrow.srcSet} sizes={narrow.sizes} width={mobileImage.width} height={mobileImage.height} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...wide} className={className} />
    </picture>
  );
}

/**
 * Index — desktop 256:68938 (pt 160; «Index» Display/S + «( All projects )»; column labels; rows; hover → grey plate
 * and the case photo next to the row, rotated 4°). Hidden below 1024 (client request 2026-11-18: phones and tablets
 * show only the case cards; Figma mobile 378:12028 has the Index).
 */
function IndexSection({ rows }: { rows: WorkEntry[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = canHover ? rows.find((r) => r.slug === hover) : undefined;
  const activeIndex = active ? rows.indexOf(active) : -1;

  return (
    <section className={`hidden w-full flex-col items-start lg:flex lg:pt-160 ${PX}`}>
      <div className="flex w-full items-baseline justify-between pb-32 lg:items-end">
        <h2 className="whitespace-nowrap text-text-primary heading-h2 lg:display-s">{work.index.title}</h2>
        <p className="whitespace-nowrap text-text-secondary mono-label">{work.index.label}</p>
      </div>
      <div
        aria-hidden="true"
        className="hidden w-full items-start gap-24 border-t border-border-inverse py-12 text-text-secondary mono-caption lg:flex"
      >
        <p className="w-index-year shrink-0">{work.index.columns.year}</p>
        <p className="w-index-client shrink-0">{work.index.columns.client}</p>
        <p className="w-index-industry shrink-0">{work.index.columns.industry}</p>
        <p className="min-w-0 flex-1">{work.index.columns.services}</p>
        <p className="w-index-arrow shrink-0" />
      </div>
      <div className="relative w-full" onPointerLeave={() => setHover(null)}>
        {rows.map((r) => (
          <IndexRow
            key={r.slug}
            {...r.index}
            href={href(r)}
            onPointerEnter={() => setHover(r.slug)}
            onFocus={() => setHover(r.slug)}
          />
        ))}
        {active && (
          // Preview photo (256:69016): 220 × 280, 279 from the left, 98 above the hovered row, rotated 4°. No animation.
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-index-preview-x z-10 w-index-preview rotate-4"
            style={{ top: `calc(${activeIndex} * (100% / ${rows.length}) - var(--spacing-index-preview-y))` }}
          >
            <Image
              src={active.workCard.image.src}
              alt=""
              width={active.workCard.image.width}
              height={active.workCard.image.height}
              sizes="220px"
              className="aspect-index-preview w-full rounded-sm object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
