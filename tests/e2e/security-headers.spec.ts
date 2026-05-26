// tests/e2e/security-headers.spec.ts
// Pins the 2026-05-26 hardening of next.config.ts security headers.
// Run against a built+started server (`npm run build && npm run start`).

import { test, expect } from "@playwright/test";

test("homepage ships hardened security headers", async ({ request }) => {
  const res = await request.get("/");
  const h = Object.fromEntries(
    Object.entries(res.headers()).map(([k, v]) => [k.toLowerCase(), v])
  );

  // HSTS — 2 years, includeSubDomains, preload
  expect(h["strict-transport-security"]).toContain("max-age=63072000");
  expect(h["strict-transport-security"]).toContain("includeSubDomains");
  expect(h["strict-transport-security"]).toContain("preload");

  // Content-type sniffing off
  expect(h["x-content-type-options"]).toBe("nosniff");

  // Framing locked down
  expect(h["x-frame-options"]).toBe("DENY");

  // Referrer policy
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");

  // Permissions policy locks down sensitive APIs
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["permissions-policy"]).toContain("microphone=()");
  expect(h["permissions-policy"]).toContain("geolocation=()");

  // Cross-origin isolation
  expect(h["cross-origin-opener-policy"]).toBe("same-origin");
  expect(h["cross-origin-resource-policy"]).toBe("same-site");

  // CSP exists and forbids framing
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("default-src 'self'");

  // No X-Powered-By leak
  expect(h["x-powered-by"]).toBeUndefined();
});

test("robots.txt allows AI crawlers explicitly", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  // GEO-friendly bots are allowed
  expect(body).toContain("User-Agent: GPTBot");
  expect(body).toContain("User-Agent: ClaudeBot");
  expect(body).toContain("User-Agent: PerplexityBot");
  expect(body).toContain("User-Agent: Google-Extended");
  // Sitemap declared
  expect(body).toContain("Sitemap: https://www.echonovastudio.com/sitemap.xml");
});

test("sitemap.xml includes core pages and articles", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("https://www.echonovastudio.com/");
  expect(body).toContain("/services/reels");
  expect(body).toContain("/services/whisper");
  expect(body).toContain("/articles/ai-cost-reduction-95-percent");
});
