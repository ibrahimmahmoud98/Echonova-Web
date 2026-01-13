"use client";

import { ReactLenis as Lenis } from "lenis/react";

interface ReactLenisProps {
  root?: boolean;
  options?: object;
  children: React.ReactNode;
}

export function ReactLenis({ root, options, children }: ReactLenisProps) {
  return (
    <Lenis root={root} options={options}>
      {children}
    </Lenis>
  );
}
