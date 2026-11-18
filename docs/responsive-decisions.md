# Responsive decisions — Home

Source of truth: Figma «Home — Mobile 390» (322:5633 / 322:5634), «Home — Mobile 390 · scrolled» (328:5145),
components «Nav / Mobile» (328:16) and «Icon / Toggle» (327:13). Desktop (1440) is unchanged.

Mobile-first: base classes = mobile, `md:` = tablet, `lg:` = desktop. One markup per section; the only
mobile/desktop text differences (contact sentence form) are separate `<span>`s for the same inputs.

| Range | Width | Layout |
|---|---|---|
| Mobile | ≤ 767 | Figma 390. Checked at 390 and 360: no horizontal page scroll. |
| Tablet | 768–1023 | No Figma frame → mobile structure, page padding 32, 2 columns where mobile stacks cards. |
| Desktop | ≥ 1024 | As before (Figma 1440). |

## Global
- Page padding: 20 (mobile) / 32 (tablet) / 40 (desktop). Section top spacing 72 on mobile/tablet (space/72).
- Type mapping desktop → mobile (all existing styles): wordmark Display/Wordmark → **Display/Wordmark S** (new, 72);
  section titles Display/S → Heading/H2; «Let’s talk.» Display/L → Heading/XL; manifesto and industries →
  Heading/H5 Large; service and step titles → Heading/H5; FAQ questions → Body/L; form → Heading/H5;
  numbers → Numeral/L.
- **Display/Wordmark S below 390**: 72px is wider than the 320px content at 360, so the size is `min(72px, 18.46vw)`
  (= 72 at 390 and up). Same idea for desktop Display/Wordmark: `min(268px, 18.62vw)` — 268 at 1440, and it no
  longer overflows (and scrolls sideways) between 1024 and 1439.
- Hover effects (grey service plate, floating service photo, hover sound) are desktop-only:
  `@media (hover: hover) and (min-width: 1024px)`.
- Carousels (hero photos, reviews): native `overflow-x: auto` + `scroll-snap-type: x mandatory`, scrollbar hidden,
  the strip bleeds to the right edge so the next card peeks; focusable region with a label for keyboard scrolling.
- Images: `sizes` per breakpoint (e.g. hero photo 264px, cards `calc(100vw - 40px)`), so phones never load desktop 2x.
  PulseFit's mobile card uses its own Figma crop (art direction via `<picture>`).
- Tap targets ≥ 44: menu button 44 × 44, FAQ rows (−8/+8 hit padding), Back to top (h 44), form fields (the label
  around each input reaches 8px above and below the 29px line → 45px).

