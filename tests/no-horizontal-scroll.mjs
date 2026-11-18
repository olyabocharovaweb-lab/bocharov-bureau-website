// No horizontal page scroll: document.documentElement.scrollWidth === window.innerWidth
// for Home, /work and every case page at 360, 390, 768, 1024 and 1440.
//
// Run against a running build:  npm run build && npm start   (another terminal)
//                                npm run test:overflow        (BASE_URL defaults to http://localhost:3000)
// Uses the `playwright` package (preinstalled in the dev container; `npm i -D playwright` elsewhere).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [360, 390, 768, 1024];

// Home, Work and every case slug listed in content/cases/work.ts (slug: "…").
const workData = readFileSync(new URL("../content/cases/work.ts", import.meta.url), "utf8");
const slugs = [...workData.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const paths = ["/", "/work", ...slugs.map((s) => `/work/${s}`)];
const WIDTHS_ALL = [...WIDTHS, 1440];

const browser = await chromium.launch();
let failed = 0;
for (const path of [...new Set(paths)]) {
  for (const width of WIDTHS_ALL) {
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
