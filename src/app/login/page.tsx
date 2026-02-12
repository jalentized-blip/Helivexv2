'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Abstract Background Tech Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#9e1b1b,transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-black/5 rounded-[40px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-2xl text-primary mb-2">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
              LAB <span className="text-primary italic">ACCESS</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium tracking-wide">
              AUTHORIZED PERSONNEL ONLY • ENCRYPTION ACTIVE
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Security ID (Email)
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="name@helivexlabs.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  Access Key
                </label>
                <Link href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
                  Reset Key
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white rounded-2xl py-4 font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  INITIALIZE SESSION <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-zinc-50 flex flex-col items-center gap-6">
            <button className="flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors group">
              <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                <Fingerprint size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Biometric Bypass</span>
            </button>
            <p className="text-xs text-zinc-400 font-medium">
              Don't have lab access? <Link href="/signup" className="text-primary font-bold hover:underline">Register Personnel</Link>
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-8 flex items-center justify-between px-6 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            System: Nominal
          </div>
          <div>Node: US-EAST-1</div>
          <div>V4.0.2</div>
        </div>
      </motion.div>
    </div>
  );
}
