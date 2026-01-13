"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useScrollSync } from "@/hooks/useScrollSync";

export function CameraRig() {
  const { camera } = useThree();
  const scroll = useScrollSync();
  
  // We use this ref to hold state if needed, but Maath handles it cleanly
  
  useFrame((state, delta) => {
    // 1. Scroll-based Y Position
    // We map the total scroll range (0 to 1) to a physical distance in the Scene
    // Let's assume the "Story" is at -10, "Services" at -20, "Portfolio" at -30 etc.
    // Total vertical travel distance:
    const range = 60; // Deep enough for 6-7 sections
    const targetY = -scroll.offset * range;

    // 2. Scroll-based Z Position (Zoom in/out Effect)
    // We want to "dive in" when scrolling starts, then stabilize
    // Initial Z is 10. We might want to get closer to 5 as we scroll.
    const targetZ = 10 - (scroll.offset * 2); 

    // 3. Smooth Damping (The "Float" feel)
    // Damping position
    easing.damp3(
        camera.position,
        [
            0,          // X stays centered mostly
            targetY,    // Y follows scroll
            targetZ     // Z adjusts slightly
        ],
        0.5, // Smooth time
        delta
    );

    // 4. Mouse Parallax (Hand-held camera feel)
    // We rotate the camera slightly based on mouse position
    // BUT we add this on top of the 'LookAt' behavior
    // It's cleaner to rotate the *camera itself* or a parent group?
    // Actually, simple dampE (Euler) on rotation works well if we assume lookAt(0, targetY, 0)
    
    // Calculate target LookAt point (center of the screen at current Y depth)
    
    // We manually calculate rotation to look at target, then add mouse offset
    // Or we use lookAt every frame + offset.
    // Let's keep it simple: state.camera.lookAt(0, targetY, 0) is rigid.
    // We want:
    state.camera.lookAt(0, targetY, 0);
    
    // Now add slight noise/mouse influence to the rotation *after* lookAt?
    // ThreeJS lookAt overrides rotation.
    // Better strategy: Move camera X/Y slightly with mouse instead of rotation.
    
    easing.damp3(
        state.camera.position,
        [
            state.mouse.x * 0.5,  // Parallax X
            targetY + state.mouse.y * 0.5, // Parallax Y
            targetZ
        ],
        0.5,
        delta
    );
    
  });

  return null;
}
