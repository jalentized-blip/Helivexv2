'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Beaker, ChevronDown, Camera } from 'lucide-react';
import { products } from '@/data/products';
import ScrollingBanner from '@/components/ScrollingBanner';
import EditableText from '@/components/EditableText';
import { useAdmin } from '@/context/AdminContext';

export default function Home() {
  const { isEditMode } = useAdmin();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
          {isEditMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 cursor-pointer group">
              <div className="bg-white/10 p-4 rounded-full backdrop-blur-md group-hover:scale-110 transition-transform">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <p className="absolute bottom-10 text-white font-bold text-xs tracking-widest">CHANGE HERO IMAGE</p>
            </div>
          )}
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              PRECISION IN <br />
              <span className="text-secondary italic">RESEARCH.</span>
            </h1>
            <EditableText 
              tagName="p"
              content="Helivex Labs provides the scientific community with ultra-pure peptides and research compounds, setting the gold standard for integrity and reliability."
              className="text-lg md:text-xl text-white/80 max-w-lg"
            />
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop" className="btn-secondary flex items-center gap-2 group">
                SHOP PRODUCTS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="px-6 py-3 border border-white/20 rounded-md font-medium hover:bg-white/10 transition-colors">
                OUR MISSION
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/50" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-border bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">99% PURE & TESTED</h3>
                <p className="text-sm text-muted-foreground">Rigorous third-party testing.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">SHIPS IN 3-5 DAYS</h3>
                <p className="text-sm text-muted-foreground">Fast, reliable USA shipping.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Beaker className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">RESEARCH USE ONLY</h3>
                <p className="text-sm text-muted-foreground">For laboratory and scientific use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">FEATURED COMPOUNDS</h2>
              <p className="text-muted-foreground mt-2">Our most sought-after research materials.</p>
            </div>
            <Link href="/shop" className="text-primary font-bold flex items-center gap-1 hover:underline">
              VIEW ALL <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group space-y-4">
                <div className="aspect-square relative bg-muted rounded-xl overflow-hidden border border-border transition-all group-hover:border-primary/50">
                  {product.isNew && (
                    <span className="absolute top-3 left-3 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded">NEW</span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">BEST SELLER</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-12 opacity-20 group-hover:scale-110 transition-transform duration-500">
                     <Beaker className="h-full w-full text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
          <Beaker className="h-full w-full" />
        </div>
        <div className="container">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-4xl font-bold">OUR MISSION</h2>
            <p className="text-xl leading-relaxed text-primary-foreground/90">
              At Helivex Labs, our purpose is to deliver research peptides at fair, transparent prices. We are built on a foundation of trust, integrity, and uncompromising standards, ensuring the research community can rely on us every step of the way.
            </p>
            <p className="text-lg text-primary-foreground/80">
              When it comes to purity and service, we would sooner step away than sacrifice the standards that define us.
            </p>
            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all">
                LEARN MORE ABOUT OUR STANDARDS <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-6">
            {[
              {
                q: "What are the products from Helivex Labs intended for?",
                a: "All items sold by Helivex Labs are strictly for laboratory research use only. They are not for human or animal consumption, not for therapeutic use, and not cleared for incorporation into food, cosmetics, medical devices, or drugs."
              },
              {
                q: "Do you provide Certificates of Analysis (COAs)?",
                a: "Yes. Certificates of Analysis are available for most products. We ensure 99% purity through rigorous third-party testing."
              },
              {
                q: "What is your shipping time?",
                a: "Orders are processed quickly and shipped from the USA. You can expect delivery within 3-5 business days from the day you receive your tracking info."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <h4 className="font-bold text-lg mb-3">{item.q}</h4>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crossing Scrolling Banners */}
      <section className="relative h-[400px] md:h-[600px] bg-foreground overflow-hidden flex items-center justify-center mt-20">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[150vw] -rotate-[6deg] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu">
            <ScrollingBanner 
              backgroundColor="bg-primary" 
              textColor="text-white/40" 
              speed={40}
            />
          </div>
          <div className="absolute w-[150vw] rotate-[6deg] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu">
            <ScrollingBanner 
              backgroundColor="bg-secondary" 
              textColor="text-primary/40" 
              reverse={true} 
              speed={40}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
