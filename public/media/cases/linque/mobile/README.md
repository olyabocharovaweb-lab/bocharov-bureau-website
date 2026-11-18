# Mobile versions of case media (≤ 767px)

Put phone versions of the client media here. They are optional: without one, the desktop image is shown,
scaled down to the screen width (never cropped).

Requirements
- Width **1170 px** (390 × 3). Any height — the layout follows the image's own ratio.
- WebP (preferred) or AVIF.
- **Same file name** as the desktop image in the parent folder, e.g. `../08-user-flow.webp` → `08-user-flow.webp`.

To switch one on, add `mobile: { src, width, height }` to that media item in `content/cases/<slug>.ts`, e.g.
`mobile: { src: "/media/cases/pulsefit/mobile/08-user-flow.webp", width: 1170, height: 2400 }`.
On ≤ 767px the page then shows it via `<picture><source media="(max-width: 767px)">`.