## Header
- Below 1024 the desktop Nav is replaced by **Nav / Mobile** (fixed). A 76px sentinel in the flow reserves its space
  (CLS 0) and an IntersectionObserver on it switches **Top** (full width, bg/page) ↔ **Scrolled** (centred pill,
  bg/glass 80% + blur 16, shadow 0 8 24 / 8%; solid bg/glass where backdrop-filter isn't supported).
- The menu button is `aria-expanded="false"`; the menu screen is a later task.

## Sections at tablet (768–1023) — my decisions
- Hero, Manifesto, Services, Industries, Contact, FAQ, Footer: mobile layout, padding 32.
- In numbers: 2 columns (third card wraps).
- Selected work: featured card full width with its desktop ratio; the pair in 2 columns (desktop ratio); Graaho full width.
- Process: 2 × 2 grid.
- Reviews: carousel as on mobile (296 cards).
- Contact: mobile wording up to 1023.
- Footer: mobile black footer (Social + Studio side by side, Contact below), no scroll transition.

## Footer (mobile / tablet)
- Always black (bg/inverse); links Body/L text/inverse, step 12; titles and legal text/tertiary; min-height 100svh,
  padding 40 / 20, space-between. Bottom: legal (two lines) + «Back to top ↑» (smooth scroll, instant with reduced
  motion), then the wordmark (Display/Wordmark S). Desktop footer untouched.

## Floating «Book a call»
- Mobile: 16 from the right and `16 + env(safe-area-inset-bottom)` from the bottom; from md: 40 / 40.
- Hidden while the Contact form is in view; below 1024 also while the footer is in view.

---

# Responsive decisions — Case template (`components/case/CasePage.tsx`)

Source of truth: «Case — PulseFit · Mobile 390» (331:5241); desktop «Case — PulseFit» (256:70753) unchanged.
One template → every case in `content/cases/*.ts` (today PulseFit; NOVA, IndustryLens and Graaho will be data only).

## What made the page wider than the screen (390)
| Block | Cause |
|---|---|
| Hero | `h1` Display/XL 220px fixed → «PulseFit» 730px wide |
| Overview, Credits, every Section intro | label column `w-intro-label` (560px, shrink-0) in a row → content column squeezed to 0, text overflowing |
| Overview facts | 4 Meta items in one row, no wrap |
| Delivered | 4 Stat cards in one row (69px each) with Display/S 96 values, `white-space: nowrap` |
| CTA | Display/M 120 heading + two fixed buttons side by side (870px) |
| Next project | «Next project.» Display/S 96 `nowrap`; title + tags row `nowrap` |
| Graaho stub | Display/S 96 title |
Fixed in the shared components (Section intro, Stat card, Credits row, Media caption, CTA) and the template — not per case.

## Mobile (≤ 767)
- Padding 20; section top 72 (space/72); media blocks pt 40, caption gap 12 (as in 331:5275).
- Hero: breadcrumb + case index stacked left (gap 8). «Next →» is not in the mobile layout → shown from 1024 only
  (the Next project block covers it). Title one line: `min(72px, (100vw − 40px) / titleEms)` — Display/Wordmark S
  at most; `titleEms` = measured title width in em (PulseFit 3.36), estimated 0.62 em/char when missing.
  Hero photo 4:5 cover; PulseFit has its own mobile crop from Figma (art direction).
- Overview: label → lead Heading/H5 → tags (wrap) → facts grid 2 × 2 (gap 20) → «App Store · soon» full width.
- Challenge: Heading/H5 Large; first sentence primary, the rest secondary (as in 331:5271). Desktop keeps the client
  decision (all primary). The scroll reveal stays on both.
- Section intro: label above body (gap 16), pt 72 for Section and Subsection.
- Media: desktop image scaled to the width (no crop). Optional `mobile` per media item swaps in at ≤ 767px via
  `<picture>`; files in `/public/media/cases/<slug>/mobile/` (README there: 1170px wide, same names).
- Delivered: Stat cards 2 × 2, gap 12, p 20, value Numeral/M.
- Credits: label above rows; name may wrap.
- CTA: Heading/H2 → buttons full width stacked (gap 12) → note left; gap 40 under the heading.
- Next project: Heading/H2, counter on the right, photo 4:5 cover, title and tags stacked. Next = next case by
  number from content (PulseFit → Graaho 04), never Figma's Solis Residences.
  72px white space under it before the black footer (client 2026-11-17; Figma has 20).

## Tablet (768–1023) — my decisions
- Mobile structure, padding 32.
- Title: `clamp(72px, (100vw − 64px) / titleEms, 220px)` → «PulseFit» ≈ 210px at 768, one line.
- Hero photo, media and Next photo at full content width with their own ratio (Next: 1360 / 620 crop as desktop).
- Overview facts: 4 in a row. Delivered: 4 in a row (≈ 167px each fits at 768).
- NOVA sticky section index: not built yet; when it is, hide it below 1024.

---

# Responsive decisions — Work (`/work`, `components/work/WorkView.tsx`)

Source of truth: desktop «Work — Variant 1b (light)» (256:68713), mobile «Work — Mobile 390» (378:11795 — the brief
said 381:6071, which is not in the file). Data only from `content/cases/work.ts`.

## Mobile (≤ 767)
- Hero: lede + «© 2018—26 / N selected projects» stacked left; «Work®» Display/Wordmark S. Filters: one swipeable
  row (native scroll-snap, no scrollbar, buttons 46–48 high), bleeding to the right edge. Grid / List hidden.
- Cards: one column by number (PulseFit 01 → LINQUE 05), gap 40. Featured PulseFit = ordinary card (Figma mobile
  crop, no metric). Photos 4:5 cover; Graaho keeps its ratio; LINQUE uses its own whole mobile picture.
- Index: no column labels; client (Heading/H5) over industry, year and ↗ on the right; whole row is a link (84 high).
  No services, no hover preview.
- CTA: Heading/H2 → «Start a project» full width → note left.

## Tablet (768–1023) — my decisions
- Mobile structure, padding 32; filters still a swipe row (fits without scrolling at 768).
- Featured full width with the desktop photo ratio; the other cards in 2 columns without the offset (IndustryLens 02,
  NOVA 03 / Graaho 04, LINQUE 05 — numeric order).
- Index: mobile row + the Services column.

## Desktop (≥ 1024)
- As Figma: featured wide, two-column grid with the right column 200 lower (02/04 left, 03/05 right), Index table with
  labels, hover = grey plate + case photo 98 above the row, 279 from the left, rotated 4° (no animation).
- Filtering keeps the alternation: the filtered cards are split left/right by number.
- Grid / List: List hides the featured card and the grid (desktop only), leaving the Index.
