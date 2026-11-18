/**
 * /work page copy (Figma «Work — Variant 1b (light)» 256:68713). Lists and counts come from content/cases.
 * `selectedFrom` is kept separate so the number can be updated in one place (still being confirmed).
 */
export const work = {
  seo: {
    title: "Work | Bocharov Bureau",
    description: "Brands, products and campaigns for ambitious companies.",
  },
  lede: "— brands, products and campaigns for ambitious companies.",
  selectedFrom: "Selected from 120+ projects across Europe and the US.",
  years: "© 2018—26",
  /** «5 selected projects» — N is counted from content/cases */
  selectedProjects: (n: number) => `${n} selected projects`,
  title: "Work®",
  all: "All",
  views: { grid: "Grid", list: "List" },
  index: { title: "Index", label: "( All projects )", columns: { year: "Year", client: "Client", industry: "Industry", services: "Services" } },
  cta: { heading: "Your project\ncould be next.", button: "Start a project" },
};
