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

## Services list — hover state (312:5004)

`services-list/compare-figma-code-diff.png` — Figma | code (hover on «Growth & Marketing», floating photo hidden) | diff.
Diff >40/255: 4.2%, all from text shifting 2px per row (Tag 30 vs 32). Sampled pixels — grey plate,
plate edge, dividers above A/B/C, hidden dividers above D/E, 24px inset, no white strips — identical.
`services-list/code-hover-growth-viewport.png` — the same hover with the floating photo, 1440×900.

## Contact form (256:68637) and floating CTA (314:5029)

`contact-cta/compare-figma-code-diff.png` — Figma | code (empty) | diff, code shifted 5px below the title to
cancel the caret drawn into Figma line 1. Diff >40/255: 1.1% aligned (4.1% raw). Per block: title 0.1%,
line 1 text 0.8%, line 2 2.5%, line 3 0.5%, button 0.2%. Field widths: 323 / 851 / 171 (Figma 328 incl. the
drawn 3px caret + 2px gap / 851 / 171).
Also: `form-typed.png`, `form-focus-visible@2x.png`, `cta-states.png` (top of Home · over Footer · over a
test-only dark footer → inverse).
