import type { Metadata } from "next";
import { CaseCard, Footer, Nav } from "@/components/ds";
import { selectedWork } from "@/content/home";

export const metadata: Metadata = { title: "Work | Bocharov Bureau" };

/**
 * STUB (2026-11-16): the Work page (Figma «Work») is not laid out yet. It exists so that
 * «← All work» on case pages leads somewhere; it shows the PulseFit card linking to its case.
 * The real page (cards + Index rows linking to /work/<slug>) comes in its own iteration.
 */
export default function WorkPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main className="flex w-full flex-col items-start gap-40 px-20 pt-32 md:px-32 lg:gap-48 lg:px-40 lg:pt-72">
          <h1 className="text-text-primary heading-h2 lg:display-s">Work</h1>
          <CaseCard className="w-full" {...selectedWork.featured} sizes="(min-width: 1440px) 1360px, 100vw" />
        </main>
      </div>
      {/* Footer is full-bleed (its fill spans wider screens); its content stays 1440 inside. */}
      <Footer />
    </>
  );
}
