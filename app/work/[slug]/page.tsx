import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { CaseStub } from "@/components/case/CaseStub";
import { getWorkEntry, isPublished, workEntries } from "@/content/cases";

/**
 * Case pages: /work/<slug> for every entry in content/cases/work.ts. Entries with `page` use the case template;
 * the others show a stub until their page is laid out. Any other slug → 404 (notFound(); `dynamicParams` is not
 * available with Cache Components).
 */
export function generateStaticParams() {
  return workEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntry(slug);
  if (!entry) return {};
  // Unpublished cases still open by direct link, but stay out of search.
  const robots = isPublished(entry) ? undefined : { index: false, follow: false };
  if (!entry.page) return { title: `${entry.index.client} | Bocharov Bureau`, robots };
  const { seo, hero } = entry.page;
  return {
    title: seo.title,
    description: seo.description,
    robots,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "article",
      images: [{ url: hero.image.src, width: hero.image.width, height: hero.image.height, alt: hero.image.alt }],
    },
  };
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getWorkEntry(slug);
  if (!entry) notFound();
  return entry.page ? <CasePage data={entry.page} /> : <CaseStub entry={entry} />;
}
