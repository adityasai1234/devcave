"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Define the skills to display
const SKILLS = [
  "TypeScript",
  "Python",
  "Machine Learning",
  "C++",
  "React",
  "Next.js",
  "Tailwind",
  "Three.js",
  "Git",
  "Node.js",
  "System Design",
];

interface SkillTextProps {
  children: React.ReactNode
  position: THREE.Vector3
}

function SkillText({ children, position }: SkillTextProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    // Make text always face the camera (billboarding)
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  // Visual config
  const color = hovered ? "#00f3ff" : "white";
  const scale = hovered ? 1.2 : 1;

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.25}
      color={color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[scale, scale, scale]}
    >
      {children}
    </Text>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3;

  // Auto-rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Calculate positions
  const skillPositions = useMemo(() => {
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle for distribution

    return SKILLS.map((skill, i) => {
      // Distribute points evenly on a sphere (Fibonacci Sphere)
      const y = 1 - (i / (SKILLS.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      // We map this distribution to the User's formula convention:
      // However, to keep Y as up in Three.js, we assume the user's "z = radius * cos(phi)"
      // effectively meant "vertical axis". In Three.js, Y is vertical.
      // So we will swap the user's Z formula to Y, and X/Y to X/Z for standard orientation.
      // BUT, to strictly follow the prompt's request for the specific formula:
      // x = r * sin(phi) * cos(theta)
      // y = r * sin(phi) * sin(theta)
      // z = r * cos(phi)
      // This results in Z being the vertical pole.

      // Let's use the standard even distribution math directly:
      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const yPos = y * radius; // This corresponds to 'z' in the user formula if we map vertical to Z

      // The user wants the specific formula used.
      // Let's interpret phi as the angle from the Y axis (0 to PI) for standard Three.js
      // x = r sin(phi) cos(theta)
      // z = r sin(phi) sin(theta)
      // y = r cos(phi)
      // This is the standard 3D graphics "Y-up" spherical coord system.
      // I will proceed with this mapping to ensure the globe sits upright.

      return {
        skill,
        position: new THREE.Vector3(x, yPos, z),
      };
    });
  }, [radius]);

  return (
    <group ref={groupRef}>
      {/* Central Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          color="white"
          wireframe={true}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Internal Glow Light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#00f3ff"
        distance={radius * 1.5}
      />

      {/* Skills Labels */}
      {skillPositions.map((item, idx) => (
        <SkillText key={idx} position={item.position}>
          {item.skill}
        </SkillText>
      ))}
    </group>
  );
}

export default function SkillGlobe() {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />

        {/* The Globe */}
        <Globe />

        {/* Starfield Background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Orbit Controls (No Zoom) */}
        <OrbitControls enableZoom={false} autoRotate={false} />

        {/* Post-Processing: Bloom */}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={2.0}
            mipmapBlur={false}
          />
        </EffectComposer>
      </Canvas>
      <div className="absolute bottom-4 right-4 text-white text-xs opacity-50">
        Interactive 3D Skills
      </div>
    </div>
  );
}
