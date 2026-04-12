import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "docs", "design-tokens.json");
const outputPath = join(root, "src", "app", "design-tokens.generated.css");

const raw = readFileSync(inputPath, "utf8");
const tokens = JSON.parse(raw);

if (typeof tokens !== "object" || tokens === null || Array.isArray(tokens)) {
  console.error("design-tokens.json must be a JSON object.");
  process.exit(1);
}

const lines = [];

/** Allow keys like g10, sm, 2xl, 12 — only strip truly unsafe chars */
function safeKey(key) {
  return String(key).replace(/[^a-zA-Z0-9-]/g, "");
}

const primitives = tokens.primitives;
if (primitives && typeof primitives === "object") {
  if (primitives.color && typeof primitives.color === "object") {
    for (const [key, value] of Object.entries(primitives.color)) {
      lines.push(`  --primitive-color-${safeKey(key)}: ${String(value)};`);
    }
  }
  if (primitives.spacing && typeof primitives.spacing === "object") {
    for (const [key, value] of Object.entries(primitives.spacing)) {
      lines.push(`  --primitive-space-${safeKey(key)}: ${String(value)};`);
    }
  }
  if (primitives.fontSize && typeof primitives.fontSize === "object") {
    for (const [key, value] of Object.entries(primitives.fontSize)) {
      lines.push(`  --primitive-font-size-${safeKey(key)}: ${String(value)};`);
    }
  }
}

for (const [key, value] of Object.entries(tokens)) {
  if (key === "primitives") continue;
  const name = key.startsWith("--") ? key.slice(2) : key;
  lines.push(`  --${name}: ${String(value)};`);
}

const css = `/* AUTO-GENERATED from docs/design-tokens.json — do not edit by hand.
 * Regenerate: npm run sync:tokens
 */

:root {
${lines.join("\n")}
}
`;

writeFileSync(outputPath, css, "utf8");
const pc = primitives?.color ? Object.keys(primitives.color).length : 0;
const ps = primitives?.spacing ? Object.keys(primitives.spacing).length : 0;
const pf = primitives?.fontSize ? Object.keys(primitives.fontSize).length : 0;
console.log(
  `Wrote ${outputPath} (${lines.length} lines: primitives color=${pc}, spacing=${ps}, fontSize=${pf}, semantic).`,
);
