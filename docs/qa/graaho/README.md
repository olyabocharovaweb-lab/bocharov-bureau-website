# QA — Case Graaho (`/work/graaho`, replaces the stub)

Figma: Main direction → «Case — Graaho» (256:72014), 1440 × 13 475. Mobile: template «Case — PulseFit · Mobile 390» (331:5241).
Code: `next start`, Chromium, full-page captures after a scroll pass (the Challenge reveal resets at the top).

- `1440-figma-vs-code-1…4.webp` — Figma (left) vs code (right): hero → homepage intro; homepage → inner pages; tools → insight hub; responsive → footer.
- `390-code.webp` — the whole page at 390 in three columns.

| Block | Figma | Code | Note |
|---|---|---|---|
| Hero index | «’26 · Case 04 / 12» | «’26 · Case 04 / 5» | total = published cases |
| Hero photo on phones | — | whole image, no 4:5 crop | site screens; `hero.natural` (new optional template field, as `natural` on Work cards) |
| Overview button | hidden layer | not rendered | no link to the client site (brief) |
| Overview Year | «[рік]» | hidden | placeholder |
| Footnote | «Project facts · from the brand guidelines» + Motion note | text only | verbatim (same line as IndustryLens); note → docs/motion-notes.md |
| Credits | 7 rows | 1 row | «Name Surname» hidden |
| Next project | Solis Residences, «( 02 / 12 )» | LINQUE, «( 05 / 5 )» | from the next case's data (Work card photo until LINQUE has its page) |

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440 on every page.
Lighthouse mobile (2 runs): Performance 91 / 92, Accessibility 96, CLS 0 (known stat-card contrast flag).
