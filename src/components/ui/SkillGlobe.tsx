"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera, Image } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const SKILLS = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Machine Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "System Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];


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

interface SkillItemProps {
  children: React.ReactNode
  icon: string
  position: THREE.Vector3
  fontSize: number
}

function SkillItem({ children, icon, position, fontSize }: SkillItemProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const color = hovered ? "#ffffff" : "#aaaaaa";
  const scale = hovered ? 1.2 : 1;

  return (
    <group 
      ref={groupRef} 
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Image 
        url={icon}
        transparent
        // @ts-ignore
        scale={[2, 2]}
        position={[0, 1.2, 0]}
        color={hovered ? "#ffffff" : "#cccccc"}
        alt="skill icon"
      />
      <Text
        position={[0, -0.5, 0]}
        fontSize={fontSize} 
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    </group>
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

    return SKILLS.map((item, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const yPos = y * radius;

      return {
        ...item,
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
        <SkillItem 
          key={idx} 
          position={item.position} 
          icon={item.icon}
          fontSize={radius * 0.05}
        >
          {item.name}
        </SkillItem>
      ))}
    </group>
  );
}

export default function SkillGlobe() {
  /* FOV 60 fills ~70% view height at distance 40 */
  const globeRadius = 18;

  const cameraPosition: [number, number, number] = [0, 0, 40];

  return (
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
      
      <div className="absolute top-4 left-4 text-white text-xs font-mono tracking-wider opacity-70 z-10 pointer-events-none">
        Interactive 3D Skills
      </div>
    </div>
  );
}
