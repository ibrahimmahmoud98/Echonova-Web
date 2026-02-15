import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HomeServicesSection } from "@/components/sections/HomeServicesSection";
import { Portfolio } from "@/components/sections/Portfolio";
import { MethodologyScroll } from "@/components/sections/MethodologyScroll";
import { ContactReveal } from "@/components/sections/ContactReveal";
import { FAQSection } from "@/components/sections/FAQSection";
import { FAQSchema } from "@/components/seo/FAQSchema";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[var(--color-copper)] selection:text-white">
      {/* Navbar global in layout */}
      <FAQSchema />
      <Hero />
      <Story />
      <HomeServicesSection />
      <Portfolio />
      <MethodologyScroll />
      <FAQSection />
      <ContactReveal />
      {/* Footer global in layout */}
    </main>
  );
}
