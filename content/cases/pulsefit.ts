import { mobileMedia } from "./mobile";
import type { CaseData, CaseImage, CaseMedia } from "./types";

/** Figma: Main direction → «Case — PulseFit» (256:70753). Texts verbatim. */

const dir = "/media/cases/pulsefit";
const W = 2720; // 1360 × 2

/**
 * Media number → Figma section slug (desktop section name in kebab-case) for the phone images
 * (Figma «Mobile media — pulsefit», content/cases/mobile.ts).
 */
const mobileSection: Record<string, string> = {
  "01": "brand-logo",
  "02": "brand-type-and-colour",
  "03": "product-flow",
  "04": "product-app",
  "05": "product-features",
  "06": "themes-light",
  "07": "themes-dark",
  "08": "flow-user-flow",
  "09": "watch-hero",
  "10": "watch-screens",
  "11": "web-landing",
  "12": "web-design-system",
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
  mobile: mobileMedia("pulsefit", mobileSection[number]),
});

export const pulsefit: CaseData = {
  slug: "pulsefit",
  seo: {
    title: "PulseFit — AI fitness app design | Bocharov Bureau",
    description:
      "An AI fitness app that starts from how your body feels today — recovery, sleep, heart rate — and lets a coach adjust the plan in a simple conversation.",
  },
  hero: {
    back: "← All work",
    category: "/  Product design",
    year: "’26",
    nextLabel: "Next →",
    title: "PulseFit",
    titleEms: 3.36, // measured: 730px at 220px (+1% margin)
    image: img("hero", 1640, "Athlete stretching against a green background"),
    // Mobile crop from Figma «Case — PulseFit · Mobile 390» → Hero — photo (331:5252), 3x.
    mobile: { src: `${dir}/mobile/hero.webp`, width: 1050, height: 1314 },
  },
  overview: {
    label: "( Overview )",
    lead: "An AI fitness app that starts from how your body feels today — recovery, sleep, heart rate — and lets a coach adjust the plan in a simple conversation.",
    tags: ["UX research", "Product design", "iOS app", "Apple Watch", "Landing page", "Design system"],
    facts: [
      { label: "Client", value: "PulseFit" },
      { label: "Industry", value: "Health & fitness" },
      { label: "Platform", value: "iOS · watchOS" },
      { label: "Year", value: "2026" },
    ],
    action: "App Store · soon",
  },
  challenge: {
    label: "( The challenge )",
    lead: "Most fitness apps hand you a fixed plan and leave you to it. ",
    rest: "PulseFit had to start from the body instead — read recovery, sleep and heart rate, turn them into one decision for today, and let people change it just by asking.",
  },
  sections: [
    {
      kind: "intro",
      label: "/ 1   Brand",
      body: "A heartbeat you can read. One pulse line with rounded ends — friendly up close, and unmistakable in neon lime on a dark screen.",
      spacing: "Section",
    },
    media("01", "Logo · pulse line, rounded caps, Urbanist wordmark", img("01-brand-logo", 2777, "PulseFit logo: a pulse line with rounded caps and the Urbanist wordmark")),
    media("02", "Urbanist · one family, one lime accent", img("02-brand-type-colour", 2487, "PulseFit typography and colour: Urbanist and a lime accent")),
    {
      kind: "intro",
      label: "/ 2   Product",
      body: "Training that adapts as you do. The wearable feeds four signals — recovery, activity, sleep, heart rate — and the AI coach turns them into what to do today.",
      spacing: "Section",
    },
    media("03", "How it works · four signals, one daily decision", img("03-product-flow", 3184, "Diagram: four body signals feed one daily decision")),
    media("04", "Your day, at a glance", img("04-product-app", 2659, "PulseFit app screens: the day at a glance")),
    media("05", "Less tracking. More guidance.", img("05-product-features", 2704, "PulseFit app features")),
    {
      kind: "intro",
      label: "/ 2.1   Two themes",
      body: "A true dark mode, not an inverted one: bright surfaces for morning training, deep neutrals and a softer lime for evening sessions.",
      spacing: "Subsection",
    },
    media("06", "Light theme · bright mornings", img("06-themes-light", 2417, "PulseFit screens in the light theme")),
    media("07", "Dark theme · evening sessions", img("07-themes-dark", 2417, "PulseFit screens in the dark theme")),
    {
      kind: "intro",
      label: "/ 2.2   User flow",
      body: "Three key journeys — onboarding, the daily loop with the AI coach, and motivation through challenges.",
      spacing: "Subsection",
    },
    media("08", "From sign-up to a finished challenge", img("08-user-flow", 4429, "PulseFit user flow from sign-up to a finished challenge")),
    {
      kind: "intro",
      label: "/ 3   Apple Watch",
      body: "The coach on your wrist. One tap to start, live heart rate and reps, and a nudge from the coach without reaching for the phone.",
      spacing: "Section",
    },
    media("09", "The coach on your wrist", img("09-watch-hero", 1903, "PulseFit on Apple Watch")),
    media("10", "Built for a glance", img("10-watch-screens", 2543, "PulseFit Apple Watch screens")),
    {
      kind: "intro",
      label: "/ 4   Landing & system",
      body: "A landing page that tells the story in a few scrolls and leads to the App Store — and 40+ components shared by app, watch and web.",
      spacing: "Section",
    },
    media("11", "Landing page · from first visit to first workout", img("11-web-landing", 2807, "PulseFit landing page")),
    media("12", "Design system · built to move", img("12-web-design-system", 3166, "PulseFit design system components")),
  ],
  delivered: {
    intro: {
      kind: "intro",
      label: "/ 5   Delivered",
      body: "One product across phone, wrist and web — research and flows, UI in two themes, a watch app, a landing page and the system that ties them together.",
      spacing: "Section",
    },
    stats: [
      { value: "40+", label: "Components", note: "One system for app, watch, web" },
      { value: "2", label: "Themes", note: "Light and a true dark" },
      { value: "4", label: "Body signals", note: "Recovery, activity, sleep, HR" },
      { value: "3", label: "Key journeys", note: "Onboarding, daily loop, challenges" },
    ],
    footnote: "Project facts · from the brand guidelines",
  },
  credits: {
    label: "( Credits )",
    rows: [
      { role: "Creative direction", name: "Olya Bocharova" },
      { role: "UX research", name: "Name Surname" },
      { role: "Product design", name: "Name Surname" },
      { role: "UI design", name: "Name Surname" },
      { role: "Apple Watch", name: "Name Surname" },
      { role: "Landing page", name: "Name Surname" },
      { role: "Design system", name: "Name Surname" },
    ],
  },
  cta: { heading: "Building a\nproduct?" },
  // Figma shows Solis Residences here; Next is the next case in the chain (content/cases/work.ts).
  next: { heading: "Next project." },
};
