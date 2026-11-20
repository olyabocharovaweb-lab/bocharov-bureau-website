# Phone versions of the case media (< 768px)

Exported from Figma «Main direction» → «Mobile media — <case>»: layers named `<case>/<section-slug>[-N]`, PNG at
scale 3 (350 Figma px → 1050 px; 260 → 780), converted to WebP q82 with the width unchanged:

    node scripts/mobile-media.mjs <folder with <case>/<name>.png>

The script writes the files here and `content/cases/mobile-media.json`; each media item picks its files by section
slug (the Figma desktop section name in kebab-case — see `mobileSection` in `content/cases/<case>.ts`).
A section without files falls back to the desktop image. `hero.webp` (PulseFit) is the hero crop, separate.
