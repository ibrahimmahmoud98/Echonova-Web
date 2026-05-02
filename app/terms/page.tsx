import React from 'react';
import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | ECHONOVA STUDIO',
  description: 'شروط الخدمة الخاصة بإيكونوڤا ستوديو — الشروط والأحكام التي تحكم استخدام خدماتنا وموقعنا. Terms of Service for ECHONOVA STUDIO.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black relative">
      <TermsContent />
    </main>
  );
}
