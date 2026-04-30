import React from 'react';
import { ServicesHero } from '@/components/features/hero/ServicesHero';
import { ReelsSection } from '@/components/features/reels/ReelsSection';
import { IdentitySection } from '@/components/features/aura/IdentitySection';
import { EntertainmentSection } from '@/components/features/cinema/EntertainmentSection';
import { AudioProductionSection } from '@/components/features/audio/AudioProductionSection';
import { WhyUsSection } from '@/components/features/why-us/WhyUsSection';

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black">
            {/* Hero Section */}
            <ServicesHero />

            {/* Reels Section (Immersive Interactive) */}
            <ReelsSection />

            {/* Virtual Identity Section (Digital DNA Mode) */}
            <IdentitySection />

            {/* Branded Entertainment Section (Cinema Mode) */}
            <EntertainmentSection />

            {/* Audio Production Section (Whisper Mode) */}
            <AudioProductionSection />

            {/* Why Us Section (Masonry Grid) */}
            <WhyUsSection />
        </main>
    );
}
