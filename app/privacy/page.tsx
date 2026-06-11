import React from 'react';
import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | ECHONOVA STUDIO',
  description: 'سياسة الخصوصية الخاصة بإيكونوڤا ستوديو — كيف نجمع البيانات ونعالجها ونحميها. Privacy Policy of ECHONOVA STUDIO.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#020B16] text-white selection:bg-[var(--nova-gold)] selection:text-black relative">
      <PrivacyContent />
    </main>
  );
}
