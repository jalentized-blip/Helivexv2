'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { FlaskConical, ShieldCheck, Truck, Beaker, X, FileText, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';

export default function ProductClient() {
  const params = useParams();
  const { products } = useAdmin();
  const product = useMemo(() => products.find((p) => p.id === params.id), [products, params.id]);
  
  const [selectedStrengthId, setSelectedStrengthId] = useState(product?.strengths[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [showCoa, setShowCoa] = useState(false);

  const selectedStrength = useMemo(() => 
    product?.strengths.find(s => s.id === selectedStrengthId),
    [product, selectedStrengthId]
  );

  const currentPrice = selectedStrength ? selectedStrength.price : 0;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-zinc-50 rounded-3xl border border-border overflow-hidden flex items-center justify-center p-12 group">
              <Image 
                src={product.image} 
                alt={`${product.name} - 99% Pure Research Peptide`}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                priority
              />
              
              {/* Purity Badge Overlay */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md border border-primary/20 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-tighter text-foreground">99.8% PURITY VERIFIED</span>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-50 p-4 rounded-2xl border border-border flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Third-Party Vetted</span>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl border border-border flex flex-col items-center text-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Fast USA Shipping</span>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl border border-border flex flex-col items-center text-center gap-2">
                <Beaker className="h-5 w-5 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Research Grade</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full tracking-[0.2em] uppercase">Laboratory Standard</span>
                {product.isBestSeller && <span className="bg-secondary/10 text-secondary text-[10px] font-black px-3 py-1 rounded-full tracking-[0.2em] uppercase">Top Choice</span>}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">{product.name}</h1>
              <p className="text-2xl font-black text-primary tracking-tight">${currentPrice.toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description} All Helivex Labs compounds are strictly for laboratory research and development use only. Our 99%+ purity is verified through rigorous third-party testing.
            </p>

            {/* Options */}
            <div className="space-y-6 pt-4 border-t border-border">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Select Concentration</label>
                <div className="flex flex-wrap gap-3">
                  {product.strengths.map((strength) => (
                    <button
                      key={strength.id}
                      onClick={() => setSelectedStrengthId(strength.id)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                        selectedStrengthId === strength.id 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'bg-white text-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {strength.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center bg-zinc-100 rounded-xl p-1 border border-border">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center font-bold hover:bg-white rounded-lg transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center font-bold hover:bg-white rounded-lg transition-colors"
                  >+</button>
                </div>
                
                <button className="flex-grow bg-primary text-white font-black tracking-[0.2em] py-4 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:bg-accent active:scale-[0.98] transition-all">
                  <FlaskConical className="h-5 w-5" />
                  <span>BUY RESEARCH PEPTIDE</span>
                </button>
              </div>

              <button 
                onClick={() => setShowCoa(true)}
                className="w-full flex items-center justify-center gap-2 text-xs font-black tracking-widest text-muted-foreground hover:text-primary transition-colors py-4 border-2 border-dashed border-border rounded-xl hover:border-primary/40"
              >
                <FileText className="h-4 w-4" />
                VIEW BATCH ANALYSIS (COA)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COA Modal */}
      {showCoa && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCoa(false)}
          />
          <div className="relative bg-white w-full max-w-4xl max-h-full rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-black tracking-tight">{product.name} - Certificate of Analysis</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Third-Party Purity Verification</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCoa(false)}
                className="p-2 hover:bg-zinc-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 bg-zinc-100 flex items-center justify-center">
              <div className="relative w-full aspect-[1/1.4] max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden border border-border">
                <Image 
                  src={product.coaImage || '/coa-placeholder.jpg'} 
                  alt={`${product.name} COA`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
