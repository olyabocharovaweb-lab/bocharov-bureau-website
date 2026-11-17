# QA — Home, mobile (390 / 360) and tablet

Figma: «Home — Mobile 390» (322:5634), «… · scrolled» (328:5145). Code: `next start`, Chromium, 390 × 844 and 360 × 800
(touch, reduced motion for static shots, floating CTA hidden for the capture). Files `NN-section.webp`:
Figma 390 | code 390 | code 360, with heights and the share of pixels differing by > 40/255 (390).

| # | Section | Figma | Code 390 | Δ | Diff | Code 360 | Note |
|---|---|---|---|---|---|---|---|
| 00 | Header Top / Scrolled | 76 | 76 | 0 | — | 76 | pill 288 × 52 at 12 from the top |
| 01 | Nav | 76 | 76 | 0 | 4.1% | 76 | |
| 02 | Hero | 663 | 663 | 0 | 4.8% | 658 | |
| 03 | Manifesto | 346 | 346 | 0 | 8.0% | 346 | client decision: all text black (Figma: second half grey) |
| 04 | Services | 1493 | 1473 | −20 | 8.8% | 1502 | known: Tag 32 → 30 (py 7 has no token), 2 rows × 5 |
| 05 | In numbers | 724 | 724 | 0 | 2.7% | 724 | client numbers instead of Figma XX |
| 06 | Selected work | 2223 | 2168 | −55 | 2.9% | 2055 | footnote «Назви… умовні» omitted (as on desktop) |
| 07 | Process | 930 | 930 | 0 | 2.9% | 930 | |
| 08 | Reviews | 488 | 488 | 0 | 4.4% | 488 | |
| 09 | Industries | 206 | 206 | 0 | 2.6% | 240 | |
| 10 | Contact | 336 | 333 | −3 | 6.5% | 370 | Figma draws the focus caret; at 360 «brand / website / ads.» wraps |
| 11 | FAQ | 762 | 762 | 0 | 5.8% | 762 | |
| 12 | Footer | 844 | 844 | 0 | 4.7% | 844 | 100svh |

- Horizontal scroll: `document.documentElement.scrollWidth` = 390 at 390, 360 at 360, 768 at 768, 1024 at 1024.
- Desktop 1440 regression vs the previous build: page height identical (9289), 0.044% pixels differ — only the FAQ
  icons (now Icon / Toggle instead of the «+ / —» glyphs) and the hint text of the form fields.
- Lighthouse mobile (local `next start`, 3 runs): Performance 90 / 91 / 97, Accessibility 96, Best practices 100,
  SEO 100, CLS 0. Remaining a11y flag: text/secondary on bg/surface contrast (see ds-gaps).
- WebKit (Safari) could not be run here: the container has no Playwright WebKit build. Safari-specific parts are
  written defensively: `-webkit-backdrop-filter` + `@supports` fallback to solid bg/glass, `min-height: 100svh`,
  `env(safe-area-inset-bottom)`. Worth a look on a real iPhone.
- `tablet-768-full.webp`: full page at 768.
