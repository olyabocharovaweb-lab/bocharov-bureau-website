# Bocharov® Bureau — website (ds-v2)

Rebuild on the new Figma design system. Next.js (App Router) + TypeScript + Tailwind v4.

* Tokens: `styles/tokens.css` (Figma variables, same names as Figma code syntax)
* Text styles: `styles/typography.css` (39 Figma text styles as utilities)
* Components: `components/ds/*`
* Styleguide: `/styleguide`
* Docs: `docs/ds-gaps.md`, `docs/motion-notes.md`, `docs/qa/`

```bash
npm run dev
npm run build && npm run lint && npm run typecheck
```

Iteration 1 is static: no animation libraries, no transitions.
