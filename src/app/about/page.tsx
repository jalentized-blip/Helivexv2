'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Beaker, ShieldCheck, Microscope, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "99% Purity Guaranteed",
      description: "Every batch undergoes rigorous HPLC and MS testing to ensure the highest scientific standards."
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Advanced Synthesis",
      description: "Our laboratory utilizes state-of-the-art automated synthesisers for unmatched sequence precision."
    },
    {
      icon: <Beaker className="w-6 h-6" />,
      title: "Research Focused",
      description: "Dedicated to providing the scientific community with reliable tools for groundbreaking discovery."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Stability",
      description: "Proprietary lyophilization techniques ensure maximum compound stability and shelf life."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-zinc-50/50 border-b border-zinc-100">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-primary/3 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Precision Science</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Pioneering the Future of <span className="text-primary italic">Research.</span>
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl">
                Helivex Labs was founded on the principle of absolute transparency. We provide the highest-grade research peptides, verified by third-party laboratories for the global scientific community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-primary mb-6 transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Info Section */}
        <section className="py-24 bg-zinc-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-200 bg-white p-8"
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(158,27,27,0.1),transparent)]" />
                <div className="relative h-full w-full flex items-center justify-center">
                   <Image 
                    src="/vial.png" 
                    alt="Helivex Research Vial" 
                    width={400} 
                    height={400} 
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-8 left-8">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Specimen_ID</div>
                  <div className="text-xs font-mono font-bold">HLVX-99.2-ALPHA</div>
                </div>
                <div className="absolute bottom-8 right-8 text-right">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Purity_Rating</div>
                  <div className="text-xs font-mono font-bold text-primary">CERTIFIED_99.4%</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                  The Helivex <span className="text-primary italic">Standard.</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-zinc-600 leading-relaxed">
                    In an industry often clouded by ambiguity, Helivex Labs stands as a beacon of clinical integrity. Our facility operates under strict quality control protocols, ensuring that every lyophilized vial meets the exact specifications required for high-precision research.
                  </p>
                  <p className="text-zinc-600 leading-relaxed">
                    We don't just sell compounds; we provide the foundation for discovery. Each product is accompanied by a comprehensive Certificate of Analysis (COA), documenting the exact purity and sequence identity of the batch.
                  </p>
                  <div className="pt-6 border-t border-zinc-200 grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-2xl font-bold text-primary">ISO 9001</div>
                      <div className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Certified Facility</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Batch Tracking</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative p-12 md:p-24 rounded-[3rem] bg-zinc-900 text-white overflow-hidden text-center"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to accelerate your <br/><span className="italic text-primary">breakthrough?</span></h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-full tracking-widest uppercase text-xs hover:bg-primary/90 transition-colors"
                  >
                    Browse Catalog
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 text-white font-bold rounded-full tracking-widest uppercase text-xs hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  >
                    View COA Archive
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
