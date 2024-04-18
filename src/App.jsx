import { Environment, useGLTF, Float, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

function App() {
  const shelf = useGLTF("./Shelf.glb");
  const desk = useGLTF("./Desk.glb");
  const monitor = useGLTF("./Monitor.glb");
  const openWindow = useGLTF("./OpenWindow.glb");
  const lamp = useGLTF("./Lamp.glb");

  const { shelfX, shelfY, shelfZ, rotateShelfY } = useControls("shelf", {
    shelfX: { value: -2, step: 0.01, min: -15, max: 15 },
    shelfY: { value: -1.66, step: 0.01, min: -15, max: 15 },
    shelfZ: { value: 0, step: 0.01, min: -15, max: 15 },
    rotateShelfY: { value: 2.61, step: 0.01, min: 0, max: 5 },
  });
  const { deskX, deskY, deskZ, rotateDeskY } = useControls("desk", {
    deskX: { value: 0, step: 0.01, min: -15, max: 15 },
    deskY: { value: 0, step: 0.01, min: -15, max: 15 },
    deskZ: { value: 0, step: 0.01, min: -15, max: 15 },
    rotateDeskY: { value: 4.16, step: 0.01, min: 0, max: 5 },
  });
  const { monitorX, monitorY, monitorZ, rotateMonitorY, scaleMonitor } =
    useControls("monitor", {
      monitorX: { value: -0.79, step: 0.001, min: -15, max: 15 },
      monitorY: { value: 0.94, step: 0.001, min: -15, max: 15 },
      monitorZ: { value: -0.65, step: 0.001, min: -15, max: 15 },
      rotateMonitorY: { value: 0.25, step: 0.01, min: 0, max: 7 },
      scaleMonitor: { value: 2.34, step: 0.001, min: 0, max: 7 },
    });
  const { workstationX, workstationY, workstationZ } = useControls(
    "workstation",
    {
      workstationX: { value: 1.22, step: 0.01, min: -15, max: 15 },
      workstationY: { value: -2.57, step: 0.01, min: -15, max: 15 },
      workstationZ: { value: -0.64, step: 0.01, min: -15, max: 15 },
      rotateWorkstationY: { value: 0, step: 0.001, min: 0, max: 5 },
    }
  );
  const { windowX, windowY, windowZ, windowScale, rotateWindowY } = useControls(
    "window",
    {
      windowX: { value: 1.04, step: 0.01, min: -15, max: 15 },
      windowY: { value: 2.59, step: 0.01, min: -15, max: 15 },
      windowZ: { value: 0.04, step: 0.01, min: -15, max: 15 },
      rotateWindowY: { value: 2.59, step: 0.001, min: 0, max: 5 },
      windowScale: { value: 0.52, min: 0, max: 4, step: 0.001 },
    }
  );
  const { lampX, lampY, lampZ, scapleLamp, rotateLampY } = useControls("lamp", {
    lampX: { value: -1.2, step: 0.001, min: -15, max: 15 },
    lampY: { value: -1.3, step: 0.001, min: -15, max: 15 },
    lampZ: { value: -0.2, step: 0.001, min: -15, max: 15 },
    rotateLampY: { value: 2.0, step: 0.001, min: 0, max: 5 },
    scapleLamp: { value: 1.73, step: 0.001, min: 0, max: 4, step: 0.001 },
  });
  return (
    <>
      <Environment preset="apartment" />
      <OrbitControls makeDefault />

      <primitive
        position={[shelfX, shelfY, shelfZ]}
        rotation={[0, rotateShelfY, 0]}
        object={shelf.scene}
      ></primitive>
      <group
        name="workStation"
        position={[workstationX, workstationY, workstationZ]}
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
    </>
  );
}

export default App;
