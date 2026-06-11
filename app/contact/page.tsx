"use client";

import { ContactImmersive } from "@/components/sections/ContactImmersive";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020B16] text-white selection:bg-[var(--color-copper)] selection:text-white">
      {/* الرحلة الغامرة — ستة مشاهد سينمائية تتحول فيها رسالة العميل إلى نوفا.
          (النموذج الكلاسيكي ContactPageReveal باقٍ كما هو داخل /home-classic) */}
      <ContactImmersive />
    </main>
  );
}
