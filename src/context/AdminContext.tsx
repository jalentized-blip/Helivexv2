'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialProducts } from '@/data/products';
import { updateProducts } from '@/app/actions/updateProducts';

interface AdminContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  isAdmin: boolean;
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  pushToLive: () => Promise<{ success: boolean; error?: string; message?: string }>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Check for admin status
    const urlParams = new URLSearchParams(window.location.search);
    const adminToken = urlParams.get('admin');
    if (adminToken === 'true' || localStorage.getItem('helivex_admin') === 'true') {
      setIsAdmin(true);
      if (adminToken === 'true') localStorage.setItem('helivex_admin', 'true');
    }

    // Persist edit mode across refreshes
    const savedEditMode = localStorage.getItem('helivex_edit_mode');
    if (savedEditMode === 'true') {
      setIsEditMode(true);
    }

    // Load products from localStorage if available
    const savedProducts = localStorage.getItem('helivex_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
  }, []);

  const toggleEditMode = (value: boolean) => {
    setIsEditMode(value);
    localStorage.setItem('helivex_edit_mode', value.toString());
  };

  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    localStorage.setItem('helivex_products', JSON.stringify(newProducts));
  };

  const addProduct = (newProduct: Product) => {
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    localStorage.setItem('helivex_products', JSON.stringify(newProducts));
  };

  const deleteProduct = (productId: string) => {
    const newProducts = products.filter(p => p.id !== productId);
    setProducts(newProducts);
    localStorage.setItem('helivex_products', JSON.stringify(newProducts));
  };

  const pushToLive = async () => {
    try {
      const result = await updateProducts(products);
      return result;
    } catch (error) {
      console.error('Failed to push products to live:', error);
      return { success: false, error: 'Failed to push updates' };
    }
  };

  return (
    <AdminContext.Provider value={{ 
      isEditMode, 
      setIsEditMode: toggleEditMode, 
      isAdmin, 
      products, 
      updateProduct, 
      addProduct, 
      deleteProduct,
      pushToLive
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
