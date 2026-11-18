# QA — Case IndustryLens (`/work/industrylens`)

Figma: Main direction → «Case — IndustryLens» (256:69887), 1440 × 16 390. Mobile: template «Case — PulseFit · Mobile 390» (331:5241).
Code: `next start`, Chromium, full-page captures after a scroll pass (the Challenge reveal resets at the top).

- `1440-figma-vs-code-1…5.webp` — Figma (left) vs code (right): hero → logo; versions → scale; system → in use; in use; delivered → footer.
- `390-code.webp` — the whole page at 390 in three columns.

| Block | Figma | Code | Note |
|---|---|---|---|
| Hero index | «’26 · Case 02 / 12» | «’26 · Case 02 / 5» | total = published cases |
| «Visit industry-lens.com ↗» | Button Style=Link | link to https://industry-lens.com, new tab, `noopener noreferrer` | |
| Type card | hidden note «Specimen set in Outfit…» | not in the export | hidden layer; specimen text in the image is set in Outfit |
| Media numbers | 02, 03, 04, 05, 06, 08, 10 … 14 | same | verbatim; 01 / 07 / 09 are missing in Figma |
| Section labels | «/ 2 System» → «/ 4 Typography» | same | verbatim; there is no «/ 3» in Figma |
| Stat cards 1024–1439 | — | value Numeral/M (Display/S from 1440) | «128 px» didn't fit four-in-a-row below 1440 (shared StatCard) |
| Stat card label < 1024 | — | wraps | «Minimum logo width» didn't fit the 2 × 2 grid at 390 |
| Footnote | + Motion note | text only | note → docs/motion-notes.md |
| Credits | 7 rows | 1 row | «Name Surname» hidden |
| Next project | Solis Residences, «( 02 / 12 )» | PulseFit, «( 03 / 5 )» | from the next case's data |

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440 on every page.
Lighthouse mobile (4 runs): Performance 89 / 91 / 96 / 95 (LCP = hero photo, 2.7–3.5 s), Accessibility 96, CLS 0.
The one a11y flag is the known text/secondary on bg/surface contrast in the stat cards (token question).
