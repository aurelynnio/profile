'use client';

import React, {
  useRef,
  Suspense,
  useMemo,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  useGLTF,
  Environment,
  ContactShadows,
  Center,
  Html,
  OrbitControls,
} from '@react-three/drei';
import { Group } from 'three';
import { useInView } from 'framer-motion';

const Loader = () => {
  return (
    <Html center>
      <div className="text-stone-400 text-xs font-serif animate-pulse whitespace-nowrap">
        ...
      </div>
    </Html>
  );
};

const CustomModel: React.FC<{ url: string }> = ({
  url,
}) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<Group>(null);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if ((child as any).isMesh) {
        (child as any).castShadow = true;
        (child as any).receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return (
    <primitive
      ref={meshRef}
      object={clonedScene}
      scale={0.4}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
};

const ScholarRock: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: '100px',
  });

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[600px] h-[400px] mx-auto overflow-hidden rounded-3xl border border-stone-200/50 dark:border-stone-800/30 bg-stone-100/5 dark:bg-stone-900/10 backdrop-blur-sm shadow-xl transition-all duration-500 relative group"
    >
      <Canvas
        shadows
        className="pointer-events-none"
        camera={{
          position: [6, 5, 8],
          fov: 22,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          stencil: false,
          depth: true,
        }}
        frameloop={isInView ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2.5}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-5, 10, -5]}
          intensity={2}
          color="#ffffff"
          angle={0.5}
          penumbra={1}
          castShadow
        />

        <Environment preset="studio" />

        <Suspense fallback={<Loader />}>
          <Float
            speed={1.5}
            rotationIntensity={0.1}
            floatIntensity={0.2}
            floatingRange={[-0.05, 0.05]}
            position={[0, 0.2, 0]}
          >
            <Center>
              <CustomModel url="/computer.glb" />
            </Center>
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={1.5}
          resolution={256}
          color="#000000"
          frames={1}
        />

        <OrbitControls
          makeDefault
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
          Automated Showcase
        </p>
      </div>
    </div>
  );
};

export default ScholarRock;

useGLTF.preload('/computer.glb');
