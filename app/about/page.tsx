import React from 'react';
import { Manifesto } from '@/components/about/philosophy/Manifesto';
import { VisionMission } from '@/components/about/vision/VisionMission';
import { CoreValues } from '@/components/about/values/CoreValues';
import { PartnersShowcase } from '@/components/about/partners/PartnersShowcase';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black">
            {/* The Manifesto / Philosophy Section (Scrollytelling) */}
            <Manifesto />

            {/* Vision & Mission (Bento Grid) */}
            <VisionMission />

            {/* Core Values (Accordion) */}
            <CoreValues />

            {/* Partners (Prestige Cards) */}
            <PartnersShowcase />
        </main>
    );
}
