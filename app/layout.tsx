import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { FloatingCta } from "@/components/ds";
import "./globals.css";

/**
 * Inter 3.19 (self-hosted). Figma renders Inter 3.x: text widths in the
 * design match 3.19 to <0.5px, while Inter 4 (Google Fonts) differs in
 * glyph widths, default figures and arrows. See docs/ds-gaps.md.
 */
const inter = localFont({
  src: [
    { path: "./fonts/inter-3.19/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-3.19/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-3.19/Inter-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bocharov® Bureau",
  description: "Bocharov® Bureau",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="bg-bg-page text-text-primary">
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
