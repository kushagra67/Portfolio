"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulation } from "@/store/useSimulation";

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const powerLevel = useSimulation((s) => s.powerLevel);

  const particlePositions = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 0.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const connectionPositions = useMemo(() => {
    const lines: number[] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 1.2;
      const theta2 = theta1 + (Math.random() - 0.5) * 1.2;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.8;
      const r2 = 1.2;
      lines.push(
        r1 * Math.sin(phi1) * Math.cos(theta1),
        r1 * Math.sin(phi1) * Math.sin(theta1),
        r1 * Math.cos(phi1),
        r2 * Math.sin(phi2) * Math.cos(theta2),
        r2 * Math.sin(phi2) * Math.sin(theta2),
        r2 * Math.cos(phi2)
      );
    }
    return new Float32Array(lines);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const power = powerLevel / 100;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      // Parallax tied to mouse
      meshRef.current.rotation.z = pointer.x * 0.1;
      meshRef.current.position.y = pointer.y * 0.15;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.x = Math.cos(t * 0.12) * 0.15;
    }

    if (glowRef.current) {
      const scale = 1.6 + Math.sin(t * 1.5) * 0.08 * power;
      glowRef.current.scale.setScalar(scale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 2) * 0.02 * power;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = t * 0.03;
    }
  });

  const glowIntensity = powerLevel / 100;

  return (
    <group>
      {/* Inner glowing core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshBasicMaterial
          color={new THREE.Color(0, 0.94, 1)}
          wireframe
          transparent
          opacity={0.15 * glowIntensity}
        />
      </mesh>

      {/* Outer wireframe sphere */}
      <lineSegments ref={wireRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connectionPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={new THREE.Color(0, 0.94, 1)}
          transparent
          opacity={0.25 * glowIntensity}
        />
      </lineSegments>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0, 0.94, 1)}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={new THREE.Color(0, 0.94, 1)}
          size={0.02}
          transparent
          opacity={0.6 * glowIntensity}
          sizeAttenuation
        />
      </points>

      {/* Second layer - magenta wireframe */}
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial
          color={new THREE.Color(0.94, 0, 1)}
          wireframe
          transparent
          opacity={0.06 * glowIntensity}
        />
      </mesh>
    </group>
  );
}

export function NeuralCore() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <CoreSphere />
      </Canvas>
    </div>
  );
}
