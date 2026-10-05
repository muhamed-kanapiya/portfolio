import { cp, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
await import("./check.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(output, { recursive: true });
await cp(path.join(root, "site"), output, { recursive: true });
console.log("Static website built in dist/. Ready for GitHub Pages.");
