import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "out");
const clientDir = path.join(projectRoot, "dist", "client");
const serverEntry = path.join(projectRoot, "dist", "server", "index.js");

const rawBasePath = (process.env.PAGES_BASE_PATH ?? "").trim();
const basePath = rawBasePath && rawBasePath !== "/"
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";
const siteOrigin = (process.env.SITE_ORIGIN ?? "https://example.com").replace(/\/+$/, "");
const publicAsset = (assetPath) => `${basePath}${assetPath}`;
const publicPathname = basePath ? `${basePath}/` : "/";

async function rewriteClientBasePath(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteClientBasePath(entryPath);
      return;
    }
    if (!entry.name.endsWith(".js")) return;

    const source = await readFile(entryPath, "utf8");
    const rewritten = source.replaceAll("return`/`+e", `return\`${basePath}/\`+e`);
    if (rewritten !== source) await writeFile(entryPath, rewritten, "utf8");
  }));
}

const serverUrl = pathToFileURL(serverEntry);
serverUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(serverUrl.href);
const response = await worker.fetch(
  new Request(`${siteOrigin}/`, { headers: { host: new URL(siteOrigin).host } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}.`);
}

let html = await response.text();
html = html
  .replaceAll("/_next/", publicAsset("/_next/"))
  .replaceAll("/og-preview.jpg", publicAsset("/og-preview.jpg"))
  .replaceAll("/og.png", publicAsset("/og.png"))
  .replace(
    'nav:{"pathname":"/","searchParams":[]}',
    `nav:{"pathname":"${publicPathname}","searchParams":[]}`,
  );

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.join(clientDir, "_next"), path.join(outputDir, "_next"), { recursive: true });
if (basePath) await rewriteClientBasePath(path.join(outputDir, "_next"));
await cp(path.join(clientDir, "og-preview.jpg"), path.join(outputDir, "og-preview.jpg"));
await cp(path.join(clientDir, "og.png"), path.join(outputDir, "og.png"));
await writeFile(path.join(outputDir, "index.html"), html, "utf8");
await writeFile(path.join(outputDir, "404.html"), html, "utf8");
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");

console.log(`Static site exported to ${outputDir}${basePath ? ` for ${basePath}/` : ""}.`);
