const rawAssets = import.meta.glob("./assets/figma/**/*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const prefix = "./assets/figma/";

export const figmaAssets = Object.fromEntries(
  Object.entries(rawAssets).map(([path, svg]) => [
    path.slice(prefix.length, -4),
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
  ]),
) as Record<string, string>;

export function getFigmaAsset(path: string) {
  const asset = figmaAssets[path];

  if (!asset) {
    console.warn(`Missing bundled Figma asset: ${path}`);
    return "";
  }

  return asset;
}
