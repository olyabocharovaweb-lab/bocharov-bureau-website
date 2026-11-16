# Design-system gaps

Values found in the Figma components that have **no Figma variable / text style**.
Rule applied: take the nearest token and record the gap here. Where the nearest token
would break the layout (column widths), the value is kept in **one** file,
`styles/layout.css`, as a named theme value — a proposal for a Figma "Layout" collection.

## Spacing without a variable

| Component | Property | Figma value | Used in code | Visual effect |
|---|---|---|---|---|
| Nav `260:10` | padding-top / -bottom | 30 | `space/28` | Nav 80px tall instead of 84 |
| Tag `260:36` | padding-top / -bottom | 7 | `space/6` | Tag 30px tall instead of 32 |
| Button · Link `260:82` | padding-left / -right | 22 | `space/20` | 4px narrower than a 22px pad |
| Motion note `260:57` | padding-top / -bottom | 5 | — (not rendered) | — |

## Text without a text style

| Component | Layer | Figma value | Used in code |
|---|---|---|---|
| Nav `260:10` | `Bocharov®Bureau` (260:4) | Inter Semi Bold 20 / AUTO / **-3%** | `Heading/H6` + `font-semibold` → letter-spacing -1% (wordmark ≈ 6px wider) |
| Case card `260:64` | Tags (260:63) | IBM Plex Mono Regular 12 / 4% / UPPER | `Mono/Body` + `uppercase` (identical values, just no style bound) |
| Motion note `260:57` | text (260:56) | IBM Plex Mono Regular 10 / 0% | — (not rendered) |

## Fixed sizes without a variable → `styles/layout.css`

| Name in code | Value | Where in Figma |
|---|---|---|
| `w-page` (`--container-page`) | 1440 | page frames |
| `w-intro-label` | 560 | Section intro label column (component description says "Label column (560)") |
| `w-index-year` / `-client` / `-industry` / `-arrow` | 90 / 360 / 220 / 40 | Index row columns |
| `aspect-case-card` | 674 / 760 | Case card photo frame |
| `w-button-primary` / `-secondary` / `-link` | 174 / 184 / 157 | Button variants (FIXED width) |

## Home (256:68176)

| Where | Figma | Code |
|---|---|---|
| Section top padding — Services, In numbers, Selected work, Process, Reviews, Industries, Contact, FAQ | 140 (no `space/140`) | `pt-section` (`--spacing-section`, styles/layout.css) |
| Manifesto, second half of the sentence | fill `#9B9B9B`, no variable | `color/text/tertiary` (#B4B4AE) — slightly lighter |
| Manifesto, first half | `#0A0A0A` raw (not bound) | `color/text/primary` (same value) |
| In numbers cards | frames, **not** Stat card instances (Display/M · H6 · Body/S · gap 20) | built from tokens in place, Stat card not used |
| Graaho card tags (256:68587), Reviews role lines | no text style, Plex Mono 12 / 4% / UPPER | `Mono/Body` + `uppercase` |
| Graaho card | frame, not a Case card instance; photo frame fill `#F0EDFA` raw | whole photo frame exported as one image (2x) |
| Hero lede text box | width 460 | `w-hero-lede` (styles/layout.css) |
| Footnote «Назви клієнтів і кейсів — умовні» (256:68588) | Ukrainian note under Selected work, no text style | **not rendered** — looks like a designer annotation (open question) |
| Button instances on pages | **HUG** (Get started 132, All projects 131, Send the brief 173) | Button hugs by default; `fixedWidth` reproduces the FIXED main component (styleguide) |

## Component sizing in Figma that is not hug

| Component | Figma | Code |
|---|---|---|
| Button · Primary / Secondary / Link | Width **FIXED** 174 / 184 / 157 (labels are hug inside) | **As Figma** (decision 2026-11-13): fixed `w-button-primary/-secondary/-link`, content left-aligned, overflow clipped. |
| Meta item | Width FIXED 176 | `w-full`, width comes from the parent grid |

## Font rendering

* Figma renders **Inter 3.x**. Text widths in the components match Inter 3.19 within
  0.5px; Inter 4 (Google Fonts) is 1–6% off (different default figures, arrows, `1`).
  Code self-hosts Inter 3.19 via `next/font/local` (`app/fonts/inter-3.19`, OFL).
  IBM Plex Mono comes from `next/font/google` (widths match).
* Figma rounds each line box to whole px. Text styles therefore store
  `line-height` as `round(size × factor)` px (AUTO = Inter 1.21, Plex Mono 1.3).

## Decisions (2026-11-13)

1. Layout sizes stay in `styles/layout.css` (named theme values, not Figma tokens) — the developer's call.
2. Spacing substitutions above (30→28, 7→6, 22→20) stay — the developer's call.
3. Buttons as in Figma: main components FIXED (styleguide, `fixedWidth`), page instances HUG.
4. Nav / Footer links are plain text for now (not clickable).
5. Nav wordmark stays `Heading/H6` + semibold.
6. 2026-11-16 — Figma primitive `neutral/50` changed #F3F3F0 → #F9F9F9. Updated in `styles/tokens.css`;
   `color/bg/surface` still aliases `neutral/50`. The In numbers / Reviews card gap (#F9F9F9 without variable) is closed.
7. 2026-11-16 — Footer fills the viewport (`min-h-svh`): link columns at the top, wordmark and legal
   line pinned to the bottom. Not in Figma yet — the Figma Footer (260:33) is 656 tall; on a 900px
   viewport the code footer is 900. Spacing inside (pt 160, gap 40, pb 40) is unchanged.
8. 2026-11-16 — First motion on the site, at the client's request (exception to the "iteration 1 static"
   rule): Home Manifesto text reveals with scroll. No library; one CSS variable per block. Static QA
   screenshots are taken with `prefers-reduced-motion: reduce`, which shows the final (Figma) state.
9. 2026-11-16 — Manifesto: whole sentence `color/text/primary` (Figma keeps the second half grey). Reveal smoother
   (eased) and quicker (finishes when the text bottom reaches 75% of the viewport).
10. 2026-11-16 — Services hover (see docs/motion-notes.md). Figma has a hover photo only for row B («P4 red coat»);
    rows A, C, D, E reuse the Hero photos (E repeats P1) until real service images exist.
    Figma Services rows were updated: columns 560 + gap 260 + 540 → `gap-service-gap` (styles/layout.css).
    Motion values live in `styles/motion.css` (not Figma variables). The global "no transitions" rule now
    applies only under `prefers-reduced-motion: reduce`.
11. 2026-11-17 — Services rows rebuilt to Figma «Services list» (312:5004): rows flush (no gap), px 24 / py 40,
    `radius/lg`, transparent; list −24 wider than content each side; divider = `.service-row::before`
    (1px `border/default`, inset 24). Hover / focus-visible: `bg/surface`, own and next divider hidden, no transition.
    Rows are 182 / 156 tall vs Figma 184 / 158 because Tag is 30 (padding 7 → space/6, decision 2).
    Gap: «Content & Production» body text in Figma has raw #77776F (= text/secondary, not bound).
