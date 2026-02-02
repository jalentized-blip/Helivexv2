'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FlaskConical } from 'lucide-react';
import { Product } from '@/data/products';
import { LabIcons } from '@/components/LabArt';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="aspect-[4/5] relative bg-zinc-50 overflow-hidden flex items-center justify-center p-8">
        {/* Subtle Lab Background Pattern for Cards */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-16 h-16 rotate-12"><LabIcons.Structure /></div>
          <div className="absolute bottom-6 left-6 w-14 h-14 -rotate-12"><LabIcons.Vial /></div>
        </div>

        {/* Status Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full border border-primary/10">NEW_BATCH</span>
          )}
          {product.isBestSeller && (
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full border border-white/10">TOP_RESEARCH</span>
          )}
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-primary/20" />
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-primary/20" />
        </div>
        
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
      
      {/* Info Section */}
      <div className="p-5 flex flex-col gap-4 bg-zinc-50/50">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors uppercase tracking-tight">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-primary font-black text-2xl tracking-tighter">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <Link 
          href={`/product/${product.id}`}
          className="w-full bg-primary text-white text-[12px] font-black tracking-[0.4em] py-5 rounded-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group/btn relative overflow-hidden transition-all hover:bg-black active:scale-[0.95] border-2 border-white/20"
        >
          <FlaskConical className="h-3.5 w-3.5 relative z-10" />
          <span className="relative z-10 uppercase">ADD TO RESEARCH</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
