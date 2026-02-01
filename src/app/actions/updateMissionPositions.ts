'use server';

import fs from 'fs/promises';
import path from 'path';

export async function updateMissionPositions(positions: { x: number, y: number }[]) {
  try {
    const filePath = path.join(process.cwd(), 'src/components/MissionSection.tsx');
    let content = await fs.readFile(filePath, 'utf-8');

    // Update each card position
    for (let i = 0; i < positions.length; i++) {
      const markerStart = `/* CARD_${i + 1}_START */`;
      const markerEnd = `/* CARD_${i + 1}_END */`;
      const regex = new RegExp(`${escapeRegExp(markerStart)}([\\s\\S]*?)${escapeRegExp(markerEnd)}`);
      const newPosition = `${markerStart} { x: ${Math.round(positions[i].x)}, y: ${Math.round(positions[i].y)} } ${markerEnd}`;
      
      if (regex.test(content)) {
        content = content.replace(regex, newPosition);
      }
    }

    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Failed to update mission positions:', error);
    return { success: false, error: 'File system error' };
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
