import type { NextConfig } from "next";

// Security & performance headers — hardened on 2026-05-26 audit pass.
// Additions over the previous baseline:
//   • HSTS max-age extended from 1y → 2y (matches Vercel's *.vercel.app default).
//   • Permissions-Policy added (locks down camera/mic/geo/payment/usb/etc).
//   • Cross-Origin-Opener-Policy + Cross-Origin-Resource-Policy added.
//   • X-DNS-Prefetch-Control on (faster Cloudinary lookups).
//   • CSP expanded for Vercel Live + Speed Insights + Analytics; explicit
//     frame-src for WhatsApp + base-uri/form-action locks.
//   • poweredByHeader disabled (no more leaky X-Powered-By: Next.js).
//   • Long-lived cache for /_next/static; SWR cache for /_next/image.

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://*.google-analytics.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://res.cloudinary.com https://picsum.photos https://*.google-analytics.com https://*.googletagmanager.com",
  "media-src 'self' blob: https://res.cloudinary.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://res.cloudinary.com https://*.google-analytics.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://wa.me",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Content-Security-Policy",   value: cspDirectives },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    deviceSizes: [400, 640, 800, 1080, 1200, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=2592000, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    // Preserve legacy ?level= deep-links; canonical SSR landing remains
    // /services/reels (the page itself reads ?level= for metadata + initial
    // tier selection). No 301 needed here — kept open for future tier-named
    // pretty URLs (e.g. /services/reels/life) without breaking external
    // backlinks that point to ?level=.
    return [];
  },
};

export default nextConfig;
