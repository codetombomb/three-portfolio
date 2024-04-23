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
  const shelf = useGLTF("./Shelf.glb");
  const desk = useGLTF("./Desk.glb");
  const monitor = useGLTF("./Monitor.glb");
  const openWindow = useGLTF("./OpenWindow.glb");
  const lamp = useGLTF("./Lamp.glb");
  const pyramidSpike = useGLTF("./dark-pyramid-spike.glb");

  const { shelfX, shelfY, shelfZ, rotateShelfY, shelfVisible } = useControls(
    "shelf",
    {
      shelfX: { value: -2, step: 0.01, min: -15, max: 15 },
      shelfY: { value: -1.66, step: 0.01, min: -15, max: 15 },
      shelfZ: { value: 0, step: 0.01, min: -15, max: 15 },
      rotateShelfY: { value: 2.61, step: 0.01, min: 0, max: 5 },
      shelfVisible: false,
    }
  );
  const { deskX, deskY, deskZ, rotateDeskY } = useControls("desk", {
    deskX: { value: 0, step: 0.01, min: -15, max: 15 },
    deskY: { value: 0, step: 0.01, min: -15, max: 15 },
    deskZ: { value: 0, step: 0.01, min: -15, max: 15 },
    rotateDeskY: { value: 4.16, step: 0.01, min: 0, max: 5 },
    visible: false,
  });
  const { monitorX, monitorY, monitorZ, rotateMonitorY, scaleMonitor } =
    useControls("monitor", {
      monitorX: { value: -0.79, step: 0.001, min: -15, max: 15 },
      monitorY: { value: 0.94, step: 0.001, min: -15, max: 15 },
      monitorZ: { value: -0.65, step: 0.001, min: -15, max: 15 },
      rotateMonitorY: { value: 0.25, step: 0.01, min: 0, max: 7 },
      scaleMonitor: { value: 2.34, step: 0.001, min: 0, max: 7 },
      visible: false,
    });
  const { workstationX, workstationY, workstationZ, workstationVisible } =
    useControls("workstation", {
      workstationX: { value: 1.22, step: 0.01, min: -15, max: 15 },
      workstationY: { value: -2.57, step: 0.01, min: -15, max: 15 },
      workstationZ: { value: -0.64, step: 0.01, min: -15, max: 15 },
      rotateWorkstationY: { value: 0, step: 0.001, min: 0, max: 5 },
      workstationVisible: false,
    });
  const { windowX, windowY, windowZ, windowScale, rotateWindowY } = useControls(
    "window",
    {
      windowX: { value: 1.04, step: 0.01, min: -15, max: 15 },
      windowY: { value: 2.59, step: 0.01, min: -15, max: 15 },
      windowZ: { value: 0.04, step: 0.01, min: -15, max: 15 },
      rotateWindowY: { value: 2.59, step: 0.001, min: 0, max: 5 },
      windowScale: { value: 0.52, min: 0, max: 4, step: 0.001 },
      visible: false,
    }
  );
  const { lampX, lampY, lampZ, scapleLamp, rotateLampY } = useControls("lamp", {
    lampX: { value: -1.2, step: 0.001, min: -15, max: 15 },
    lampY: { value: -1.3, step: 0.001, min: -15, max: 15 },
    lampZ: { value: -0.2, step: 0.001, min: -15, max: 15 },
    rotateLampY: { value: 2.0, step: 0.001, min: 0, max: 5 },
    scapleLamp: { value: 1.73, step: 0.001, min: 0, max: 4 },
    visible: false,
  });

  const {
    pyramidSpikeX,
    pyramidSpikeY,
    pyramidSpikeZ,
    scalePyramidSpike,
    rotatePyramidSpikeY,
    rotatePyramidSpikeX,
    rotatePyramidSpikeZ,
  } = useControls("pyramidSpike", {
    pyramidSpikeX: { value: 0, step: 0.001, min: -50, max: 50 },
    pyramidSpikeY: { value: 0, step: 0.001, min: -50, max: 50 },
    pyramidSpikeZ: { value: 0, step: 0.001, min: -50, max: 50 },
    rotatePyramidSpikeX: { value: 0, step: 0.001, min: -10, max: 5 },
    rotatePyramidSpikeY: {
      value: -Math.PI * 0.5,
      step: 0.001,
      min: -10,
      max: 5,
    },
    rotatePyramidSpikeZ: {
      value: -Math.PI * 0.5,
      step: 0.001,
      min: -10,
      max: 5,
    },
    scaplePyramidSpike: { value: 0.2, step: 0.001, min: 0, max: 4 },
  });

  const {
    wallX,
    wallY,
    wallZ,
    numSpikesX,
    numSpikesZ,
    spikeSpacingX,
    spikeSpacingY,
    spikeSpacingZ,
    wallRotationX,
    wallRotationY,
    wallRotationZ,
  } = useControls("wall", {
    wallX: { value: -10, step: 0.001, min: -50, max: 50 },
    wallY: { value: -10, step: 0.001, min: -50, max: 50 },
    wallZ: { value: -30, step: 0.001, min: -50, max: 50 },
    wallRotationX: { value: 0, step: 0.0001, min: -10, max: 10 },
    wallRotationY: { value: -0.3, step: 0.0001, min: -10, max: 10 },
    wallRotationZ: { value: -1.54, step: 0.0001, min: -10, max: 10 },
    numSpikesX: { value: 20, step: 2, min: 4, max: 100 },
    numSpikesZ: { value: 10, step: 2, min: 4, max: 100 },
    spikeSpacingX: { value: 4, step: 0.001, min: 0, max: 10 },
    spikeSpacingZ: { value: 4, step: 0.001, min: 0, max: 10 },
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

      <primitive
        position={[shelfX, shelfY, shelfZ]}
        rotation={[0, rotateShelfY, 0]}
        object={shelf.scene}
        visible={shelfVisible}
      ></primitive>
      <group
        name="workStation"
        position={[workstationX, workstationY, workstationZ]}
        visible={workstationVisible}
      >
        <primitive
          object={desk.scene}
          position={[deskX, deskY, deskZ]}
          rotation={[0, rotateDeskY, 0]}
          scale={[1, 1, 1.3]}
        ></primitive>
        <primitive
          object={monitor.scene}
          position={[monitorX, monitorY, monitorZ]}
          rotation={[0, rotateMonitorY, 0]}
          scale={scaleMonitor}
        ></primitive>
        <primitive
          object={openWindow.scene}
          position={[windowX, windowY, windowZ]}
          scale={windowScale}
          rotation={[0, rotateWindowY, 0]}
        ></primitive>
        <primitive
          object={lamp.scene}
          position={[lampX, lampY, lampZ]}
          rotation={[0, rotateLampY, 0]}
          scale={scapleLamp}
        />
      </group>
      <group name="spikeWall">
        {renderSpikes()}
        {/* <mesh
          scale={[5, 5, 5]}
          rotation={[wallRotationX, 0, 0]}
          position={[wallX, wallY, wallZ]}
        >
          <planeGeometry />
          <meshNormalMaterial />
        </mesh> */}
      </group>
    </>
  );
}

export default App;
