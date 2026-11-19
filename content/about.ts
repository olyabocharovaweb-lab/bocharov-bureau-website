/**
 * /about — Figma Main direction → «About — B · No photos» (421:6180), mobile «About — Mobile 390» (424:6357).
 * All texts verbatim from those frames; copy is still being refined (e.g. «duo» → «studio») — change it here only.
 * Two-tone lines: `primary` is text/primary, `secondary` text/secondary (as the case Challenge).
 */

export type TwoTone = { primary: string; secondary: string };

export const about = {
  seo: {
    title: "About — Bocharov Bureau",
    description:
      "Olya and Anatolii lead a design and development team of 50 — branding, UI/UX, websites and e-commerce, with AI in the process. You bring the idea. We bring it to life.",
  },

  hero: {
    lede: "— an independent creative design and development duo.",
    meta: ["12+ years in design", "Design · Development · AI"],
    /** Two lines: «Design meets development.» / «We make ideas happen.» */
    title: { primary: "Design meets development.", secondary: "We make ideas happen." } satisfies TwoTone,
  },

  whoWeAre: {
    label: "( Who we are )",
    text: {
      primary: "We’re Olya and Anatolii — an independent creative design and development duo",
      secondary: " helping businesses turn ideas into thoughtful, engaging digital experiences.",
    } satisfies TwoTone,
  },

  whatWeDo: {
    title: "What we do.",
    label: "( Capabilities )",
    rows: [
      {
        letter: "A /",
        title: "Design",
        body: "With 12+ years of experience in design, we bring together creative direction, branding, graphic design, UI/UX, website and e-commerce design, packaging, illustration, motion graphics and digital content. We combine a strong visual approach with a clear understanding of what works for your business.",
        tags: ["Creative direction", "Branding", "UI/UX", "Web & e-commerce", "Packaging", "Illustration", "Motion", "Digital content"],
      },
      {
        letter: "B /",
        title: "AI",
        body: "We also use AI tools to explore creative possibilities, develop visual concepts and streamline the design process — bringing fresh ideas to life while keeping quality and attention to detail at the heart of everything we do.",
        tags: ["Creative exploration", "Visual concepts", "Faster process"],
      },
      {
        letter: "C /",
        title: "Development",
        body: "On the development side, we turn designs into fully functional websites using WordPress, Shopify and Webflow, making sure every project looks great, works smoothly and delivers a seamless user experience.",
        tags: ["WordPress", "Shopify", "Webflow"],
      },
      {
        letter: "D /",
        title: "Idea to launch",
        body: "From the first idea to the final launch, we work closely together, combining creativity, technical expertise and a hands-on approach to make every project happen.",
        tags: [] as string[],
      },
    ],
  },

  ideaToLaunch: {
    label: "( Idea to launch )",
    text: {
      primary: "From the first idea to the final launch, we work closely together,",
      secondary: " combining creativity, technical expertise and a hands-on approach to make every project happen.",
    } satisfies TwoTone,
  },

  inNumbers: {
    label: "( In numbers )",
    stats: [
      { value: "12+", label: "Years in design", note: "From creative direction to digital content." },
      { value: "50", label: "People in the team", note: "Led by founders Olya and Anatolii." },
      { value: "Any", label: "Platform or stack", note: "WordPress, Shopify, Webflow, custom builds — whatever the project needs." },
    ],
  },

  cta: {
    heading: { primary: "You bring the idea.", secondary: "We bring it to life." } satisfies TwoTone,
    primary: "Start a project",
    secondary: "Book a 30-min call",
    note: "First concepts in 5 days · reply within 24 h · NDA on request",
  },
};
