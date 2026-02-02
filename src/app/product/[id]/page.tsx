'use client';

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { ShieldCheck, Zap, ArrowLeft, Minus, Plus, ShoppingCart, Search, X, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function ProductPage() {
  const { isEditMode } = useAdmin();
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedStrength, setSelectedStrength] = useState(product?.strengths[0] || '');
  const [isKit, setIsKit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCOAModalOpen, setIsCOAModalOpen] = useState(false);
  const [coaImage, setCoaImage] = useState(product?.coaImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  const handleCOAUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoaImage(reader.result as string);
        // In a real app, you'd save this to a database
      };
      reader.readAsDataURL(file);
    }
  };

  const currentPrice = isKit ? (product.kitPrice || 0) : product.price;

  return (
    <div className="container py-12 relative">
      {/* COA Modal */}
      {isCOAModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="font-black tracking-tighter text-xl uppercase">CERTIFICATE_OF_ANALYSIS: {product.name}</h3>
              <button 
                onClick={() => setIsCOAModalOpen(false)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-8 aspect-[3/4] relative bg-zinc-50 overflow-y-auto">
              {coaImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={coaImage} 
                    alt="COA" 
                    fill 
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400 gap-4">
                  <Search className="h-12 w-12 opacity-20" />
                  <p className="font-bold tracking-widest text-xs uppercase">No COA Data Available</p>
                </div>
              )}
            </div>
            {isEditMode && (
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-center">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleCOAUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary flex items-center gap-2 px-8"
                >
                  <Upload className="h-4 w-4" />
                  REPLACE COA IMAGE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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

          {/* COA Magnifying Glass */}
          <div className="absolute top-6 right-6 group/coa">
            <button 
              onClick={() => setIsCOAModalOpen(true)}
              className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-xl shadow-black/5 text-zinc-900 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </button>
            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 opacity-0 group-hover/coa:opacity-100 transition-opacity pointer-events-none z-20">
              <div className="bg-zinc-900 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                Inspect COA
              </div>
            </div>
          </div>
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
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Concentration</label>
              <div className="flex flex-wrap gap-3">
                {product.strengths.map((strength) => (
                  <button
                    key={strength}
                    onClick={() => setSelectedStrength(strength)}
                    className={`px-8 py-3 rounded-xl border font-black text-xs transition-all duration-300 ${
                      selectedStrength === strength
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                        : 'border-zinc-100 bg-white text-zinc-500 hover:border-primary/30'
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Unit Configuration</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsKit(false)}
                    className={`flex-1 p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                      !isKit ? 'border-primary bg-primary/5 shadow-inner' : 'border-zinc-100 bg-white hover:border-primary/20'
                    }`}
                  >
                    <div className={`font-black text-xs tracking-widest mb-1 ${!isKit ? 'text-primary' : 'text-zinc-900'}`}>SINGLE VIAL</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">${product.price.toFixed(2)} / UNIT</div>
                    {!isKit && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                  <button
                    onClick={() => setIsKit(true)}
                    className={`flex-1 p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                      isKit ? 'border-primary bg-primary/5 shadow-inner' : 'border-zinc-100 bg-white hover:border-primary/20'
                    }`}
                  >
                    <div className={`font-black text-xs tracking-widest mb-1 ${isKit ? 'text-primary' : 'text-zinc-900'}`}>RESEARCH KIT (10X)</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">${product.kitPrice?.toFixed(2)} / KIT</div>
                    {isKit && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                </div>
              </div>
            )}

            {/* Quantity and Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center border border-zinc-100 rounded-2xl bg-zinc-50 h-16">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-6 h-full hover:bg-zinc-100 transition-colors text-zinc-400"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-16 text-center font-black text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-6 h-full hover:bg-zinc-100 transition-colors text-zinc-400"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <Link href="/checkout" className="flex-grow bg-primary text-white flex items-center justify-center gap-3 h-16 rounded-2xl shadow-xl shadow-primary/20 group relative overflow-hidden transition-all hover:bg-accent active:scale-[0.98]">
                <ShoppingCart className="h-5 w-5 relative z-10" />
                <span className="relative z-10 font-black tracking-[0.2em] text-xs">ADD ${(currentPrice * quantity).toFixed(2)} TO RESEARCH CART</span>
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
