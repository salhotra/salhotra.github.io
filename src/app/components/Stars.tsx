import * as THREE from "three";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// import * as random from 'maath/random/dist/maath-random.esm'
import * as random from "maath/random";

interface Props {
  count?: number;
  color?: string;
  size?: number;
}
export default function StarsInCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={<span>Loading...</span>}>
        <Stars />
      </Suspense>
    </Canvas>
  );
}

function Stars(props: Props) {
  const ref = useRef<THREE.Points | null>(null);
  const [sphere] = useState(() =>
    Float32Array.from(random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}