// tests/e2e/reels-ssr.spec.ts
// Pins the 2026-05-26 audit fix that converted /services/reels from a
// pure client-rendered page to a Server Component with crawler-friendly
// SEO outline + JSON-LD. These tests assert the initial HTML (before any
// JS runs) actually contains the tier content — protecting against future
// regressions back to CSR-only.

import { test, expect } from "@playwright/test";

// Disable JavaScript so we only see what a crawler would see.
test.use({ javaScriptEnabled: false });

test("reels page SSRs NOVA LIFE / ACTION / MAGIC content", async ({ page }) => {
  await page.goto("/services/reels");
  const body = await page.content();
  expect(body).toContain("NOVA LIFE");
  expect(body).toContain("NOVA ACTION");
  expect(body).toContain("NOVA MAGIC");
  expect(body).toContain("الواقعية المطلقة");
  expect(body).toContain("نبض الأكشن");
  expect(body).toContain("ما وراء الواقع");
});

test("reels page emits ItemList JSON-LD structured data", async ({ page }) => {
  await page.goto("/services/reels");
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toBeTruthy();
  const parsed = JSON.parse(ld!);
  expect(parsed["@type"]).toBe("ItemList");
  expect(parsed.itemListElement).toHaveLength(3);
  expect(parsed.itemListElement[0].item.name).toBe("NOVA LIFE");
});

test("?level=action changes the <title>", async ({ page }) => {
  await page.goto("/services/reels?level=action");
  const title = await page.title();
  expect(title).toContain("NOVA ACTION");
});

test("?level=magic changes the <title>", async ({ page }) => {
  await page.goto("/services/reels?level=magic");
  const title = await page.title();
  expect(title).toContain("NOVA MAGIC");
});

test("/services/nova-life redirects to canonical Reels", async ({ page }) => {
  const res = await page.goto("/services/nova-life");
  expect(page.url()).toContain("/services/reels");
  // permanentRedirect → 308; on a JS-disabled context the URL is the final one
  expect([200, 308, 301]).toContain(res?.status() ?? 0);
});
