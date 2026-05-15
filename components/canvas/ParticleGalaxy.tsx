"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleGalaxy — a slow-rotating galaxy of ~5000 particles in copper/champagne
 * tones. Drives the immersive Hero behind the headline.
 *
 * Behaviour:
 *  • Spiral arms generated at mount; each particle has a random twin offset for life-like jitter.
 *  • Constant slow rotation around the Y-axis (subtle, not dizzying).
 *  • Mouse position softly attracts particles within a radius (cursor as gravity well).
 *  • Scroll progress dollies the camera forward through the galaxy and accelerates rotation.
 *  • Custom ShaderMaterial with additive blending — particles glow on their own.
 */

const PARTICLE_COUNT = 5000;
const SPIRAL_ARMS = 3;
const GALAXY_RADIUS = 12;
const SPIN_FACTOR = 1.4;
const RANDOMNESS = 0.55;
const THICKNESS = 1.6;

const galaxyState = {
  mouseX: 0.5,
  mouseY: 0.5,
  scroll: 0,
};

if (typeof window !== "undefined") {
  const w = window as unknown as { __ens_galaxy_listener_attached?: boolean };
  if (!w.__ens_galaxy_listener_attached) {
    w.__ens_galaxy_listener_attached = true;
    window.addEventListener(
      "mousemove",
      (e) => {
        galaxyState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        galaxyState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
      },
      { passive: true }
    );
    window.addEventListener(
      "scroll",
      () => {
        const max = window.innerHeight * 1.2; // Most effect happens in first viewport
        galaxyState.scroll = Math.min(1, window.scrollY / max);
      },
      { passive: true }
    );
  }
}

const vertexShader = /* glsl */ `
  precision highp float;

  attribute float aRandom;
  attribute float aRadius;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uPixelRatio;
  uniform float uSize;

  varying float vAlpha;
  varying float vRadius;

  void main() {
    vec3 pos = position;

    // Slow rotation around Y, accelerated slightly by scroll
    float rotSpeed = 0.07 + uScroll * 0.10;
    float ang = uTime * rotSpeed + aRandom * 6.283;
    float ca = cos(ang * 0.04);
    float sa = sin(ang * 0.04);
    vec2 rotated = vec2(pos.x * ca - pos.z * sa, pos.x * sa + pos.z * ca);
    pos.x = rotated.x;
    pos.z = rotated.y;

    // Vertical wobble — life-like drift
    pos.y += sin(uTime * 0.3 + aRandom * 6.283) * 0.12;

    // Mouse attraction — particles within radius shift gently toward cursor
    vec3 cursorWorld = vec3(uMouse.x * 6.0, uMouse.y * 4.0, 0.0);
    vec3 toCursor = cursorWorld - pos;
    float dCursor = length(toCursor);
    float attraction = smoothstep(4.0, 0.0, dCursor) * 0.35;
    pos += normalize(toCursor + 1e-4) * attraction;

    // Camera-z dolly via scroll
    pos.z += uScroll * 6.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size: closer particles bigger; randomness gives variety
    float sizeBase = uSize * (0.6 + aRandom * 0.9);
    gl_PointSize = sizeBase * uPixelRatio * (200.0 / max(0.01, -mvPosition.z));

    vAlpha = 0.4 + aRandom * 0.6;
    vRadius = aRadius;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColorInner;
  uniform vec3 uColorMid;
  uniform vec3 uColorOuter;

  varying float vAlpha;
  varying float vRadius;

  void main() {
    // Round, soft particle
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Soft falloff with hot core
    float core = smoothstep(0.5, 0.0, dist);
    float halo = pow(core, 2.5);

    // Color by radial distance in galaxy
    float t = clamp(vRadius / 12.0, 0.0, 1.0);
    vec3 col;
    if (t < 0.5) {
      col = mix(uColorInner, uColorMid, t * 2.0);
    } else {
      col = mix(uColorMid, uColorOuter, (t - 0.5) * 2.0);
    }

    gl_FragColor = vec4(col, halo * vAlpha);
  }
`;

export const ParticleGalaxy: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { gl } = useThree();

  // Build geometry once
  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const randoms = new Float32Array(PARTICLE_COUNT);
    const radii = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Radius distributed sqrt-style for center clustering
      const radius = Math.sqrt(Math.random()) * GALAXY_RADIUS;
      const armIndex = i % SPIRAL_ARMS;
      const branchAngle = (armIndex / SPIRAL_ARMS) * Math.PI * 2;
      const spinAngle = radius * SPIN_FACTOR;

      // Random offset, biased to be more on outer arms
      const randomX =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;
      const randomY =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * THICKNESS;
      const randomZ =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      randoms[i] = Math.random();
      radii[i] = radius;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
    return geo;
  }, []);

  // Build material once
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
          uPixelRatio: { value: Math.min(2, gl.getPixelRatio()) },
          uSize: { value: 18 },
          // Inner = hot copper, mid = electric copper, outer = champagne
          uColorInner: { value: new THREE.Color("#FFCDA0") },
          uColorMid: { value: new THREE.Color("#D97040") },
          uColorOuter: { value: new THREE.Color("#FFD6A5") },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [gl]
  );

  // Damped state for smooth interaction
  const dampedMouse = useRef(new THREE.Vector2(0, 0));
  const dampedScroll = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const m = material.uniforms;

    m.uTime.value += delta;

    // Mouse damping (slow follow for galactic feel)
    const lerp = Math.min(1, delta * 1.4);
    dampedMouse.current.x += (galaxyState.mouseX - dampedMouse.current.x) * lerp;
    dampedMouse.current.y += (galaxyState.mouseY - dampedMouse.current.y) * lerp;
    m.uMouse.value.copy(dampedMouse.current);

    dampedScroll.current += (galaxyState.scroll - dampedScroll.current) * Math.min(1, delta * 3);
    m.uScroll.value = dampedScroll.current;

    // Slow tilt + rotation for parallax (independent of shader rotation)
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(m.uTime.value * 0.05) * 0.08;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
};
