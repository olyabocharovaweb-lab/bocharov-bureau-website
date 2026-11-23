import Image from "next/image";
import Link from "next/link";
import { Button, CaseCard } from "@/components/ds";
import { selectedWork } from "@/content/home";

/**
 * Figma: Selected work — desktop 256:68296 (pt 140, px 40, gap 48); mobile 322:5735 (pt 72, px 20,
 * gap 40; title Heading/H2 + «All projects» stacked; cards full width, photo 4:5, title wraps,
 * number top right). Tablet: the pair sits in 2 columns.
 */
const FULL = "(min-width: 1440px) 1360px, (min-width: 1024px) calc(100vw - 80px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)";
const HALF = "(min-width: 1440px) 674px, (min-width: 768px) 50vw, calc(100vw - 40px)";

export function SelectedWork() {
  const { featured, pair, graaho } = selectedWork;
  return (
    <section className="flex w-full flex-col items-start gap-40 px-20 pt-72 md:px-32 lg:gap-48 lg:px-40 lg:pt-section">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-text-primary heading-h2 lg:whitespace-nowrap lg:display-s">{selectedWork.title}</h2>
        <Button variant="Secondary" label={selectedWork.cta} href={selectedWork.ctaHref} />
      </div>
      <CaseCard className="w-full" {...featured} sizes={FULL} />
      <div className="flex w-full flex-col items-start gap-40 md:flex-row md:gap-12">
        {pair.map((c) => (
          <CaseCard key={c.number} className="w-full min-w-0 md:flex-1" {...c} sizes={HALF} />
        ))}
      </div>
      {/*
        Graaho is a frame (not a Case card instance) whose photo holds live screens.
        Exported from Figma as one image (2x), same title / number / tags pattern.
      */}
      <Link href={graaho.href} className="flex w-full flex-col items-start gap-14">
        <Image
          src={graaho.image.src}
          alt={graaho.image.alt}
          width={graaho.image.width}
          height={graaho.image.height}
          sizes={FULL}
          className="h-auto w-full rounded-sm"
        />
        <div className="flex w-full items-start justify-between">
          <p className="min-w-0 flex-1 text-text-primary heading-h6">{graaho.title}</p>
          <p className="shrink-0 whitespace-nowrap text-text-secondary mono-body">{graaho.number}</p>
        </div>
        <p className="w-full uppercase text-text-secondary mono-body">{graaho.tags}</p>
      </Link>
    </section>
  );
}
