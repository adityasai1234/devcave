"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, PerspectiveCamera } from "@react-three/drei";
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
  fontSize: number
}

function SkillText({ children, position, fontSize }: SkillTextProps) {
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
      fontSize={fontSize} // Dynamic font size
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

function Globe({ radius }: { radius: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Auto-rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Calculate positions
  const skillPositions = useMemo(() => {
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return SKILLS.map((skill, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const yPos = y * radius;

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
          opacity={0.15}
        />
      </mesh>

      {/* Internal Glow Light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#00f3ff"
        distance={radius * 1.5}
      />

      {/* Skills Labels - Scale text relative to radius */}
      {skillPositions.map((item, idx) => (
        <SkillText key={idx} position={item.position} fontSize={radius * 0.05}>
          {item.skill}
        </SkillText>
      ))}
    </group>
  );
}

export default function SkillGlobe() {
  const globeRadius = 11; // Defined centrally
  // Camera Distance: closer relative to radius to fill screen
  const cameraZ = globeRadius * 1.8; 

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={50} />
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />

        {/* The Globe */}
        <Globe radius={globeRadius} />

        {/* Starfield Background */}
        <Stars
          radius={150}
          depth={50}
          count={7000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Orbit Controls (Zoom enabled) */}
        <OrbitControls 
          enableZoom={true} 
          autoRotate={false} 
          enablePan={false}
          minDistance={globeRadius * 1.2} 
          maxDistance={globeRadius * 3} 
        />

        {/* Post-Processing: Bloom */}
        <EffectComposer disableNormalPass={true} multisampling={0}>
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
