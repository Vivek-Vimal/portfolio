"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { MeshWobbleMaterial, Text } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Glitch,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import { UnrealBloomPass } from "three-stdlib";
import type { EffectComposer as EffectComposerImpl } from "postprocessing";

// // Extend Three.js with postprocessing
// extend({ EffectComposer, Bloom, Glitch, Noise, Vignette, UnrealBloomPass });

extend({ UnrealBloomPass });

const CyberpunkCanvas = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        opacity: 0.7,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 15], fov: 75 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <Scene dimensions={dimensions} />
    </Canvas>
  );
};

const Scene = ({
  dimensions,
}: {
  dimensions: { width: number; height: number };
}) => {
  const composer = useRef<EffectComposerImpl>(null);

  const scene = useRef<THREE.Group>(null);

  // Configure effects
  const bloomParams = {
    intensity: 1.2,
    radius: 0.85,
    threshold: 0.1,
  };

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#ff00f0" />

      <group ref={scene}>
        <QuantumField />
        <NeonGrid />
        <HolographicText />
        <FloatingOrbs count={20} />
        <DataStreams count={10} dimensions={dimensions} />
      </group>

      <EffectComposer ref={composer} multisampling={0}>
        <Bloom
          {...bloomParams}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        <Noise premultiply blendFunction={BlendFunction.ADD} />
        <Vignette darkness={0.9} offset={0.3} />
        <Glitch
          delay={new THREE.Vector2(1.5, 3.5)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.1, 0.2)}
          mode={GlitchMode.CONSTANT_MILD}
          active
        />
      </EffectComposer>
    </>
  );
};

// Quantum Field - Background particles with physics
const QuantumField = () => {
  const particles = useRef<THREE.Points>(null);
  const particleCount = 2000;

  useEffect(() => {
    if (particles.current) {
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        sizes[i] = Math.random() * 1.5;

        colors[i * 3] = Math.random() * 0.2 + 0.8; // R
        colors[i * 3 + 1] = Math.random() * 0.3; // G
        colors[i * 3 + 2] = Math.random() * 0.2 + 0.8; // B
      }

      particles.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particles.current.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      particles.current.geometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1)
      );
    }
  }, []);

  useFrame(({ clock }) => {
    if (particles.current) {
      const positions = particles.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(clock.getElapsedTime() + i) * 0.05;
        if (positions[i * 3 + 1] > 100) positions[i * 3 + 1] = -100;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial
        attach="material"
        size={0.5}
        sizeAttenuation={true}
        alphaTest={0.01}
        transparent
        vertexColors
      />
    </points>
  );
};

// Floating Orbs with improved instancing
const FloatingOrbs = ({ count }: { count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          Math.random() * 40 - 20,
          Math.random() * 40 - 20,
          Math.random() * 20 - 10
        );
        dummy.scale.setScalar(0.5 + Math.random() * 1.5);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        meshRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

        // Floating animation
        dummy.position.y +=
          Math.sin(clock.getElapsedTime() * 0.5 + i * 100) * 0.02;

        // Gentle rotation
        dummy.rotation.x += 0.01;
        dummy.rotation.y += 0.01;

        // Pulsing scale
        const scale = 0.8 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.2;
        dummy.scale.set(scale, scale, scale);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <MeshWobbleMaterial
        factor={1.5}
        speed={1}
        transparent
        opacity={0.85}
        color="#ffffff"
        emissive="#00f0ff"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
};

// Neon Grid with dynamic lighting
const NeonGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      material.color.setHSL(
        Math.sin(clock.getElapsedTime() * 0.1) * 0.1 + 0.5,
        0.8,
        0.6
      );
    }
  });

  return (
    <>
      <gridHelper
        ref={gridRef}
        args={[50, 50, "#00f0ff", "#00f0ff"]}
        position={[0, -10, -20]}
        rotation={[Math.PI / 4, 0, 0]}
      />
    </>
  );
};

// Holographic floating text
const HolographicText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
      (textRef.current.material as THREE.Material).opacity =
        0.7 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <Text
      ref={textRef}
      color="#00f0ff"
      fontSize={2}
      maxWidth={10}
      lineHeight={1}
      letterSpacing={0.1}
      textAlign="center"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
      position={[0, 5, 0]}
    >
      VIVEK VIMAL
      <meshStandardMaterial
        attach="material"
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </Text>
  );
};

// Data streams flowing through space
const DataStreams = ({
  count,
  dimensions,
}: {
  count: number;
  dimensions: { width: number; height: number };
}) => {
  const streams = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (streams.current) {
      streams.current.children.forEach((stream, i) => {
        stream.position.z = ((clock.getElapsedTime() * 2 + i * 5) % 30) - 15;
      });
    }
  });

  return (
    <group ref={streams}>
      {[...Array(count)].map((_, i) => (
        <DataStream
          key={i}
          position={[
            (Math.random() - 0.5) * dimensions.width * 0.1,
            (Math.random() - 0.5) * dimensions.height * 0.1,
            Math.random() * 30 - 15,
          ]}
          color={
            new THREE.Color(
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.3,
              Math.random() * 0.5 + 0.5
            )
          }
        />
      ))}
    </group>
  );
};

const DataStream = ({
  position,
  color,
}: {
  position: [number, number, number];
  color: THREE.Color;
}) => {
  const lineRef = useRef<THREE.Line>(null);

  // Memoize the points array to avoid recreating it on every render
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      pts.push(new THREE.Vector3(0, 0, i * -2));
    }
    return pts;
  }, []);

  // Memoize the geometry and material to avoid recreating them on every render
  const lineGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        linewidth: 1,
        transparent: true,
        opacity: 0.7,
      }),
    [color]
  );

  // Memoize the line object itself
  const line = useMemo(
    () => new THREE.Line(lineGeometry, lineMaterial),
    [lineGeometry, lineMaterial]
  );

  return <primitive object={line} ref={lineRef} position={position} />;
};

export default CyberpunkCanvas;
