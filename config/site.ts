/**
 * Site-wide configuration and feature flags.
 * Flip a flag to `true` once the real data behind that section exists.
 */
export const siteConfig = {
  name: "Bocharov Bureau",
  shortName: "Bocharov®",
  /** Set NEXT_PUBLIC_SITE_URL in production (used for metadataBase / OG / sitemap). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Bocharov® Bureau — AI-driven brand, digital & growth agency",
  description:
    "An AI-driven agency building brands, products and growth for ambitious companies. Human taste, machine precision.",

  /** Contact e-mail as in the Figma layout. Replace "[domain]" with the real domain. */
  email: "hello@[domain]",
  region: "Europe / US",

  flags: {
    /** "Client reflections" — placeholder quotes from Clutch in Figma. */
    showTestimonials: false,
    /** "In numbers" — Figma still has XX placeholders. */
    showStats: false,
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

/** Leave `href` empty until the real profile URL exists — it renders as plain text. */
export const socialLinks: NavItem[] = [
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "Behance", href: "" },
  { label: "Clutch", href: "" },
];

export const studioLinks: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Journal", href: "/journal" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Brief form select options.
 * Figma shows only "€10–25k" and "next month" — the rest are provisional (see README).
 */
export const briefOptions = {
  budget: ["< €10k", "€10–25k", "€25–50k", "€50k+"],
  start: ["right away", "next month", "in 2–3 months", "later this year"],
} as const;
