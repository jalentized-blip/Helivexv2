'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      detail: "support@helivexlabs.com",
      description: "For technical and order inquiries."
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      detail: "+1 (800) HELIVEX",
      description: "Mon-Fri, 9am - 5pm EST."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Headquarters",
      detail: "United States",
      description: "Secure laboratory facility."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <main className="py-24 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <MessageSquare className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Contact Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Let's Discuss Your <span className="text-primary italic">Research.</span>
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed mb-12 max-w-lg">
                Our team of specialists is ready to assist with technical specifications, bulk ordering, or batch tracking inquiries.
              </p>

              <div className="space-y-8">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight mb-1">{info.title}</h3>
                      <div className="text-lg font-bold text-primary mb-1">{info.detail}</div>
                      <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-start gap-6">
                <div className="w-10 h-10 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Current Response Time</h4>
                  <p className="text-sm text-zinc-500">Our lab technicians are currently responding to inquiries within <span className="text-zinc-900 font-bold">2-4 hours</span>.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] reflective-glow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@institution.edu"
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Subject</label>
                    <select className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none cursor-pointer">
                      <option>Technical Research Inquiry</option>
                      <option>Order Status / Shipping</option>
                      <option>Bulk Ordering</option>
                      <option>Certificate of Analysis (COA)</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Describe your research requirements..."
                      className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState !== 'idle'}
                    className={`w-full py-5 rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-3 transition-all ${
                      formState === 'sent' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {formState === 'idle' && (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Message
                      </>
                    )}
                    {formState === 'sending' && (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {formState === 'sent' && "Message Transmitted Successfully"}
                  </motion.button>
                  
                  <p className="text-[10px] text-center text-zinc-400 leading-relaxed px-8">
                    By submitting this form, you acknowledge that all communications are strictly for laboratory research purposes.
                  </p>
                </form>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
