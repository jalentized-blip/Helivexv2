
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { updateFileOnGitHub } from '@/lib/githubSync';

export async function updateHeroText(newText: string) {
  try {
    const relativePath = 'src/app/page.tsx';
    const filePath = path.join(process.cwd(), relativePath);
    
    let content = await fs.readFile(filePath, 'utf-8');

    // Regex to find the content prop of EditableText in the hero section
    const regex = /(<EditableText[\s\S]*?content=")([\s\S]*?)("[\s\S]*?\/>)/;
    
    if (regex.test(content)) {
      const updatedContent = content.replace(regex, `$1${newText}$3`);

      if (process.env.VERCEL) {
        const githubResult = await updateFileOnGitHub(
          relativePath,
          updatedContent,
          'chore: update hero text [live edit]'
        );
        if (!githubResult.success) return githubResult;
        revalidatePath('/');
        return { success: true, message: 'Text pushed to GitHub. Re-deployment starting.' };
      }

      await fs.writeFile(filePath, updatedContent, 'utf-8');
      revalidatePath('/');
      return { success: true };
    }
    
    return { success: false, error: 'Hero text marker not found' };
  } catch (error) {
    console.error('Failed to update hero text:', error);
    return { success: false, error: 'Internal server error' };
  }
}
