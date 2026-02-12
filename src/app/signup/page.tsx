'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { UserPlus as UserPlusIcon, Mail as MailIcon, Lock as LockIcon, User as UserIcon, ArrowRight as ArrowRightIcon, Loader2 as Loader2Icon, ShieldCheck as ShieldCheckIcon } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // For now, signup just calls login in our mock
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Abstract Background Tech Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#9e1b1b,transparent)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-black/5 rounded-[40px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-2xl text-primary mb-2">
              <UserPlusIcon size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
              NEW <span className="text-primary italic">PERSONNEL</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
              Establish Lab Credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                  <UserIcon size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                  <MailIcon size={18} />
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
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Secure Access Key
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                  <LockIcon size={18} />
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
                <Loader2Icon className="animate-spin" size={18} />
              ) : (
                <>
                  CREATE CREDENTIALS <ArrowRightIcon size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-zinc-50 text-center">
            <p className="text-xs text-zinc-400 font-medium">
              Already have lab access? <Link href="/login" className="text-primary font-bold hover:underline">Sign In Here</Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
          <ShieldCheckIcon size={14} className="text-green-500" />
          SSL ENCRYPTED SECURE REGISTRATION
        </div>
      </motion.div>
    </div>
  );
}
