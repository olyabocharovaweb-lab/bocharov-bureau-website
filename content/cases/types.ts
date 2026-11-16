/**
 * Data for one case page. Every case uses the same template (app/work/[slug]/page.tsx);
 * a new case = a new file in content/cases/ + an entry in content/cases/index.ts.
 * All texts verbatim from Figma (Main direction → «Case — …» frames).
 */

export type CaseImage = {
  src: string;
  alt: string;
  /** Exported image size (2x of the Figma frame) — keeps the Figma ratio. */
  width: number;
  height: number;
};

/** Section intro instance (Figma component 260:96). */
export type CaseIntro = {
  kind: "intro";
  label: string;
  body: string;
  spacing: "Section" | "Subsection";
};

/**
 * A client media block: the Figma «Card» exported as one 2x image (client content —
 * Behance-style screens, not our design system) + a Media caption (260:44).
 */
export type CaseMedia = {
  kind: "media";
  image: CaseImage;
  caption: string;
  number: string;
};

export type CaseSection = CaseIntro | CaseMedia;

export type CaseData = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    /** «← All work» → /work */
    back: string;
    /** «/  Product design» (whitespace preserved) */
    category: string;
    /** «’26 · Case 03 / 12» */
    index: string;
    /** «Next →» → next.href */
    nextLabel: string;
    title: string;
    image: CaseImage;
  };
  overview: {
    label: string;
    lead: string;
    tags: string[];
    facts: Array<{ label: string; value: string }>;
    /** Inactive button, no link (e.g. «App Store · soon»). */
    action?: string;
  };
  challenge: {
    label: string;
    /** First sentence — text/primary */
    lead: string;
    /** Rest — text/secondary */
    rest: string;
  };
  sections: CaseSection[];
  delivered: {
    intro: CaseIntro;
    stats: Array<{ value: string; label: string; note: string }>;
    /** Small Mono/Caption line under the stat cards */
    footnote?: string;
  };
  credits: { label: string; rows: Array<{ role: string; name: string }> };
  cta: { heading: string };
  next: {
    href: string;
    heading: string;
    /** «( 04 / 12 )» */
    counter: string;
    title: string;
    /** Mono/Caption line, e.g. «Enterprise AI & cloud · Web design  →» */
    tags: string;
    image: CaseImage;
  };
};
