# Bocharov® Bureau — website

The home page of an AI-driven agency, plus shared components and stub pages.
Built from the Figma layout **bocharov-bureau-website → Page 3 → «Variant 1b — AI-driven studio (light)» → «Homepage — Variant 1b (light)» (node `74:1209`)**.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (no errors or warnings)
npm start            # serve the production build
npm run lint         # ESLint
npx tsc --noEmit     # typecheck (after a build/dev: Next generates the route types)
```

Environment variables (optional):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain → `metadataBase`, canonical, OG, sitemap. Defaults to `http://localhost:3000`. |

## Stack

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4** (wired up in `next.config.ts` via `@tailwindcss/turbopack`).
- **Lenis**: smooth scroll.
- **GSAP + ScrollTrigger + SplitText**: scroll animations.
  - Why GSAP rather than Motion:
    - SplitText splits text into lines correctly and re-splits on resize and font load;
    - ScrollTrigger syncs natively with Lenis through `gsap.ticker`;
    - sections stay server components and opt in with data attributes, with no client wrappers.
  - The libraries load lazily, after hydration and in `requestIdleCallback`. Each element's setup runs in its own task, so they block neither LCP nor the main thread.
- **Fonts:** Inter and IBM Plex Mono, both free, self-hosted through `next/font/google` at build time. No substitute fonts were needed.

## Structure

```
app/
  layout.tsx            fonts, metadata/OG, Header + Footer, MotionRoot, skip link
  page.tsx              home (sections + feature flags)
  globals.css           ← DESIGN TOKENS (@theme) + motion primitives
  work/page.tsx         Work (stub with a grid of cases)
  work/[slug]/page.tsx  case stubs (generateStaticParams from content/cases.ts)
  services|awards|contact|about|ai-lab|journal|privacy|terms/   stubs
  api/brief/route.ts    brief form endpoint (placeholder)
  opengraph-image.tsx   dynamic OG (next/og), icon.svg favicon, sitemap.ts, robots.ts
components/
  layout/   Header (+ mobile menu), Footer, StubPage
  ui/       Button/ButtonLink, SectionLabel, TagList, CaseCard
  home/     Hero, Manifesto, Services, Stats, SelectedWork, Process, Testimonials, Industries, BriefForm, Faq
  motion/   MotionRoot (Lenis + GSAP reveals)
config/site.ts          ← FLAGS (showTestimonials, showStats), navigation, e-mail, form options
content/cases.ts        ← CASE DATA (typed, CMS-ready)
content/home.ts         home page copy, verbatim from Figma
public/media/           media exported from Figma (WebP; served as AVIF/WebP via next/image)
```

### Tokens
The Figma file has no Variables, so the values were taken from the design context, section by section. They live in `app/globals.css`:
- `@theme`:
  - colours: `ink`, `paper`, `muted`, `placeholder`, `surface`, `line`, `line-strong`;
  - type families;
  - fluid type scale `text-*`: `clamp()` from 390 to 1440 px, with line-height per token;
  - tracking (Figma px → em);
  - radii, easings.
- `:root`: `--gutter` (40 → 16 px), `--gap` (12 px), `--space-section` (140) / `--space-section-lg` (160).
- Utilities: `px-gutter`, `pt-section`, `pt-section-lg`, `gap-grid`, `label-mono`, `text-wordmark` (268 px @1440 = 18.61vw).

### Case data
`content/cases.ts` holds the `CaseStudy` type (`slug`, `name`, `tagline`, `industry`, `services[]`, `cover`, `layout`). Order and copy come from Figma: PulseFit → IndustryLens → NOVA → Graaho. To plug in a CMS, replace the array with a fetch; the components don't change.

## Verification

- **1440 vs Figma:** section heights and positions match the layout to within 1–2 px. The only differences are deliberate:
  - the designer note under the cases is not rendered;
  - the FAQ items without answers are hidden;
  - the sections behind flags are hidden.
