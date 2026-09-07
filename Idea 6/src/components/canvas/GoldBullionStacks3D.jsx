import React from 'react';

export function GoldBullionStacks3D() {
  // Generate gold bar stacks at positions on the left and right of the vault room floor
  const stackPositions = [
    // Left Pallet
    { basePos: [-6.2, -4.3, -0.5], rows: 3, cols: 3 },
    // Right Pallet
    { basePos: [6.2, -4.3, -0.5], rows: 3, cols: 3 }
  ];

  return (
    <group>
      {stackPositions.map((pallet, pIdx) => {
        const bars = [];
        const [bx, by, bz] = pallet.basePos;
        const barWidth = 0.5;
        const barHeight = 0.2;
        const barLength = 1.0;

        for (let r = 0; r < pallet.rows; r++) {
          for (let c = 0; c < pallet.cols; c++) {
            // Pyramid effect on height
            const heightTiers = pallet.rows - Math.max(r, c);
            for (let h = 0; h < heightTiers; h++) {
              bars.push({
                id: `${pIdx}-${r}-${c}-${h}`,
                pos: [
                  bx + (c - 1) * (barWidth + 0.08),
                  by + h * (barHeight + 0.02) + 0.1,
                  bz + (r - 1) * (barLength + 0.08)
                ]
              });
            }
          }
        }

        return (
          <group key={pIdx}>
            {/* Wooden Pallet Base */}
            <mesh position={[bx, by + 0.04, bz]}>
              <boxGeometry args={[2.2, 0.08, 3.2]} />
              <meshStandardMaterial color="#3E2723" roughness={0.8} />
            </mesh>

            {/* Gold Bars */}
            {bars.map((b) => (
              <mesh key={b.id} position={b.pos}>
                <boxGeometry args={[barWidth, barHeight, barLength]} />
                <meshStandardMaterial
                  color="#FFD700"
                  metalness={0.96}
                  roughness={0.15}
                  envMapIntensity={1.5}
                />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}
