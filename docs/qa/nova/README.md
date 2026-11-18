# QA — Case NOVA (`/work/nova`)

Figma: Main direction → «Case — Nova» (256:69051), 1440 × 15 949. Mobile: no NOVA frame — the template follows
«Case — PulseFit · Mobile 390» (331:5241).
Code: `next start`, Chromium, full-page captures after a scroll pass (the Challenge reveal resets at the top).

- `1440-figma-vs-code-1…4.webp` — Figma (left) vs code (right): hero → challenge; media 01 → identity; first minute → voice; delivered → footer.
- `1440-sticky-label.webp` — desktop sticky section label (client choice 2026-11-18), pinned 120 below the top.
- `390-code.webp` — the whole page at 390 in three columns.

| Block | Figma | Code | Note |
|---|---|---|---|
| Hero index | «’26 · Case 01 / 12» | «’26 · Case 01 / 5» | total = published cases (content/cases/work.ts) |
| Overview facts | Client «NOVA [юр. назва]» | hidden | placeholder |
| «/ 1 Strategy» (For / Character tags), «/ 1.1 Principles», «/ 3 Product» | shown | not rendered | blocks not in the template — client: skip for now |
| «/ 4 System» intro + media 24 — 25 | placeholder frames | not rendered | client: hide the whole section |
| Media 01 top space | 48 (after Principles) | 72 | Principles not rendered, so it follows the Challenge |
| Media 03, 07 — 08 | video / animation | still frame | poster until video is added |
| Media 09 — 12 | two frames | one image (12 px gap baked in) | template has one image per media |
| Footnote | + Motion note | text only | note → docs/motion-notes.md |
| Credits | 7 rows | 1 row (Creative direction) | «Name Surname» hidden |
| Next project | Solis Residences, «( 02 / 12 )» | IndustryLens, «( 02 / 5 )» | from the next case's data |

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440.
Lighthouse mobile (2 runs): Performance 92 / 93, Accessibility 96, CLS 0. The one a11y flag is the known
text/secondary on bg/surface contrast (4.28:1) in the stat cards — a token question.
