"use client";

import dynamic from 'next/dynamic';

const World = dynamic(() => import('@/components/canvas/World'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#020B16] z-0" />
});

export function WorldWrapper() {
  return (
    <World />
  );
}
