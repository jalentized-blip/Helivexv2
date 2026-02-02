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
  const [selectedStrength, setSelectedStrength] = useState(product?.strengths[0] || '');
  const [isKit, setIsKit] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  const currentPrice = isKit ? (product.kitPrice || 0) : product.price;

  return (
    <div className="container py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        BACK TO ALL PRODUCTS
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="aspect-square bg-zinc-50 rounded-3xl border border-border flex items-center justify-center relative overflow-hidden p-12 reflective-glow">
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
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
              <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Research Specimen</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description} Our {product.name} is synthesized with the highest standards of quality and purity. Each batch is rigorously tested to ensure 99% purity, specifically formulated for laboratory research applications.
          </p>

          <div className="space-y-8 pt-8 border-t border-border">
            {/* Strength Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Strength</label>
              <div className="flex flex-wrap gap-3">
                {product.strengths.map((strength) => (
                  <button
                    key={strength}
                    onClick={() => setSelectedStrength(strength)}
                    className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all ${
                      selectedStrength === strength
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'border-border bg-white text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {strength}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Type */}
            {product.hasKit && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Selection Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsKit(false)}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      !isKit ? 'border-primary bg-primary/5' : 'border-border bg-white'
                    }`}
                  >
                    <div className="font-bold">Single Vial</div>
                    <div className="text-sm text-muted-foreground">${product.price.toFixed(2)} per unit</div>
                  </button>
                  <button
                    onClick={() => setIsKit(true)}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      isKit ? 'border-primary bg-primary/5' : 'border-border bg-white'
                    }`}
                  >
                    <div className="font-bold text-primary">Research Kit (10x)</div>
                    <div className="text-sm text-muted-foreground">${product.kitPrice?.toFixed(2)} per kit</div>
                  </button>
                </div>
              </div>
            )}

            {/* Quantity and Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center border-2 border-border rounded-xl bg-white h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full hover:bg-muted transition-colors border-r-2 border-border"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full hover:bg-muted transition-colors border-l-2 border-border"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <Link href="/checkout" className="flex-grow btn-primary flex items-center justify-center gap-3 h-14 shadow-xl shadow-primary/20 group relative overflow-hidden">
                <ShoppingCart className="h-5 w-5 relative z-10" />
                <span className="relative z-10 font-bold tracking-wider">ADD ${(currentPrice * quantity).toFixed(2)} TO RESEARCH CART</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
