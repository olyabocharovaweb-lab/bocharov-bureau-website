/**
 * Phone case media (< 768px): on every case page at 390 and 360 — no horizontal scroll (scrollWidth === clientWidth)
 * and every phone image (/media/cases/<slug>/mobile/…) loaded (naturalWidth > 0) after scrolling through the page;
 * at 1440 none of them is requested (the desktop image is shown instead).
 * Usage: BASE_URL=http://localhost:3100 node tests/mobile-media.mjs
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const base = process.env.BASE_URL ?? "http://localhost:3000";
const slugs = [...readFileSync(new URL("../content/cases/work.ts", import.meta.url), "utf8").matchAll(/slug: "([a-z0-9-]+)"/g)].map(
  (m) => m[1],
);
const isMobileSrc = (u) => /\/media\/cases\/[^/]+\/mobile\//.test(decodeURIComponent(u));

const browser = await chromium.launch();
const failures = [];
for (const slug of slugs) {
  for (const width of [390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto(`${base}/work/${slug}`, { waitUntil: "networkidle" });
    // scroll through so every lazy image loads
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForLoadState("networkidle");
    // give the last lazy images up to 10 s to finish
    await page
      .waitForFunction(
        () =>
          [...document.querySelectorAll("img")]
            .filter((i) => /\/media\/cases\/[^/]+\/mobile\//.test(decodeURIComponent(i.currentSrc || i.src)))
            .every((i) => i.complete),
        null,
        { timeout: 10000 },
      )
      .catch(() => {});
    const r = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")].filter((i) =>
        /\/media\/cases\/[^/]+\/mobile\//.test(decodeURIComponent(i.currentSrc || i.src)),
      );
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        total: imgs.length,
        broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => decodeURIComponent(i.src)),
      };
    });
    const ok = r.scrollWidth === r.clientWidth && r.broken.length === 0;
    console.log(`${ok ? "✓" : "✗"} /work/${slug.padEnd(13)} ${width}  scroll ${r.scrollWidth}/${r.clientWidth}  mobile images ${r.total}`);
    if (!ok) failures.push(`/work/${slug} @${width}: ${JSON.stringify(r)}`);
    await page.close();
  }
  const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const requested = [];
  desk.on("request", (req) => isMobileSrc(req.url()) && requested.push(req.url()));
  await desk.goto(`${base}/work/${slug}`, { waitUntil: "networkidle" });
  await desk.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await desk.waitForLoadState("networkidle");
  const heroMobile = requested.filter((u) => !/hero\.webp/.test(decodeURIComponent(u)));
  if (heroMobile.length) failures.push(`/work/${slug} @1440 requested phone media: ${heroMobile.length}`);
  console.log(`${heroMobile.length ? "✗" : "✓"} /work/${slug.padEnd(13)} 1440  phone media requested: ${heroMobile.length}`);
  await desk.close();
}
await browser.close();
if (failures.length) {
  console.log("\n" + failures.join("\n"));
  process.exit(1);
}
console.log("Mobile case media OK.");
