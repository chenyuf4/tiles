import { IMAGE_BLOCK_HEIGHT, IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "utils/format";
import { useTexture } from "@react-three/drei";
import "./ImagePlaneShaderMaterial";
import * as THREE from "three";
const geo = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
const ImagePlane = ({ imageUrl, index }) => {
  const defaultPos = index * (IMAGE_BLOCK_WIDTH + IMAGE_GAP);
  const [imgTex] = useTexture([imageUrl]);

  return (
    <mesh
      position={[defaultPos, 0, 0]}
      scale={[IMAGE_BLOCK_WIDTH, IMAGE_BLOCK_HEIGHT, 1]}
      geometry={geo}
    >
      <imagePlaneShaderMaterial
        boundary={5.5 * IMAGE_BLOCK_WIDTH + 4.5 * IMAGE_GAP}
        tex={imgTex}
      />
    </mesh>
  );
};

export default ImagePlane;
