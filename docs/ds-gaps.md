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
12. 2026-11-17 — Contact form rebuilt to Figma «Sentence form» (256:68639): 3 lines, Heading/XL, gap space/12,
    inline <input>s (no border/underline/fill/outline; placeholder text/tertiary, value + caret text/primary),
    field pl space/16, period glued to the field, width follows placeholder/value (mirror text in the same grid cell).
    Keyboard focus: caret + 1px underline border/default (kept so focus is never invisible). Validation: native
    (name required, email type=email required); submission not wired. Old fields company/budget/timing removed.
    Browser input boxes are pinned to `height: 1lh`; trailing letter-spacing compensated (+0.03em) because Figma
    excludes it from text-box widths. Figma line 1 is drawn focused (56px caret, 69 tall) → code section 626 vs 631.
13. 2026-11-17 — Floating CTA «Book a call» (Figma 314:5029, every page): Button Primary, fixed 40/40 (16/16 < md),
    z-50, link /#contact (Calendly later). Over `[data-surface="dark"]` → Button `inverse` (bg/page, text/primary) —
    no dark section exists yet (Footer is white), mechanism verified with a test-only dark footer.
    Hidden while #contact is in view. No animation. Button gained `inverse` and `type` props (not Figma properties).
    Open: over the Footer the button covers «Privacy · Terms» at 1440×900.
14. 2026-11-17 — In numbers: values from the client — 700+, 5.0, 93% (Figma still shows XX+ / 5.0 / XX%); count-up from 0.
15. 2026-11-17 — Footer: top padding 160 → 72. Scroll-linked light → dark: fill follows scroll from bg/page to
    bg/inverse (color-mix of the tokens, --dark 0…1 from footer top at 75% → 15% of the viewport); text flips
    primary → inverse, secondary → tertiary at the halfway point (data-surface="dark"), crossfading over --duration-surface 700ms (motion.css; 2026-11-16 client: the flip felt abrupt). Reduced motion → light.
    Floating CTA: inverse over the dark footer; hides when the footer legal line (data-cta-avoid) reaches it,
    so «Privacy · Terms» is never covered.
16. 2026-11-16 — Case template (`app/work/[slug]`, `components/case/CasePage.tsx`, data in `content/cases/*.ts`).
    Sections composed from DS components (Section intro, Media caption, Stat card, Credits row, Tag, Meta item, CTA, Button).
    Client media (Behance-style cards) = Figma «Card» frames exported 2x → WebP in /public/media/cases/<slug>/.
    «Next project» (not a DS component) is a block inside the template, approved by the client; it shows the next
    case by number (PulseFit → Graaho 04, title/tags/photo from the Home card) instead of Figma's Solis Residences.
    Photo ratio token --aspect-next-photo 1360/620 (styles/layout.css). Figma's title box is fixed 105 high; code uses the
    Display/S line box → block 19px shorter. «App Store · soon» = Button Link, arrow off, disabled (new `disabled` prop).
    Project footnote: Mono/Caption without uppercase (Figma layer overrides the style's case).
    /work and /work/graaho are stubs until those pages are laid out. With Cache Components `dynamicParams` is not
    available, so unknown slugs call notFound() (rendered with noindex; HTTP status stays 200 once streaming started).
17. 2026-11-16 — Footer full-bleed on screens wider than 1440 (client: no white edges). The footer sits outside the page container; its fill spans the viewport, its content stays in max-w-page (1440, px 40).
18. 2026-11-17 — Mobile Home (322:5634). New tokens from Figma: text style Display/Wordmark S (72 / 85% / −7%),
    color/bg/glass → neutral/100, effect shadow-glass (0 8 24 rgba(0,0,0,.08)). New DS components in code:
    Nav / Mobile (328:16), Icon / Toggle (327:13). Layout sizes without Figma variables (styles/layout.css):
    nav-mobile 76, hit 44, hero-photo 264 (3:4 → 264/352), review-card 296, review-photo 64 / 96 (4:5),
    case-mobile 4:5. Wordmark styles scale with the viewport below their design width (see responsive-decisions.md).
    Figma mobile Manifesto keeps the second half grey; code keeps the client decision (all black + reveal).
    Figma mobile shows the footnote «Назви клієнтів і кейсів — умовні» (Selected work) — still omitted, as on desktop.
    In numbers keeps the client numbers 700+ / 5.0 / 93% (Figma mobile still has XX placeholders).
    Inter 3.19 files subset to Latin, Latin Ext-A, Cyrillic, punctuation, arrows, ★ (311 → 95 KB) for mobile LCP.
    Contrast: text/secondary (#77776F) on bg/surface (#F9F9F9) is 4.3:1 — below WCAG AA 4.5 for the In numbers
    notes and review roles (Lighthouse flags it). Token change is a design decision → proposed, not applied.
19. 2026-11-17 — Case template responsive (331:5241). Shared components became mobile-first: Section intro (label above,
    pt 72), Stat card (p 20, Numeral/M), Credits row (name wraps), Media caption (caption wraps, gap 4), CTA (stacked,
    Heading/H2). New data: `hero.titleEms`, `hero.mobile`, `media.mobile` (art direction). Case title below 1024 is
    sized to fit one line (`.case-title`, between Display/Wordmark S and Display/XL). Figma mobile Next project title box
    is fixed 105 high (line box 46) → block 55px shorter; its «( 02 / 12 )» counter is pushed off the frame in Figma —
    code shows the counter. Figma mobile media 06/07/09/10 use 340-high crops; code scales the desktop images until
    mobile versions arrive. Contrast: footnote text/tertiary on white is 2.1:1 (Figma), Stat card notes 4.3:1 — flagged.
20. 2026-11-17 — Desktop Nav «scrolled» pill (client request; no Figma frame). Mirrors Nav / Mobile «Scrolled»:
    fixed, centred 12 from the top, .glass (bg/glass 80% + blur 16 + shadow-glass), radius/full, padding 14 / 24,
    gap 48 between wordmark and links. Appears once the desktop header is out of view (IntersectionObserver).
