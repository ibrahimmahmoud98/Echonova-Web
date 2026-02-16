import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import { WorldWrapper } from "@/components/canvas/WorldWrapper";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import "./globals.css";
import { AudioProvider } from "@/components/audio/AudioEngine";
import { ScrollToTop } from "@/components/utils/ScrollToTop";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.echonovastudio.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | ECHONOVA STUDIO',
    default: 'ECHONOVA STUDIO | The Future of Visuals',
  },
  description: "Global AI-driven creative studio redefining visual content. From cinema to virtual identity.",
  keywords: ["Creative Studio", "Global Studio", "AI Video", "Virtual Production", "Middle East", "Branding"],
  openGraph: {
    title: 'ECHONOVA STUDIO',
    description: 'Where AI meets Cinema. The new era of creative production in the Middle East.',
    url: 'https://www.echonovastudio.com',
    siteName: 'ECHONOVA STUDIO',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECHONOVA STUDIO',
    description: 'Redefining visual storytelling with AI & Cinema.',
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
              <MagneticCursor />

              
              <Navbar />

              {/* Unified 3D World Background (Fixed Z-0) */}
              <WorldWrapper />
              
              {/* Main Content (Scrollable Z-10) */}
              <div className="relative z-10">
                  {children}
              </div>

              <Footer />
          </AudioProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
