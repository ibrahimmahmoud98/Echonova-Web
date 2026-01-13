"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

function LiquidShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
        // Subtle rotation
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 128, 128]} scale={2.5} ref={meshRef}>
        <MeshDistortMaterial
          color="#D97040" // Electric Copper base
          attach="material"
          distort={0.6} // Amount of distortion
          speed={1.5} // Speed of distortion
          roughness={0.2}
          metalness={0.9}
        //   emissive="#8A3A1B"
        //   emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function LiquidShape2() {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5} position={[3, -2, -2]}>
             <Sphere args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#020B16" // Navy
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                />
             </Sphere>
        </Float>
    )
}

export function LiquidGlass() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#FFD6A5" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#D97040" />
        
        <LiquidShape />
        <LiquidShape2 />
        
        {/* Post-processing or environment could go here, keeping it simple for perf */}
      </Canvas>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-[var(--color-navy)]/50 mix-blend-multiply" />
    </div>
  );
}
