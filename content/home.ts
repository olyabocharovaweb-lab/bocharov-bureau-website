/**
 * Home page copy — verbatim from Figma (node 74:1209).
 */
export const hero = {
  intro:
    "— an AI-driven agency building brands, products and growth for ambitious companies. Human taste, machine precision.",
  years: "© 2018—26",
  disciplines: "Brand · Digital · Content · Growth · AI",
  wordmark: "Bocharov",
  photos: [
    {
      src: "/media/hero-1.webp",
      alt: "Fashion portrait of a model in a sculptural glossy cobalt outfit on orange",
    },
    {
      src: "/media/hero-2.webp",
      alt: "Chrome perfume bottle floating above a liquid magenta and lime wave",
    },
    {
      src: "/media/hero-3.webp",
      alt: "Curving white tower reflected in a still pool at sunset",
    },
    {
      src: "/media/hero-4.webp",
      alt: "Man in a red coat standing among giant pale-blue spheres",
    },
  ],
};

export const manifesto = {
  label: "( Manifesto )",
  text: "We pair senior creative direction with our own AI systems. Ideas move from concept to market faster, sharper and at a scale studios could not reach before.",
};

export type Service = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  image?: { src: string; width: number; height: number; alt: string };
};

export const services = {
  title: "Ideas in motion.",
  label: "( Our services )",
  cta: "Get started",
  items: [
    {
      index: "A /",
      title: "Brand & Identity",
      description:
        "Strategy, naming, visual identity and guidelines — built to scale across every channel.",
      tags: ["Brand strategy", "Naming", "Visual identity", "Guidelines"],
      image: {
        src: "/media/service-brand.webp",
        width: 1536,
        height: 864,
        alt: "Abstract iridescent glass shapes",
      },
    },
    {
      index: "B /",
      title: "Websites & Digital Products",
      description:
        "Award-level websites, platforms and apps — designed and engineered in-house.",
      tags: ["Web design", "Development", "UI/UX", "E-commerce"],
    },
    {
      index: "C /",
      title: "Content & Production",
      description:
        "Photo, video, 3D and AI-generated imagery — campaign-ready, on brand, at volume.",
      tags: ["AI imagery", "Photo & video", "3D & motion", "Social content"],
    },
    {
      index: "D /",
      title: "Growth & Marketing",
      description: "Performance, SMM and SEO that turn attention into revenue.",
      tags: ["Performance ads", "SMM", "SEO", "CRO & analytics"],
    },
    {
      index: "E /",
      title: "AI Systems",
      description: "Agents, automation and integrations that keep working after launch.",
      tags: ["AI agents", "Automation", "Integrations", "AI content pipelines"],
    },
  ] satisfies Service[],
};

export const stats = {
  label: "( Bocharov® in numbers )",
  items: [
    {
      value: "XX+",
      title: "Projects delivered",
      text: "Brands, platforms and campaigns across Europe and the US.",
    },
    {
      value: "5.0",
      title: "Rating on Clutch",
      text: "Verified client reviews. Placeholder until the profile is live.",
    },
    {
      value: "XX%",
      title: "Faster production",
      text: "How much sooner content ships with our AI pipeline vs. a classic studio.",
    },
  ],
};

export const selectedWork = {
  title: "Selected work",
  cta: "All projects",
};

export const process = {
  title: "The process",
  steps: [
    {
      index: "01",
      title: "Discovery",
      text: "We listen first: goals, audience, market, constraints.",
      ai: "AI: market & competitor scan in days, not weeks",
    },
    {
      index: "02",
      title: "Strategy",
      text: "Positioning, concept and roadmap for brand, product and growth.",
      ai: "AI: rapid concept and message testing",
    },
    {
      index: "03",
      title: "Design & Build",
      text: "Identity, website, content — crafted and engineered in-house.",
      ai: "AI: generative visuals, prototyping, QA",
    },
    {
      index: "04",
      title: "Launch & Grow",
      text: "Campaigns, SMM and SEO; we measure and improve every month.",
      ai: "AI: automated reporting and optimisation",
    },
  ],
};

export const testimonials = {
  title: "Client reflections",
  rating: "5.0 ★★★★★",
  ratingLabel: "XX verified reviews on Clutch",
  items: [
    {
      quote:
        "“Real client quote from Clutch goes here — one or two lines about results and how it felt to work together.”",
      author: "Head of Marketing, Beauty brand",
      photo: "/media/review-1.webp",
    },
    {
      quote:
        "“Real client quote from Clutch goes here — one or two lines about results and how it felt to work together.”",
      author: "CEO, Real estate developer",
      photo: "/media/review-2.webp",
    },
    {
      quote:
        "“Real client quote from Clutch goes here — one or two lines about results and how it felt to work together.”",
      author: "Founder, Hospitality group",
      photo: "/media/review-3.webp",
    },
  ],
};

export const industries = {
  label: "( Industries we know )",
  items: ["Beauty", "Real Estate", "Hospitality", "Healthcare", "E-commerce", "Tech & SaaS"],
};

export const brief = {
  title: "Let’s talk.",
  cta: "Send the brief",
};

export type FaqItem = { question: string; answer: string | null };

/** `answer: null` → not in Figma yet; such items are not rendered. */
export const faq = {
  title: "Questions, answered.",
  items: [
    {
      question: "How do you use AI — and where do humans decide?",
      answer:
        "AI speeds up research, concepts and production. Strategy, taste and every final call stay with our senior team.",
    },
    {
      question: "Can you take the whole thing — brand, site, content and marketing?",
      answer: "Yes. One team runs it end to end, so nothing gets lost between vendors.",
    },
    { question: "How long does a typical project take?", answer: null },
    { question: "Do you work with companies outside Europe?", answer: null },
  ] satisfies FaqItem[],
};
