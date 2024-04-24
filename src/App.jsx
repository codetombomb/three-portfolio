import {
  Environment,
  useGLTF,
  Float,
  OrbitControls,
  Instance,
  Instances,
} from "@react-three/drei";
import { useControls } from "leva";
import { AmbientLight, MeshNormalMaterial } from "three";

function App() {
  const pyramidSpike = useGLTF("./dark-pyramid-spike.glb");

  const { pyramidSpikeX, pyramidSpikeY, pyramidSpikeZ, scalePyramidSpike } =
    useControls("pyramidSpike", {
      pyramidSpikeX: { value: 0, step: 0.001, min: -50, max: 50 },
      pyramidSpikeY: { value: 0, step: 0.001, min: -50, max: 50 },
      pyramidSpikeZ: { value: 0, step: 0.001, min: -50, max: 50 },
      scaplePyramidSpike: { value: 0.2, step: 0.001, min: 0, max: 4 },
    });

  const {
    wallX,
    wallY,
    wallZ,
    numSpikesX,
    numSpikesZ,
    spikeSpacingX,
    spikeSpacingZ,
    wallRotationX,
    wallRotationY,
    wallRotationZ,
  } = useControls("wall", {
    wallX: { value: -10, step: 0.001, min: -50, max: 50 },
    wallY: { value: -10, step: 0.001, min: -50, max: 50 },
    wallZ: { value: -37.96, step: 0.001, min: -60, max: 50 },
    wallRotationX: { value: 0, step: 0.0001, min: -10, max: 10 },
    wallRotationY: { value: 0, step: 0.0001, min: -10, max: 10 },
    wallRotationZ: { value: -1.54, step: 0.0001, min: -10, max: 10 },
    numSpikesX: { value: 20, step: 2, min: 4, max: 100 },
    numSpikesZ: { value: 10, step: 2, min: 4, max: 100 },
    spikeSpacingX: { value: 4, step: 0.001, min: 0, max: 10 },
    spikeSpacingZ: { value: 4, step: 0.001, min: 0, max: 10 },
  });

  const {
    floorScaleX,
    floorScaleY,
    floorRotationY,
    floorPositionX,
    floorPositionY,
    floorPositionZ,
  } = useControls("floor", {
    floorScaleX: { value: 100, step: 0.001, min: -50, max: 50 },
    floorScaleY: { value: 100, step: 0.001, min: -50, max: 50 },
    floorRotationY: { value: Math.PI * 0.5, step: 0.001, min: 0, max: 10 },
    floorPositionX: { value: 13.35, step: 0.001, min: -50, max: 50 },
    floorPositionY: { value: -8.22, step: 0.001, min: -50, max: 50 },
    floorPositionZ: { value: -35, step: 0.001, min: -50, max: 50 },
  });

  const renderSpikes = () => {
    return (
      <Instances
        limit={numSpikesX * numSpikesZ}
        position={[wallX, wallY, wallZ]}
        scale={scalePyramidSpike}
        rotation={[wallRotationX, wallRotationY, wallRotationZ]}
      >
        <primitive
          object={pyramidSpike.nodes.Cube.geometry}
          attach="geometry"
        />
        <primitive
          object={pyramidSpike.nodes.Cube.material}
          attach="material"
        />
        {[...Array(numSpikesZ)].flatMap((_, i) =>
          [...Array(numSpikesX)].map((_, j) => (
            <Instance
              key={`${i}-${j}`}
              position={[
                (i - numSpikesX / 2) * spikeSpacingX + pyramidSpikeX,
                pyramidSpikeY,
                (j - numSpikesZ / 2) * spikeSpacingZ + pyramidSpikeZ,
              ]}
            />
          ))
        )}
      </Instances>
    );
  };
  return (
    <>
      <Environment preset="apartment" />
      <OrbitControls makeDefault scale={[4, 0, 0]} />

      <ambientLight />

      <group name="spikeWall">
        {renderSpikes()}

        <mesh
          scale={[floorScaleX, floorScaleY]}
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
