"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function BackgroundElements() {
  const { scrollYProgress } = useScroll();
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generate seeded random particles (deterministic for SSR hydration)
  const particlesCount = 2000;
  const positions = useMemo(() => {
    // Simple seeded random for deterministic values
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (seededRandom(i * 3) - 0.5) * 25; // Wider spread
        positions[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 25; 
        positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 10 - 5; 
    }
    return positions;
  }, []);

  useFrame((state) => {
    const scroll = scrollYProgress.get(); // 0 to 1
    const time = state.clock.getElapsedTime();

    // 1. Hero Sphere (Fades out)
    if (meshRef.current) {
        // Move up and scale down
        meshRef.current.position.y = scroll * 8; 
        meshRef.current.rotation.x = time * 0.2;
        const scale = Math.max(0, 1 - scroll * 1.5);
        meshRef.current.scale.setScalar(2.5 * scale);
    }

    // 2. Particles (Persistent background movement)
    if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.05;
        particlesRef.current.position.z = -5 + scroll * 5; 
    }

    // 3. Torus (Story Section - 0.2 to 0.5)
    if (torusRef.current) {
        // Enters from right
        // At scroll 0.3, it should be at centered-ish position
        const startScroll = 0.1;
        const endScroll = 0.5;
        
        const progress = (scroll - startScroll) / (endScroll - startScroll);
        // progress: <0 (before), 0-1 (during), >1 (after)
        
        if (progress < 0) {
             torusRef.current.position.x = 15; // Offscreen right
             torusRef.current.scale.setScalar(0);
        } else if (progress > 1) {
             torusRef.current.position.x = -15 + (progress - 1) * -5; // Exit left
             torusRef.current.scale.setScalar(0); // Fade out
        } else {
            // Visible phase
            // Move from x=15 to x=5 (right visual field)
            torusRef.current.position.x = THREE.MathUtils.lerp(15, 6, progress); 
            torusRef.current.position.y = THREE.MathUtils.lerp(0, -2, progress);
            torusRef.current.rotation.x = time * 0.5;
            torusRef.current.rotation.y = time * 0.3;
            torusRef.current.scale.setScalar(1);
        }
    }

    // 4. Icosahedron (Services - 0.5 to 0.8)
    if (icoRef.current) {
        const startScroll = 0.4;
        const endScroll = 0.8;
        const progress = (scroll - startScroll) / (endScroll - startScroll);

        if (progress < 0) {
            icoRef.current.position.x = -15; // Offscreen left
            icoRef.current.scale.setScalar(0);
        } else if (progress > 1) {
             icoRef.current.position.x = 15; 
             icoRef.current.scale.setScalar(0);
        } else {
            // Visible
            // Move from x=-15 to x=-5 (left visual field)
            icoRef.current.position.x = THREE.MathUtils.lerp(-15, -5, progress); 
            icoRef.current.position.y = THREE.MathUtils.lerp(-5, -2, progress);
            icoRef.current.rotation.x = time * 0.4;
            icoRef.current.rotation.z = time * 0.2;
            icoRef.current.scale.setScalar(1);
        }
    }
  });

  return (
    <>
      {/* Hero Liquid Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 128, 128]} scale={2.5} ref={meshRef}>
          <MeshDistortMaterial
            color="#D97040"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Floating Story Torus - Explicitly positioned */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <Torus ref={torusRef} args={[2.5, 0.6, 16, 100]} position={[15, 0, -10]}>
            <MeshDistortMaterial color="#D97040" speed={2} distort={0.3} transparent opacity={0.6} wireframe />
        </Torus>
      </Float>

      {/* Floating Services Icosahedron */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Icosahedron ref={icoRef} args={[2.5, 1]} position={[-15, 0, -8]}>
             <MeshDistortMaterial color="#FFD6A5" speed={3} distort={0.4} transparent opacity={0.4} />
        </Icosahedron>
      </Float>

      {/* Persistent Particles Field */}
      <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#FFD6A5"
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.4}
          />
      </Points>
      
      {/* Lights */}
       <directionalLight position={[10, 10, 5]} intensity={2} color="#FFD6A5" />
       <directionalLight position={[-10, -10, -5]} intensity={1} color="#D97040" />
    </>
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <BackgroundElements />
        <fog attach="fog" args={['#020B16', 5, 25]} /> 
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-[var(--color-navy)]/30 pointer-events-none" />
    </div>
  );
}

