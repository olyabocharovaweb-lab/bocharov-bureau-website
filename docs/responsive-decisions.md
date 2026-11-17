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
