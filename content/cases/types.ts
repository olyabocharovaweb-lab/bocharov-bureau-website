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
  /**
   * Optional phone version (≤ 767px), e.g. /media/cases/<slug>/mobile/<same name>.webp — 1170px wide,
   * any height (see that folder's README). Without it the desktop image scales down (no crop).
   */
  mobile?: Omit<CaseImage, "alt">;
  caption: string;
  number: string;
  /** Desktop space above the media: 72 (default, PulseFit) or 48 (most NOVA media). Phones: always 40. */
  gap?: "72" | "48";
  /** true → no corner radius in the layout: the image already has its own (LINQUE slides, radius 6 baked in). */
  plain?: boolean;
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
    /** «’26» — the hero index line is built as «’26 · Case 03 / N» (number and total from content/cases/work.ts). */
    year: string;
    /** «Next →» → the next published case (content/cases/work.ts) */
    nextLabel: string;
    title: string;
    /**
     * Width of the title in em of its own font (Inter Semi Bold, −7%). Below 1024 the title is sized
     * to fit one line: min(72, content / titleEms) on phones, clamp(72, content / titleEms, 220) on
     * tablets. Measured for each case; when missing, estimated as 0.62 em per character.
     */
    titleEms?: number;
    image: CaseImage;
    /** Optional phone crop (≤ 767px, 4:5) — same mechanism as CaseMedia.mobile. */
    mobile?: Omit<CaseImage, "alt">;
    /** true → on phones the hero keeps its own ratio (no 4:5 crop), e.g. Graaho's site screens. */
    natural?: boolean;
  };
  overview: {
    label: string;
    lead: string;
    tags: string[];
    facts: Array<{ label: string; value: string }>;
    /** Button label (Button Style=Link). Without `actionHref` it is inactive (e.g. «App Store · soon»). */
    action?: string;
    /** External link for the button, opens in a new tab (e.g. https://industry-lens.com). */
    actionHref?: string;
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
  /**
   * Next project block. Only the heading is per case — href, counter «( 04 / N )», title, tags and photo come
   * from the next published case in content/cases/work.ts (by case number, wrapping around).
   */
  next: { heading: string };
  /**
   * Desktop only: each Section intro label stays pinned (position: sticky) while its section — the intro and
   * the media under it — scrolls past. No highlight. Off by default.
   */
  stickyLabels?: boolean;
};
