import manifest from "./mobile-media.json";
import type { CaseImage } from "./types";

/**
 * Phone versions of case media (< 768px) — exported from Figma «Mobile media — <case>» sections, layers
 * <case>/<section-slug>[-N] (scripts/mobile-media.mjs writes the files and mobile-media.json).
 * The section slug is the Figma desktop section name in kebab-case: «Product · Flow» → product-flow,
 * «Brand · Wordmark & icon media» → brand-wordmark-and-icon-media.
 */
export type MobileImage = Omit<CaseImage, "alt">;

const all = manifest as Record<string, Record<string, MobileImage[]>>;

/** The ordered phone images for a case section, or undefined (→ the desktop image is used). */
export function mobileMedia(caseSlug: string, section: string | undefined): MobileImage[] | undefined {
  if (!section) return undefined;
  const list = all[caseSlug]?.[section];
  return list?.length ? list : undefined;
}

/** Every section slug that has phone files (for the coverage report / tests). */
export const mobileSections = (caseSlug: string) => Object.keys(all[caseSlug] ?? {});
