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
  const [selectedStrength, setSelectedStrength] = useState(product.strengths[0]);
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
          <p className="text-xs text-muted-foreground line-clamp-1 uppercase tracking-wider">{product.category}</p>
        </div>

        {/* Selection UI */}
        <div className="space-y-3">
          {/* Strength Selection */}
          <div className="flex flex-wrap gap-2">
            {product.strengths.map((strength) => (
              <button
                key={strength}
                onClick={() => setSelectedStrength(strength)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-md border transition-all ${
                  selectedStrength === strength
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {strength}
              </button>
            ))}
          </div>

          {/* Single vs Kit Toggle */}
          {product.hasKit && (
            <div className="flex p-1 bg-zinc-100 rounded-lg border border-border/50">
              <button
                onClick={() => setIsKit(false)}
                className={`flex-1 text-[10px] font-bold py-2 rounded-md transition-all ${
                  !isKit ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                SINGLE VIAL
              </button>
              <button
                onClick={() => setIsKit(true)}
                className={`flex-1 text-[10px] font-bold py-2 rounded-md transition-all ${
                  isKit ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                RESEARCH KIT
              </button>
            </div>
          )}

          {/* Quantity & Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center border border-border rounded-lg bg-zinc-50 overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 hover:bg-muted transition-colors border-r border-border"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-xs font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:bg-muted transition-colors border-l border-border"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div className="text-right">
              <span className="text-primary font-bold text-lg">
                ${(isKit ? (product.kitPrice || 0) : product.price) * quantity}.00
              </span>
            </div>
          </div>
        </div>

        <button className="w-full btn-primary text-xs py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 group/btn relative overflow-hidden">
          <ShoppingCart className="h-3.5 w-3.5 relative z-10" />
          <span className="relative z-10 font-bold tracking-wider">ADD TO CART</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
