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
3. Buttons keep Figma's fixed widths.
4. Nav / Footer links are plain text for now (not clickable).
5. Nav wordmark stays `Heading/H6` + semibold.
