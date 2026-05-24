"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box() {
  const ref = useRef<any>();
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
}
