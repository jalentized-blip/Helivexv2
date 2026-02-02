
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { updateFileOnGitHub } from '@/lib/githubSync';
import { ActionResponse } from '@/lib/types';
import { Product } from '@/data/products';

export async function updateProducts(newProducts: Product[]): Promise<ActionResponse> {
  try {
    const relativePath = 'src/data/products.ts';
    const filePath = path.join(process.cwd(), relativePath);
    
    const fileContent = `export interface ProductStrength {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  strengths: ProductStrength[];
  hasKit: boolean;
  kitPrice?: number;
  coaImage?: string;
}

export const products: Product[] = ${JSON.stringify(newProducts, null, 2)};
`;

    if (process.env.VERCEL) {
      const githubResult = await updateFileOnGitHub(
        relativePath,
        fileContent,
        'chore: update products database [admin panel]'
      );
      if (!githubResult.success) return githubResult;
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath('/coa');
      return { success: true, message: 'Products pushed to GitHub. Re-deployment starting.' };
    }

    await fs.writeFile(filePath, fileContent, 'utf-8');
    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath('/coa');
    return { success: true };
  } catch (error) {
    console.error('Failed to update products:', error);
    return { success: false, error: 'Internal server error' };
  }
}
