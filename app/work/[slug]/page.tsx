import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { cases, getCase } from "@/content/cases";

/**
 * Case pages: /work/<slug>. Only slugs in content/cases are prerendered; any other slug → 404.
 * (`dynamicParams` is not available with Cache Components, so unknown slugs call notFound().)
 */
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return {};
  const { seo, hero } = data;
  return {
    title: seo.title,
    description: seo.description,
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
  const data = getCase(slug);
  if (!data) notFound();
  return <CasePage data={data} />;
}
