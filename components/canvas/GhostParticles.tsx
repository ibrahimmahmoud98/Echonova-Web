import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const count = 50;

export function GhostParticles() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();
  
  // Data for each particle: [x, y, z, age, lifeSpeed]
  const particles = useMemo(() => {
    const data = new Float32Array(count * 5);
    for (let i = 0; i < count; i++) {
        data[i * 5 + 3] = 100; // Age (start dead)
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const currentIdx = useRef(0);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Spawn new particle at mouse position every few frames or every frame
    const idx = currentIdx.current;
    
    // Convert normalized mouse to world coords at Z=0
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    // Reset dead particle
    particles[idx * 5] = x + (Math.random() - 0.5) * 0.2; // Jitter X
    particles[idx * 5 + 1] = y + (Math.random() - 0.5) * 0.2; // Jitter Y
    particles[idx * 5 + 2] = 0; // Z
    particles[idx * 5 + 3] = 0; // Age (0 to 1)
    particles[idx * 5 + 4] = 1.0 + Math.random(); // Decay speed

    currentIdx.current = (currentIdx.current + 1) % count;

    // Update all particles
    for (let i = 0; i < count; i++) {
        const offset = i * 5;
        let age = particles[offset + 3];

        if (age < 1.0) {
            age += delta * particles[offset + 4]; // Decay
            particles[offset + 3] = age;

            // Simple movement (drift up)
            particles[offset + 1] += delta * 0.5;

            const x = particles[offset];
            const y = particles[offset + 1];
            
            // Scale down as they age
            const scale = (1.0 - age) * 0.2; // Max size 0.2

            dummy.position.set(x, y, 0);
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.z += delta;
            dummy.updateMatrix();
            
            mesh.current.setMatrixAt(i, dummy.matrix);
            // We could update color here too if we used InstanceColor
        } else {
             // Hide dead particles
             dummy.scale.set(0,0,0);
             dummy.updateMatrix();
             mesh.current.setMatrixAt(i, dummy.matrix);
        }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.6} wireframe />
    </instancedMesh>
  );
}
