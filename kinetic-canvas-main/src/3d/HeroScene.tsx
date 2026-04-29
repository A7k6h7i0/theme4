import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { usePointer } from "@/hooks/usePointer";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const pointer = usePointer();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.15 + pointer.current.x * 0.6;
      ref.current.rotation.x = pointer.current.y * 0.4;
      ref.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3;
      inner.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere ref={ref} args={[1.4, 128, 128]}>
          <MeshDistortMaterial
            color="#7c3aed"
            distort={0.45}
            speed={1.6}
            roughness={0.05}
            metalness={0.9}
            emissive="#4c1d95"
            emissiveIntensity={0.4}
          />
        </Sphere>
        <Sphere ref={inner} args={[1.55, 64, 64]}>
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
        </Sphere>
      </Float>

      {/* satellites */}
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={1} floatIntensity={1.2}>
          <mesh position={[Math.cos((i / 3) * Math.PI * 2) * 2.6, Math.sin(i) * 0.6, Math.sin((i / 3) * Math.PI * 2) * 1.5]}>
            <icosahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color={i === 0 ? "#22d3ee" : i === 1 ? "#e879f9" : "#a78bfa"} emissive={i === 0 ? "#22d3ee" : i === 1 ? "#e879f9" : "#a78bfa"} emissiveIntensity={0.8} roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig() {
  const pointer = usePointer();
  useFrame((state) => {
    state.camera.position.x += (pointer.current.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-pointer.current.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0a0612"]} />
        <fog attach="fog" args={["#0a0612", 6, 14]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-5, -3, 4]} intensity={1} color="#22d3ee" />
        <pointLight position={[0, -5, -4]} intensity={0.6} color="#e879f9" />
        <Stars radius={50} depth={30} count={1500} factor={3} fade speed={0.5} />
        <Orb />
        <Environment preset="night" />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
