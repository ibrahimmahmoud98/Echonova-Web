import { Object3DNode, MaterialNode } from "@react-three/fiber";
import { SentinelMaterial } from "@/components/3d/materials/SentinelMaterial";
import { LiquidMaterial } from "@/components/ui/LiquidCard"; // Note: LiquidMaterial is not exported from LiquidCard currently, need to export it or move it

declare module "@react-three/fiber" {
  interface ThreeElements {
    sentinelMaterial: Object3DNode<THREE.ShaderMaterial, typeof SentinelMaterial>;
    liquidMaterial: Object3DNode<THREE.ShaderMaterial, typeof LiquidMaterial>;
  }
}
