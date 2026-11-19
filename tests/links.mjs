/**
 * Internal link check: crawls the site from "/" (and every page it reaches), collects every internal href
 * and opens each target. A target fails when it answers ≥ 400 or renders the not-found page (with Cache
 * Components a not-found route can still answer 200 once streaming has started). Hash targets (#contact)
 * must also exist as an id on the target page. External links are not requested — only their attributes are checked:
 * http(s) → target="_blank" + rel="noopener noreferrer"; mailto: → no target.
 * Usage: BASE_URL=http://localhost:3100 node tests/links.mjs
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const base = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();

const seen = new Map(); // path → { ok, ids }
const queue = ["/"];
const sources = new Map(); // href → first page that links it
const failures = [];
const external = new Map(); // external href → first page

async function visit(path) {
  const res = await page.goto(base + path, { waitUntil: "domcontentloaded" });
  const status = res?.status() ?? 0;
  const notFound = await page.evaluate(
    () => /could not be found|Page not found/i.test(document.title) || !!document.querySelector("[data-not-found]"),
  );
  const ids = await page.evaluate(() => [...document.querySelectorAll("[id]")].map((e) => e.id));
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h && (h.startsWith("/") || h.startsWith("#"))),
  );
  seen.set(path, { ok: status < 400 && !notFound, status, ids });
  const ext = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="http"], a[href^="mailto:"]')].map((a) => ({
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel") ?? "",
    })),
  );
  for (const e of ext) {
    external.set(e.href, path);
    if (e.href.startsWith("mailto:")) {
      if (e.target) failures.push(`${e.href} (on ${path}) → mailto: must not have a target`);
    } else if (e.target !== "_blank" || !/noopener/.test(e.rel) || !/noreferrer/.test(e.rel)) {
      failures.push(`${e.href} (on ${path}) → needs target="_blank" rel="noopener noreferrer"`);
    }
  }
  return hrefs;
}

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const hrefs = await visit(path);
  for (const h of hrefs) {
    const full = h.startsWith("#") ? path + h : h;
    if (!sources.has(full)) sources.set(full, path);
    const target = full.split("#")[0] || "/";
    if (!seen.has(target) && !queue.includes(target)) queue.push(target);
  }
}

for (const [href, from] of sources) {
  const [p, hash] = href.split("#");
  const t = seen.get(p || "/");
  if (!t?.ok) failures.push(`${href} (from ${from}) → ${t ? `status ${t.status} / not found` : "not visited"}`);
  else if (hash && !t.ids.includes(hash)) failures.push(`${href} (from ${from}) → no #${hash} on the page`);
}

console.log(`${seen.size} pages, ${sources.size} internal links checked`);
console.log(`External (attributes only): ${[...external.keys()].join(", ")}`);
for (const [p, t] of seen) console.log(`${t.ok ? "✓" : "✗"} ${p}`);
await browser.close();
if (failures.length) {
  console.log("\nBroken:\n" + failures.join("\n"));
  process.exit(1);
}
console.log("No broken internal links.");
