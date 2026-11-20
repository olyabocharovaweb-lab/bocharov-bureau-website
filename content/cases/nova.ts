import { mobileMedia } from "./mobile";
import type { CaseData, CaseImage, CaseMedia } from "./types";

/**
 * Figma: Main direction → «Case — Nova» (256:69051). Texts verbatim.
 * Not rendered (client, 2026-11-18): «/ 1 Strategy» intro with For / Character tag groups (256:69106),
 * «/ 1.1 Principles» (256:69133) and «/ 3 Product» (256:69323) — blocks the template doesn't have yet;
 * «/ 4 System» (intro + placeholder media 256:69773); the hidden client Quote (256:69811).
 * Placeholders left out: Client «NOVA [юр. назва]», Credits «Name Surname» (the template skips them).
 */

const dir = "/media/cases/nova";
const W = 2720; // 1360 × 2

/**
 * Media number → Figma section slug (desktop section name in kebab-case) for the phone images
 * (Figma «Mobile media — nova», content/cases/mobile.ts).
 */
const mobileSection: Record<string, string> = {
  "01": "strategy-main-showcase",
  "02": "strategy-architecture-media",
  "03": "brand-orb-key-visual",
  "04 — 06": "brand-wordmark-and-icon-media",
  "07 — 08": "product-onboarding-media",
  "09 — 12": "product-home-and-chat-media",
  "13": "product-voice-media",
};

const img = (file: string, height: number, alt: string): CaseImage => ({
  src: `${dir}/${file}.webp`,
  alt,
  width: W,
  height,
});

const media = (number: string, caption: string, image: CaseImage, gap?: CaseMedia["gap"]): CaseMedia => ({
  kind: "media",
  number,
  caption,
  image,
  mobile: mobileMedia("nova", mobileSection[number]),
  gap,
});

export const nova: CaseData = {
  slug: "nova",
  seo: {
    title: "NOVA — AI assistant app design | Bocharov Bureau",
    description:
      "Product strategy, UX/UI and brand for NOVA, a personal AI assistant that turns conversations into plans, tasks and drafts. iOS, light and dark.",
  },
  hero: {
    back: "← All work",
    category: "/  Tech & AI",
    year: "’26",
    nextLabel: "Next →",
    title: "NOVA",
    titleEms: 2.59, // measured: 563px at 220px (+1% margin)
    // «Photo L1» (256:69068), 2x; phones: 4:5 centre crop of the same image
    image: img("hero", 1640, "NOVA app on a phone next to an iridescent glass orb"),
  },
  overview: {
    label: "( Overview )",
    lead: "A personal AI assistant that turns what you say into plans, tasks, events and drafts — one calm space instead of five apps.",
    tags: ["Product strategy", "UX architecture", "UI design", "Design system", "Brand & 3D orb", "Motion"],
    facts: [
      { label: "Client", value: "NOVA [юр. назва]" },
      { label: "Industry", value: "AI · Productivity" },
      { label: "Platform", value: "iOS · Android" },
      { label: "Year", value: "2026" },
    ],
    action: "App Store · soon",
  },
  challenge: {
    label: "( The challenge )",
    lead: "AI chats are great at answers and bad at what comes after. ",
    rest: "People copy the plan into a calendar, the list into a to-do app, the text into a doc — and the context gets lost on the way. NOVA had to take the next step for them, and still feel calm.",
  },
  stickyLabels: true,
  sections: [
    // 256:69159 — in Figma this follows «/ 1.1 Principles» (not rendered), so it keeps the default 72 after the Challenge
    media("01", "Home · light & dark", img("01-home-light-dark", 1720, "NOVA Home screen in the light and the dark theme")),
    {
      kind: "intro",
      label: "/ 1.2   Architecture",
      body: "We mapped 23 core screens into eight flows around one hub. Home is the starting point; everything else is one tap or one sheet away.",
      spacing: "Subsection",
    },
    media(
      "02",
      "App architecture · 8 flows, 23 core screens",
      img("02-architecture", 1720, "NOVA app architecture: Home at the centre, with Talk, Make, Plan and You flows around it"),
      "48",
    ),
    {
      kind: "intro",
      label: "/ 2   Brand",
      body: "We gave the assistant a face, not a robot: a milky glass orb with a silk wave of pink, violet and blue that moves as NOVA listens and thinks.",
      spacing: "Section",
    },
    // Figma: a looping video — a still frame (poster) for now
    media("03", "Silk Glass Orb — the face of NOVA, in motion", img("03-orb", 1720, "The NOVA Silk Glass Orb: a milky glass sphere with a pink, violet and blue wave")),
    {
      kind: "intro",
      label: "/ 2.1   Identity",
      body: "A sphere that releases a spark — a vague thought turning into a clear idea. The symbol takes the place of the «O» in the wordmark and works on its own as the app icon.",
      spacing: "Subsection",
    },
    media("04 — 06", "Wordmark, symbol & app icon", img("04-wordmark-icon", 1520, "NOVA wordmark, the sphere-and-spark symbol and the app icon in three sizes"), "48"),
    {
      kind: "intro",
      label: "/ 3.1   First minute",
      body: "Four calm screens introduce one idea each: meet, think, create, organise. A minute later comes the first real ask — typed on Home, answered as a weekly plan and sent to the calendar in one tap.",
      spacing: "Subsection",
    },
    // Figma: the right screen is an animation — a still frame for now
    media("07 — 08", "Welcome · first conversation, animated", img("07-onboarding", 1520, "NOVA welcome screen and the Home screen"), "48"),
    {
      kind: "intro",
      label: "/ 3.2   Home & chat",
      body: "Home greets you, shows the day and picks up where you left off. In chat, an answer arrives as a card with buttons: add to calendar, create tasks, open in Writing Studio.",
      spacing: "Subsection",
    },
    // Two Figma frames (256:69539 + 256:69593) joined into one image with the 12 px gap
    media(
      "09 — 12",
      "Home, chat and rich answers",
      img("09-home-chat", 3264, "NOVA Home with the day schedule and notifications sheets, and three chat screens with a weekly plan"),
      "48",
    ),
    {
      kind: "intro",
      label: "/ 3.3   Voice",
      body: "Tap the mic and the orb fills the screen. No transcript wall — just NOVA listening.",
      spacing: "Subsection",
    },
    media("13", "Voice mode", img("13-voice", 1720, "NOVA voice mode: the orb fills the screen while NOVA listens"), "48"),
  ],
  delivered: {
    intro: {
      kind: "intro",
      label: "/ 5   What we shipped",
      body: "One product system, from the first idea to a design ready for iOS and Android.",
      spacing: "Section",
    },
    stats: [
      { value: "160+", label: "Screens", note: "23 core screens, every state, light & dark" },
      { value: "8", label: "Product flows", note: "Around one home hub" },
      { value: "5", label: "Design principles", note: "One input, any intent" },
      { value: "2", label: "Themes", note: "Light and dark, one system" },
    ],
    footnote: "Project facts · product metrics after launch",
  },
  credits: {
    label: "( Credits )",
    rows: [
      { role: "Creative direction", name: "Olya Bocharova" },
      { role: "Product strategy", name: "Name Surname" },
      { role: "UX architecture", name: "Name Surname" },
      { role: "UI design", name: "Name Surname" },
      { role: "Brand & 3D", name: "Name Surname" },
      { role: "Motion", name: "Name Surname" },
      { role: "AI production", name: "Name Surname" },
    ],
  },
  cta: { heading: "Building an\nAI product?" },
  next: { heading: "Next project." },
};
