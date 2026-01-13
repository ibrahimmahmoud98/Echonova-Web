"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { easing } from "maath";

// Global Scroll State (Simple mutable object for performance)
const scrollState = {
  offset: 0, // 0 to 1
  delta: 0,
  maxScroll: 1
};

export function useScrollSync() {
  const { size, viewport } = useThree();
  
  useEffect(() => {
    // Calculate max scroll
    const updateMax = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        scrollState.maxScroll = bodyHeight - windowHeight;
    };
    
    window.addEventListener("resize", updateMax);
    updateMax(); // Initial
    
    return () => window.removeEventListener("resize", updateMax);
  }, []);

  // Update loop
  // We don't use React state to avoid re-renders. We create a ref-like object accessor.
  useFrame((state, delta) => {
    // Read native scroll
    const scrollY = window.scrollY;
    // Normalize 0 to 1
    const targetOffset = Math.max(0, Math.min(1, scrollY / (scrollState.maxScroll || 1)));
    
    scrollState.delta = targetOffset - scrollState.offset;
    scrollState.offset = targetOffset; 
    
    // Smooth damping for "feel" if needed? 
    // Usually we want raw for sync, or interpolated for animations.
    // The components will use the raw offset or damp it themselves.
  });

  return scrollState; // Returns the mutable object
}
