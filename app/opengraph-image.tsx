import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (w: 400 | 600) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff`));

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([font(400), font(600)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0a0a0a",
          padding: "56px 64px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ fontWeight: 600, letterSpacing: "-0.03em" }}>Bocharov®Bureau</span>
          <span style={{ color: "#77776f", fontSize: 22 }}>Brand · Digital · Content · Growth · AI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 36, maxWidth: 760, lineHeight: 1.3 }}>
            — an AI-driven agency building brands, products and growth for ambitious companies.
          </span>
          <span style={{ fontSize: 232, fontWeight: 600, letterSpacing: "-0.07em", lineHeight: 0.85 }}>
            Bocharov®
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
