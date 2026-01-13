"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ZoomBlur } from "./ZoomBlur";
import { useScrollSync } from "@/hooks/useScrollSync";

export function AnimatedZoomBlur() {
    const scroll = useScrollSync();
    const blurRef = useRef<any>(null);

    useFrame((state, delta) => {
        const scrollSpeed = Math.abs(scroll.delta);
        const targetBlur = scrollSpeed > 0.001 ? Math.min(scrollSpeed * 5, 0.5) : 0;

        if (blurRef.current) {
            blurRef.current.strength = THREE.MathUtils.lerp(blurRef.current.strength, targetBlur, delta * 10);
        }
    });

    return (
        <ZoomBlur
            ref={blurRef}
            center={[0.5, 0.5]}
            strength={0}
        />
    );
}
