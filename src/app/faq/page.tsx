'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, Truck, CreditCard, FlaskConical } from 'lucide-react';

const faqs = [
  {
    category: "Product Quality",
    icon: <FlaskConical className="w-5 h-5" />,
    questions: [
      {
        q: "What is the purity of Helivex Labs peptides?",
        a: "We guarantee a minimum purity of 99% for all our research peptides. Each batch is verified using HPLC (High-Performance Liquid Chromatography) and Mass Spectrometry to ensure identity and purity."
      },
      {
        q: "Where can I find the COA for my product?",
        a: "Certificates of Analysis (COAs) are available in our digital archive. You can access them by clicking 'COA' in the main navigation and entering your batch number, or browsing the interactive lab table."
      },
      {
        q: "How should I store my peptides?",
        a: "Lyophilized peptides are stable at room temperature for several weeks, but for long-term storage, we recommend keeping them at -20°C. Once reconstituted, they should be stored at 4°C and used within a short period."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: <Truck className="w-5 h-5" />,
    questions: [
      {
        q: "How fast is shipping?",
        a: "We offer priority shipping on all orders. Domestic orders typically arrive within 2-3 business days. International shipping varies by location but generally takes 7-14 days."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries globally. However, it is the researcher's responsibility to ensure the compounds are legal in their jurisdiction."
      },
      {
        q: "Is the packaging discreet?",
        a: "Yes, all orders are shipped in plain, professional medical-grade packaging with no mention of 'peptides' or specific compounds on the exterior for security and privacy."
      }
    ]
  },
  {
    category: "Legal & Usage",
    icon: <ShieldAlert className="w-5 h-5" />,
    questions: [
      {
        q: "Are these products for human consumption?",
        a: "Absolutely not. All products sold by Helivex Labs are strictly for laboratory research use only. They are not for human or animal consumption, nor are they for therapeutic or diagnostic use."
      },
      {
        q: "Do I need a license to purchase?",
        a: "While we do not require a specific license for most purchases, you must be a qualified researcher or affiliated with a research institution to use these compounds."
      }
    ]
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-zinc-100 last:border-none">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
      >
        <span className="text-lg font-bold tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-zinc-400 group-hover:text-primary"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-500 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10">
      <Header />

      <main className="py-24">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Support Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
              Frequently Asked <span className="text-primary italic">Questions.</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed">
              Find answers to common questions about our research compounds, shipping protocols, and quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-4">
                {faqs.map((category, idx) => (
                  <button
                    key={idx}
                    className="w-full p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 flex items-center gap-4 hover:border-primary/20 hover:bg-primary/5 transition-all group text-left"
                    onClick={() => {
                        const firstQ = `${idx}-0`;
                        setOpenIndex(firstQ);
                        document.getElementById(`category-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                      {category.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-tight">{category.category}</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-widest">{category.questions.length} Questions</div>
                    </div>
                  </button>
                ))}
                
                <div className="mt-12 p-8 rounded-3xl bg-zinc-900 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-bold mb-2">Still need help?</h4>
                    <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Our support team is available 24/7 for technical research inquiries.</p>
                    <button className="w-full py-3 bg-primary text-white text-[10px] font-bold tracking-widest uppercase rounded-xl hover:bg-primary/90 transition-colors">
                      Contact Support
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-8 space-y-24">
              {faqs.map((category, categoryIdx) => (
                <div key={categoryIdx} id={`category-${categoryIdx}`} className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-900/5">
                    <div className="text-primary">{category.icon}</div>
                    <h2 className="text-2xl font-bold tracking-tight">{category.category}</h2>
                  </div>
                  <div className="space-y-2">
                    {category.questions.map((faq, faqIdx) => {
                      const id = `${categoryIdx}-${faqIdx}`;
                      return (
                        <AccordionItem
                          key={faqIdx}
                          question={faq.q}
                          answer={faq.a}
                          isOpen={openIndex === id}
                          onClick={() => setOpenIndex(openIndex === id ? null : id)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
