'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, ChevronDown, Camera, FlaskConical, Microscope, Activity } from 'lucide-react';
import { products } from '@/data/products';
import ScrollingBanner from '@/components/ScrollingBanner';
import EditableText from '@/components/EditableText';
import { useAdmin } from '@/context/AdminContext';
import { LabIcons, MoleculePattern } from '@/components/LabArt';
import MedicalCore from '@/components/MedicalCore';
import MissionSection from '@/components/MissionSection';
import { updateHeroText } from '@/app/actions/updateHeroText';

export default function Home() {
  const { isEditMode } = useAdmin();

  const handleSaveHeroText = async (newText: string) => {
    const result = await updateHeroText(newText);
    if (result.success) {
      if (result.message) alert(result.message);
    } else {
      alert('Failed to save text: ' + result.error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-white">
        {/* Animated Lab Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-10" />
          
          {/* Subtle Molecule Patterns */}
          <div className="absolute top-20 right-[10%] w-64 h-64 text-primary opacity-[0.03] animate-pulse">
            <LabIcons.Structure />
          </div>
          <div className="absolute bottom-20 right-[25%] w-48 h-48 text-primary opacity-[0.02] rotate-12">
            <LabIcons.Microscope />
          </div>
          <div className="absolute top-[40%] right-[5%] w-32 h-32 text-primary opacity-[0.03] -rotate-12">
            <LabIcons.Vial />
          </div>
        </div>
        
        <div className="container relative z-10 text-zinc-900">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black tracking-widest text-primary uppercase">
              <Activity size={12} />
              <span>Research Protocol Active</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-zinc-900">
              PRECISION IN <br />
              <span className="text-primary italic">RESEARCH.</span>
            </h1>
            <EditableText 
              tagName="p"
              content="Helivex Labs provides the scientific community with ultra-pure peptides and research compounds, setting the gold standard for integrity and reliability."
              className="text-lg md:text-xl text-zinc-500 max-w-lg leading-relaxed"
              onSave={handleSaveHeroText}
            />
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop" className="btn-primary flex items-center gap-2 group px-8 py-4 text-sm font-black tracking-widest">
                SHOP PRODUCTS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="px-8 py-4 border border-black/5 rounded-md text-sm font-black tracking-widest hover:bg-black/5 transition-colors">
                OUR MISSION
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-black/20" />
        </div>
      </section>

      <MissionSection />

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
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden p-2.5">
                <Image 
                  src="/vial.png"
                  alt="Research Use"
                  fill
                  className="object-contain"
                />
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
      <section className="py-24 bg-zinc-50/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.3em] uppercase">
                <FlaskConical size={14} />
                <span>Product Catalog</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight">FEATURED COMPOUNDS</h2>
              <p className="text-muted-foreground">Precision-engineered research materials for clinical study.</p>
            </div>
            <Link href="/shop" className="btn-primary flex items-center gap-2 group text-sm py-2.5">
              VIEW FULL INVENTORY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group space-y-5">
                <div className="aspect-[4/5] relative bg-white rounded-2xl overflow-hidden border border-border transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_-15px_rgba(158,27,27,0.1)]">
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
                  
                  <div className="absolute inset-0 flex items-center justify-center p-12 group-hover:scale-110 transition-all duration-700">
                     <div className="relative w-full h-full">
                       <Image 
                         src={product.image} 
                         alt={product.name}
                         fill
                         className="object-contain drop-shadow-2xl"
                       />
                     </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Analyze Specs</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-mono text-muted-foreground">{product.priceRange}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />)}
                    </div>
                  </div>
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
      <section className="py-24 bg-white overflow-hidden">
        <div className="container relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Large Vial Image on the Left */}
            <div className="relative w-full lg:w-1/2 h-[500px] md:h-[700px] flex items-center justify-center lg:justify-start">
              <div className="relative w-[200%] h-[120%] lg:-left-[60%] lg:-bottom-[10%] -rotate-[35deg] transform-gpu">
                <Image 
                  src="/vial.png"
                  alt="Helivex Labs Research Vial"
                  fill
                  className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                  priority
                />
              </div>
            </div>

            {/* FAQ Content on the Right */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-3xl font-bold tracking-tight text-center lg:text-left mb-12 uppercase">FREQUENTLY ASKED QUESTIONS</h2>
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
                  <div key={i} className="p-8 rounded-2xl bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
                    <h4 className="font-bold text-lg mb-4 text-zinc-900 leading-tight">{item.q}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Molecular Analysis Core */}
      <section className="mt-20">
        <MedicalCore />
      </section>
    </div>
  );
}
