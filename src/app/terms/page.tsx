'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10">
      <main className="py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-12">Terms of <span className="text-primary italic">Service.</span></h1>
            <div className="prose prose-zinc max-w-none space-y-8 text-zinc-600">
              <section className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                <h2 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">CRITICAL: LABORATORY USE ONLY</h2>
                <p className="text-zinc-900 font-medium">All products sold by Helivex Labs are intended strictly for laboratory research purposes. By purchasing from this site, you acknowledge that these products are not for human or animal consumption, nor are they for therapeutic or diagnostic use.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Agreement to Terms</h2>
                <p>By accessing or using the Helivex Labs website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Purchaser Representation</h2>
                <p>The purchaser represents that they are a qualified researcher or affiliated with a recognized research institution. The purchaser assumes all risk for the handling and use of the products purchased.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Limitation of Liability</h2>
                <p>Helivex Labs shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
