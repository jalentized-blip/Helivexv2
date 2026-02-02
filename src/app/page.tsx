'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, ChevronDown, Camera, FlaskConical, Microscope, Activity } from 'lucide-react';
import ScrollingBanner from '@/components/ScrollingBanner';
import EditableText from '@/components/EditableText';
import { useAdmin } from '@/context/AdminContext';
import { LabIcons, MoleculePattern } from '@/components/LabArt';
import MedicalCore from '@/components/MedicalCore';
import MissionSection from '@/components/MissionSection';
import { updateHeroText } from '@/app/actions/updateHeroText';
import ProductCard from '@/components/shop/ProductCard';

export default function Home() {
  const { isEditMode, products } = useAdmin();

  const handleSaveHeroText = async (newText: string) => {
    const result = await updateHeroText(newText);
    if (result.success) {
      if (result.message) alert(result.message);
    } else {
      alert('Failed to save text: ' + result.error);
    }
  };

  return (
    <div className="flex flex-col relative">
      {/* Global Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-white reflective-glow">
        {/* Animated Lab Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Background Image: freezervials.jpg */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/freezervials.jpg"
              alt="Advanced Peptide Research Laboratory - Helivex Labs Storage"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-zinc-900">
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
                SHOP RESEARCH PEPTIDES <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="px-8 py-4 border border-black/5 rounded-md text-sm font-black tracking-widest hover:bg-black/5 transition-colors">
                ABOUT OUR STANDARDS
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
                  alt="99% Pure Research Peptides"
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
      <section className="py-24 bg-zinc-50/50 relative reflective-glow">
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
              SHOP ALL RESEARCH PEPTIDES <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
           className="py-10 md:py-12 text-primary-foreground relative overflow-visible"
           style={{ 
               clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
               marginTop: '-2.5rem',
               marginBottom: '-2.5rem',
               background: 'linear-gradient(135deg, var(--primary) 0%, rgba(244, 167, 167, 0.4) 100%)'
             }}
         >
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
             <div className="absolute -right-20 -top-20 w-[600px] h-[600px] rotate-12">
               <LabIcons.Structure />
             </div>
             <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] -rotate-12">
               <LabIcons.DNA />
             </div>
           </div>
           <div className="container relative z-10 text-center flex flex-col items-center">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">OUR MISSION</h2>
              <p className="text-lg md:text-2xl leading-relaxed text-primary-foreground/90 font-medium px-4 md:px-0">
                At Helivex Labs, our purpose is to deliver research peptides at fair, transparent prices. We are built on a foundation of trust, integrity, and uncompromising standards, ensuring the research community can rely on us every step of the way.
              </p>
              <p className="text-base md:text-lg text-primary-foreground/80 px-4 md:px-0">
                When it comes to purity and service, we would sooner step away than sacrifice the standards that define us.
              </p>
              <div className="pt-2">
                <Link href="/about" className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full font-bold tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all duration-300 shadow-xl inline-block">
                  ABOUT OUR STANDARDS
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white overflow-hidden relative reflective-glow">
        <div className="container relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 uppercase">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What are the products from Helivex Labs intended for?",
                  a: "All items sold by Helivex Labs are strictly for laboratory research use only. They are not for human or animal consumption, not for therapeutic use, and not cleared for incorporation into food, cosmetics, medical devices, or drugs."
                },
                {
                  q: "Do you provide Certificates of Analysis (COAs)?",
                  a: "Yes. Certificates of Analysis are available for most products. We ensure 99% purity through rigorous third-party testing to provide the highest quality research peptides online."
                },
                {
                  q: "What is your shipping time?",
                  a: "Orders are processed quickly and shipped from the USA. You can expect delivery within 3-5 business days from the day you receive your tracking info. We provide fast, reliable peptide research supplies to your laboratory."
                },
                {
                  q: "How can I buy peptides online safely?",
                  a: "When you buy research peptides online from Helivex Labs, you are guaranteed 99% purity, secure encrypted transactions, and discrete, fast USA shipping. All our compounds undergo strict quality control."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the products from Helivex Labs intended for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All items sold by Helivex Labs are strictly for laboratory research use only. They are not for human or animal consumption."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide Certificates of Analysis (COAs)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Certificates of Analysis are available for most products. We ensure 99% purity through rigorous third-party testing."
                }
              },
              {
                "@type": "Question",
                "name": "How can I buy peptides online safely?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "When you buy research peptides online from Helivex Labs, you are guaranteed 99% purity, secure encrypted transactions, and discrete, fast USA shipping."
                }
              }
            ]
          }) }}
        />
      </section>

      {/* Molecular Analysis Core */}
      <section className="mt-20">
        <MedicalCore />
      </section>
    </div>
  );
}
