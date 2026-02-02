'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { updateFileOnGitHub } from '@/lib/githubSync';
import { ActionResponse } from '@/lib/types';
import { Order } from '@/data/orders';

export async function updateOrders(newOrders: Order[]): Promise<ActionResponse> {
  try {
    const relativePath = 'src/data/orders.ts';
    const filePath = path.join(process.cwd(), relativePath);
    
    const fileContent = `export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  strength: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

export const orders: Order[] = ${JSON.stringify(newOrders, null, 2)};
`;

    if (process.env.VERCEL) {
      const githubResult = await updateFileOnGitHub(
        relativePath,
        fileContent,
        'chore: update orders database [admin panel]'
      );
      if (!githubResult.success) return githubResult;
      revalidatePath('/admin');
      return { success: true, message: 'Orders pushed to GitHub. Re-deployment starting.' };
    }

    await fs.writeFile(filePath, fileContent, 'utf-8');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update orders:', error);
    return { success: false, error: 'Internal server error' };
  }
}
