'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Zap, Beaker, Search, Database, Fingerprint } from 'lucide-react';
import { LabIcons } from '@/components/LabArt';

const DataRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center py-1 border-b border-white/5">
    <span className="text-[10px] uppercase tracking-wider text-white/40">{label}</span>
    <span className={`text-[10px] font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default function MedicalCore() {
  const [activeScan, setActiveScan] = useState(0);
  const [metrics, setMetrics] = useState({
    purity: '99.82%',
    stability: 'Optimal',
    sequence: 'R30-00-1111',
  });

  const [scanLines, setScanLines] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        purity: (99.8 + Math.random() * 0.1).toFixed(2) + '%',
      }));
      setScanLines(prev => [...prev.slice(-10), Math.random() * 100]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[600px] bg-foreground overflow-hidden py-24 px-6 border-y border-white/5">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(158,27,27,0.05),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[size:40px_40px] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
        
        {/* Animated Grid Lines */}
        <motion.div 
          animate={{ y: [0, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.05] bg-[size:40px_40px] bg-[linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
        />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Visual Analysis Core */}
          <div className="w-full lg:w-1/2 relative aspect-square max-w-[500px]">
            {/* HUD Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-primary/10 rounded-full border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border-2 border-white/5 rounded-full border-dotted"
            />
            
            {/* Scanning Laser and Conic Gradient */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_90deg,rgba(158,27,27,0.15)_100deg)] rounded-full"
            />

            {/* Central Analysis Window */}
            <div className="absolute inset-20 border border-white/10 rounded-full flex items-center justify-center bg-zinc-950/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Waveform Visualization */}
              <div className="absolute inset-0 flex items-center justify-around px-12 opacity-20">
                {scanLines.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>

              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-primary z-10 w-32 h-32"
              >
                <LabIcons.Vial />
              </motion.div>
              
              {/* Internal HUD Markers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-primary/40" />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-primary/40" />
                <div className="absolute left-10 top-1/2 -translate-y-1/2 h-0.5 w-4 bg-primary/40" />
                <div className="absolute right-10 top-1/2 -translate-y-1/2 h-0.5 w-4 bg-primary/40" />
              </div>
            </div>

            {/* Exterior HUD Data Nodes */}
            {[
              { label: 'NODE_V.104', val: 'PURITY 99.242%', pos: 'top-0 left-0', color: 'text-green-400' },
              { label: 'NODE_V.105', val: 'STERILITY - NO GROWTH DETECTED', pos: 'top-0 right-0', color: 'text-blue-400' },
              { label: 'NODE_V.106', val: 'ENDOTOXINS < 0.0239 EU/mg', pos: 'bottom-0 left-0', color: 'text-primary' },
              { label: 'NODE_V.107', val: 'QUANTITY 30.02mg', pos: 'bottom-0 right-0', color: 'text-secondary' },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute p-3 bg-zinc-900/90 border border-white/10 rounded-lg backdrop-blur-md z-20 min-w-[120px] ${node.pos}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-white/40 tracking-widest">{node.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className={`text-xs font-mono font-bold ${node.color}`}>{node.val}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Data Interface */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary border border-primary/20">
                  <Cpu size={22} />
                </div>
                <h3 className="text-[11px] font-bold tracking-[0.5em] text-primary uppercase">Quantum Lab Interface v4.0</h3>
              </motion.div>
              <h2 className="text-5xl font-bold tracking-tighter text-white leading-[0.9]">
                ADVANCED <br />
                <span className="text-primary italic">MOLECULAR</span> <br />
                DIAGNOSTICS
              </h2>
              <p className="text-white/50 max-w-md text-sm leading-relaxed">
                Real-time synthesis monitoring and purity verification. Our medical-grade infrastructure ensures every batch meets the Helivex Gold Standard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Metrics Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/40 border border-white/10 p-7 rounded-2xl space-y-5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-white/40">
                  <div className="flex items-center gap-2">
                    <Database size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Live Metrics</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-primary/40 rounded-full" />
                    <div className="w-1 h-3 bg-primary rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <DataRow label="Batch Purity" value={metrics.purity} color="text-green-400" />
                  <DataRow label="Stability Index" value={metrics.stability} color="text-primary" />
                  <DataRow label="Sequence ID" value={metrics.sequence} color="text-white" />
                </div>
              </motion.div>

              {/* Security/Verification Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/40 border border-white/10 p-7 rounded-2xl space-y-5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-white/40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Security Protocol</span>
                  </div>
                </div>
                <div className="flex items-center gap-5 py-2">
                  <div className="relative p-3 bg-white/5 rounded-xl w-16 h-16 flex items-center justify-center">
                    <div className="text-primary opacity-60 w-10 h-10">
                      <LabIcons.Vial />
                    </div>
                    <motion.div 
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_rgba(158,27,27,0.8)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-white tracking-widest">VERIFIED</p>
                    <p className="text-[9px] text-white/40 font-mono">ENCRYPTED_CHAIN_ID: 0x7F...3E</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase">
                    <span>Validation Progress</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-gradient-to-r from-primary/50 to-primary"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border border-primary/20 bg-primary/5 rounded-xl flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute inset-0" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary relative" />
                </div>
                <p className="text-[11px] font-mono text-primary font-bold tracking-[0.2em] uppercase">
                  Core Status: Nominal // Integrity Verified
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-4 w-[1px] bg-primary/20" />
                <Search size={16} className="text-primary/40 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Edge Decor & Lighting */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
    </div>
  );
}
