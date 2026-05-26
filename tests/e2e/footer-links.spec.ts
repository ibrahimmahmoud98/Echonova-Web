// tests/e2e/footer-links.spec.ts
// Regression test for the 2026-05-26 audit finding: footer's Privacy/Terms
// links on multiple pages were href="#" instead of /privacy and /terms.
// The unified Footer component now points to the right URLs — this test
// pins that behavior in place across every public page.

import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/about",
  "/services",
  "/services/aura",
  "/services/cinema",
  "/services/whisper",
  "/services/reels",
  "/services/reels?level=action",
  "/services/reels?level=magic",
  "/contact",
  "/articles",
  "/articles/ai-revolution-cinema",
  "/articles/ai-cost-reduction-95-percent",
  "/articles/nova-life-vs-action-vs-magic-guide",
  "/articles/digital-sovereignty-ai-mena",
  "/faq",
  "/privacy",
  "/terms",
];

for (const path of PAGES) {
  test(`footer ships /privacy and /terms on ${path}`, async ({ page }) => {
    await page.goto(path);
    const privacy = page.locator('footer a:has-text("Privacy Policy")').first();
    const terms = page.locator('footer a:has-text("Terms of Service")').first();

    await expect(privacy).toBeVisible();
    await expect(terms).toBeVisible();

    // Next.js Link → resolves to absolute path in the DOM
    const privacyHref = await privacy.getAttribute("href");
    const termsHref = await terms.getAttribute("href");
    expect(privacyHref).toMatch(/\/privacy$/);
    expect(termsHref).toMatch(/\/terms$/);
  });
}

test("Privacy page is reachable from any footer", async ({ page }) => {
  await page.goto("/about");
  await page.locator('footer a:has-text("Privacy Policy")').first().click();
  await expect(page).toHaveURL(/\/privacy$/);
});

test("Terms page is reachable from any footer", async ({ page }) => {
  await page.goto("/services");
  await page.locator('footer a:has-text("Terms of Service")').first().click();
  await expect(page).toHaveURL(/\/terms$/);
});
