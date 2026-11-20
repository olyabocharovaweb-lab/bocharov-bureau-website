/**
 * Mobile case media: PNG exports (Figma layers <case>/<section-slug>[-N], scale 3) → WebP q82, same width,
 * into public/media/cases/<case>/mobile/, and a manifest content/cases/mobile-media.json:
 * { "<case>": { "<section-slug>": [{ src, width, height }, …] } } (ordered by N).
 * Usage: node scripts/mobile-media.mjs <folder with <case>/<name>.png>
 */
import { createRequire } from "node:module";
import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const src = process.argv[2];
if (!src) throw new Error("usage: node scripts/mobile-media.mjs <png folder>");
const manifest = {};
for (const kase of readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  const out = join("public/media/cases", kase, "mobile");
  mkdirSync(out, { recursive: true });
  for (const file of readdirSync(join(src, kase)).filter((f) => f.endsWith(".png"))) {
    const name = file.replace(/\.png$/, "");
    const m = name.match(/^(.*?)(?:-(\d+))?$/);
    const section = m[1];
    const n = m[2] ? Number(m[2]) : 0;
    const info = await sharp(join(src, kase, file)).webp({ quality: 82 }).toFile(join(out, `${name}.webp`));
    ((manifest[kase] ??= {})[section] ??= []).push({ n, src: `/media/cases/${kase}/mobile/${name}.webp`, width: info.width, height: info.height });
  }
  for (const list of Object.values(manifest[kase])) list.sort((a, b) => a.n - b.n);
}
for (const k of Object.keys(manifest))
  for (const s of Object.keys(manifest[k])) manifest[k][s] = manifest[k][s].map((e) => ({ src: e.src, width: e.width, height: e.height }));
writeFileSync("content/cases/mobile-media.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(Object.entries(manifest).map(([k, v]) => `${k}: ${Object.values(v).flat().length} files, ${Object.keys(v).length} sections`).join("\n"));
