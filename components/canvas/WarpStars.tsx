"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollSync } from "@/hooks/useScrollSync";

const STAR_COUNT = 400;

export function WarpStars() {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const scroll = useScrollSync();
    
    // Initial random positions
    const particles = useMemo(() => {
        const data = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            data[i * 3] = (Math.random() - 0.5) * 40;     // X
            data[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
            data[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z
        }
        return data;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        const scrollSpeed = Math.abs(scroll.delta) * 50; // Amplify scroll delta
        const baseSpeed = 2.0; // Constant low speed
        const currentSpeed = baseSpeed + scrollSpeed;

        for (let i = 0; i < STAR_COUNT; i++) {
            const i3 = i * 3;
            
            // Move Z towards camera (positive Z)
            particles[i3 + 2] += currentSpeed * delta * 5;

            // Reset if passed camera
            if (particles[i3 + 2] > 20) {
                particles[i3 + 2] = -80;
                particles[i3] = (Math.random() - 0.5) * 40;
                particles[i3 + 1] = (Math.random() - 0.5) * 40;
            }

            // Visual stretching based on speed (Warp Effect)
            const zScale = 1 + scrollSpeed * 2; 

            dummy.position.set(particles[i3], particles[i3 + 1], particles[i3 + 2]);
            dummy.scale.set(0.1, 0.1, zScale); 
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, STAR_COUNT]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </instancedMesh>
    );
}
