import Image from "next/image";
import Link from "next/link";
import { Button, CreditsRow, Cta, Footer, MediaCaption, MetaItem, Nav, SectionIntro, StatCard, Tag } from "@/components/ds";
import { RevealText } from "@/components/home/RevealText";
import type { CaseData, CaseIntro } from "@/content/cases/types";

/**
 * One template for every case page (Figma: «Case — PulseFit» 256:70753 as the reference).
 * Sections are composed from design-system components; client media are exported images.
 * Motion: only the Challenge text reveal (as Home Manifesto, client request). The Figma Motion note
 * «лічильники від 0» is in docs/motion-notes.md, not implemented.
 */

/** Content column at 1440 = 1360 (px 40). */
const CONTENT_SIZES = "(min-width: 1440px) 1360px, calc(100vw - 80px)";

function Intro({ intro }: { intro: CaseIntro }) {
  return <SectionIntro label={intro.label} body={intro.body} spacing={intro.spacing} />;
}

export function CasePage({ data }: { data: CaseData }) {
  const { hero, overview, challenge, sections, delivered, credits, cta, next } = data;
  return (
    <div className="mx-auto w-full max-w-page">
      <Nav />
      <main>
        {/* Hero — 256:70761: pt 72, px 40, gap 28 */}
        <section className="flex w-full flex-col items-start gap-28 px-40 pt-72">
          <div className="flex w-full items-end justify-between">
            <div className="flex items-start gap-10">
              <Link href="/work" className="whitespace-nowrap text-text-primary label-m">
                {hero.back}
              </Link>
              <p className="whitespace-pre text-text-secondary body-s">{hero.category}</p>
            </div>
            <div className="flex flex-col items-end gap-6 whitespace-nowrap mono-body">
              <p className="text-text-secondary">{hero.index}</p>
              <Link href={next.href} className="text-text-primary">
                {hero.nextLabel}
              </Link>
            </div>
          </div>
          <h1 className="w-full text-text-primary display-xl">{hero.title}</h1>
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            sizes={CONTENT_SIZES}
            preload
            className="h-auto w-full rounded-sm"
          />
        </section>

        {/* Overview — 256:70771: pt 140, px 40, gap 24; right column gap 28 */}
        <section className="flex w-full items-start gap-24 px-40 pt-section">
          <div className="flex w-intro-label shrink-0 flex-col items-start">
            <p className="whitespace-nowrap text-text-secondary mono-label">{overview.label}</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-28">
            <p className="w-full text-text-primary heading-h4">{overview.lead}</p>
            <div className="flex w-full flex-wrap items-start gap-8">
              {overview.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <div className="flex w-full items-start gap-24">
              {overview.facts.map((f) => (
                <MetaItem key={f.label} label={f.label} value={f.value} className="min-w-0 flex-1" />
              ))}
            </div>
            {overview.action && <Button variant="Link" arrow={false} label={overview.action} disabled />}
          </div>
        </section>

        {/* Challenge — 256:70805: pt 160, px 40, gap 32, Heading/H1.
            Client 2026-11-16: whole text text/primary (Figma: rest secondary) + the same scroll reveal as Home Manifesto. */}
        <section className="flex w-full flex-col items-start gap-32 px-40 pt-160">
          <p className="whitespace-nowrap text-text-secondary mono-label">{challenge.label}</p>
          <RevealText
            className="w-full heading-h1"
            segments={[
              { text: challenge.lead, className: "text-text-primary" },
              { text: challenge.rest, className: "text-text-primary" },
            ]}
          />
        </section>

        {/* Intros + client media (each media frame: pt 72, px 40, gap 12) */}
        {sections.map((s, i) =>
          s.kind === "intro" ? (
            <Intro key={i} intro={s} />
          ) : (
            <figure key={i} className="flex w-full flex-col items-start gap-12 px-40 pt-72">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes={CONTENT_SIZES}
                className="h-auto w-full rounded-sm"
              />
              <figcaption className="w-full">
                <MediaCaption caption={s.caption} number={s.number} />
              </figcaption>
            </figure>
          ),
        )}

        {/* Delivered — Section intro + Result cards (256:71916: pt 32, px 40, gap 12) */}
        <Intro intro={delivered.intro} />
        <div className="flex w-full items-start gap-12 px-40 pt-32">
          {delivered.stats.map((st) => (
            <StatCard key={st.label} value={st.value} label={st.label} note={st.note} className="min-w-0 flex-1" />
          ))}
        </div>
        {delivered.footnote && (
          // 256:71933: pt 12, px 40 — Mono/Caption, text/tertiary, original case
          <p className="px-40 pt-12 normal-case text-text-tertiary mono-caption">{delivered.footnote}</p>
        )}

        {/* Credits — 256:71948: pt 140, px 40, gap 24 */}
        <section className="flex w-full items-start gap-24 px-40 pt-section">
          <div className="flex w-intro-label shrink-0 flex-col items-start">
            <p className="whitespace-nowrap text-text-secondary mono-label">{credits.label}</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            {credits.rows.map((r) => (
              <CreditsRow key={r.role} role={r.role} name={r.name} />
            ))}
          </div>
        </section>

        <Cta heading={cta.heading} />

        {/* Next project — 256:71984: pt 200, px 40, gap 14. One link for the whole block. */}
        <section className="w-full px-40 pt-200">
          <Link href={next.href} className="flex w-full flex-col items-start gap-14">
            <div className="flex w-full items-end justify-between">
              <h2 className="whitespace-nowrap text-text-primary display-s">{next.heading}</h2>
              <p className="whitespace-nowrap text-text-secondary mono-label">{next.counter}</p>
            </div>
            <Image
              src={next.image.src}
              alt={next.image.alt}
              width={next.image.width}
              height={next.image.height}
              sizes={CONTENT_SIZES}
              className="aspect-next-photo w-full rounded-sm object-cover"
            />
            <div className="flex w-full items-start justify-between">
              <p className="whitespace-nowrap text-text-primary heading-h6">{next.title}</p>
              <p className="whitespace-pre text-text-secondary mono-caption">{next.tags}</p>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
