import { Instance, Instances } from "@react-three/drei";

export default function SpikeWall(
  pyramidSpike,
  numSpikesX,
  numSpikesZ,
  wallX,
  wallY,
  wallZ,
  scalePyramidSpike,
  wallRotationX,
  wallRotationY,
  wallRotationZ,
  spikeSpacingX,
  spikeSpacingZ,
  pyramidSpikeX,
  pyramidSpikeY,
  pyramidSpikeZ
) {
  console.log(pyramidSpike);
  return (
    <Instances
      limit={numSpikesX * numSpikesZ}
      position={[wallX, wallY, wallZ]}
      scale={scalePyramidSpike}
      rotation={[wallRotationX, wallRotationY, wallRotationZ]}
    >
      <primitive
        object={pyramidSpike.pyramidSpike.nodes.Cube.geometry}
        attach="geometry"
      />
      <primitive
        object={pyramidSpike.pyramidSpike.nodes.Cube.material}
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
}
