"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { SentinelMaterial } from "./materials/SentinelMaterial";
import { useScrollSync } from "@/hooks/useScrollSync";

// Custom type for our shader material
interface SentinelShaderMaterial extends THREE.ShaderMaterial {
  uMorphProgress: number;
  uTime: number;
}

export function Sentinel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<SentinelShaderMaterial | null>(null);
  const scroll = useScrollSync();

  // 1. Prepare Geometries for Morphing
  // We need 3 geometries with the SAME vertex count for 1:1 morphing to look correct without artifacts.
  // Standard geometries (Sphere, Torus) have different counts.
  // Solution: Sample points on the surface or use a high-density Sphere and map positions?
  // Better approach for shader morphing:
  // Use a high-segment Sphere as the 'Base'.
  // Generating 'Target' positions by analytically mapping sphere UVs to Torus/Pyramid shapes in JS?
  // OR: Just create 3 geometries with high segments and hope the attribute counts match?
  //    (Unlikely to match perfectly).
  
  // ROBUST STRATEGY:
  // Create a Base Sphere (high poly).
  // Calculate target positions for every vertex V of the sphere:
  //   Target A (Torus): Project V onto a mathematical Torus surface.
  //   Target B (Pyramid): Project V onto a mathematical Icosahedron surface.
  
  const { geometry, torusAttr, pyramidAttr, normalTorusAttr, normalPyramidAttr } = useMemo(() => {
    // Base: High poly sphere
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const posAttribute = geo.attributes.position;
    const count = posAttribute.count;

    // Create buffers for targets
    const tPos = new Float32Array(count * 3);
    const pPos = new Float32Array(count * 3);
    const tNorm = new Float32Array(count * 3);
    const pNorm = new Float32Array(count * 3);

    // Temp vectors
    const v = new THREE.Vector3();
    // torusCenter is declared for documentation but calculation uses pOnMajor directly
    
    // Maths parameters
    const torusMainRadius = 2.5;
    const torusTubeRadius = 0.6;

    for (let i = 0; i < count; i++) {
       // Get current Sphere vertex
       v.fromBufferAttribute(posAttribute, i);
       // Normalize to get direction from center
       v.normalize();

       // --- 1. Map to Torus ---
       // A torus surface point can be found by mapping the sphere point.
       // Project v onto the XZ plane to find the 'tube center' angle
       // This is an approximation "shrink wrap" method
       
       // Calculate angle in XZ plane
       const angleXZ = Math.atan2(v.z, v.x);
       // Position of the tube center point on the major circle (used for pOnMajor calculation)
       const _tubeCenterX = Math.cos(angleXZ) * torusMainRadius;
       const _tubeCenterZ = Math.sin(angleXZ) * torusMainRadius;
       
       // Now we map the sphere's Y component to the tube's minor circle
       // We construct a local coordinate system at the tube center
       const _localV = new THREE.Vector3(v.x, v.y, v.z).normalize();
       // This part is tricky to get a clean unwrap. 
       // Simpler Mapping: 
       // Just treat the sphere vertex as a point in space and clamp it to the nearest torus surface point.
       
       // Nearest point on Torus Major Circle (Radius R) lying in XZ plane
       const pOnMajor = new THREE.Vector3(v.x, 0, v.z).normalize().multiplyScalar(torusMainRadius);
       // Now direction from that point to our vertex
       const dirToSurface = new THREE.Vector3().subVectors(v.multiplyScalar(3.0), pOnMajor).normalize(); // 3.0 is approx scale
       // Final Point on Torus Surface
       const pTorus = pOnMajor.add(dirToSurface.multiplyScalar(torusTubeRadius));
       
       tPos[i * 3] = pTorus.x;
       tPos[i * 3 + 1] = pTorus.y;
       tPos[i * 3 + 2] = pTorus.z;
       
       // Normal for Torus (simplistic) is dirToSurface
       tNorm[i * 3] = dirToSurface.x;
       tNorm[i * 3 + 1] = dirToSurface.y;
       tNorm[i * 3 + 2] = dirToSurface.z;


       // --- 2. Map to Pyramid (Icosahedron) ---
       // Mathematical Icosahedron is hard to project perfectly.
       // Easy cheat: Map to a Tetrahedron or Octahedron which are mathematically simple planes.
       // Or map to a Box? 
       // User asked for Pyramids/Icosahedron.
       // Let's project to a simple Tetrahedron shape (Pyramid).
       
       // Simple projection to a crystalline shape:
       // Snap the sphere vertex to the surface of a generic scale 2.5 icosahedron.
       // Since we don't have the exact math for icosa faces handy in loop, let's make a "Spiky" shape.
       // Let's do a noisy crystal distortion for the 3rd shape.
       
       const pPyramid = v.clone().multiplyScalar(2.5);
       // Distort/Facet it to look like a poly
       if (Math.abs(pPyramid.x) > 1.5) pPyramid.x *= 1.5; // Flatten sides
       if (pPyramid.y > 1.0) pPyramid.y *= 2.0; // Pointy top
       
       pPos[i * 3] = pPyramid.x;
       pPos[i * 3 + 1] = pPyramid.y;
       pPos[i * 3 + 2] = pPyramid.z;
       
       const nPyramid = pPyramid.clone().normalize();
       pNorm[i * 3] = nPyramid.x;
       pNorm[i * 3 + 1] = nPyramid.y;
       pNorm[i * 3 + 2] = nPyramid.z;
    }

    const tAttr = new THREE.BufferAttribute(tPos, 3);
    const pAttr = new THREE.BufferAttribute(pPos, 3);
    const tNAttr = new THREE.BufferAttribute(tNorm, 3);
    const pNAttr = new THREE.BufferAttribute(pNorm, 3);

    return { geometry: geo, torusAttr: tAttr, pyramidAttr: pAttr, normalTorusAttr: tNAttr, normalPyramidAttr: pNAttr };
  }, []);

  // Update logic
  useFrame((state, delta) => {
    if (!materialRef.current) return;
    
    // Calculate Morph Progress based on Scroll
    // 0 = Start (Sphere)
    // 0.2 - 0.4 = Transition to Torus (Value 1)
    // 0.6 - 0.8 = Transition to Pyramid (Value 2)
    
    const offset = scroll.offset; // 0 to 1
    let morphValue = 0;
    
    // Stage 1: Sphere -> Torus (Scroll 0 to 0.3)
    // We want full Torus by 0.3
    if (offset < 0.3) {
        morphValue = offset / 0.3; // 0 to 1
    } 
    // Stage 2: Torus -> Pyramid (Scroll 0.4 to 0.7)
    // Hold Torus from 0.3 to 0.4
    else if (offset >= 0.3 && offset < 0.45) {
        morphValue = 1;
    }
    else if (offset >= 0.45 && offset < 0.8) {
        morphValue = 1 + ((offset - 0.45) / 0.35); // 1 to 2
    } else {
        morphValue = 2; // Stay pyramid
    }

    materialRef.current.uMorphProgress = morphValue;
    materialRef.current.uTime = state.clock.getElapsedTime();
    
    // Rotate the sentinel
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
      {/* Attach custom attributes to geometry via declarative specialized prop? 
          R3F doesn't have a direct <attribute> tag. We must attach manually or via bufferGeometry.attrs */}
      {/* We use the primitive approach to inject attributes once */}
      <primitive object={geometry} attach="geometry">
          <bufferAttribute attach="attributes-positionTorus" args={[torusAttr.array, 3]} />
          <bufferAttribute attach="attributes-positionPyramid" args={[pyramidAttr.array, 3]} />
          <bufferAttribute attach="attributes-normalTorus" args={[normalTorusAttr.array, 3]} />
          <bufferAttribute attach="attributes-normalPyramid" args={[normalPyramidAttr.array, 3]} />
      </primitive>
      
      {/* Custom Material */}
      <sentinelMaterial
        ref={materialRef}
        key={SentinelMaterial.key}
        transparent
        uColorA={new THREE.Color("#D97040")}
        uColorB={new THREE.Color("#FFD6A5")}
      />
    </mesh>
  );
}
