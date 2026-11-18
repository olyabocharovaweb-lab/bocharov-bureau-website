import { selectedWork } from "@/content/home";
import { nova } from "./nova";
import { pulsefit } from "./pulsefit";
import type { CaseData, CaseImage } from "./types";

/**
 * Every case shown on /work (Figma «Work — Variant 1b (light)» 256:68713 and «Work — Mobile 390» 378:11795).
 * Texts verbatim from those frames. A case without `page` gets a short stub at /work/<slug> until its
 * full case page is laid out (then add the CaseData and set `page`).
 */

export type Service = "product-design" | "brand-identity" | "web-design";

/** Filter labels, in Figma order. */
export const services: Array<{ id: Service; label: string }> = [
  { id: "product-design", label: "Product design" },
  { id: "brand-identity", label: "Brand identity" },
  { id: "web-design", label: "Web design" },
];

export type WorkEntry = {
  slug: string;
  /** Case number (Index order, «Case 03 / 12» on the case page). */
  caseNumber: number;
  /** Number on the Work cards (mobile order, «01» on the featured card). */
  order: number;
  featured?: boolean;
  services: Service[];
  workCard: {
    title: string;
    /** Mono line, upper-cased in CSS */
    tags: string;
    image: CaseImage;
    /** Phone version (≤ 767px), shown instead of a 4:5 crop of `image`. */
    mobileImage?: Omit<CaseImage, "alt">;
    /** true → on phones the image keeps its own ratio (no 4:5 crop), e.g. Graaho's screens. */
    natural?: boolean;
  };
  /** Featured card only: «40+ components · 2 themes» */
  metric?: string;
  index: { year: string; client: string; industry: string; services: string };
  page?: CaseData;
  /**
   * Default true. An unpublished case is left out of Home, Work and the Next chain, but its page still opens
   * by direct link (with noindex).
   */
  published?: boolean;
};

const graahoHome = selectedWork.graaho;

export const workEntries: WorkEntry[] = [
  {
    slug: "nova",
    caseNumber: 1,
    order: 3,
    services: ["product-design", "brand-identity"],
    workCard: {
      title: "NOVA — an assistant that doesn’t stop at an answer",
      tags: "AI product · UX/UI · Brand",
      image: { src: "/media/case-nova-card.webp", alt: "NOVA app on a phone next to an iridescent orb", width: 1348, height: 1520 },
    },
    index: { year: "2026", client: "NOVA", industry: "AI · Productivity", services: "Product strategy, UX/UI, brand" },
    page: nova,
  },
  {
    slug: "industrylens",
    caseNumber: 2,
    order: 2,
    services: ["brand-identity"],
    workCard: {
      title: "IndustryLens — look closer",
      tags: "B2B SaaS · Brand identity · Guidelines",
      image: { src: "/media/industrylens-card.webp", alt: "IndustryLens poster on a city wall", width: 1348, height: 1520 },
    },
    index: { year: "2026", client: "IndustryLens", industry: "B2B SaaS", services: "Brand identity, guidelines, social" },
  },
  {
    slug: "pulsefit",
    caseNumber: 3,
    order: 1,
    featured: true,
    services: ["product-design"],
    workCard: {
      title: "PulseFit — fitness that listens to your body",
      tags: "Health & fitness · Product design · iOS · Apple Watch",
      // «Photo L1» (256:68753), 2x — the full frame (the Home card uses a tighter crop)
      image: { src: "/media/work/work-pulsefit-featured.webp", alt: "Athlete stretching against a green background", width: 2720, height: 1520 },
      // «Work — Mobile 390» → Featured — PulseFit → Hero — photo (378:11815), 2x
      mobileImage: { src: "/media/work/work-pulsefit-mobile.webp", width: 700, height: 876 },
    },
    metric: "40+ components · 2 themes",
    index: { year: "2026", client: "PulseFit", industry: "Health & fitness", services: "UX research, product design, iOS, Apple Watch" },
    page: pulsefit,
  },
  {
    slug: "graaho",
    caseNumber: 4,
    order: 4,
    services: ["web-design"],
    workCard: {
      title: graahoHome.title,
      tags: graahoHome.tags,
      // «Photo — Graaho» (256:68776): frame with live screens, exported whole, 2x
      image: { src: "/media/work/work-graaho.webp", alt: graahoHome.image.alt, width: 1348, height: 1040 },
      natural: true,
    },
    index: { year: "2026", client: "Graaho", industry: "Enterprise AI & cloud", services: "Website design, UX, responsive" },
  },
  {
    slug: "linque",
    caseNumber: 5,
    order: 5,
    services: ["product-design"],
    workCard: {
      title: "LINQUE — less swiping, more finding",
      tags: "Dating · Community · Product design",
      // «Photo — LINQUE» (380:6141): photo + glass UI, exported whole, 2x
      image: { src: "/media/work/work-linque.webp", alt: "LINQUE dating app profile card over a portrait", width: 1348, height: 1520 },
      // mobile frame (378:11975), whole picture at 4:5
      mobileImage: { src: "/media/work/work-linque-mobile.webp", width: 700, height: 876 },
    },
    index: { year: "2025", client: "LINQUE", industry: "Dating · Community", services: "UX research, product design, web & mobile, admin panel" },
  },
];

export const getWorkEntry = (slug: string) => workEntries.find((e) => e.slug === slug);

export const isPublished = (e: WorkEntry) => e.published !== false;

/** Published cases by case number: the Next chain (01 → 02 → … → last → 01) and the «/ N» total. */
export const caseChain: WorkEntry[] = workEntries.filter(isPublished).sort((a, b) => a.caseNumber - b.caseNumber);

/** The case after `slug` in the chain, wrapping around; an unpublished case points at the next published one. */
export function getNextEntry(slug: string): WorkEntry {
  const i = caseChain.findIndex((e) => e.slug === slug);
  if (i !== -1) return caseChain[(i + 1) % caseChain.length];
  const current = getWorkEntry(slug);
  return caseChain.find((e) => current && e.caseNumber > current.caseNumber) ?? caseChain[0];
}

export const twoDigits = (n: number) => String(n).padStart(2, "0");
