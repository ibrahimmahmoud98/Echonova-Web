"use client";

import { useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

interface VideoMonolithProps {
    videoUrl: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

export function VideoMonolith({ videoUrl, position=[0,0,0], scale=[1,1,1], rotation=[0,0,0] }: VideoMonolithProps) {
    // Using a sample video for dev if empty
    const src = videoUrl || "/videos/sample.mp4"; 
    
    const texture = useVideoTexture(src, {
        start: true,
        muted: true,
        loop: true,
        crossOrigin: 'Anonymous'
    });
    
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh position={new THREE.Vector3(...position)} scale={new THREE.Vector3(...scale)} rotation={new THREE.Euler(...rotation)}>
            <planeGeometry args={[16, 9]} /> 
            {/* <meshBasicMaterial color="red" wireframe /> */}
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}
