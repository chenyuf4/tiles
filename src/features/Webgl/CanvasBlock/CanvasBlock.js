import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "../Scene/Scene";
import * as THREE from "three";
const CanvasBlock = ({ scrollPosRef, pageStateRef }) => {
  return (
    <Canvas
      dpr={Math.max(window.devicePixelRatio, 2)}
      legacy={true}
      linear
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.NoToneMapping,
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          near={0.1}
          far={100}
          fov={75}
        />
        <color attach="background" args={["#151515"]} />
        <Scene scrollPosRef={scrollPosRef} pageStateRef={pageStateRef} />
      </Suspense>
    </Canvas>
  );
};

export default CanvasBlock;
