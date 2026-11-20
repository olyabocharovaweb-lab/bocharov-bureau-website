import { mobileMedia } from "./mobile";
import type { CaseData, CaseImage, CaseMedia } from "./types";

/**
 * Figma: Main direction → «Case — Graaho» (256:72014). Texts verbatim.
 * Not rendered: the hidden Overview button, the hidden client Quote (256:73527); placeholder Year «[рік]» and
 * Credits «Name Surname» (the template skips them). Client site screens are exported images (Graaho's own fonts
 * stay inside them).
 */

const dir = "/media/cases/graaho";
const W = 2720; // 1360 × 2

/**
 * Media number → Figma section slug (desktop section name in kebab-case) for the phone images
 * (Figma «Mobile media — graaho», content/cases/mobile.ts).
 */
const mobileSection: Record<string, string> = {
  "01": "home-capabilities",
  "02": "home-what-graaho-builds",
  "03": "pages-overview",
  "04": "pages-aws",
  "05": "pages-pos",
  "06": "tools-assessment",
  "07": "insights-hub",
  "08": "responsive-devices",
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
  mobile: mobileMedia("graaho", mobileSection[number]),
});

export const graaho: CaseData = {
  slug: "graaho",
  seo: {
    title: "Graaho — Enterprise website design | Bocharov Bureau",
    description:
      "Website design for Graaho Technologies — an AWS Advanced Tier partner that builds AI, cloud, data and custom software for enterprises.",
  },
  hero: {
    back: "← All work",
    category: "/  Web design",
    year: "’26",
    nextLabel: "Next →",
    title: "Graaho",
    titleEms: 3.12, // measured: 680px at 220px (+1% margin)
    // «Hero — homepage» (256:72031), 2x: desktop and mobile homepage screens — shown whole on phones (no crop)
    image: img("hero", 1640, "Graaho homepage «Build the Intelligent Enterprise» on desktop and mobile"),
    natural: true,
  },
  overview: {
    label: "( Overview )",
    lead: "Website design for Graaho Technologies — an AWS Advanced Tier partner that builds AI, cloud, data and custom software for enterprises.",
    tags: ["UX & IA", "Web design", "Responsive", "Interactive tools", "Content structure", "UI kit"],
    facts: [
      { label: "Client", value: "Graaho Technologies" },
      { label: "Industry", value: "Enterprise AI & cloud" },
      { label: "Scope", value: "Website design" },
      { label: "Year", value: "[рік]" },
    ],
  },
  challenge: {
    label: "( The challenge )",
    lead: "Enterprise tech sites tend to say everything at once. ",
    rest: "Graaho covers AI, AWS cloud, data, custom software, ERP and its own products — the site had to make that breadth feel organised: one clear story for executives, deep pages for engineers, and tools that turn a visit into a conversation.",
  },
  sections: [
    {
      kind: "intro",
      label: "/ 1   Homepage",
      body: "Build the Intelligent Enterprise. A light, calm homepage with glassy 3D accents: proof first — AWS credentials, delivery numbers, client logos — then capabilities, products, process and industries.",
      spacing: "Section",
    },
    media("01", "Capabilities · desktop & mobile", img("01-capabilities", 1736, "Graaho homepage capabilities section on desktop and mobile")),
    media("02", "What Graaho builds · desktop & mobile", img("02-what-graaho-builds", 1442, "Graaho «What Graaho builds» section on desktop and mobile")),
    {
      kind: "intro",
      label: "/ 2   Inner pages",
      body: "One system for 17 page templates — services, AWS expertise, company, partnerships, careers, events and products. Each page opens with a clear promise, backs it with proof and ends in one next step.",
      spacing: "Section",
    },
    media("03", "Page heroes · one system, four kinds of page", img("03-page-heroes", 2084, "Four Graaho inner page heroes built on one system")),
    media("04", "Expertise · proof and process", img("04-aws-expertise", 1124, "Graaho AWS expertise page with proof and process")),
    media("05", "Hospitality Cloud POS · desktop & mobile", img("05-hospitality-pos", 1992, "Graaho Hospitality Cloud POS product page on desktop and mobile")),
    {
      kind: "intro",
      label: "/ 3   Interactive tools",
      body: "An AI Readiness Assessment instead of another contact form: 20 questions across seven dimensions, a score with prioritised recommendations — and a qualified lead for the sales team.",
      spacing: "Section",
    },
    media("06", "AI Readiness Assessment · landing → questions → report", img("06-ai-readiness", 1294, "Graaho AI Readiness Assessment: landing, questions and report")),
    {
      kind: "intro",
      label: "/ 4   Insight Hub",
      body: "Blog, case studies and research in one hub — long reads stay comfortable to scan, and every article leads back to a service.",
      spacing: "Section",
    },
    media("07", "Insight Hub · blog, case studies, research", img("07-insight-hub", 1128, "Graaho Insight Hub with blog posts, case studies and research")),
    {
      kind: "intro",
      label: "/ 5   Responsive",
      body: "Every page designed for desktop, tablet and mobile — with carousels instead of long stacks on small screens and documented expanded states for accordions and menus.",
      spacing: "Section",
    },
    media("08", "Tablet 768 · mobile 390", img("08-responsive", 1488, "Graaho pages on a tablet at 768 and a phone at 390")),
  ],
  delivered: {
    intro: {
      kind: "intro",
      label: "/ 6   Delivered",
      body: "A complete website design, handed off for development: information architecture, 17 page templates in three breakpoints, an assessment tool and the UI kit behind them.",
      spacing: "Section",
    },
    stats: [
      { value: "17", label: "Page templates", note: "Home to research" },
      { value: "40", label: "Layouts", note: "Desktop, tablet, mobile" },
      { value: "3", label: "Breakpoints", note: "1440 · 768 · 390" },
      { value: "4", label: "Tool steps", note: "Landing → results" },
    ],
    footnote: "Project facts · from the brand guidelines",
  },
  credits: {
    label: "( Credits )",
    rows: [
      { role: "Creative direction", name: "Olya Bocharova" },
      { role: "UX & IA", name: "Name Surname" },
      { role: "Web design", name: "Name Surname" },
      { role: "Responsive design", name: "Name Surname" },
      { role: "Interactive tools", name: "Name Surname" },
      { role: "Content structure", name: "Name Surname" },
      { role: "UI kit", name: "Name Surname" },
    ],
  },
  cta: { heading: "Need a site that\nexplains it all?" },
  next: { heading: "Next project." },
};
