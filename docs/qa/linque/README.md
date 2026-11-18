# QA — Case LINQUE (`/work/linque`, replaces the stub)

Figma: Main direction → «Case — LINQUE» (344:5993), 1440 × 20 447. Mobile: template «Case — PulseFit · Mobile 390» (331:5241).
Code: `next start`, Chromium, full-page captures after a scroll pass (the Challenge reveal resets at the top).

- `1440-figma-vs-code-1…5.webp` — Figma (left) vs code (right): hero → problem; product; safety → mobile; system; delivered → footer.
- `390-code.webp` — the whole page at 390 in three columns.

| Block | Figma | Code | Note |
|---|---|---|---|
| Hero index | «’25 · Case 05 / 12» | «’25 · Case 05 / 5» | total = published cases |
| Hero | «Hero — photo» (344:6004) | one 2x image, glass cards included | phones: same image shown whole (`hero.natural`) — a 4:5 crop cut the face and pills; mobile image later |
| Media slides | radius 6, no underlay | no CSS radius or background (`plain`) | radius baked into the export on white |
| Preference filters | 344:8073 with Suggested Profiles phone | exported from the current frame | |
| Typography slide | hidden «Note · font» | not in the export | hidden layer |
| Overview button | hidden layer | not rendered | no button (brief) |
| Footnote | + Motion note | text only | note → docs/motion-notes.md |
| Credits | 7 rows | 1 row | «Name Surname» hidden |
| Next project | NOVA «( 01 / 12 )» | NOVA «( 01 / 5 )», NOVA hero photo | chain wraps 05 → 01 |

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440 on every page.
Lighthouse mobile (2 runs): Performance 91 / 92, Accessibility 96, CLS 0 (known stat-card contrast flag).
