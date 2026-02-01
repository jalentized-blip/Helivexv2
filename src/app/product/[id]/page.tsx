'use client';

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { ShieldCheck, Zap, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        BACK TO ALL PRODUCTS
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="aspect-square bg-zinc-50 rounded-3xl border border-border flex items-center justify-center relative overflow-hidden p-12">
          <div className="relative w-full h-full">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          {product.isNew && (
            <span className="absolute top-6 left-6 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full">NEW COMPOUND</span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">{product.priceRange}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description} Our {product.name} is synthesized with the highest standards of quality and purity. Each batch is rigorously tested to ensure 99% purity, specifically formulated for laboratory research applications.
          </p>

          <div className="space-y-6 pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors border-r border-border"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors border-l border-border"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Link href="/checkout" className="flex-grow btn-primary flex items-center justify-center gap-3 py-4 shadow-xl shadow-primary/20">
                <ShoppingCart className="h-5 w-5" />
                ADD TO RESEARCH CART
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide">99% Purity Guaranteed</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide">USA Shipped (3-5 Days)</span>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h4 className="font-bold">RESEARCH SPECIFICATIONS</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border text-sm">
                <span className="text-muted-foreground">Form</span>
                <span className="font-medium">Lyophilized Powder</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border text-sm">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium">-20°C Recommended</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border text-sm">
                <span className="text-muted-foreground">Purity</span>
                <span className="font-medium">&gt;99% (HPLC/MS)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
