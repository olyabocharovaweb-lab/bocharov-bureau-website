# QA — Contact (`/contact`)

Figma: «Contact — Desktop» (432:6249, 1440 × 2 281) and «Contact — Mobile 390» (432:6409, 390 × 2 069).
Code: `next start`, Chromium, full page, floating CTA hidden. Each file: Figma (left) vs code (right).

| Block | Figma 1440 | Code 1440 | Figma 390 | Code 390 | Note |
|---|---|---|---|---|---|
| Hero | 356 | 356 | 216 | 216 | |
| Brief | 483 | 478 | 288 | 285 | sentence lines: browser line boxes (same as Home) |
| Or reach us directly | 702 | 702 | 645 | 645 | rows 97 / 92 — exact |
| Footer | 656 | 900 | 844 | 900 | footer fills the viewport (decision 2026-11-16) |

Differences: Nav shows «About» instead of «Awards» (client); the footer Studio column has «About». Figma draws a
focus caret in «your name» — the code shows the real caret only when focused.

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440 (`/contact` added);
`npm run test:links`: 9 pages, no broken internal links; external links have target="_blank" + rel="noopener
noreferrer", mailto: has no target. Home after the BriefForm refactor: same height (9289 at 1440), #contact 626.
Lighthouse mobile /contact (2 runs): Performance 97 / 93, Accessibility 96, CLS 0 — flag: the form hints
(text/tertiary, as on Home).
