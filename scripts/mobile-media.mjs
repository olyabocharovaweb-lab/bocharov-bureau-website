/**
 * Mobile case media from Figma «Mobile media — <case>» (structure: scripts/mobile-media.manifest.json — one entry per
 * «<Section> — mobile · <type>» box, blocks in order: image | carousel { title?, items }).
 * PNG exports (scale 3) → WebP q82, width unchanged → public/media/cases/<case>/mobile/<name>.webp, and
 * content/cases/mobile-media.json: { "<case>": { "<section-slug>": MobileBlock[] } }.
 * Replaces the previous phone files (keeps hero.webp and README.md).
 * Usage: node scripts/mobile-media.mjs <folder with <case>/<name>.png>
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const src = process.argv[2];
if (!src) throw new Error("usage: node scripts/mobile-media.mjs <png folder>");
const { cases } = JSON.parse(readFileSync("scripts/mobile-media.manifest.json", "utf8"));

const missing = [];
const out = {};
for (const [kase, boxes] of Object.entries(cases)) {
  const dir = join("public/media/cases", kase, "mobile");
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".webp") && f !== "hero.webp") unlinkSync(join(dir, f));
  const convert = async (name) => {
    const png = join(src, kase, `${name}.png`);
    if (!existsSync(png)) {
      missing.push(`${kase}/${name}`);
      return null;
    }
    const info = await sharp(png).webp({ quality: 82 }).toFile(join(dir, `${name}.webp`));
    return { src: `/media/cases/${kase}/mobile/${name}.webp`, width: info.width, height: info.height };
  };
  out[kase] = {};
  for (const box of boxes) {
    const blocks = [];
    for (const b of box.blocks) {
      if (b.type === "image") {
        const img = await convert(b.name);
        if (img) blocks.push({ type: "image", ...img });
      } else {
        const items = [];
        for (const it of b.items) {
          const img = await convert(it.name);
          if (img) items.push(img);
        }
        if (items.length) blocks.push({ type: "carousel", ...(b.title ? { title: b.title } : {}), items });
      }
    }
    // a section is used only when every file of it is there
    const expected = box.blocks.reduce((n, b) => n + (b.type === "image" ? 1 : b.items.length), 0);
    const got = blocks.reduce((n, b) => n + (b.type === "image" ? 1 : b.items.length), 0);
    if (got === expected) out[kase][box.slug] = blocks;
  }
}
writeFileSync("content/cases/mobile-media.json", JSON.stringify(out, null, 2) + "\n");
for (const [k, v] of Object.entries(out)) {
  const files = Object.values(v).flat().reduce((n, b) => n + (b.type === "image" ? 1 : b.items.length), 0);
  console.log(`${k}: ${Object.keys(v).length} sections, ${files} files`);
}
if (missing.length) console.log(`missing PNG (${missing.length}): ${missing.join(", ")}`);
