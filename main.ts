// SPDX-License-Identifier: MIT
// Kitchen Table — household budget site (make.fun entry).
// Hands the site in: copies app/ and screenshots/ from this repository to
// the output directory and writes output/dossier.json with buildDossier
// from vendor/makefun-frontend.ts. Standard library only; runs on Node 22.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot: string = dirname(fileURLToPath(import.meta.url));
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Start from a clean output directory so both runs write the same bytes.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const name of ["app", "screenshots"] as const) {
  cpSync(join(repoRoot, name), join(outDir, name), { recursive: true });
}

const dossier: Uint8Array = buildDossier(outDir, {
  text_max_bytes: 1048576,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});
writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`wrote ${outDir}/dossier.json (${dossier.length} bytes)`);
