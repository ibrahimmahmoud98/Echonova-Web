import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for ECHONOVA STUDIO E2E suite.
 * Boots `next start` before the run so tests hit the production build.
 *
 * Usage:
 *   npm run test:e2e            — local run
 *   npm run test:e2e:headed     — local debug
 *   npx playwright test --ui    — interactive UI mode
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html"], ["github"]] : "html",
  timeout: 30_000,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    locale: "ar-SA",
    timezoneId: "Asia/Riyadh",
  },

  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit-desktop",   use: { ...devices["Desktop Safari"] } },
    { name: "mobile-safari",    use: { ...devices["iPhone 14 Pro"] } },
    { name: "mobile-chrome",    use: { ...devices["Pixel 7"] } },
  ],

  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
