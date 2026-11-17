# QA — Case template, mobile (390) and tablet

Figma «Case — PulseFit · Mobile 390» (331:5241). Code: `next start`, Chromium 390 × 844, reduced motion, floating CTA
hidden for the capture. `NN-block.webp` = Figma | code, with heights and differing-pixel share.

| Block | Figma | Code | Δ | Note |
|---|---|---|---|---|
| Nav | 76 | 76 | 0 | |
| Hero | 629 | 629 | 0 | mobile crop from Figma (0.3% diff) |
| Overview | 647 | 641 | −6 | known: Tag 32 → 30 (3 rows) |
| Challenge | 426 | 426 | 0 | |
| Section intros | 220 / 249 / 191 | same | 0 | |
| Media 01, 11 | 423, 427 | 437, 441 | +14 | caption wraps to 2 lines (in Figma the number is pushed out of the frame) |
| Media 06, 07, 09, 10 | 406 | 377, 377, 311, 393 | −29…−95 | Figma uses 340-high mobile crops; code scales the desktop image (no crop) until mobile images arrive |
| Other media | — | — | 0 | |
| Delivered cards | 392 | 392 | 0 | 2 × 2 |
| Footnote | 35 | 26 | −9 | Motion note not rendered |
| Credits | 405 | 405 | 0 | |
| CTA | 342 | 342 | 0 | |
| Next project | 701 | 646 | −55 | Figma title box fixed 105; Graaho instead of Solis (content) |
| Footer | 844 | 844 | 0 | |

- No horizontal scroll: `npm run test:overflow` (tests/no-horizontal-scroll.mjs) — `/`, `/work/pulsefit`, `/work/graaho`
  at 360, 390, 768, 1024: all `scrollWidth === innerWidth`.
- Desktop 1440 regression: every block height identical to the previous build.
- Mobile images: with a test file in `mobile/` the 390 page loaded `/media/cases/pulsefit/mobile/01-brand-logo.webp`
  (350 × 418, its own ratio), 1440 loaded the desktop file; test file removed afterwards.
- Lighthouse mobile `/work/pulsefit` (3 runs): Performance 91 / 91 / 97, Accessibility 96, Best practices 100, SEO 100,
  CLS 0. Remaining flag: contrast of text/secondary on bg/surface and the tertiary footnote (design tokens).
- `other-*.webp`: PulseFit at 768, Graaho stub at 390 and 768. NOVA and IndustryLens pages don't exist yet.
