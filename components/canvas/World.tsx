"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";
// import { Perf } from "r3f-perf"; // Disabled due to Turbopack font error
import { EffectComposer, Noise, Vignette, ChromaticAberration, SMAA } from "@react-three/postprocessing";
// import { AnimatedZoomBlur } from "./effects/AnimatedZoomBlur";
// import { ZoomBlurEffect } from "./effects/ZoomBlurEffect";

import { BlendFunction } from 'postprocessing';
import { Suspense, useMemo } from "react";

// --- Custom Shaders & Materials ---
// Placeholder for future advanced shaders (Phase 2 & 3)

import { CameraRig } from "./CameraRig";

// --- Scene Components ---

import { useScrollSync } from "@/hooks/useScrollSync";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobalEffects() {
  // const scroll = useScrollSync();
  // // Bypass Ref serialization crash by using useMemo and direct object manipulation
  // // const zoomBlurEffect = useMemo(() => new ZoomBlurEffect({ strength: 0, center: [0.5, 0.5] }), []);
  
  // // useFrame((state, delta) => {
  // //   const scrollSpeed = Math.abs(scroll.delta);
  // //   const targetBlur = scrollSpeed > 0.001 ? Math.min(scrollSpeed * 5, 0.5) : 0;
    
  // //   // Direct update without React Ref
  // //   zoomBlurEffect.strength = THREE.MathUtils.lerp(zoomBlurEffect.strength, targetBlur, delta * 10);
  // // });
  
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}


import { Atmosphere } from "./Atmosphere";
import { Sentinel } from "../3d/Sentinel";
import { VideoMonolith } from "../3d/VideoMonolith";
import { GhostParticles } from "./GhostParticles";
import { usePathname } from "next/navigation";

function HomeVideo() {
    const pathname = usePathname();
    if (pathname !== "/") return null;
    
    return <VideoMonolith videoUrl="/videos/hero-background.mp4" position={[0, -15, -40]} scale={[2, 2, 2]} rotation={[0, -0.2, 0]} />;
}

function SceneContent() {
    return (
        <>
            <CameraRig />
            
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#D97040" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#FFD6A5" />

            {/* The World Content */}
            {/* Atmosphere removed per user request */}
            {/* <Sentinel /> Removed per user request */}
            <Suspense fallback={null}>
                <HomeVideo />
            </Suspense>
            {/* <GhostParticles /> Removed per user request (Cyan Blob) */}

            
            {/* Post Processing */}
            <GlobalEffects />
        </>
    )
}

// --- Main World Component ---

export default function World() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas gl={{ antialias: false, stencil: false, alpha: true }} dpr={[1, 1]} camera={{ position: [0, 0, 10], fov: 45 }}>
             <SceneContent />
            
            <Preload all />
        </Canvas>
    </div>
  );
}
