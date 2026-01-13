"use client";

import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

// --- Sentinel Morph Material ---
// This material handles the continuous morphing of the Sentinel object
// Inputs: uMorphProgress (0 -> 1 -> 2), uTime

const SentinelMaterial = shaderMaterial(
  {
    uTime: 0,
    uMorphProgress: 0,
    uColorA: new THREE.Color("#D97040"), // Copper
    uColorB: new THREE.Color("#FFD6A5"), // Ivory/Gold
    uNoiseScale: 2.0,
    uDisplacementStrength: 0.2
  },
  // Vertex Shader
  `
  uniform float uTime;
  uniform float uMorphProgress;
  uniform float uNoiseScale;
  uniform float uDisplacementStrength;

  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;
  varying vec3 vPos;
  
  // Perlin Noise Helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; 
      vec3 x3 = x0 - D.yyy;      
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857; 
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  // Attributes passed from Geometry (Morph Targets)
  // We expect attribute vec3 positionB (Torus) and positionC (Icosahedron)
  // But R3F shaderMaterial doesn't auto-define custom attributes.
  // We will declare them here.
  attribute vec3 positionTorus;
  attribute vec3 positionPyramid;
  attribute vec3 normalTorus;
  attribute vec3 normalPyramid;

  void main() {
    vUv = uv;
    
    // --- MORPH LOGIC ---
    vec3 targetPos = position; 
    vec3 targetNormal = normal;
    
    // 0 -> 1 : Sphere to Torus
    float t1 = smoothstep(0.0, 1.0, clamp(uMorphProgress, 0.0, 1.0));
    vec3 posStage1 = mix(position, positionTorus, t1);
    vec3 normStage1 = mix(normal, normalTorus, t1);
    
    // 1 -> 2 : Torus to Pyramid
    float t2 = smoothstep(1.0, 2.0, clamp(uMorphProgress, 1.0, 2.0));
    vec3 posStage2 = mix(posStage1, positionPyramid, t2);
    vec3 normStage2 = mix(normStage1, normalPyramid, t2);
    
    // Final Base Position
    vec3 newPos = posStage2;
    vec3 newNormal = normalize(normStage2);

    // --- NOISE DISPLACEMENT ---
    // Make it feel liquid/alive
    float noise = snoise(newPos * uNoiseScale + uTime * 0.5);
    vDisplacement = noise;
    
    // Displace along normal
    newPos += newNormal * noise * uDisplacementStrength * (1.0 - t2 * 0.5); // Less noise on pyramid

    vNormal = newNormal;
    vPos = newPos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    // Basic Iridescence / Metal feel
    vec3 viewDir = normalize(cameraPosition - vPos);
    vec3 normal = normalize(vNormal);
    
    // Fresnel
    float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
    
    // Color Mix based on displacement
    vec3 color = mix(uColorA, uColorB, vDisplacement * 0.5 + 0.5);
    
    // Add lighting punch
    color += fresnel * vec3(0.5, 0.8, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ SentinelMaterial });

export { SentinelMaterial };
