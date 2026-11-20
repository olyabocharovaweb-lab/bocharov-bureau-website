import manifest from "./mobile-media.json";
import type { CaseImage } from "./types";

/**
 * Phone versions of case media (< 768px) — Figma «Mobile media — <case>» sections. Each «<Section> — mobile · <type>»
 * box is a list of blocks in order: an image, or a carousel (optional title + items). Files and mobile-media.json come
 * from scripts/mobile-media.mjs (structure: scripts/mobile-media.manifest.json).
 * The section slug is the Figma desktop section name in kebab-case: «Product · Flow» → product-flow,
 * «Brand · Wordmark & icon media» → brand-wordmark-and-icon-media.
 */
export type MobileImage = Omit<CaseImage, "alt">;
export type MobileBlock =
  | ({ type: "image" } & MobileImage)
  | { type: "carousel"; title?: string; items: MobileImage[] };

const all = manifest as unknown as Record<string, Record<string, MobileBlock[]>>;

/** The phone blocks for a case section, or undefined (→ the desktop image is used). */
export function mobileMedia(caseSlug: string, section: string | undefined): MobileBlock[] | undefined {
  if (!section) return undefined;
  const list = all[caseSlug]?.[section];
  return list?.length ? list : undefined;
}
