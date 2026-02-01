'use server';

import fs from 'fs/promises';
import path from 'path';

export async function updateVialPosition(x: number, y: number) {
  try {
    const filePath = path.join(process.cwd(), 'src/components/MedicalCore.tsx');
    let content = await fs.readFile(filePath, 'utf-8');

    // Use regex to find and replace the position object between markers
    const regex = /\/\* VIAL_POS_START \*\/([\s\S]*?)\/\* VIAL_POS_END \*\//;
    const newPosition = `/* VIAL_POS_START */ { x: ${Math.round(x)}, y: ${Math.round(y)} } /* VIAL_POS_END */`;
    
    if (regex.test(content)) {
      content = content.replace(regex, newPosition);
      await fs.writeFile(filePath, content, 'utf-8');
      return { success: true };
    } else {
      console.error('Position markers not found in MedicalCore.tsx');
      return { success: false, error: 'Markers not found' };
    }
  } catch (error) {
    console.error('Failed to update vial position:', error);
    return { success: false, error: 'File system error' };
  }
}
