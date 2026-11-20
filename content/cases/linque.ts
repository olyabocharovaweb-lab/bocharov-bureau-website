import { mobileMedia } from "./mobile";
import type { CaseData, CaseImage, CaseMedia } from "./types";

/**
 * Figma: Main direction → «Case — LINQUE» (344:5993). Texts verbatim.
 * Media slides are exported whole (2x) with their radius 6 baked in on white → rendered without a CSS radius or
 * background (`plain`). Not rendered: the hidden Overview button, the hidden client Quote (344:7090), the hidden
 * «Note · font» in the typography slide (not in the export); Credits «Name Surname» (the template skips them).
 */

const dir = "/media/cases/linque";
const W = 2720; // 1360 × 2

/**
 * Media number → Figma section slug (desktop section name in kebab-case) for the phone images
 * (Figma «Mobile media — linque», content/cases/mobile.ts).
 */
const mobileSection: Record<string, string> = {
  "01": "problem",
  "02": "product-preference-filters",
  "03": "product-show-me-later",
  "04": "product-match-and-icebreakers",
  "05": "product-meet-up",
  "06": "safety-by-design",
  "07": "safety-moderation",
  "08": "onboarding-tour",
  "09": "mobile-flows",
  "10": "system-decisions",
  "11": "system-architecture",
  "12": "system-typography",
  "13": "system-colour",
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
  mobile: mobileMedia("linque", mobileSection[number]),
  plain: true,
});

export const linque: CaseData = {
  slug: "linque",
  seo: {
    title: "LINQUE — Sapphic dating app design | Bocharov Bureau",
    description:
      "UX research, product design and design system for LINQUE, a dating platform for women and sapphics with identity filters, verified profiles and safety built in. Web and mobile.",
  },
  hero: {
    back: "← All work",
    category: "/  Product design",
    year: "’25",
    nextLabel: "Next →",
    title: "LINQUE",
    titleEms: 3.31, // measured: 721px at 220px (+1% margin)
    // «Hero — photo» (344:6004), exported whole (glass cards are part of the image), 2x.
    // Phones: the same image, shown whole — a 4:5 crop would cut the face and the pills (mobile version later).
    image: img("hero", 1640, "LINQUE dating app interface over a portrait: profile card, filters and status pills"),
    natural: true,
  },
  overview: {
    label: "( Overview )",
    lead: "A dating platform built only for women and sapphics — with filters that speak the community’s language and safety built in from the first tap.",
    tags: ["UX research", "Product design", "Web app", "Mobile app", "Design system", "Admin panel"],
    facts: [
      { label: "Client", value: "LINQUE" },
      { label: "Industry", value: "Dating · Community" },
      { label: "Platform", value: "Web · Mobile" },
      { label: "Year", value: "2025" },
    ],
  },
  challenge: {
    label: "( The challenge )",
    lead: "Mainstream dating apps don’t see women and sapphics. ",
    rest: "Filters are built for straight users, labels like butch or femme have nowhere to live, and swipe-or-lose pressure punishes anyone who needs a moment. LINQUE had to feel built from the inside — and safe from the first tap.",
  },
  sections: [
    // «Problem» (344:7932) — a media slide right after the Challenge (no intro in Figma)
    media("01", "The problem · three things mainstream apps get wrong", img("01-problem", 2127, "The problem: invaded spaces, labels ignored, decide now or lose it")),
    {
      kind: "intro",
      label: "/ 1   Product",
      body: "Identity is a filter, not bio text. Four flows built around how women and sapphics actually date — find, decide, talk, meet.",
      spacing: "Section",
    },
    media("02", "Preference filters · identity and presentation, not bio text", img("02-preference-filters", 1873, "LINQUE preference filters and a phone with the Suggested Profiles screen")),
    media("03", "Show me later · a third option next to yes and no", img("03-show-me-later", 1873, "LINQUE «Show me later» option next to yes and no")),
    media("04", "Match & icebreakers · questions and mini-games start the chat", img("04-match-icebreakers", 2162, "LINQUE match screen with icebreaker questions and mini-games")),
    media("05", "Meet-Up · date, time and place in one card", img("05-meet-up", 1873, "LINQUE Meet-Up card with date, time and place")),
    {
      kind: "intro",
      label: "/ 2   Safety",
      body: "Verified before visible. Every profile passes a selfie, phone and email check — and a person on the team reviews it before anyone can see it.",
      spacing: "Section",
    },
    media("06", "Safety · identity check, tips and reporting in their own tab", img("06-safety", 2461, "LINQUE safety tab: identity check, tips and reporting")),
    media("07", "Admin panel · verification queue, pass or deny in one click", img("07-admin-moderation", 1873, "LINQUE admin panel verification queue")),
    {
      kind: "intro",
      label: "/ 3   Onboarding & mobile",
      body: "No manual, no wall of text: a six-step tour runs over the real interface. And every flow works at 390 px, with navigation and sheets in thumb reach.",
      spacing: "Section",
    },
    media("08", "Onboarding · a six-step tour over the real interface", img("08-onboarding-tour", 2162, "LINQUE onboarding tour over the real interface")),
    media("09", "Mobile · every flow at 390 px", img("09-mobile-flows", 2017, "LINQUE mobile screens at 390 px")),
    {
      kind: "intro",
      label: "/ 4   System",
      body: "One hub, seven sections, six rules. A geometric typeface with soft curves, deep graphite that keeps photos in focus, and one gradient that means action.",
      spacing: "Section",
    },
    media("10", "Six product decisions", img("10-decisions", 1807, "Six LINQUE product decisions")),
    media("11", "Architecture · one hub, seven sections", img("11-architecture", 2192, "LINQUE architecture: one hub and seven sections")),
    media("12", "Typography · Lufga", img("12-typography", 1729, "LINQUE typography specimen in Lufga")),
    media("13", "Colour · graphite with a violet-to-magenta action gradient", img("13-colour", 1873, "LINQUE colour palette: graphite with a violet-to-magenta gradient")),
  ],
  delivered: {
    intro: {
      kind: "intro",
      label: "/ 5   Delivered",
      body: "A web app, a mobile app and an admin panel in one design system — ready for development.",
      spacing: "Section",
    },
    stats: [
      { value: "2", label: "Platforms", note: "Web at 1440 and mobile at 390" },
      { value: "7", label: "Sections", note: "Around one home hub" },
      { value: "6", label: "Onboarding steps", note: "A tour over the real interface" },
      { value: "24 h", label: "Show me later", note: "Before a skipped profile returns" },
    ],
    footnote: "Project facts · from the product case",
  },
  credits: {
    label: "( Credits )",
    rows: [
      { role: "Creative direction", name: "Olya Bocharova" },
      { role: "UX research", name: "Name Surname" },
      { role: "Product design", name: "Name Surname" },
      { role: "Web app", name: "Name Surname" },
      { role: "Mobile app", name: "Name Surname" },
      { role: "Design system", name: "Name Surname" },
      { role: "Admin panel", name: "Name Surname" },
    ],
  },
  cta: { heading: "Building a\ncommunity app?" },
  next: { heading: "Next project." },
};
