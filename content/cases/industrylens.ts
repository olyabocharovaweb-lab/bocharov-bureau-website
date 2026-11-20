import { mobileMedia } from "./mobile";
import type { CaseData, CaseImage, CaseMedia } from "./types";

/**
 * Figma: Main direction → «Case — IndustryLens» (256:69887). Texts verbatim (media numbers as in Figma:
 * 02 … 14 with gaps). Not rendered: the hidden client Quote (256:70351) and the hidden dev note
 * «Specimen set in Outfit — swap the text style to Gilroy» inside the Type card (it is not in the export).
 * Brand fonts (Gilroy / Outfit) live only inside the exported images.
 */

const dir = "/media/cases/industrylens";
const W = 2720; // 1360 × 2

/**
 * Media number → Figma section slug (desktop section name in kebab-case) for the phone images
 * (Figma «Mobile media — industrylens», content/cases/mobile.ts).
 */
const mobileSection: Record<string, string> = {
  "02": "logo-construction",
  "03": "logo-versions",
  "04": "logo-clear-space",
  "05": "logo-scale",
  "06": "system-chart",
  "08": "type-hierarchy",
  "10": "in-use-dashboard",
  "11": "in-use-instagram",
  "12": "in-use-line",
  "13": "in-use-audit",
  "14": "in-use-cards",
};

const img = (file: string, height: number, alt: string): CaseImage => ({
  src: `${dir}/${file}.webp`,
  alt,
  width: W,
  height,
});

const media = (number: string, caption: string, image: CaseImage): CaseMedia => ({
  kind: "media",
  number,
  caption,
  image,
  mobile: mobileMedia("industrylens", mobileSection[number]),
});

export const industrylens: CaseData = {
  slug: "industrylens",
  seo: {
    title: "IndustryLens — Brand identity | Bocharov Bureau",
    description:
      "A brand identity for IndustryLens — market intelligence that reads competitors’ websites and social channels and turns thousands of posts into a few clear numbers.",
  },
  hero: {
    back: "← All work",
    category: "/  Brand identity",
    year: "’26",
    nextLabel: "Next →",
    title: "Industry Lens",
    titleEms: 5.75, // measured: 1253px at 220px (+1% margin)
    // «Hero — logo» (256:69904), 2x; phones: 4:5 centre crop of the same image
    image: img("hero", 1640, "IndustryLens «Look closer.» poster on a city billboard"),
  },
  overview: {
    label: "( Overview )",
    lead: "A brand identity for IndustryLens — market intelligence that reads competitors’ websites and social channels and turns thousands of posts into a few clear numbers.",
    tags: ["Brand strategy", "Logo design", "Visual identity", "Typography", "Colour system", "Brand guidelines"],
    facts: [
      { label: "Client", value: "IndustryLens" },
      { label: "Industry", value: "Market intelligence" },
      { label: "Scope", value: "Brand identity" },
      { label: "Year", value: "2026" },
    ],
    action: "Visit industry-lens.com",
    actionHref: "https://industry-lens.com",
  },
  challenge: {
    label: "( The challenge )",
    lead: "Your competitors post every day. ",
    rest: "IndustryLens reads every post. It turns thousands of posts into a few clear numbers and tells a brand where it wins — and where it is quietly losing. The identity had to feel the same: sharp, calm, slightly forensic.",
  },
  sections: [
    {
      kind: "intro",
      label: "/ 1   Logo",
      body: "A lens that points somewhere. The ring frames the market; the chevron is the next move — research is only useful if it tells you where to go.",
      spacing: "Section",
    },
    media("02", "Construction · open by 90°, r : R ≈ 1 : 2", img("02-construction", 1873, "IndustryLens logo construction: a ring open by 90° and a chevron on a grid")),
    {
      kind: "intro",
      label: "/ 1.1   Versions",
      body: "Primary on light and dark, a standalone symbol and an app icon — one shape that works everywhere the team shows up.",
      spacing: "Subsection",
    },
    media("03", "Primary on light & dark · symbol · app icon", img("03-versions", 663, "IndustryLens logo on light and dark, the symbol and the app icon")),
    {
      kind: "intro",
      label: "/ 1.2   Clear space & scale",
      body: "Clear space is one x on every side and the full logo never drops below 128 px. The symbol holds from a billboard down to a 16 px favicon.",
      spacing: "Subsection",
    },
    media("04", "Clear space & minimum size", img("04-clear-space", 1441, "IndustryLens logo clear space and minimum size")),
    media("05", "From billboard to favicon", img("05-scale", 1038, "IndustryLens symbol at sizes from a billboard down to a favicon")),
    {
      kind: "intro",
      label: "/ 2   System",
      body: "One ring, many jobs. Split into segments, the lens becomes a chart, a progress ring, a loader — the brand lives inside the product, not only on the cover.",
      spacing: "Section",
    },
    media("06", "Chart · progress · status", img("06-chart", 1787, "The IndustryLens ring as a chart, a progress ring and a status indicator")),
    {
      kind: "intro",
      label: "/ 4   Typography",
      body: "Gilroy — geometric, calm, precise. Medium for what people remember, Regular for what they read.",
      spacing: "Section",
    },
    media("08", "Gilroy · type hierarchy", img("08-type", 1873, "IndustryLens type hierarchy specimen")),
    {
      kind: "intro",
      label: "/ 5   In use",
      body: "From the product to the feed to the desk. Every post is a data point; every data point is a decision.",
      spacing: "Section",
    },
    media("10", "Product dashboard", img("10-dashboard", 1787, "IndustryLens product dashboard on a laptop")),
    media("11", "Instagram stories · 1080 × 1920", img("11-instagram", 1873, "IndustryLens Instagram stories")),
    media("12", "The brand line", img("12-brand-line", 1585, "The IndustryLens brand line")),
    media("13", "Competitor audit · Q4 report", img("13-audit", 1787, "IndustryLens competitor audit Q4 report")),
    media("14", "Business cards", img("14-business-cards", 1787, "IndustryLens business cards")),
  ],
  delivered: {
    intro: {
      kind: "intro",
      label: "/ 6   Delivered",
      body: "A complete identity system — logo, colour, type, a ring that works inside the product and templates for social — documented in brand guidelines.",
      spacing: "Section",
    },
    stats: [
      { value: "1", label: "Shape", note: "Logo, chart, loader, status" },
      { value: "4", label: "Logo versions", note: "Light, dark, symbol, app icon" },
      { value: "5", label: "Brand colours", note: "3 core + 2 backgrounds" },
      { value: "128 px", label: "Minimum logo width", note: "Symbol down to 16 px" },
    ],
    footnote: "Project facts · from the brand guidelines",
  },
  credits: {
    label: "( Credits )",
    rows: [
      { role: "Creative direction", name: "Olya Bocharova" },
      { role: "Brand strategy", name: "Name Surname" },
      { role: "Logo design", name: "Name Surname" },
      { role: "Visual identity", name: "Name Surname" },
      { role: "Typography", name: "Name Surname" },
      { role: "Colour system", name: "Name Surname" },
      { role: "Brand guidelines", name: "Name Surname" },
    ],
  },
  cta: { heading: "Need a sharper\nbrand?" },
  next: { heading: "Next project." },
};
