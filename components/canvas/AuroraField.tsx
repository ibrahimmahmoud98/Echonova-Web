"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AuroraField — fullscreen GLSL shader plane producing a soft cloud-like
 * atmosphere using ENS brand colors.
 *
 * Interaction model (v4 — stone-through-clouds):
 *  • Mouse: light asymmetric bloom (≈18% intensity) shaped by underlying cloud
 *    noise. No rotation. Visible enough that clouds appear to react gently,
 *    not invasive enough to feel like liquid.
 *  • Mouse damping: slow trail (delta * 1.6).
 *  • Click: physics-inspired "stone through clouds" — an expanding hole
 *    (clouds carved aside) with a thin bright compression ring at the
 *    propagating front. The hole grows from radius 0 → ~0.32 over ~1.5s.
 *  • Scroll: increases overall agitation of the field.
 *  • Time: continuous slow drift of the noise field even when idle.
 */

// Shared mutable globals (avoids React re-renders for high-frequency input)
const interactionState = {
  mouseX: 0.5,
  mouseY: 0.5,
  scroll: 0,
  // Click trigger — flagged by mousedown listener, consumed inside useFrame
  pendingClickX: 0.5,
  pendingClickY: 0.5,
  hasPendingClick: false,
};

if (typeof window !== "undefined") {
  const w = window as unknown as { __ens_aurora_listener_attached?: boolean };
  if (!w.__ens_aurora_listener_attached) {
    w.__ens_aurora_listener_attached = true;

    window.addEventListener(
      "mousemove",
      (e) => {
        interactionState.mouseX = e.clientX / window.innerWidth;
        interactionState.mouseY = 1 - e.clientY / window.innerHeight;
      },
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      () => {
        const max = document.body.scrollHeight - window.innerHeight;
        interactionState.scroll = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      },
      { passive: true }
    );

    // NEW v2: capture clicks anywhere on the page (incl. on top of buttons)
    // We use mousedown + capture phase so we get the event before bubbling
    // can be stopped by other handlers. Also handle touch.
    const onPress = (clientX: number, clientY: number) => {
      interactionState.pendingClickX = clientX / window.innerWidth;
      interactionState.pendingClickY = 1 - clientY / window.innerHeight;
      interactionState.hasPendingClick = true;
    };
    window.addEventListener(
      "mousedown",
      (e) => onPress(e.clientX, e.clientY),
      { capture: true, passive: true }
    );
    window.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches[0]) onPress(e.touches[0].clientX, e.touches[0].clientY);
      },
      { capture: true, passive: true }
    );
  }
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_mouse;
  uniform float u_scroll;
  uniform vec2  u_resolution;
  uniform float u_clickAge;     // Seconds since last click (large = expired)
  uniform vec2  u_clickPos;     // Click position in 0..1 normalized space

  varying vec2 vUv;

  // Brand colors
  const vec3 NAVY        = vec3(0.008, 0.043, 0.086);
  const vec3 COPPER_BURN = vec3(0.541, 0.227, 0.106);
  const vec3 COPPER      = vec3(0.851, 0.439, 0.251);
  const vec3 CHAMPAGNE   = vec3(1.0, 0.839, 0.647);

  // Smooth value noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // Fractal Brownian motion (4 octaves)
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  // Stone-through-clouds: a click "pierces" the clouds. Returns a SIGNED
  // contribution to overall intensity:
  //   • Inside the expanding front  → NEGATIVE (clouds are carved aside)
  //   • At the front edge itself    → POSITIVE (compressed cloud highlight)
  // This is what creates the physical illusion of a stone passing through fog.
  // Returns components separately via out parameters so the caller can route
  // them to brightness vs. champagne color independently.
  float clickStone(vec2 p, vec2 clickLocal, float age, out float ringEdge) {
    ringEdge = 0.0;
    if (age > 1.5 || age < 0.0) return 0.0;

    float dist = length(p - clickLocal);

    // Front radius grows over lifetime — smaller scale than v2 (was 0.65)
    float radius = age * 0.32;

    // Hole: 1.0 well inside the front, 0 well outside, soft 0.05 edge
    float hole = 1.0 - smoothstep(radius * 0.85 - 0.04, radius * 0.85 + 0.02, dist);

    // Thin bright compression ring at the propagating front
    float ringDist = abs(dist - radius);
    ringEdge = exp(-ringDist * ringDist * 220.0);

    // Age fade with ease-out — quick visual bloom then settles
    float ageFade = 1.0 - clamp(age / 1.5, 0.0, 1.0);
    ageFade = pow(ageFade, 1.4);

    ringEdge *= ageFade * 0.45;
    return -hole * 0.55 * ageFade;  // Negative → clouds carved aside
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = u_time * 0.04;

    // --- Cloud noise layers — BOUNDED drift ---
    // Use bounded sin/cos offsets instead of linear time*k. This keeps the
    // sampled noise region oscillating within a fixed range so clouds never
    // drift completely off-screen and never need to come back from far away.
    // Two layers move on different axes/phases so they always overlap and
    // the field stays continuously cloudy.
    vec2 drift1 = vec2(sin(t * 0.55) * 1.4, cos(t * 0.42) * 0.9);
    vec2 drift2 = vec2(cos(t * 0.48) * 0.9, sin(t * 0.36) * 1.1);

    vec2 q1 = vec2(p.x * 1.2, p.y * 2.0 + sin(p.x * 1.5 + t * 0.5) * 0.15) + drift1;
    float layer1 = fbm(q1);

    vec2 q2 = p * 2.5 + drift2;
    float layer2 = fbm(q2);

    // --- Cursor: light asymmetric bloom (no rotation) ---
    // Modulated by underlying FBM so the bloom takes on cloud shape
    // instead of looking like a perfect circle/droplet.
    vec2 mouseLocal = (u_mouse - 0.5) * aspect;
    float dMouse = length(p - mouseLocal);
    float bloomShape = layer1 * 0.6 + 0.4; // Asymmetric mask from cloud noise itself
    float cursorBloom = exp(-dMouse * 1.5) * bloomShape * 0.18; // visible but not invasive

    // --- Click: stone through clouds ---
    vec2 clickLocal = (u_clickPos - 0.5) * aspect;
    float ringEdge;
    float clickHole = clickStone(p, clickLocal, u_clickAge, ringEdge);

    // --- Combine ---
    float scrollAgitation = mix(0.45, 1.0, u_scroll);
    float intensity =
        layer1 * 0.55 +
        layer2 * 0.35 +
        cursorBloom * scrollAgitation +
        clickHole +     // Negative inside the stone front (carves clouds)
        ringEdge;       // Positive at the propagating ring edge

    intensity = smoothstep(0.15, 0.95, intensity);

    // --- Color stack ---
    vec3 col = NAVY;
    col = mix(col, COPPER_BURN, smoothstep(0.30, 0.65, intensity) * 0.55);
    col = mix(col, COPPER,       smoothstep(0.55, 0.85, intensity) * 0.42);

    // Champagne kiss: only the ring edge of a click triggers it
    // (the hole part stays navy — it's an absence of cloud, not a highlight)
    float champStrength = smoothstep(0.78, 0.95, intensity) * 0.22;
    champStrength += ringEdge * 0.55;
    col = mix(col, CHAMPAGNE, clamp(champStrength, 0.0, 0.55));

    // Vertical fade so the bottom feels grounded
    float verticalFade = smoothstep(0.0, 0.4, vUv.y);
    col *= mix(0.65, 1.0, verticalFade);

    // Soft vignette
    float vignette = smoothstep(1.4, 0.4, length(p));
    col *= mix(0.55, 1.0, vignette);

    // Cinematic film grain (very subtle)
    float grain = (hash(uv * 1000.0 + t) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const AuroraField: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_clickAge: { value: 99 }, // Start "expired"
      u_clickPos: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [size.width, size.height]
  );

  // Smoothed values for cloud-like (slow) tracking of cursor.
  // Lower factor = slower trail = more "drift behind" feel.
  const dampedMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const dampedScroll = useRef(0);

  // Click state managed in refs so we can age it across frames
  const clickAgeRef = useRef(99);
  const clickPosRef = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    uniforms.u_time.value += delta;

    // Slower mouse damping — cloud-like trail (was delta * 4 in v1)
    const mouseLerp = Math.min(1, delta * 1.6);
    dampedMouse.current.x += (interactionState.mouseX - dampedMouse.current.x) * mouseLerp;
    dampedMouse.current.y += (interactionState.mouseY - dampedMouse.current.y) * mouseLerp;
    uniforms.u_mouse.value.set(dampedMouse.current.x, dampedMouse.current.y);

    // Scroll damping
    const scrollLerp = Math.min(1, delta * 3);
    dampedScroll.current += (interactionState.scroll - dampedScroll.current) * scrollLerp;
    uniforms.u_scroll.value = dampedScroll.current;

    // Consume any pending click trigger
    if (interactionState.hasPendingClick) {
      clickAgeRef.current = 0;
      clickPosRef.current.set(interactionState.pendingClickX, interactionState.pendingClickY);
      interactionState.hasPendingClick = false;
    }
    clickAgeRef.current += delta;
    uniforms.u_clickAge.value = clickAgeRef.current;
    uniforms.u_clickPos.value.copy(clickPosRef.current);

    uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} renderOrder={-100}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
};
