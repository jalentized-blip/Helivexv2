'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductStrength } from '@/data/products';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  strength: ProductStrength;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, strength: ProductStrength, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('helivex-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('helivex-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, strength: ProductStrength, quantity: number) => {
    setItems(prevItems => {
      // Check if item with same productId and strengthId already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.productId === product.id && item.strength.id === strength.id
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      const newItem: CartItem = {
        id: `${product.id}-${strength.id}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        strength: strength,
        quantity: quantity,
        price: strength.price
      };

      return [...prevItems, newItem];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
