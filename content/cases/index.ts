import { pulsefit } from "./pulsefit";
import type { CaseData } from "./types";

/** Cases rendered by app/work/[slug]. NOVA, IndustryLens and Graaho will be added as data only. */
export const cases: CaseData[] = [pulsefit];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
