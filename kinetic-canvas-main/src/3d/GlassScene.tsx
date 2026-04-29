import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function GlassObjects() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.1;
  });
  return (
    <group ref={group}>
      <Float speed={1} floatIntensity={1.4} rotationIntensity={0.6}>
        <mesh position={[-1.6, 0.4, 0]}>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <MeshTransmissionMaterial thickness={0.6} roughness={0.05} transmission={1} ior={1.4} chromaticAberration={0.05} backside color="#a78bfa" />
        </mesh>
      </Float>
      <Float speed={1.3} floatIntensity={1.2} rotationIntensity={0.8}>
        <mesh position={[1.6, -0.2, -0.5]}>
          <torusGeometry args={[0.65, 0.22, 32, 100]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
        </mesh>
      </Float>
      <Float speed={0.8} floatIntensity={1} rotationIntensity={0.4}>
        <mesh position={[0.2, 1.2, -1]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#e879f9" emissive="#e879f9" emissiveIntensity={0.4} roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export function GlassScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-4, -2, 3]} intensity={1} color="#22d3ee" />
        <GlassObjects />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
