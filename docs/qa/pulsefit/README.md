# QA — Case PulseFit (`/work/pulsefit`) at 1440

Figma: Main direction → «Case — PulseFit» (256:70753), full-frame render 1440 × 24 449.
Code: `next start`, Chromium 1440 × 900, reduced motion, floating CTA hidden for the capture.
Each file = Figma (left) vs code (right) for one block, with heights and the share of pixels that differ by > 40/255.

| # | Block | Figma, px | Code, px | Δ | Diff | Note |
|---|---|---|---|---|---|---|
| 01 | Nav | 84 | 80 | −4 | 2.6% | known: py 30 has no token → space/28 |
| 02 | Hero | 1184 | 1184 | 0 | 0.5% | Figma draws the floating CTA over the photo |
| 03 | Overview | 468 | 466 | −2 | 3.0% | known: Tag py 7 has no token → space/6 (2px per row) |
| 04 | Challenge | 518 | 518 | 0 | 0.2% | |
| 05–23 | Section intros + 12 media blocks | — | — | 0…+1 | 0.2–2.5% | +1px = rounding of fractional Figma heights |
| 24 | Result cards | 244 | 244 | 0 | 0.7% | |
| 25 | Footnote | 35 | 26 | −9 | 1.0% | Motion note «лічильники від 0» not rendered (→ docs/motion-notes.md) |
| 26 | Credits | 441 | 441 | 0 | 0.3% | |
| 27 | CTA | 376 | 376 | 0 | 1.3% | |
| 28 | Next project | 977 | 958 | −19 | 56.5% | client decision: Graaho instead of Solis; Figma title box is fixed 105 high (line box 86) |
| — | Footer | 656 | 900 | +244 | — | decision 2026-11-16: footer fills the viewport |

Navigation checked (Playwright): Home → PulseFit card → case → «← All work» → /work → PulseFit card → «Next →» → /work/graaho;
the whole «Next project» block → /work/graaho. Unknown slug (/work/nope) → not-found page with `noindex`.
