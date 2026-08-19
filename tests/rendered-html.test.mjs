import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html", host: "localhost" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished workplace assessment", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-HK">/i);
  assert.match(html, /<title>職場型格｜自適應深度辨型<\/title>/i);
  assert.match(html, /了解你點樣思考/);
  assert.match(html, /並非官方 MBTI/);
  assert.match(html, /http:\/\/localhost\/og-preview\.jpg/);
  assert.match(html, /property="og:site_name" content="職場型格"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, /property="og:image:type" content="image\/jpeg"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the assessment complete and the starter removed", async () => {
  const [data, page, packageJson] = await Promise.all([
    readFile(new URL("../app/quiz-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const coreQuestions = data.split("export const questions")[1].split("export const followUpQuestions")[0];
  const followUpQuestions = data.split("export const followUpQuestions")[1].split("export type Profile")[0];

  assert.equal((coreQuestions.match(/\{ prompt:/g) ?? []).length, 40);
  assert.equal((followUpQuestions.match(/\{ prompt:/g) ?? []).length, 16);
  for (const axis of ["EI", "SN", "TF", "JP"]) {
    assert.equal((followUpQuestions.match(new RegExp(`axis: "${axis}"`, "g")) ?? []).length, 4);
  }
  assert.equal((data.match(/^[ ]{2}[A-Z]{4}: \{/gm) ?? []).length, 16);
  assert.match(page, /navigator\.share/);
  assert.match(page, /navigator\.clipboard/);
  assert.match(page, /類型理論序列（\$\{result\.best\.code\}）：\$\{theoreticalStack\}/);
  assert.doesNotMatch(page, /認知功能傾向：\$\{functions\}/);
  assert.match(page, /第二可能類型/);
  assert.match(page, /buildFollowUpPlan/);
  assert.match(page, /本次辨型清晰度/);
  assert.match(page, /最多 16 題追問/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
