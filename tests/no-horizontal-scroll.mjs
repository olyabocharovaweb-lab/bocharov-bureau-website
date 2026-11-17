// No horizontal page scroll: document.documentElement.scrollWidth === window.innerWidth
// for every case page (and Home) at 360, 390, 768 and 1024.
//
// Run against a running build:  npm run build && npm start   (another terminal)
//                                npm run test:overflow        (BASE_URL defaults to http://localhost:3000)
// Uses the `playwright` package (preinstalled in the dev container; `npm i -D playwright` elsewhere).
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [360, 390, 768, 1024];

// Every case in content/cases (one file per case, except index/types) + Home.
const slugs = readdirSync(new URL("../content/cases/", import.meta.url))
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(/\.ts$/, ""));
const paths = ["/", ...slugs.map((s) => `/work/${s}`), "/work/graaho"];

const browser = await chromium.launch();
let failed = 0;
for (const path of [...new Set(paths)]) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width < 1024, hasTouch: width < 1024 });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const [scrollWidth, innerWidth] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    const ok = scrollWidth === innerWidth;
    if (!ok) failed++;
    console.log(`${ok ? "✓" : "✗"} ${path.padEnd(16)} ${String(width).padEnd(5)} scrollWidth ${scrollWidth} / innerWidth ${innerWidth}`);
    await page.close();
  }
}
await browser.close();
if (failed) {
  console.error(`\n${failed} page(s) scroll horizontally.`);
  process.exit(1);
}
console.log("\nNo horizontal scroll.");
