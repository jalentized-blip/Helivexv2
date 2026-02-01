'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10">
      <Header />
      <main className="py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-12">Shipping <span className="text-primary italic">Policy.</span></h1>
            <div className="prose prose-zinc max-w-none space-y-8 text-zinc-600">
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Processing Time</h2>
                <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">Shipping Rates & Delivery Estimates</h2>
                <p>Shipping charges for your order will be calculated and displayed at checkout. We primarily use USPS Priority Mail and FedEx for domestic shipments to ensure stability of the compounds.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4 uppercase tracking-widest text-[12px]">International Shipping</h2>
                <p>We ship worldwide. However, Helivex Labs is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
