"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { AuroraField } from "./AuroraField";

/**
 * World — fullscreen WebGL atmosphere layer.
 * Replaced previous empty Sentinel/Atmosphere/Particles with the
 * lightweight AuroraField shader (see AuroraField.tsx).
 *
 * Performance & accessibility:
 * - Disabled when prefers-reduced-motion is set (CSS gradient fallback).
 * - Disabled when navigator.connection.saveData is true.
 * - dpr capped at 1 for shader work; antialiasing off (cheap).
 */

function GlobalEffects() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
}

function SceneContent() {
  return (
    <>
      <AuroraField />
      <GlobalEffects />
    </>
  );
}

export default function World() {
  const [shouldRender, setShouldRender] = useState(true);

  // Respect reduced-motion + data-saver preferences
  // Also disable WebGL canvas on small/mobile viewports to prevent
  // overflow + performance issues. Mobile gets the static gradient fallback.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const saveData = conn?.saveData === true;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (reducedMotion || saveData || isMobile) {
      setShouldRender(false);
    }
  }, []);

  // Static gradient fallback for users with reduced-motion
  if (!shouldRender) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(217,112,64,0.18) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,214,165,0.08) 0%, transparent 50%), #020B16",
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: false, stencil: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        flat
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
