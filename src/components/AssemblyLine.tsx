'use client';

import React from 'react';
import { motion } from 'framer-motion';

const VialIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-12 h-12 ${color}`}>
    <path d="M7 2h10" />
    <path d="M10 2v18a2 2 0 0 0 4 0V2" />
    <path d="M10 11h4" />
    <path d="M10 16h4" />
    {/* Liquid inside */}
    <motion.path 
      d="M10 14h4"
      animate={{ d: ["M10 14h4", "M10 13h4", "M10 14h4"] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

export default function AssemblyLine() {
  const vials = Array.from({ length: 15 });

  return (
    <div className="relative w-full h-48 bg-foreground overflow-hidden flex items-center border-y border-white/5">
      {/* Conveyor Belt Track */}
      <div className="absolute w-full h-2 bg-white/5 bottom-12" />
      <div className="absolute w-full h-[1px] bg-white/10 bottom-[46px]" />
      
      {/* Moving Vials Container */}
      <motion.div 
        className="flex gap-24 items-end pb-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {[...vials, ...vials].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center group">
            {/* Shadow */}
            <div className="absolute -bottom-1 w-8 h-2 bg-black/40 blur-sm rounded-full" />
            
            {/* The Vial */}
            <div className="relative transform-gpu transition-transform group-hover:scale-110">
              <VialIcon color={i % 2 === 0 ? "text-primary" : "text-secondary"} />
              
              {/* Batch Tag Label */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] text-white/60 whitespace-nowrap border border-white/5">
                BATCH #{1000 + i}
              </div>
            </div>
            
            {/* Mechanical "Holder" on the belt */}
            <div className="w-10 h-1 bg-white/20 mt-2 rounded-full" />
          </div>
        ))}
      </motion.div>

      {/* Static "Scanning" Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-secondary/20 shadow-[0_0_15px_rgba(var(--secondary),0.5)]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
      </div>

      {/* Label Overlay */}
      <div className="absolute top-4 left-6 z-20">
        <p className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">Peptide Synthesis Line // active</p>
      </div>
    </div>
  );
}
