# QA — Work (`/work`)

Figma desktop «Work — Variant 1b (light)» (256:68713), mobile «Work — Mobile 390» (378:11795). Code: `next start`,
Chromium, reduced motion, floating CTA hidden for the captures. Heights exclude Figma's Motion notes (not rendered).

| Block | Figma 1440 | Code 1440 | Diff | Figma 390 | Code 390 | Diff |
|---|---|---|---|---|---|---|
| Hero | 491 | 491 | 1.5% | 351 | 351 | 5.2% |
| Featured | 854 | 854 | 0.7% | 586 | 586 | 3.5% |
| Grid | 2048 | 2048 | 4.3% | 2088 | 2086 | 6.1% |
| Index | 667 | 667 | 4.6% | 570 | 570 | 0.8% |
| CTA | 416 | 416 | 1.4% | 288 | 282 | −6px (Figma frame fixed 216) |
| Footer | 656 | 844 | full-screen footer (decision) | 844 | 844 | 4.4% |

- `1440-index-hover.webp`: hover on NOVA — grey plate + photo 98 above the row, 279 from the left, 4°.
- Filters (Playwright, 390 / 768 / 1440): Product design → PulseFit, NOVA, LINQUE; Brand identity → IndustryLens, NOVA;
  Web design → Graaho; All resets; `/work?service=brand-identity` on reload opens filtered; `?view=list` (desktop)
  hides the cards and keeps the Index. Index rows follow the filter.
- Links: every card and Index row → `/work/<slug>` (200). PulseFit = case page; the others = stub until laid out.
- No placeholder names on the page (Maison Noor, Atlas, Suds & Co., Hotel Aurelia, Kora, Verde, Nordline, Solis).
- No horizontal scroll at 360 / 390 / 768 / 1024 / 1440 (`npm run test:overflow`, now includes /work).
- Lighthouse mobile `/work` (5 runs): Performance 83 (cold first run) / 96 / 95 / 91 / 97, Accessibility 100,
  Best practices 100, SEO 100, CLS 0.
- `tablet-768-full.webp`: full page at 768.
