/**
 * Targeted update of mobile case media (< 768px).
 * For every section listed in the update file ({ "<case>": { "<section-slug>": { box, blocks } } }): delete that
 * section's old phone files (<slug>.webp / <slug>-N.webp), convert the new PNG exports (Figma, scale 3) → WebP q82
 * with the width unchanged, and replace the section's blocks in content/cases/mobile-media.json.
 * Every other section is kept as is; an old-format entry (array of images) becomes [{ type: "image", … }] —
 * the files are not touched.
 * Usage: node scripts/mobile-media-update.mjs <update.json> <folder with <case>/<name>.png>
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const [updateFile, pngDir] = process.argv.slice(2);
if (!updateFile || !pngDir) throw new Error("usage: node scripts/mobile-media-update.mjs <update.json> <png folder>");
const update = JSON.parse(readFileSync(updateFile, "utf8"));
const jsonPath = "content/cases/mobile-media.json";
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

// 1. old format → { type: "image" }
for (const sections of Object.values(data))
  for (const [slug, list] of Object.entries(sections))
    sections[slug] = list.map((b) => (b.type ? b : { type: "image", src: b.src, width: b.width, height: b.height }));

// 2. targeted sections
const missing = [];
const report = [];
for (const [kase, sections] of Object.entries(update)) {
  const dir = join("public/media/cases", kase, "mobile");
  mkdirSync(dir, { recursive: true });
  data[kase] ??= {};
  for (const [slug, { blocks }] of Object.entries(sections)) {
    const re = new RegExp(`^${slug}(-\\d+)?\\.webp$`);
    const removed = readdirSync(dir).filter((f) => re.test(f));
    removed.forEach((f) => unlinkSync(join(dir, f)));
    const convert = async (name) => {
      const png = join(pngDir, kase, `${name}.png`);
      if (!existsSync(png)) {
        missing.push(`${kase}/${name}`);
        return null;
      }
      const info = await sharp(png).webp({ quality: 82 }).toFile(join(dir, `${name}.webp`));
      return { src: `/media/cases/${kase}/mobile/${name}.webp`, width: info.width, height: info.height };
    };
    const out = [];
    let files = 0;
    for (const b of blocks) {
      if (b.type === "image") {
        const img = await convert(b.name);
        if (img) {
          out.push({ type: "image", ...img });
          files++;
        }
      } else {
        const items = [];
        for (const it of b.items) {
          const img = await convert(it.name);
          if (img) items.push(img);
        }
        files += items.length;
        if (items.length) out.push({ type: "carousel", ...(b.title ? { title: b.title } : {}), items });
      }
    }
    data[kase][slug] = out;
    report.push(`${kase}/${slug}: removed ${removed.length}, now ${out.map((b) => (b.type === "image" ? "image" : `carousel×${b.items.length}${b.title ? ` «${b.title}»` : ""}`)).join(" + ")} (${files} files)`);
  }
}
writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
console.log(report.join("\n"));
if (missing.length) {
  console.log(`\nmissing PNG (${missing.length}): ${missing.join(", ")}`);
  process.exitCode = 1;
}
