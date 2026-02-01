'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Beaker, ChevronDown, Camera, FlaskConical, Microscope, Activity } from 'lucide-react';
import { products } from '@/data/products';
import ScrollingBanner from '@/components/ScrollingBanner';
import EditableText from '@/components/EditableText';
import { useAdmin } from '@/context/AdminContext';
import { LabIcons, MoleculePattern } from '@/components/LabArt';
import AssemblyLine from '@/components/AssemblyLine';

export default function Home() {
  const { isEditMode } = useAdmin();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-foreground">
        {/* Animated Lab Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent z-10" />
          
          {/* Subtle Grid and Molecule Patterns */}
          <div className="absolute inset-0 opacity-[0.03] bg-[size:60px_60px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
          
          <div className="absolute top-20 right-[10%] w-64 h-64 text-white opacity-[0.05] animate-pulse">
            <LabIcons.Structure />
          </div>
          <div className="absolute bottom-20 right-[25%] w-48 h-48 text-white opacity-[0.03] rotate-12">
            <LabIcons.Microscope />
          </div>
          <div className="absolute top-[40%] right-[5%] w-32 h-32 text-white opacity-[0.04] -rotate-12">
            <LabIcons.Vial />
          </div>
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
                <div className="aspect-square relative bg-muted rounded-xl overflow-hidden border border-border transition-all group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5">
                  {/* Subtle Lab Background Pattern for Cards */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <div className="absolute top-2 right-2 w-12 h-12 rotate-12"><LabIcons.Structure /></div>
                    <div className="absolute bottom-4 left-4 w-10 h-10 -rotate-12"><LabIcons.Vial /></div>
                  </div>
                  
                  {product.isNew && (
                    <span className="absolute top-3 left-3 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded">NEW</span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">BEST SELLER</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-12 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
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
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] rotate-12">
            <LabIcons.Structure />
          </div>
          <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] -rotate-12">
            <LabIcons.DNA />
          </div>
        </div>
        <div className="container relative z-10">
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

      {/* Peptide Synthesis Assembly Line */}
      <section className="mt-20">
        <AssemblyLine />
      </section>
    </div>
  );
}
