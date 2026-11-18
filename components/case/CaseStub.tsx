import Image from "next/image";
import Link from "next/link";
import { Footer, Nav } from "@/components/ds";
import type { WorkEntry } from "@/content/cases";

/**
 * STUB for a case whose page isn't laid out yet (no `page` in content/cases/work.ts): «← All work», the Work
 * card title and photo. Replaced automatically once the case gets its CaseData.
 */
export function CaseStub({ entry }: { entry: WorkEntry }) {
  const { title, image } = entry.workCard;
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main className="flex w-full flex-col items-start gap-28 px-20 pt-32 md:px-32 lg:px-40 lg:pt-72">
          <Link href="/work" className="whitespace-nowrap text-text-primary label-m">
            ← All work
          </Link>
          <h1 className="w-full text-text-primary heading-h2 lg:display-s">{title}</h1>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (min-width: 1440px) 1360px, calc(100vw - 80px)"
            preload
            className="h-auto w-full rounded-sm"
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
