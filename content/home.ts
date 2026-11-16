/** Home page copy — verbatim from Figma «Homepage — Variant 1b (light)» (256:68176). */

export const hero = {
  lede: "— an AI-driven agency building brands, products and growth for ambitious companies. Human taste, machine precision.",
  years: "© 2018—26",
  disciplines: "Brand · Digital · Content · Growth · AI",
  wordmark: "Bocharov®",
  photos: [
    { src: "/media/home-hero-1.webp", alt: "Model in a sculptural blue latex outfit on orange" },
    { src: "/media/home-hero-2.webp", alt: "Iridescent perfume bottle above liquid chrome" },
    { src: "/media/home-hero-3.webp", alt: "Spiral white tower on an island at sunset" },
    { src: "/media/home-hero-4.webp", alt: "Man in a red coat among giant blue spheres" },
  ],
};

export const manifesto = {
  label: "( Manifesto )",
  lead: "We pair senior creative direction with our own ",
  rest: "AI systems. Ideas move from concept to market faster, sharper and at a scale studios could not reach before.",
};

/**
 * Hover photos: Figma has no service media yet, so the Hero photos stand in
 * (E reuses P1). Replace when the real images exist.
 */
export const services = {
  title: "Ideas in motion.",
  label: "( Our services )",
  cta: "Get started",
  items: [
    {
      letter: "A /",
      title: "Brand & Identity",
      body: "Strategy, naming, visual identity and guidelines — built to scale across every channel.",
      tags: ["Brand strategy", "Naming", "Visual identity", "Guidelines"],
      photo: "/media/home-hero-1.webp",
    },
    {
      letter: "B /",
      title: "Websites & Digital Products",
      body: "Award-level websites, platforms and apps — designed and engineered in-house.",
      tags: ["Web design", "Development", "UI/UX", "E-commerce"],
      photo: "/media/home-hero-4.webp",
    },
    {
      letter: "C /",
      title: "Content & Production",
      body: "Photo, video, 3D and AI-generated imagery — campaign-ready, on brand, at volume.",
      tags: ["AI imagery", "Photo & video", "3D & motion", "Social content"],
      photo: "/media/home-hero-3.webp",
    },
    {
      letter: "D /",
      title: "Growth & Marketing",
      body: "Performance, SMM and SEO that turn attention into revenue.",
      tags: ["Performance ads", "SMM", "SEO", "CRO & analytics"],
      photo: "/media/home-hero-2.webp",
    },
    {
      letter: "E /",
      title: "AI Systems",
      body: "Agents, automation and integrations that keep working after launch.",
      tags: ["AI agents", "Automation", "Integrations", "AI content pipelines"],
      photo: "/media/home-hero-1.webp",
    },
  ],
};

export const numbers = {
  label: "( Bocharov® in numbers )",
  items: [
    { value: "XX+", label: "Projects delivered", note: "Brands, platforms and campaigns across Europe and the US." },
    { value: "5.0", label: "Rating on Clutch", note: "Verified client reviews. Placeholder until the profile is live." },
    { value: "XX%", label: "Faster production", note: "How much sooner content ships with our AI pipeline vs. a classic studio." },
  ],
};

export const selectedWork = {
  title: "Selected work",
  cta: "All projects",
  featured: {
    title: "PulseFit — fitness that listens to your body",
    number: "01",
    tags: "Health & fitness · AI app · iOS · Apple Watch",
    image: { src: "/media/case-pulsefit-wide.webp", alt: "Athlete stretching against a green background", width: 2720, height: 1520 },
  },
  pair: [
    {
      title: "IndustryLens — look closer",
      number: "02",
      tags: "B2B SaaS · Brand identity · Guidelines",
      image: { src: "/media/industrylens-card.webp", alt: "IndustryLens poster on a city wall", width: 1348, height: 1520 },
    },
    {
      title: "NOVA — an assistant that doesn’t stop at an answer",
      number: "03",
      tags: "AI product · UX/UI · Brand",
      image: { src: "/media/case-nova-card.webp", alt: "NOVA app on a phone next to an iridescent orb", width: 1348, height: 1520 },
    },
  ],
  graaho: {
    title: "Graaho — the intelligent enterprise, explained",
    number: "04",
    tags: "Enterprise AI & cloud · Web design",
    image: { src: "/media/case-graaho-home.webp", alt: "Graaho website on desktop and mobile", width: 2720, height: 1440 },
  },
};

export const process = {
  title: "The process",
  steps: [
    {
      number: "01",
      title: "Discovery",
      body: "We listen first: goals, audience, market, constraints.",
      ai: "AI: market & competitor scan in days, not weeks",
    },
    {
      number: "02",
      title: "Strategy",
      body: "Positioning, concept and roadmap for brand, product and growth.",
      ai: "AI: rapid concept and message testing",
    },
    {
      number: "03",
      title: "Design & Build",
      body: "Identity, website, content — crafted and engineered in-house.",
      ai: "AI: generative visuals, prototyping, QA",
    },
    {
      number: "04",
      title: "Launch & Grow",
      body: "Campaigns, SMM and SEO; we measure and improve every month.",
      ai: "AI: automated reporting and optimisation",
    },
  ],
};

const quote =
  "“Real client quote from Clutch goes here — one or two lines about results and how it felt to work together.”";

export const reviews = {
  title: "Client reflections",
  rating: "5.0 ★★★★★",
  ratingNote: "XX VERIFIED REVIEWS ON CLUTCH",
  items: [
    { quote, role: "Head of Marketing, Beauty brand", photo: "/media/home-review-1.webp" },
    { quote, role: "CEO, Real estate developer", photo: "/media/home-review-2.webp" },
    { quote, role: "Founder, Hospitality group", photo: "/media/home-review-3.webp" },
  ],
};

export const industries = {
  label: "( Industries we know )",
  text: "Beauty / Real Estate / Hospitality / Healthcare / E-commerce / Tech & SaaS",
};

/** Sentence form (Figma «Sentence form» 256:68639): text before the field, the field, text after. */
export type SentenceLine = {
  before: string;
  field: { name: string; placeholder: string; type: "text" | "email"; required?: boolean; autoComplete?: string };
  after: string;
};

export const contact = {
  title: "Let’s talk.",
  lines: [
    {
      before: "Hey Bocharov®, I’m",
      field: { name: "name", placeholder: "your name", type: "text", required: true, autoComplete: "name" },
      after: ".",
    },
    { before: "I need", field: { name: "project", placeholder: "a brand / website / campaign", type: "text" }, after: "." },
    {
      before: "Reach me at",
      field: { name: "email", placeholder: "email", type: "email", required: true, autoComplete: "email" },
      after: ".",
    },
  ] as SentenceLine[],
  cta: "Send the brief",
};

export const faq = {
  title: "Questions, answered.",
  items: [
    {
      q: "How do you use AI — and where do humans decide?",
      a: "AI speeds up research, concepts and production. Strategy, taste and every final call stay with our senior team.",
    },
    {
      q: "Can you take the whole thing — brand, site, content and marketing?",
      a: "Yes. One team runs it end to end, so nothing gets lost between vendors.",
    },
    { q: "How long does a typical project take?" },
    { q: "Do you work with companies outside Europe?" },
  ] as Array<{ q: string; a?: string }>,
};
