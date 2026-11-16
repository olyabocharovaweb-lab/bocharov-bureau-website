# Home — Figma vs code (1440)

* `figma-home-1440.png` — Figma frame 256:68176 at 1x
* `code-home-1440.png` — `/` rendered by Chromium at 1440, 1x, `prefers-reduced-motion: reduce` (final state of motion)
* `compare/*.png` — per block: **Figma | code | difference** (white = identical)

| Block | Figma h | Code h | Pixels differing (>40/255) | Why |
|---|---|---|---|---|
| Nav | 84 | 80 | 2.6% | padding 30 → space/28 (ds-gaps) |
| Hero | 885 | 885 | 0.6% | — |
| Manifesto | 468 | 468 | 7.0% | whole sentence black by decision (Figma: second half grey); reveal on scroll (reveal/) |
| Services | 1285 | 1275 | 6.4% | Tag 32 → 30 (padding 7 → 6); Figma mock shows the hover photo over row B (code: only on hover, see services-hover/) |
| In numbers | 468 | 468 | 0.8% | — |
| Selected work | 2876 | 2814 | 0.4% | footnote «Назви клієнтів…» not rendered (−62) |
| Process | 464 | 464 | 0.7% | — |
| Reviews | 452 | 452 | 2.0% | — |
| Industries | 304 | 304 | 0.5% | — |
| Contact form | 654 | 654 | 2.5% | ▾ glyph rendering |
| FAQ | 670 | 670 | 0.6% | — |
| Footer | 656 | 900 | — | fills the viewport by decision (Figma 656) |

Remaining per-glyph differences are anti-aliasing between Figma's and Chromium's text rasterisers.
