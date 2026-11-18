import type { CaseData } from "./types";
import { workEntries } from "./work";

export * from "./work";

/** Cases with a full page (rendered by the case template at /work/<slug>). */
export const cases: CaseData[] = workEntries.flatMap((e) => (e.page ? [e.page] : []));

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
