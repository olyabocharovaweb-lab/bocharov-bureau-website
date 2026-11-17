import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920, 2560],
    // Fixed-width images (hero carousel 264, review photos 64/96) at 1x / 2x.
    imageSizes: [64, 96, 128, 192, 264, 384, 528],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