- **Adaptive:** checked with screenshots at 1440 / 1024 / 768 / 390; no horizontal scroll.
- **Lighthouse mobile, local `next start`:**

  | Mode | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
  |---|---|---|---|---|---|---|---|
  | Simulate (default) | 95 | 100 | 100 | 100 | 2.9 s | 0 | 40–50 ms |
  | DevTools throttling (real 4G + 4× CPU) | 94 | 100 | 100 | 100 | 1.7 s | 0 | 230 ms |

  - The real LCP equals FCP: 141 ms in the trace, and the LCP element is the first hero photo.
  - The simulated 2.9 s is a Lantern artefact on localhost: all framework JS finishes before the observed LCP, so the simulator counts it as a dependency.
  - **TODO:** re-check on the production domain (PageSpeed Insights).
- `prefers-reduced-motion`: Lenis and GSAP don't initialise, CSS animations are switched off, and content is visible straight away.

## Decisions I made myself

1. **Which frame.** The file has two «Variant 1b» frames. I used `74:1209` (Page 3), because only it has the real cases (PulseFit, IndustryLens, NOVA, Graaho); frame `17:2` on «Directions v2» has the old placeholder cases.
2. **Flags in `config/site.ts`:**
   - `showTestimonials: false`: the quotes and «5.0 ★ / XX verified reviews on Clutch» are placeholders.
   - `showStats: false`: the «In numbers» figures in Figma are `XX+`, `5.0`, `XX%`.

   Both sections are built and match the layout (checked with the flags on).
3. **FAQ:** items without an answer in Figma ("How long does a typical project take?", "Do you work with companies outside Europe?") have `answer: null` in `content/home.ts` and are not rendered. Answered items start expanded, as in Figma.
4. **Placeholder colour** in the form: `#b4b4ae` → `#92928c`, so placeholders and the select pass WCAG AA for large text (3.13:1 instead of 2.08:1).
5. **The designer note** «Назви клієнтів і кейсів — умовні» isn't shown on the site.
6. **Navigation:**
   - Work, Services, Awards and Contact are separate stub pages;
   - Get started scrolls to the brief form (`#brief`);
   - All projects → `/work`; cases → `/work/[slug]`.
7. **Brief form:**
   - native `select`s; budget and start options are in `config/site.ts`. Figma shows only «€10–25k» and «next month», the other options are my placeholders;
   - fields grow to fit their content and shrink on mobile (long placeholders get an ellipsis).
8. **Service rows:** row A (with the photo) is the active state from the layout. The other rows go from muted to ink on hover. On < 1024 the photo is hidden.
9. **Adaptive (Figma has no tablet/mobile frames):**
   - < 1024: hero meta stacks;
   - < 768: hero photos 2×2, cases in one column, Process 2 → 1 columns, Footer 2 columns, nav in a burger menu;
   - typography is fluid via `clamp()`.
10. **Motion:**
    - the wordmark letters rise one by one (pure CSS, starts at first paint);
    - hero photos: a veil retracts plus a soft zoom. The image is never hidden, so it stays a valid LCP candidate;
    - headings and big text: line-by-line reveal through masks;
    - media: clip from the bottom plus scale from 1.12;
    - process rules: drawn from left to right;
    - hover on case cards: zoom 1.035 plus a title underline;
    - buttons: the text "rolls over".
11. **The PulseFit cover** is cropped to the frame visible in Figma (the source image is 1122 px wide, so at 2× it's a little soft; a larger original would help). Graaho is exported from the Figma composition at 2×.
12. **Alt text** for the images I wrote myself, describing what's in them.
13. **Status messages** after submitting the form ("Thanks — your brief is in…", "Something went wrong…") aren't in Figma; I wrote them.

## Still open

- [ ] Real e-mail domain (`hello@[domain]` → `config/site.ts`) and `NEXT_PUBLIC_SITE_URL`.
- [ ] Social URLs (`socialLinks` in `config/site.ts`; while empty they render as plain text).
- [ ] Where briefs go: `app/api/brief/route.ts` is a placeholder (validation only); hook up a CRM or e-mail provider.
- [ ] Budget and timeline options for the form.
- [ ] Answers for the two FAQ items.
- [ ] Real figures for Stats and Clutch reviews, then flip the flags.
- [ ] Higher-resolution PulseFit original.
- [ ] Lighthouse on the production domain.
- [ ] Case pages, Work, About and the rest: designs not yet available.
