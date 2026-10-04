import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:8787");
const request = (path, options = {}) =>
  fetch(new URL(path, base), { signal: AbortSignal.timeout(10_000), ...options });

// Allow the local Wrangler process to start in CI. All assertions still fail hard.
for (let attempt = 0; ; attempt++) {
  try {
    await request("/");
    break;
  } catch (error) {
    if (attempt >= 29) throw error;
    await setTimeout(1000);
  }
}

const assets = new Set(["/avatar.jpg", "/og-image.jpg", "/favicon.ico", "/icon.png", "/apple-icon.png"]);
for (const path of ["/", "/career", "/links", "/works"]) {
  const response = await request(path, { redirect: "manual" });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/, path);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, path);
  assert.ok(html.includes("https://kiyomaruworks.com/og-image.jpg"), `${path}: OGP`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    if (match[1].startsWith("/_next/") || /\.(ico|png|jpg)$/.test(match[1])) assets.add(match[1]);
  }
  // Next's exported RSC payloads are necessary for client-side navigation.
  const payload = path === "/" ? "/index.txt" : `${path}.txt`;
  const rsc = await request(payload);
  assert.equal(rsc.status, 200, payload);
  assert.doesNotMatch(await rsc.text(), /^<!DOCTYPE html>/i, payload);
  if (path !== "/") {
    for (const suffix of ["/", ".html"]) {
      const redirect = await request(`${path}${suffix}`, { redirect: "manual" });
      assert.ok([301, 307, 308].includes(redirect.status), `${path}${suffix}: redirect`);
      assert.equal(new URL(redirect.headers.get("location"), base).pathname, path);
    }
  }
  console.log(`PASS ${path} + RSC + canonical URL`);
}

for (const path of assets) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  const type = response.headers.get("content-type") ?? "";
  assert.doesNotMatch(type, /text\/html/, `${path}: asset must not return fallback HTML`);
  if (path.endsWith(".css")) assert.match(type, /text\/css/, path);
  if (path.endsWith(".js")) assert.match(type, /javascript/, path);
  if (/\.(jpg|png|ico)$/.test(path)) assert.match(type, /^image\//, path);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`out${path}`), `${path}: exported bytes`);
}
console.log(`PASS ${assets.size} assets (CSS, JavaScript, images, icons; byte-for-byte)`);

const payloads = (await readdir("out", { recursive: true })).filter(path => path.endsWith(".txt"));
for (const path of payloads) {
  const response = await request(`/${path}`);
  assert.equal(response.status, 200, path);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`out/${path}`), `${path}: RSC bytes`);
}
console.log(`PASS ${payloads.length} exported RSC payloads, including prefetched segments`);

for (const path of ["/__migration_missing__", "/career/__migration_missing__", "/missing.js", "/CNAME"]) {
  const response = await request(path);
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /404/, path);
}
console.log("PASS missing pages/assets return 404; CNAME excluded");
