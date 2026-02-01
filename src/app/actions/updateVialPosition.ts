'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { updateFileOnGitHub } from '@/lib/githubSync';

export async function updateVialPosition(vialData: { x: number, y: number, rotate: number, scale: number }) {
  try {
    const relativePath = 'src/components/MedicalCore.tsx';
    const filePath = path.join(process.cwd(), relativePath);
    console.log('Attempting to update MedicalCore.tsx at:', filePath);
    
    let content = await fs.readFile(filePath, 'utf-8');

    // Use regex to find and replace the position object between markers
    const regex = /\/\*\s*VIAL_POS_START\s*\*\/([\s\S]*?)\/\*\s*VIAL_POS_END\s*\*\//;
    const newPosition = `/* VIAL_POS_START */ { x: ${Math.round(vialData.x)}, y: ${Math.round(vialData.y)}, rotate: ${Math.round(vialData.rotate)}, scale: ${Number(vialData.scale.toFixed(2))} } /* VIAL_POS_END */`;
    
    const match = content.match(regex);
    if (match) {
      const updatedContent = content.replace(regex, newPosition);
      
      // Check if we are on Vercel
      if (process.env.VERCEL) {
        console.log('Running on Vercel - Syncing to GitHub...');
        const githubResult = await updateFileOnGitHub(
          relativePath, 
          updatedContent, 
          'chore: update medical core vial transformation [live edit]'
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
      await fs.writeFile(filePath, updatedContent, 'utf-8');
      console.log('File successfully written to disk locally.');
      revalidatePath('/');
      return { success: true };
    } else {
      console.error('Position markers (VIAL_POS_START/END) not found in MedicalCore.tsx');
      return { success: false, error: 'Markers not found in file' };
    }
  } catch (error) {
    console.error('Failed to update vial position:', error);
    return { success: false, error: 'Internal server error' };
  }
}
