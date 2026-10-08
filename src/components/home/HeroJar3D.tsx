import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function useLabelTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#f3e7d3";
    g.fillRect(0, 0, 1024, 256);
    g.strokeStyle = "#a4472c";
    g.lineWidth = 3;
    g.strokeRect(10, 14, 1004, 228);
    g.fillStyle = "#3a2418";
    g.textAlign = "center";
    g.font = "600 70px Fraunces, Georgia, serif";
    g.fillText("M·Aai", 256, 120);
    g.font = "40px 'Tiro Devanagari Marathi', serif";
    g.fillStyle = "#a4472c";
    g.fillText("कैरीचे लोणचे", 256, 190);
    g.font = "600 22px Manrope, sans-serif";
    g.fillStyle = "#3a2418";
    g.fillText("SMALL BATCH · PUNE", 768, 140);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
}

function Jar() {
  const group = useRef<THREE.Group>(null);
  const label = useLabelTexture();
  const glassPts = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const profile: [number, number][] = [[0, -1.2], [0.9, -1.2], [1.02, -1.08], [1.05, -0.6], [1.05, 0.6], [1.0, 0.85], [0.82, 1.0], [0.8, 1.15]];
    profile.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
    return pts;
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    const d = Math.min(dt, 0.05);
    const tx = state.pointer.y * 0.12;
    const ty = state.pointer.x * 0.35 + state.clock.elapsedTime * 0.08;
    group.current.rotation.x += (tx - group.current.rotation.x) * (1 - Math.exp(-3 * d));
    group.current.rotation.y += (ty - group.current.rotation.y) * (1 - Math.exp(-3 * d));
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={group}>
      {/* pickle contents */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.98, 0.95, 1.85, 48]} />
        <meshStandardMaterial color="#8a2a12" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* glass */}
      <mesh>
        <latheGeometry args={[glassPts, 64]} />
        <meshPhysicalMaterial color="#fff6e8" transparent opacity={0.28} roughness={0.05} metalness={0} clearcoat={1} side={THREE.DoubleSide} />
      </mesh>
      {/* label band */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.065, 1.065, 0.9, 64, 1, true]} />
        <meshStandardMaterial map={label} roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* brass lid */}
      <mesh position={[0, 1.27, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.3, 64]} />
        <meshStandardMaterial color="#b88a3e" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* cloth tie */}
      <mesh position={[0, 1.13, 0]}>
        <torusGeometry args={[0.85, 0.035, 12, 64]} />
        <meshStandardMaterial color="#c2552f" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function HeroJar3D() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.6, 5.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={2.2} color="#ffe4c2" />
      <directionalLight position={[-4, 1, -2]} intensity={0.6} color="#c9d8b6" />
      <Jar />
      <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={6} blur={2.4} far={2} color="#3a2418" />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.2} color="#ffd8a8" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={0.8} color="#ffffff" position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
