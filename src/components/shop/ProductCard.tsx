'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isKit, setIsKit] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="aspect-[4/5] relative bg-zinc-50 overflow-hidden flex items-center justify-center p-8">
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">NEW</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">BEST SELLER</span>
        )}
        
        <div className="relative w-full h-full group-hover:scale-110 transition-all duration-700">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none reflective-glow" />
      </Link>
      
      {/* Info & Selection Section */}
      <div className="p-5 flex flex-col gap-4">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">{product.category}</p>
        </div>

        {/* Selection UI */}
        <div className="space-y-4">
          {/* Single vs Kit Toggle */}
          {product.hasKit && (
            <div className="space-y-2">
              <p className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">Unit Type</p>
              <div className="flex p-1 bg-zinc-50 rounded-lg border border-zinc-100">
                <button
                  onClick={() => setIsKit(false)}
                  className={`flex-1 text-[9px] font-black py-2 rounded-md transition-all duration-300 ${
                    !isKit ? 'bg-white text-primary shadow-sm border border-zinc-100' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  SINGLE
                </button>
                <button
                  onClick={() => setIsKit(true)}
                  className={`flex-1 text-[9px] font-black py-2 rounded-md transition-all duration-300 ${
                    isKit ? 'bg-white text-primary shadow-sm border border-zinc-100' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  KIT (10X)
                </button>
              </div>
            </div>
          )}

          {/* Quantity & Price */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
            <div className="flex items-center bg-zinc-50 rounded-lg border border-zinc-100 overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-[11px] font-black">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div className="text-right">
              <span className="text-primary font-black text-lg tracking-tight">
                ${(isKit ? (product.kitPrice || 0) : product.price) * quantity}.00
              </span>
            </div>
          </div>
        </div>

        <button className="w-full bg-primary text-white text-[10px] font-black tracking-[0.2em] py-3.5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all hover:bg-accent active:scale-[0.98]">
          <ShoppingCart className="h-3.5 w-3.5 relative z-10" />
          <span className="relative z-10">ADD TO RESEARCH</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
