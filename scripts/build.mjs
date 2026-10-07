import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
await import("./check.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(output, { recursive: true });
await cp(path.join(root, "site"), output, { recursive: true });
// GitHub Pages caches assets. Content hashes keep new HTML from loading old code.
const hashes = new Map();
for (const file of await readdir(output)) {
  if (!file.endsWith(".html")) continue;
  const target = path.join(output, file);
  let html = await readFile(target, "utf8");
  const assets = [
    ...html.matchAll(
      /(?:src|href)="(assets\/[^"?#]+\.(?:js|css))(?:\?[^"#]*)?"/g,
    ),
  ];
  for (const [attribute, asset] of assets) {
    if (!hashes.has(asset)) {
      const content = await readFile(path.join(output, asset));
      hashes.set(
        asset,
        createHash("sha256").update(content).digest("hex").slice(0, 12),
      );
    }
    html = html.replace(
      attribute,
      attribute.slice(0, attribute.indexOf('"') + 1) +
        asset +
        "?v=" +
        hashes.get(asset) +
        '"',
    );
  }
  await writeFile(target, html);
}
console.log(`Versioned ${hashes.size} local assets for browser cache refresh.`);
console.log("Static website built in dist/. Ready for GitHub Pages.");
