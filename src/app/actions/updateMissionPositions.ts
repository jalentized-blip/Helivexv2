'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { updateFileOnGitHub } from '@/lib/githubSync';

export async function updateMissionPositions(
  positions: { x: number, y: number }[],
  vialData?: { x: number, y: number, rotate: number, scale: number }
) {
  try {
    const relativePath = 'src/components/MissionSection.tsx';
    const filePath = path.join(process.cwd(), relativePath);
    console.log('Attempting to update MissionSection at:', filePath);
    
    let content = await fs.readFile(filePath, 'utf-8');

    // Update each card position
    for (let i = 0; i < positions.length; i++) {
      const markerStart = `CARD_${i + 1}_START`;
      const markerEnd = `CARD_${i + 1}_END`;
      
      const regex = new RegExp(`\\/\\*\\s*${markerStart}\\s*\\*\\/([\\s\\S]*?)\\/\\*\\s*${markerEnd}\\s*\\*\\/`);
      const newPosition = `/* ${markerStart} */ { x: ${Math.round(positions[i].x)}, y: ${Math.round(positions[i].y)} } /* ${markerEnd} */`;
      
      const match = content.match(regex);
      if (match) {
        content = content.replace(regex, newPosition);
      }
    }

    // Update vial data if provided
    if (vialData) {
      const markerStart = `VIAL_START`;
      const markerEnd = `VIAL_END`;
      const regex = new RegExp(`\\/\\*\\s*${markerStart}\\s*\\*\\/([\\s\\S]*?)\\/\\*\\s*${markerEnd}\\s*\\*\\/`);
      const newVialData = `/* ${markerStart} */ { x: ${Math.round(vialData.x)}, y: ${Math.round(vialData.y)}, rotate: ${Math.round(vialData.rotate)}, scale: ${Number(vialData.scale.toFixed(2))} } /* ${markerEnd} */`;
      
      const match = content.match(regex);
      if (match) {
        content = content.replace(regex, newVialData);
      }
    }

    // Check if we are on Vercel
    if (process.env.VERCEL) {
      console.log('Running on Vercel - Syncing to GitHub...');
      const githubResult = await updateFileOnGitHub(
        relativePath, 
        content, 
        'chore: update mission layout positions [live edit]'
      );
      
      if (!githubResult.success) {
        return { 
          success: false, 
          error: `Vercel Save Failed: ${githubResult.error}. Please ensure GITHUB_TOKEN and GITHUB_REPO are set.` 
        };
      }
      
      revalidatePath('/');
      return { success: true, message: 'Changes pushed to GitHub. Re-deployment will start shortly.' };
    }

    // Local development
    await fs.writeFile(filePath, content, 'utf-8');
    console.log('File successfully written to disk locally.');
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to update mission positions:', error);
    return { success: false, error: 'Internal server error' };
  }
}
