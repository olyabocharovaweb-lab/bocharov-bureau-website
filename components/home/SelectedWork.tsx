import Image from "next/image";
import { Button, CaseCard } from "@/components/ds";
import { selectedWork } from "@/content/home";

/** Figma: Selected work (256:68296) — pt 140, px 40, gap 48. */
export function SelectedWork() {
  const { featured, pair, graaho } = selectedWork;
  return (
    <section className="flex w-full flex-col items-start gap-48 px-40 pt-section">
      <div className="flex w-full items-end justify-between">
        <h2 className="whitespace-nowrap text-text-primary display-s">{selectedWork.title}</h2>
        <Button variant="Secondary" label={selectedWork.cta} />
      </div>
      <CaseCard className="w-full" {...featured} sizes="(min-width: 1440px) 1360px, 100vw" />
      <div className="flex w-full items-start gap-12">
        {pair.map((c) => (
          <CaseCard key={c.number} className="min-w-0 flex-1" {...c} sizes="(min-width: 1440px) 674px, 50vw" />
        ))}
      </div>
      {/*
        Graaho is a frame (not a Case card instance) whose photo holds live screens.
        Exported from Figma as one image (2x), same title / number / tags pattern.
      */}
      <div className="flex w-full flex-col items-start gap-14">
        <Image
          src={graaho.image.src}
          alt={graaho.image.alt}
          width={graaho.image.width}
          height={graaho.image.height}
          sizes="(min-width: 1440px) 1360px, 100vw"
          className="h-auto w-full rounded-sm"
        />
        <div className="flex w-full items-start justify-between">
          <p className="text-text-primary heading-h6">{graaho.title}</p>
          <p className="whitespace-nowrap text-text-secondary mono-body">{graaho.number}</p>
        </div>
        <p className="w-full uppercase text-text-secondary mono-body">{graaho.tags}</p>
      </div>
    </section>
  );
}
