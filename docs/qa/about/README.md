# QA — About (`/about`)

Figma: «About — B · No photos» (421:6180, 1440 × 4 078) and «About — Mobile 390» (424:6357, 390 × 4 618).
Code: `next start`, Chromium, full page, floating CTA hidden for the capture. Each file: Figma (left) vs code (right).

| Block | Figma 1440 | Code 1440 | Figma 390 | Code 390 | Note |
|---|---|---|---|---|---|
| Hero | 330 | 331 | 336 | 336 | |
| Who we are | 468 | 468 | 346 | 346 | |
| What we do | 1200 | 1198 | 1558 | 1552 | rows −2 / −4: Tag py 7 → space/6 (known) |
| Idea to launch | 468 | 468 | 380 | 380 | |
| In numbers | 460 | 460 | 688 | 688 | |
| CTA | 412 | 412 | 390 | 390 | |
| Footer | 656 | 900 | 844 | 900 | footer fills the viewport (decision 2026-11-16) |

Differences
- Nav: «Awards» → «About» (client); the About link gets `aria-current="page"`.
- Footer: Studio column gained «About» → /about. The Figma About frame's footer shows other social links and contact
  details than the Footer component — not applied, the footer stays the shared component.
- CTA heading at 1024–1439: Heading/H1 instead of Display/S (Display/S wrapped into four lines next to the buttons).

Checks: build, lint, typecheck clean; no horizontal scroll at 360 / 390 / 768 / 1024 / 1440 (`npm run test:overflow`);
«development.» never breaks (360: «Design meets / development.»); `npm run test:links` — 8 pages, no broken internal
links (to and from /about). Lighthouse mobile (2 runs): Performance 92 / 94, Accessibility 96, CLS 0 — the one flag is
the known text/secondary on bg/surface contrast in the stat card notes.
