import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/layout/StubPage";
import { caseMeta, caseTitle, cases, getCase } from "@/content/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getCase(slug);
  if (!item) return {};
  return {
    title: item.name,
    description: caseTitle(item),
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: { images: [{ url: item.cover.src, alt: item.cover.alt }] },
  };
}

export default async function CasePage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = getCase(slug);
  if (!item) notFound();

  return (
    <StubPage label={caseMeta(item)} title={caseTitle(item)}>
      <div className="relative aspect-[1360/720] overflow-hidden rounded-[var(--radius-media)] bg-surface">
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          preload
          sizes="calc(100vw - 2 * var(--gutter, 16px))"
          className="object-cover"
        />
      </div>
    </StubPage>
  );
}
