import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HomeServicesSection } from "@/components/sections/HomeServicesSection";
import { Portfolio } from "@/components/sections/Portfolio";
import { MethodologyScroll } from "@/components/sections/MethodologyScroll";
import { ContactPageReveal } from "@/components/sections/ContactPageReveal";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[var(--color-copper)] selection:text-white">
      {/* Navbar global in layout */}
      <Hero />
      <Story />
      {/* Story → Services : Iris transition.
          Story.tsx closes its lens fully and fades to black during its
          SHUT phase. HomeServicesSection wraps itself with IrisOpenIntro
          which reopens the iris — the children sit stationary behind
          the iris overlay, appearing from depth (Z-axis). */}
      <HomeServicesSection />
      <Portfolio />
      {/* MethodologyScroll → Contact : Same horizontal plane.
          ContactPageReveal is passed as endPanel — it sits on the same
          horizontal track as the methodology cards, so the user scrolls
          horizontally from the last step directly into the contact
          section. No vertical gap, no "coming from below". */}
      <MethodologyScroll endPanel={<ContactPageReveal />} />
      {/* Footer global in layout */}
    </main>
  );
}
