import {
  Environment,
  useGLTF,
  Float,
  OrbitControls,
  Instance,
  Instances,
  PerspectiveCamera,
} from "@react-three/drei";
import { useControls } from "leva";
import { AmbientLight, MeshNormalMaterial } from "three";
import SpikeWall from "./components/SpikeWall";
import { Suspense } from "react";

function App() {
  const pyramidSpike = useGLTF("./dark-pyramid-spike.glb");

  // const { pyramidSpikeX, pyramidSpikeY, pyramidSpikeZ, scalePyramidSpike } =
  //   useControls("pyramidSpike", {
  //     pyramidSpikeX: { value: 0, step: 0.001, min: -50, max: 50 },
  //     pyramidSpikeY: { value: 0, step: 0.001, min: -50, max: 50 },
  //     pyramidSpikeZ: { value: 0, step: 0.001, min: -50, max: 50 },
  //     scaplePyramidSpike: { value: 0.2, step: 0.001, min: 0, max: 4 },
  //   });

  // const {
  //   wallX,
  //   wallY,
  //   wallZ,
  //   numSpikesX,
  //   numSpikesZ,
  //   spikeSpacingX,
  //   spikeSpacingZ,
  //   wallRotationX,
  //   wallRotationY,
  //   wallRotationZ,
  // } = useControls("wall", {
  //   wallX: { value: 18.05, step: 0.001, min: -50, max: 50 },
  //   wallY: { value: -4.0, step: 0.001, min: -50, max: 50 },
  //   wallZ: { value: -38.5, step: 0.001, min: -60, max: 50 },
  //   wallRotationX: { value: 0, step: 0.0001, min: -10, max: 10 },
  //   wallRotationY: { value: -Math.PI / 2, step: 0.0001, min: -10, max: 10 },
  //   wallRotationZ: { value: -Math.PI / 2, step: 0.0001, min: -10, max: 10 },
  //   numSpikesX: { value: 20, step: 2, min: 4, max: 100 },
  //   numSpikesZ: { value: 10, step: 2, min: 4, max: 100 },
  //   spikeSpacingX: { value: 4, step: 0.001, min: 0, max: 10 },
  //   spikeSpacingZ: { value: 4, step: 0.001, min: 0, max: 10 },
  // });

  const {
    floorScaleX,
    floorScaleY,
    floorScaleZ,
    floorRotationY,
    floorPositionX,
    floorPositionY,
    floorPositionZ,
  } = useControls("floor", {
    floorScaleX: { value: 80.0, step: 0.001, min: -100, max: 100 },
    floorScaleY: { value: 80.0, step: 0.001, min: -100, max: 100 },
    floorScaleZ: { value: 80.0, step: 0.001, min: -100, max: 100 },
    floorRotationY: { value: Math.PI * 0.5, step: 0.001, min: 0, max: 10 },
    floorPositionX: { value: 0, step: 0.001, min: -50, max: 50 },
    floorPositionY: { value: -2, step: 0.001, min: -50, max: 50 },
    floorPositionZ: { value: 0, step: 0.001, min: -50, max: 50 },
  });

  return (
    <>
      <Environment preset="apartment" />
      <PerspectiveCamera makeDefault position={[-5, 10, 15]} fov={100} />
      <OrbitControls target={[0, 0, 0]} />

      <ambientLight />

      <group name="spikeWall">
        {/* {renderSpikes()} */}

        <SpikeWall
          pyramidSpike={pyramidSpike}
          numSpikesX={20}
          numSpikesZ={10}
          wallX={38.5}
          wallY={-4.0}
          wallZ={18}
          scalePyramidSpike={1}
          wallRotationX={0}
          wallRotationY={Math.PI}
          wallRotationZ={-Math.PI / 2}
          spikeSpacingX={4}
          spikeSpacingZ={4}
          pyramidSpikeX={0}
          pyramidSpikeY={0}
          pyramidSpikeZ={0}
        />
        <SpikeWall
          pyramidSpike={pyramidSpike}
          numSpikesX={20}
          numSpikesZ={10}
          wallX={18.05}
          wallY={-4.0}
          wallZ={-38.5}
          scalePyramidSpike={1}
          wallRotationX={0}
          wallRotationY={-Math.PI / 2}
          wallRotationZ={-Math.PI / 2}
          spikeSpacingX={4}
          spikeSpacingZ={4}
          pyramidSpikeX={0}
          pyramidSpikeY={0}
          pyramidSpikeZ={0}
        />

        <mesh
          scale={[floorScaleX, floorScaleY, floorScaleZ]}
          rotation={[-Math.PI * 0.5, 0, floorRotationY]}
          position={[floorPositionX, floorPositionY, floorPositionZ]}
        >
          <planeGeometry />
          <meshNormalMaterial />
        </mesh>
      </group>
    </>
  );
}

export default App;
