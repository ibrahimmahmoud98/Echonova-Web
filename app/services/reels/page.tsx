"use client";

import { Suspense } from "react";
import { ReelsImmersive } from "@/components/features/reels/ReelsImmersive";

export default function ReelsPage() {
  return (
    <main className="min-h-screen bg-[#020B16] text-white selection:bg-[var(--color-copper)] selection:text-white">
      <Suspense fallback={<div className="w-full h-screen bg-[#020B16]" />}>
        <ReelsImmersive />
      </Suspense>
    </main>
  );
}
