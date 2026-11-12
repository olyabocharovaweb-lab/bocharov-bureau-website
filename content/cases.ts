/**
 * Case studies shown on the home page.
 * Order and copy are taken verbatim from Figma (Home → "Selected work", node 74:1335).
 * Shape is CMS-ready: swap this array for a fetch later without touching components.
 */
export type CaseMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CaseStudy = {
  slug: string;
  /** Client / product name */
  name: string;
  /** Slogan after the em dash in the card title */
  tagline: string;
  /** First item of the meta line */
  industry: string;
  /** Remaining items of the meta line */
  services: string[];
  cover: CaseMedia;
  /** Card size on the home grid */
  layout: "wide" | "half";
};

export const cases: CaseStudy[] = [
  {
    slug: "pulsefit",
    name: "PulseFit",
    tagline: "fitness that listens to your body",
    industry: "Health & fitness",
    services: ["AI app", "iOS", "Apple Watch"],
    cover: {
      src: "/media/pulsefit.webp",
      width: 1122,
      height: 594,
      alt: "Athlete stretching with arms raised against a bright green backdrop",
    },
    layout: "wide",
  },
  {
    slug: "industrylens",
    name: "IndustryLens",
    tagline: "look closer",
    industry: "B2B SaaS",
    services: ["Brand identity", "Guidelines"],
    cover: {
      src: "/media/industrylens.webp",
      width: 2400,
      height: 1800,
      alt: "IndustryLens red poster reading “Look closer.” on a concrete wall",
    },
    layout: "half",
  },
  {
    slug: "nova",
    name: "NOVA",
    tagline: "an assistant that doesn’t stop at an answer",
    industry: "AI product",
    services: ["UX/UI", "Brand"],
    cover: {
      src: "/media/nova.webp",
      width: 1614,
      height: 974,
      alt: "NOVA assistant app on a phone next to an iridescent glass sphere",
    },
    layout: "half",
  },
  {
    slug: "graaho",
    name: "Graaho",
    tagline: "the intelligent enterprise, explained",
    industry: "Enterprise AI & cloud",
    services: ["Web design"],
    cover: {
      src: "/media/graaho.webp",
      width: 2720,
      height: 1440,
      alt: "Graaho website home page on desktop and mobile: “Build the Intelligent Enterprise”",
    },
    layout: "wide",
  },
];

export const caseTitle = (c: CaseStudy) => `${c.name} — ${c.tagline}`;
export const caseMeta = (c: CaseStudy) => [c.industry, ...c.services].join(" · ");
export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
