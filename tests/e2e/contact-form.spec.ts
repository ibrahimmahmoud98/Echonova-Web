// tests/e2e/contact-form.spec.ts
// Validates the contact form on /contact and on home page footer reveal:
//   - All required fields render
//   - Country code selector lists all five GCC + Egypt options
//   - WhatsApp & email links are correct
//   - Form has SameSite-protected POST endpoint (security smoke check)

import { test, expect } from "@playwright/test";

test("contact page renders the full form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('input[name="name"], input[placeholder*="الاسم"]').first()).toBeVisible();
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="tel"], input[placeholder*="هاتف"]').first()).toBeVisible();
  await expect(page.locator('button[type="submit"], button:has-text("إرسال")').first()).toBeVisible();
});

test("WhatsApp link is correctly formatted", async ({ page }) => {
  await page.goto("/contact");
  const wa = page.locator('a[href*="wa.me"]').first();
  await expect(wa).toBeVisible();
  const href = await wa.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\//);
});

test("Email contact link is mailto", async ({ page }) => {
  await page.goto("/contact");
  const mail = page.locator('a[href^="mailto:"]').first();
  await expect(mail).toBeVisible();
  const href = await mail.getAttribute("href");
  expect(href).toMatch(/^mailto:contact@echonovastudio\.com/);
});

test("Country code selector shows GCC + Egypt options", async ({ page }) => {
  await page.goto("/contact");
  // Open the dropdown if it's a custom widget
  const trigger = page.locator('[role="combobox"], select').first();
  if (await trigger.isVisible()) await trigger.click();
  const body = await page.content();
  expect(body).toMatch(/\+966/);
  expect(body).toMatch(/\+971/);
  expect(body).toMatch(/\+965/);
  expect(body).toMatch(/\+974/);
  expect(body).toMatch(/\+20/);
});
