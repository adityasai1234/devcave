"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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

// Logic Check: Particle math matches (Math.random() - 0.5) * 2000
// Logic Check: Count increased to 10,000
function FallingStars({ count = 10000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [dummy] = useState(() => new THREE.Object3D());
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Expanded particle volume as requested
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000; 
      const z = (Math.random() - 0.5) * 2000; 
      const speed = Math.random() * 0.4 + 0.1;
      const size = Math.random() * 0.4 + 0.1;
      temp.push({ x, y, z, speed, size });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      particle.y -= particle.speed;
      
      // Reset to top if too low - matching the large volume
      if (particle.y < -1000) {
        particle.y = 1000;
        particle.x = (Math.random() - 0.5) * 2000; 
        particle.z = (Math.random() - 0.5) * 2000; 
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(particle.size, particle.size, particle.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

interface SkillTextProps {
  children: React.ReactNode
  position: THREE.Vector3
  fontSize: number
}

function SkillText({ children, position, fontSize }: SkillTextProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  const color = hovered ? "#ffffff" : "#aaaaaa";
  const scale = hovered ? 1.2 : 1;

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize} 
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

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const skillPositions = useMemo(() => {
    const phiSpan = Math.PI * (3 - Math.sqrt(5));

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
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#ffffff"
        distance={radius * 1.5}
      />

      {skillPositions.map((item, idx) => (
        <SkillText key={idx} position={item.position} fontSize={radius * 0.05}>
          {item.skill}
        </SkillText>
      ))}
    </group>
  );
}

export default function SkillGlobe() {
  // Logic Check: FOV calculated roughly to fill 60-70% height
  // With Radius 18 and Distance 40:
  // tan(FOV/2) = (height/2) / distance
  // height = 2 * distance * tan(FOV/2)
  // At FOV 60, height at distance 40 is ~46 units. 
  // Globe diameter 36 fits nicely within 46 (approx 78% of view height).
  const globeRadius = 18;
  const cameraPosition: [number, number, number] = [0, 0, 40];

  return (
    // Logic Check: Container uses height: 100vh and width: 100vw
    <div 
      className="relative block" 
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <Canvas className="block w-full h-full">
        <PerspectiveCamera makeDefault position={cameraPosition} fov={60} />
        <ambientLight intensity={0.5} />

        <Globe radius={globeRadius} />

        <FallingStars count={10000} />

        <OrbitControls 
          enableZoom={true} 
          autoRotate={false} 
          enablePan={false}
          minDistance={globeRadius * 1.1} 
          maxDistance={globeRadius * 4} 
        />

        <EffectComposer disableNormalPass={true} multisampling={0}>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={1.0}
            mipmapBlur={false}
          />
        </EffectComposer>
      </Canvas>
      
      {/* Logic Check: Text at top-left */}
      <div className="absolute top-4 left-4 text-white text-xs font-mono tracking-wider opacity-70 z-10 pointer-events-none">
        Interactive 3D Skills
      </div>
    </div>
  );
}
