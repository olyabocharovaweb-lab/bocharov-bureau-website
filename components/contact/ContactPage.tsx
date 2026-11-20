import { BriefForm } from "@/components/brief/BriefForm";
import { Footer, Nav, PageHero } from "@/components/ds";
import { contactPage } from "@/content/contact";
import { directLinks, isExternal } from "@/lib/config";

/**
 * /contact — desktop «Contact — Desktop» (432:6249), mobile «Contact — Mobile 390» (432:6409).
 * Tablet 768–1023: mobile structure, padding 32 (docs/responsive-decisions.md). No animation.
 */

const PX = "px-20 md:px-32 lg:px-40";

export function ContactPage() {
  const { hero, brief, direct } = contactPage;
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main>
          {/* Hero — 432:6251 / 432:6411: title Display/XL (220) on desktop, Heading/XL (64) below 1024. */}
          <PageHero lede={hero.lede} meta={hero.meta}>
            <h1 className="w-full text-text-primary heading-xl lg:display-xl">{hero.title}</h1>
          </PageHero>

          {/* Brief — 432:6363 (pt 120, gap 40) / 432:6536 (pt 72, gap 24): the shared sentence form. */}
          <section className={`flex w-full flex-col items-start gap-24 pt-72 lg:gap-40 lg:pt-120 ${PX}`}>
            <p className="whitespace-nowrap text-text-secondary mono-label">{brief.label}</p>
            <BriefForm />
          </section>

          {/* Or reach us directly — 432:6386 (pt 160, gap 40; rows: border-t border/default, py 28, gap 24 — label
              Mono/Label in the 560 column, value Heading/H3, ↗ Heading/H3; border-b under the list; hover plate
              bg/surface as Index rows) / 432:6559 (py 72, gap 24; rows py 20, gap 16 — label over value Body/L,
              gap 6; ↗ Body/L). Links from lib/config.ts. */}
          <section className={`flex w-full flex-col items-start gap-24 pt-72 pb-72 lg:gap-40 lg:pt-160 lg:pb-0 ${PX}`}>
            <p className="whitespace-nowrap text-text-secondary mono-label">{direct.label}</p>
            <ul className="w-full border-b border-border-default">
              {directLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="index-row flex w-full items-center gap-16 border-t border-border-default py-20 lg:gap-24 lg:py-28"
                  >
                    <span className="flex min-w-0 flex-1 flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-24">
                      <span className="whitespace-nowrap text-text-secondary mono-label lg:w-intro-label lg:shrink-0">
                        {l.label}
                      </span>
                      <span className="w-full min-w-0 break-words text-text-primary body-l lg:w-auto lg:flex-1 lg:heading-h3">
                        {l.value}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-text-primary body-l lg:heading-h3">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
