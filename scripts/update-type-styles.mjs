/**
 * Syncs `SPLIT_ROW_TYPE_STYLES` + `typeStyleClass` from `@utility type-*` blocks in `src/styles/globals.css`.
 *
 * Usage: `npm run update-type-styles`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const globalsPath = path.join(root, "src/styles/globals.css");
const splitRowPath = path.join(root, "src/components/content-row/SplitRow.tsx");
const typesPath = path.join(root, "src/components/content-row/splitRowTypes.ts");

/** First occurrence order in `globals.css` (source of truth). */
function extractTypeUtilities(css) {
  const re = /@utility\s+(type-[a-z0-9-]+)\s*\{/g;
  const names = [];
  const seen = new Set();
  for (const m of css.matchAll(re)) {
    const name = m[1];
    if (seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }
  return names;
}

function formatTypeStylesConst(names) {
  const lines = names.map((n) => `  "${n}",`);
  return `export const SPLIT_ROW_TYPE_STYLES = [\n${lines.join("\n")}\n] as const;`;
}

function formatTypeStyleClassFn(names) {
  const cases = names
    .map((n) => `    case "${n}":\n      return "${n}";`)
    .join("\n");
  return `function typeStyleClass(utility: TypeStyle): string {
  switch (utility) {
${cases}
    default: {
      const _exhaustive: never = utility;
      return _exhaustive;
    }
  }
}`;
}

function main() {
  const css = fs.readFileSync(globalsPath, "utf8");
  const names = extractTypeUtilities(css);

  if (names.length === 0) {
    console.error(
      `update-type-styles: no @utility type-* blocks found in ${path.relative(root, globalsPath)}`,
    );
    process.exit(1);
  }

  let typesSrc = fs.readFileSync(typesPath, "utf8");
  const typesRe =
    /export const SPLIT_ROW_TYPE_STYLES = \[\s*[\s\S]*?\s*\] as const;/;
  if (!typesRe.test(typesSrc)) {
    console.error(
      `update-type-styles: could not find SPLIT_ROW_TYPE_STYLES in ${path.relative(root, typesPath)}`,
    );
    process.exit(1);
  }
  const nextTypes = typesSrc.replace(typesRe, formatTypeStylesConst(names));
  if (nextTypes !== typesSrc) {
    fs.writeFileSync(typesPath, nextTypes, "utf8");
    console.log(`Wrote ${path.relative(root, typesPath)} (${names.length} utilities)`);
  } else {
    console.log(`${path.relative(root, typesPath)} already up to date`);
  }

  let splitSrc = fs.readFileSync(splitRowPath, "utf8");
  const anchor = "/** `GalleryRow` + cell mapping for `SplitRowData`";
  const anchorIdx = splitSrc.indexOf(anchor);
  const fnStart = splitSrc.indexOf("function typeStyleClass(utility: TypeStyle): string {");

  if (fnStart === -1 || anchorIdx === -1 || anchorIdx <= fnStart) {
    console.error(
      `update-type-styles: could not locate typeStyleClass or anchor in ${path.relative(root, splitRowPath)}`,
    );
    process.exit(1);
  }

  const prefix = splitSrc.slice(0, fnStart);
  const suffix = splitSrc.slice(anchorIdx);
  const nextSplit =
    prefix + formatTypeStyleClassFn(names) + "\n\n" + suffix;

  if (nextSplit !== splitSrc) {
    fs.writeFileSync(splitRowPath, nextSplit, "utf8");
    console.log(`Wrote ${path.relative(root, splitRowPath)}`);
  } else {
    console.log(`${path.relative(root, splitRowPath)} already up to date`);
  }

  console.log("Utilities (globals.css order):");
  for (const n of names) {
    console.log(`  ${n}`);
  }
}

main();
