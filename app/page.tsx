import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HomeServicesSection } from "@/components/sections/HomeServicesSection";
import { Portfolio } from "@/components/sections/Portfolio";
import { MethodologyScroll } from "@/components/sections/MethodologyScroll";
import { ContactReveal } from "@/components/sections/ContactReveal";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[var(--color-copper)] selection:text-white">
      {/* Navbar global in layout */}
      <Hero />
      <Story />
      <HomeServicesSection />
      <Portfolio />
      <MethodologyScroll />
      <ContactReveal />
      {/* Footer global in layout */}
    </main>
  );
}
