import type { CSSProperties } from "react";
import { Cta, Footer, Nav, StatCard, Tag } from "@/components/ds";
import { about, type TwoTone } from "@/content/about";
import { config } from "@/lib/config";

/**
 * /about — desktop «About — B · No photos» (421:6180), mobile «About — Mobile 390» (424:6357).
 * Tablet 768–1023: mobile structure, page padding 32, In numbers three in a row (docs/responsive-decisions.md).
 * Texts: content/about.ts. No animation (the page has no Motion notes).
 */

const PX = "px-20 md:px-32 lg:px-40";

/** First part text/primary, the rest text/secondary (as the case Challenge). */
function TwoToneText({ text }: { text: TwoTone }) {
  return (
    <>
      {text.primary}
      <span className="text-text-secondary">{text.secondary}</span>
    </>
  );
}

/** «( Who we are )» / «( Idea to launch )» — label + two-tone statement. Desktop Heading/H1 Large, pt 160, gap 32;
 *  mobile Heading/H5 Large, pt 72, gap 20. */
function Statement({ label, text }: { label: string; text: TwoTone }) {
  return (
    <section className={`flex w-full flex-col items-start gap-20 pt-72 lg:gap-32 lg:pt-160 ${PX}`}>
      <p className="whitespace-nowrap text-text-secondary mono-label">{label}</p>
      <p className="w-full text-text-primary heading-h5-large lg:heading-h1-large">
        <TwoToneText text={text} />
      </p>
    </section>
  );
}

export function AboutPage() {
  const { hero, whoWeAre, whatWeDo, ideaToLaunch, inNumbers, cta } = about;
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main>
          {/* Hero — desktop 421:6182 (pt 72, gap 28; lede 480 left, Mono right; title Display/S two-tone);
              mobile 424:6359 (pt 32, gap 24; lede and Mono stacked; title Heading/H2 → fluid from 768). */}
          <section className={`flex w-full flex-col items-start gap-24 pt-32 lg:gap-28 lg:pt-72 ${PX}`}>
            <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
              <p className="w-full text-text-primary body-l lg:w-about-lede">{hero.lede}</p>
              <div className="flex flex-col items-start gap-6 whitespace-nowrap text-text-secondary mono-body lg:items-end">
                {hero.meta.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            </div>
            <h1
              className="about-title w-full text-text-primary heading-h2 md:about-title-fluid lg:about-title-fluid-lg"
              style={{ "--title-ems": 12.2 } as CSSProperties}
            >
              <span className="block">{hero.title.primary}</span>
              <span className="block text-text-secondary">{hero.title.secondary}</span>
            </h1>
          </section>

          <Statement label={whoWeAre.label} text={whoWeAre.text} />

          {/* What we do — desktop 421:6205 (pt 160, gap 48; Display/S + «( Capabilities )» on the right; rows: border-t
              border/default, py 32, gap 40, label column 560 = letter (Mono/Body L) + Heading/H3, then Body/M secondary
              + tags); mobile 424:6369 (pt 72, gap 32; Heading/H2, label under it; rows stacked, py 24, gap 16,
              letter + Heading/H5 on a baseline). Not links, no hover. */}
          <section className={`flex w-full flex-col items-start gap-32 pt-72 lg:gap-48 lg:pt-160 ${PX}`}>
            <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-text-primary heading-h2 lg:whitespace-nowrap lg:display-s">{whatWeDo.title}</h2>
              <p className="whitespace-nowrap text-text-secondary mono-label">{whatWeDo.label}</p>
            </div>
            {/* Figma: the rows are children of the section frame — same gap between them (32 / 48) */}
            <ul className="flex w-full flex-col gap-32 lg:gap-48">
              {whatWeDo.rows.map((r) => (
                <li
                  key={r.title}
                  className="flex w-full flex-col items-start gap-16 border-t border-border-default py-24 lg:flex-row lg:gap-40 lg:py-32"
                >
                  <div className="flex w-full items-baseline gap-12 lg:w-intro-label lg:shrink-0 lg:items-start lg:gap-24">
                    <p className="whitespace-nowrap text-text-secondary mono-body-l">{r.letter}</p>
                    <h3 className="min-w-0 flex-1 text-text-primary heading-h5 lg:heading-h3">{r.title}</h3>
                  </div>
                  {/* Figma gap 18 has no token → space/20 (as the Home Services rows) */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-20">
                    <p className="w-full text-text-secondary body-m">{r.body}</p>
                    {r.tags.length > 0 && (
                      <div className="flex w-full flex-wrap items-start gap-8">
                        {r.tags.map((t) => (
                          <Tag key={t} label={t} />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <Statement label={ideaToLaunch.label} text={ideaToLaunch.text} />

          {/* In numbers — desktop 421:6253 (pt 160, gap 32; three cards, gap 12, equal height);
              mobile 424:6417 (pt 72, gap 24; cards stacked); tablet three in a row. */}
          <section className={`flex w-full flex-col items-start gap-24 pt-72 lg:gap-32 lg:pt-160 ${PX}`}>
            <p className="whitespace-nowrap text-text-secondary mono-label">{inNumbers.label}</p>
            <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-3">
              {inNumbers.stats.map((s) => (
                <StatCard key={s.label} size="l" value={s.value} label={s.label} note={s.note} className="min-w-0" />
              ))}
            </div>
          </section>

          {/* CTA — desktop 421:6268 (pt 200, pb 40, Display/S two-tone); mobile 424:6432 (pt 72, gap 32, pb 40). */}
          <Cta
            heading={cta.heading}
            headingStyle="display-s"
            primary={cta.primary}
            secondary={cta.secondary}
            primaryHref={config.CONTACT_URL}
            secondaryHref={config.BOOKING_URL}
            note={cta.note}
            spacing="200"
            gap="32"
            className="pb-40"
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
