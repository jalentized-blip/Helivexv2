'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialProducts } from '@/data/products';
import { Order, orders as initialOrders } from '@/data/orders';

// import { updateProducts } from '@/app/actions/updateProducts';
// import { updateOrders } from '@/app/actions/updateOrders';

interface AdminContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  isAdmin: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  products: Product[];
  orders: Order[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrder: (updatedOrder: Order) => void;
  pushToLive: () => Promise<{ success: boolean; error?: string; message?: string }>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const ADMIN_EMAILS = ['jalentized@gmail.com'];

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    // Check for admin status via email or legacy token
    const urlParams = new URLSearchParams(window.location.search);
    const adminToken = urlParams.get('admin');
    const savedEmail = localStorage.getItem('helivex_admin_email');

    if (savedEmail && ADMIN_EMAILS.includes(savedEmail)) {
      setIsAdmin(true);
      setUserEmail(savedEmail);
    } else if (adminToken === 'true' || localStorage.getItem('helivex_admin') === 'true') {
      setIsAdmin(true);
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
        const parsed = JSON.parse(savedProducts);
        // Merge saved data with initial data to ensure new fields are present
        const merged = initialProducts.map(initial => {
          const saved = parsed.find((p: Product) => p.id === initial.id);
          if (saved) {
            // Keep saved pricing/description but prefer initial for COA fields if they were recently added
            return {
              ...initial,
              ...saved,
              // Force latest COA fields from code if they exist in initial but not in saved
              coaImage: initial.coaImage || saved.coaImage,
              coaBatch: initial.coaBatch || saved.coaBatch,
              coaMass: initial.coaMass || saved.coaMass,
              coaDate: initial.coaDate || saved.coaDate,
            };
          }
          return initial;
        });
        setProducts(merged);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }

    // Load orders from localStorage if available
    const savedOrders = localStorage.getItem('helivex_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
  }, []);

  const login = (email: string) => {
    if (ADMIN_EMAILS.includes(email)) {
      setIsAdmin(true);
      setUserEmail(email);
      localStorage.setItem('helivex_admin_email', email);
      localStorage.setItem('helivex_admin', 'true');
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setUserEmail(null);
    setIsEditMode(false);
    localStorage.removeItem('helivex_admin_email');
    localStorage.removeItem('helivex_admin');
    localStorage.removeItem('helivex_edit_mode');
  };

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

  const updateOrder = (updatedOrder: Order) => {
    const newOrders = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    setOrders(newOrders);
    localStorage.setItem('helivex_orders', JSON.stringify(newOrders));
  };

  const pushToLive = async (): Promise<{ success: boolean; error?: string; message?: string }> => {
    // Server actions are disabled in static export mode
    return { 
      success: false, 
      error: 'Admin updates are not supported in static hosting mode. Please use Vercel for live editing.' 
    };
  };

  return (
    <AdminContext.Provider value={{ 
      isEditMode, 
      setIsEditMode: toggleEditMode, 
      isAdmin, 
      userEmail,
      login,
      logout,
      products, 
      orders,
      updateProduct, 
      addProduct, 
      deleteProduct,
      updateOrder,
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
