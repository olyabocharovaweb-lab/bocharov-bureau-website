/** Token lists for /styleguide. Values live in styles/tokens.css — this only names them. */

export const primitives = [
  "neutral-0",
  "neutral-50",
  "neutral-100",
  "neutral-200",
  "neutral-400",
  "neutral-600",
  "neutral-1000",
  "cool-100",
  "yellow-300",
  "yellow-900",
] as const;

/** Semantic colour → primitive it aliases (as in Figma). */
export const semanticColors = [
  { name: "color/text/primary", cssVar: "--color-text-primary", alias: "neutral/1000", swatch: "bg-text-primary" },
  { name: "color/text/secondary", cssVar: "--color-text-secondary", alias: "neutral/600", swatch: "bg-text-secondary" },
  { name: "color/text/tertiary", cssVar: "--color-text-tertiary", alias: "neutral/400", swatch: "bg-text-tertiary" },
  { name: "color/text/inverse", cssVar: "--color-text-inverse", alias: "neutral/0", swatch: "bg-text-inverse" },
  { name: "color/text/note", cssVar: "--color-text-note", alias: "yellow/900", swatch: "bg-text-note" },
  { name: "color/bg/page", cssVar: "--color-bg-page", alias: "neutral/0", swatch: "bg-bg-page" },
  { name: "color/bg/surface", cssVar: "--color-bg-surface", alias: "neutral/50", swatch: "bg-bg-surface" },
  { name: "color/bg/stage", cssVar: "--color-bg-stage", alias: "cool/100", swatch: "bg-bg-stage" },
  { name: "color/bg/inverse", cssVar: "--color-bg-inverse", alias: "neutral/1000", swatch: "bg-bg-inverse" },
  { name: "color/bg/note", cssVar: "--color-bg-note", alias: "yellow/300", swatch: "bg-bg-note" },
  { name: "color/bg/glass", cssVar: "--color-bg-glass", alias: "neutral/100", swatch: "bg-bg-glass" },
  { name: "color/border/default", cssVar: "--color-border-default", alias: "neutral/100", swatch: "bg-border-default" },
  { name: "color/border/strong", cssVar: "--color-border-strong", alias: "neutral/200", swatch: "bg-border-strong" },
  { name: "color/border/inverse", cssVar: "--color-border-inverse", alias: "neutral/1000", swatch: "bg-border-inverse" },
] as const;

/** Spacing — class strings spelled out so Tailwind can see them. */
export const spacing = [
  { token: "space/2", h: "h-2" },
  { token: "space/4", h: "h-4" },
  { token: "space/6", h: "h-6" },
  { token: "space/8", h: "h-8" },
  { token: "space/10", h: "h-10" },
  { token: "space/12", h: "h-12" },
  { token: "space/14", h: "h-14" },
  { token: "space/16", h: "h-16" },
  { token: "space/20", h: "h-20" },
  { token: "space/24", h: "h-24" },
  { token: "space/28", h: "h-28" },
  { token: "space/32", h: "h-32" },
  { token: "space/40", h: "h-40" },
  { token: "space/48", h: "h-48" },
  { token: "space/56", h: "h-56" },
  { token: "space/72", h: "h-72" },
  { token: "space/120", h: "h-120" },
  { token: "space/160", h: "h-160" },
  { token: "space/180", h: "h-180" },
  { token: "space/200", h: "h-200" },
] as const;

export const radii = [
  { token: "radius/xs", cls: "rounded-xs" },
  { token: "radius/sm", cls: "rounded-sm" },
  { token: "radius/md", cls: "rounded-md" },
  { token: "radius/lg", cls: "rounded-lg" },
  { token: "radius/xl", cls: "rounded-xl" },
  { token: "radius/full", cls: "rounded-full" },
] as const;
