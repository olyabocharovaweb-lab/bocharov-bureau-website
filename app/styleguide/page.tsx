import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Button,
  CaseCard,
  CreditsRow,
  Cta,
  Footer,
  IndexRow,
  MediaCaption,
  MetaItem,
  Nav,
  SectionIntro,
  StatCard,
  Tag,
  IconToggle,
} from "@/components/ds";
import { workEntries } from "@/content/cases";
import { radii, semanticColors, spacing } from "@/content/tokens";
import { textStyles } from "@/content/text-styles";

export const metadata: Metadata = { title: "Styleguide — Bocharov® Bureau", robots: { index: false } };

function Block({ id, title, figma, children }: { id: string; title: string; figma?: string; children: ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-24 border-t border-border-default px-40 pt-40 pb-72">
      <div className="flex items-start justify-between">
        <h2 className="text-text-primary heading-h4">{title}</h2>
        {figma && <p className="text-text-secondary mono-body">Figma {figma}</p>}
      </div>
      {children}
    </section>
  );
}

/** Full-bleed component specimen: the component sits in a 1440 frame exactly like in Figma. */
function Specimen({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-12">
      <p className="px-40 text-text-secondary mono-caption">{label}</p>
      <div data-specimen={id} className="w-page">
        {children}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="flex flex-col pb-200">
      <header className="flex flex-col gap-16 px-40 pt-72 pb-72">
        <p className="text-text-secondary mono-label">Iteration 1 · static</p>
        <h1 className="text-text-primary display-s">Bocharov®Bureau — Design System</h1>
      </header>

      <Block id="colors" title="Color" figma="Primitives → Color">
        <div className="grid grid-cols-6 gap-16">
          {semanticColors.map((c) => (
            <div key={c.name} className="flex flex-col gap-10">
              <div className={`h-120 w-full rounded-md border border-border-default ${c.swatch}`} />
              <p className="text-text-primary label-s">{c.name}</p>
              <p className="text-text-secondary mono-body">var({c.cssVar})</p>
              <p className="text-text-tertiary mono-body">→ {c.alias}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="spacing" title="Spacing" figma="space/2 … space/200">
        <div className="flex items-end gap-12">
          {spacing.map((s) => (
            <div key={s.token} className="flex flex-col items-start gap-6">
              <div className={`w-24 bg-bg-inverse ${s.h}`} />
              <p className="text-text-secondary mono-micro">{s.token.replace("space/", "")}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="radius" title="Radius" figma="radius/xs … radius/full">
        <div className="flex items-start gap-24">
          {radii.map((r) => (
            <div key={r.token} className="flex flex-col gap-8">
              <div className={`h-120 w-120 border border-border-strong bg-bg-surface ${r.cls}`} />
              <p className="text-text-secondary mono-body">{r.token}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="typography" title="Typography" figma="39 text styles">
        <div className="flex flex-col">
          {textStyles.map((t) => (
            <div key={t.name} className="flex items-center gap-24 border-t border-border-default py-16">
              <div className="flex w-intro-label shrink-0 flex-col gap-6">
                <p className="text-text-primary label-s">{t.name}</p>
                <p className="text-text-secondary mono-body">.{t.className} · {t.spec}</p>
              </div>
              <p className={`min-w-0 flex-1 truncate text-text-primary ${t.className}`}>
                {t.name.startsWith("Display/Wordmark") || t.name.startsWith("Display/XL") || t.name.startsWith("Display/L")
                  ? "Bocharov®"
                  : t.name.startsWith("Mono")
                    ? "Case 01 / 12 · Motion"
                    : "Look closer, build smarter"}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="components" title="Components" figma="Design System page · 12 + Motion note (docs only)">
        <div className="flex flex-col gap-16">
          <p className="text-text-secondary body-xs">
            Each specimen below is rendered inside a 1440-wide frame (or at its Figma size) and compared with the Figma
            component screenshot in docs/qa/components.
          </p>
        </div>
      </Block>

      <div className="flex flex-col gap-72">
        <Specimen id="nav" label="Nav · 260:10">
          <Nav />
        </Specimen>
        <Specimen id="footer" label="Footer · 260:33">
          <Footer />
        </Specimen>
        <Specimen id="cta" label="CTA · 260:107">
          <Cta />
        </Specimen>
        <Specimen id="section-intro-section" label="Section intro · Spacing=Section · 260:89">
          <SectionIntro spacing="Section" />
        </Specimen>
        <Specimen id="section-intro-subsection" label="Section intro · Spacing=Subsection · 260:95">
          <SectionIntro spacing="Subsection" />
        </Specimen>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Button · 260:83 — Style=Primary / Secondary / Link · Arrow=true / false</p>
          <div className="flex items-start gap-24">
            <div data-specimen="button-primary" className="inline-flex">
              <Button variant="Primary" fixedWidth />
            </div>
            <div data-specimen="button-secondary" className="inline-flex">
              <Button variant="Secondary" fixedWidth />
            </div>
            <div data-specimen="button-link" className="inline-flex">
              <Button variant="Link" fixedWidth />
            </div>
            <div data-specimen="button-link-noarrow" className="inline-flex">
              <Button variant="Link" arrow={false} fixedWidth />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Tag · 260:36 · Meta item · 260:40</p>
          <div className="flex items-start gap-24">
            <div data-specimen="tag" className="inline-flex">
              <Tag />
            </div>
            <div data-specimen="meta-item" className="inline-flex">
              <MetaItem />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Icon / Toggle · 327:13 · State=Closed / Open</p>
          <div className="flex items-start gap-24">
            <div data-specimen="icon-toggle-closed" className="inline-flex">
              <IconToggle />
            </div>
            <div data-specimen="icon-toggle-open" className="inline-flex">
              <IconToggle open />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Media caption · 260:44</p>
          <div data-specimen="media-caption">
            <MediaCaption />
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Stat card · 260:49 · Credits row · 260:53</p>
          <div className="grid grid-cols-4 items-start gap-12">
            <div data-specimen="stat-card">
              <StatCard />
            </div>
          </div>
          <div className="flex gap-24">
            <div className="w-intro-label shrink-0" />
            <div data-specimen="credits-row" className="min-w-0 flex-1">
              <CreditsRow />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Case card · 260:64</p>
          <div className="grid grid-cols-2 gap-12">
            <div data-specimen="case-card">
              <CaseCard image={{ src: "/media/industrylens-card.webp", alt: "IndustryLens poster on a city wall", width: 1348, height: 1520 }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-40">
          <p className="text-text-secondary mono-caption">Index row · 260:71</p>
          <div data-specimen="index-row">
            <IndexRow {...workEntries[2].index} />
          </div>
        </div>
      </div>
    </main>
  );
}
