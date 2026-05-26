// app/services/[slug]/page.tsx — Server Component
// Previously a Client Component that imported sibling pages directly.
// That pattern broke after reels/page.tsx became a Server Component with
// generateMetadata: importing a server component from a client component
// downgrades it back to a client component, which then forbids
// generateMetadata and crashes the build with:
//   "You are attempting to export 'generateMetadata' from a component
//    marked with 'use client', which is disallowed."
//
// New strategy — pure server-side redirect map. SEO-clean (no soft-routing
// inside a client tree), crawler-friendly (issues a real 308), and decouples
// the URL aliases from the destination components entirely.

import { notFound, redirect, permanentRedirect } from "next/navigation";

const ALIAS_MAP: Record<string, string> = {
  // NOVA LIFE / ACTION / MAGIC → unified Reels SSR page with level query
  "nova-life":   "/services/reels?level=life",
  "nova-action": "/services/reels?level=action",
  "nova-magic":  "/services/reels?level=magic",
  // Identity
  "nova-aura":   "/services/aura",
  // Entertainment
  "nova-cinema": "/services/cinema",
  "nova-saga":   "/services/cinema",
  // Audio
  "nova-whisper": "/services/whisper",
};

export default async function ServiceAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = ALIAS_MAP[slug?.toLowerCase()];
  if (!destination) notFound();
  // Use permanentRedirect (308) — these aliases are stable and we want
  // search engines to consolidate ranking signals into the canonical URL.
  permanentRedirect(destination);
}

// Pre-generate aliases at build time so each one is a static 308 redirect
// rather than an on-demand serverless invocation.
export function generateStaticParams() {
  return Object.keys(ALIAS_MAP).map((slug) => ({ slug }));
}
