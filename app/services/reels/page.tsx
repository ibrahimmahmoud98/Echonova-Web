// app/services/reels/page.tsx — SSR-friendly entry for NOVA LIFE / ACTION / MAGIC.
// Server Component that:
//   1. Emits dynamic <title>/<meta> via generateMetadata based on ?level=
//   2. Emits a JSON-LD Service graph for every tier (consumed by Google,
//      Perplexity, ChatGPT search and other LLM crawlers — fixes the
//      "empty HTML shell" problem flagged in the 2026-05-26 audit).
//   3. Renders a hidden but crawlable SEO outline of the three tiers so the
//      initial HTML payload contains real, indexable content — even before
//      ReelsImmersive boots on the client.
//   4. Mounts the existing ReelsImmersive UX inside <Suspense> so the
//      cinematic interaction stays identical for human users.

import { Suspense } from "react";
import type { Metadata } from "next";
import { ReelsImmersive } from "@/components/features/reels/ReelsImmersive";
import { COMMERCIAL_LEVELS } from "@/lib/data/services-content";

const VALID_LEVELS = COMMERCIAL_LEVELS.map((l) => l.id) as readonly string[];

type SearchParams = { level?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const requested = params?.level?.toLowerCase();
  const active =
    requested && VALID_LEVELS.includes(requested)
      ? COMMERCIAL_LEVELS.find((l) => l.id === requested)!
      : COMMERCIAL_LEVELS[0];

  const title = `${active.brandName} — ${active.arTitle} | ECHONOVA STUDIO`;
  const description = active.description;
  const canonical = `https://www.echonovastudio.com/services/reels${
    requested && VALID_LEVELS.includes(requested) ? `?level=${requested}` : ""
  }`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ECHONOVA STUDIO",
      locale: "ar_SA",
      type: "website",
      images: [{ url: `https://www.echonovastudio.com${active.posterImage}`, alt: active.altText }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.echonovastudio.com${active.posterImage}`],
    },
  };
}

export default async function ReelsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const initialLevel = params?.level?.toLowerCase();

  // Structured data — one Service entity per tier, plus an ItemList wrapper.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ECHONOVA STUDIO — Cinematic Reels Tiers",
    itemListElement: COMMERCIAL_LEVELS.map((lv, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: lv.brandName,
        alternateName: lv.arTitle,
        description: lv.description,
        url: `https://www.echonovastudio.com/services/reels?level=${lv.id}`,
        image: `https://www.echonovastudio.com${lv.posterImage}`,
        provider: {
          "@type": "Organization",
          name: "ECHONOVA STUDIO",
          url: "https://www.echonovastudio.com",
        },
        areaServed: { "@type": "Place", name: "Worldwide" },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#020B16] text-white selection:bg-[var(--color-copper)] selection:text-white">
      {/* JSON-LD for search engines + LLM indexers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* SEO-only outline — present in the initial server HTML so crawlers
          and GEO indexers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
          see the full content. Hidden visually so it does not affect the
          immersive UX. */}
      <section className="sr-only" aria-hidden="true">
        <h1>الإعلانات السينمائية من إيكونوڤا ستديو</h1>
        <p>
          ثلاث طبقات سينمائية للإنتاج الإعلاني بالذكاء الاصطناعي: NOVA LIFE
          للواقعية المطلقة، NOVA ACTION لمشاهد الأكشن السينمائية، NOVA MAGIC
          لما وراء الواقع. اختر الطبقة التي تخدم رسالة علامتك التجارية.
        </p>
        {COMMERCIAL_LEVELS.map((lv) => (
          <article key={lv.id} id={`tier-${lv.id}`}>
            <h2>
              {lv.brandName} — {lv.arTitle}
            </h2>
            <p>{lv.description}</p>
            <h3>المزايا الأساسية</h3>
            <ul>
              {lv.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p>
              <strong>مثالية لـ:</strong> {lv.idealFor}
            </p>
            <p>
              <strong>القيمة المضافة:</strong> {lv.valueProp}
            </p>
          </article>
        ))}
      </section>

      {/* Existing immersive client UX — unchanged */}
      <Suspense fallback={<div className="w-full h-screen bg-[#020B16]" />}>
        <ReelsImmersive />
      </Suspense>

      {/* Anchored canonical signal — emits a known indexable URL in the HTML */}
      <link
        rel="canonical"
        href={`https://www.echonovastudio.com/services/reels${
          initialLevel && VALID_LEVELS.includes(initialLevel) ? `?level=${initialLevel}` : ""
        }`}
      />
    </main>
  );
}
