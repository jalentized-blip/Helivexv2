'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10">
      <Header />
      <main className="py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-12">Returns & <span className="text-primary italic">Refunds.</span></h1>
            <div className="prose prose-zinc max-w-none space-y-8 text-zinc-600">
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Research Product Integrity</h2>
                <p>Due to the nature of laboratory research compounds, we cannot accept returns once the product has left our facility. This policy ensures the integrity and purity of all products supplied to the scientific community.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Damaged or Incorrect Items</h2>
                <p>If you receive a damaged product or the incorrect item, please contact our support team within 48 hours of delivery at support@helivexlabs.com with your order number and photographic evidence. We will arrange for a replacement immediately.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Order Cancellations</h2>
                <p>Orders can be cancelled before they have been processed for shipping. Once an order has been assigned a tracking number, it can no longer be cancelled.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
