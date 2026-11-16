import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Nav } from "@/components/ds";
import { selectedWork } from "@/content/home";

export const metadata: Metadata = { title: "Graaho | Bocharov Bureau" };

/**
 * STUB (2026-11-16): Case 04 Graaho is not laid out yet — «Next →» on PulseFit leads here.
 * Shows only the Graaho title and photo from the Home card. Will be replaced by
 * content/cases/graaho.ts rendered through app/work/[slug] (then delete this file).
 */
export default function GraahoStub() {
  const { title, image } = selectedWork.graaho;
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main className="flex w-full flex-col items-start gap-28 px-40 pt-72">
          <Link href="/work" className="whitespace-nowrap text-text-primary label-m">
            ← All work
          </Link>
          <h1 className="w-full text-text-primary display-s">{title}</h1>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1440px) 1360px, calc(100vw - 80px)"
            preload
            className="h-auto w-full rounded-sm"
          />
        </main>
      </div>
      {/* Footer is full-bleed (its fill spans wider screens); its content stays 1440 inside. */}
      <Footer />
    </>
  );
}
