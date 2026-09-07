import React from 'react';
import { DepositBoxMesh } from './DepositBoxMesh';

export function DepositBoxGrid({ projects, unlockedBoxIds, onSelectBox }) {
  // If 3 items (single level chamber), layout in a single horizontal row of 3
  const isChamber = projects.length === 3;
  const cols = isChamber ? 3 : 4;
  const boxWidth = 2.4;
  const boxHeight = 1.7;
  const gapX = 0.35;
  const gapY = 0.4;

  const startX = -((cols - 1) * (boxWidth + gapX)) / 2;
  const startY = isChamber ? 0 : ((Math.ceil(projects.length / cols) - 1) * (boxHeight + gapY)) / 2;

  return (
    <group position={[0, 0, 0]}>
      {projects.map((project, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;

        const x = startX + col * (boxWidth + gapX);
        const y = startY - row * (boxHeight + gapY);
        const z = 0;

        const isUnlocked = unlockedBoxIds.includes(project.id);

        return (
          <DepositBoxMesh
            key={project.id}
            project={project}
            position={[x, y, z]}
            isUnlocked={isUnlocked}
            onSelectBox={onSelectBox}
          />
        );
      })}
    </group>
  );
}
