import type { Metadata, Viewport } from "next";
import { Cairo, Outfit } from "next/font/google";
// TEMP-TEST-DISABLE: import commented out only to speed up the sandbox compile
// while screenshot-testing the TheatreStage responsive fix. RESTORED before finishing.
// import { WorldWrapper } from "@/components/canvas/WorldWrapper";
// MagneticCursor removed per user request — using browser default cursor.
// Kept the component file for potential reuse in a future cursor-states feature.
import "./globals.css";
import { AudioProvider } from "@/components/audio/AudioEngine";
import { MuteToggle } from "@/components/audio/MuteToggle";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});


import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

// Explicit viewport export — ensures correct meta tag on all devices.
// interactiveWidget: 'resizes-content' prevents the iOS keyboard from
// collapsing the viewport and misaligning fixed/sticky elements.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.echonovastudio.com'),
  verification: {
    google: 'fi_ZmOWLZAyFUJTr50RZz8W6hiIncFZ4oI6GOOHj9BI',
  },
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | ECHONOVA STUDIO',
    default: 'ECHONOVA | ECHONOVA STUDIO - AI Creative Studio',
  },
  description: "إيكونوڤا (ECHONOVA): Global AI-driven creative studio redefining visual content. From cinema to virtual identity.",
  keywords: ["Creative Studio", "Global Studio", "AI Video", "Virtual Production", "Middle East", "Branding", "ECHONOVA", "إيكونوڤا"],
  openGraph: {
    title: 'ECHONOVA | ECHONOVA STUDIO',
    description: 'إيكونوڤا (ECHONOVA) - Where AI meets Cinema. The new era of creative production in the Middle East.',
    url: 'https://www.echonovastudio.com',
    siteName: 'ECHONOVA STUDIO',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECHONOVA | ECHONOVA STUDIO',
    description: 'إيكونوڤا (ECHONOVA): Redefining visual storytelling with AI & Cinema.',
  },
};

import { ReactLenis } from "@/lib/lenis";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${outfit.variable} antialiased bg-[var(--color-navy)]`}
        suppressHydrationWarning
      >
        <OrganizationSchema />
        <ReactLenis root>
          <AudioProvider>
              <ScrollToTop />
              <MuteToggle />


              <Navbar />

              {/* Unified 3D World Background (Fixed Z-0) */}
              {/* TEMP-TEST-DISABLE: commented out only to speed up the sandbox
                  compile while screenshot-testing the TheatreStage responsive
                  fix. RESTORED before finishing. */}
              {/* <WorldWrapper /> */}

              {/* Main Content (Scrollable Z-10) */}
              <div className="relative z-10 overflow-x-hidden">
                  {children}
              </div>


              <Footer />
          </AudioProvider>
        </ReactLenis>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
