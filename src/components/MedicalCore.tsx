'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, ShieldCheck, Cpu, Zap, Beaker, Search, Database, Fingerprint, Pencil, Save, X, RotateCcw, Maximize, Minimize } from 'lucide-react';
import { LabIcons } from '@/components/LabArt';
import { updateVialPosition } from '@/app/actions/updateVialPosition';
import { useAdmin } from '@/context/AdminContext';

const DataRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center py-1 border-b border-black/5">
    <span className="text-[10px] uppercase tracking-wider text-black/40">{label}</span>
    <span className={`text-[10px] font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default function MedicalCore() {
  const [activeScan, setActiveScan] = useState(0);
  const { isEditMode, setIsEditMode } = useAdmin();
  const [vialData, setVialData] = useState(/* VIAL_POS_START */ { x: 0, y: 0, rotate: 0, scale: 1 } /* VIAL_POS_END */);
  const [isSaving, setIsSaving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [metrics, setMetrics] = useState({
    purity: '99.242%',
    stability: 'Optimal',
    sequence: 'R30-00-1111',
  });

  const [scanLines, setScanLines] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        purity: (99.2 + Math.random() * 0.05).toFixed(3) + '%',
      }));
      setScanLines(prev => [...prev.slice(-10), Math.random() * 100]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFreeRotate = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isRotating) return;
    const vialElement = document.getElementById('scanner-vial');
    if (!vialElement) return;
    const rect = vialElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setVialData(prev => ({ ...prev, rotate: angle + 90 }));
  };

  useEffect(() => {
    if (isRotating) {
      const handleMove = (e: any) => handleFreeRotate(e);
      const handleUp = () => setIsRotating(false);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };
    }
  }, [isRotating]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateVialPosition(vialData);
      if (result.success) {
        if (result.message) {
          alert(result.message);
        } else {
          alert('Vial transformation saved successfully!');
        }
        setTimeout(() => {
          // Use a timestamp to bust the browser cache on reload
          window.location.href = window.location.pathname + '?t=' + Date.now();
        }, 500);
      } else {
        alert('Failed to save: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save transformation.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[700px] bg-white overflow-hidden py-32 px-6">
      {/* Edit Mode Save Button */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-10 right-10 z-50"
          >
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-black text-[10px] tracking-widest shadow-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'SAVING...' : <><Save size={16} /> SAVE POSITION</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Tech Elements - Light Mode */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(158,27,27,0.02),transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Side: Visual Analysis Core */}
          <div className="w-full lg:w-1/2 relative aspect-square max-w-[550px]">
            {/* HUD Rings */}
            <div className="absolute inset-0 border border-black/5 rounded-full" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-primary/10 rounded-full border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border-2 border-black/5 rounded-full border-dotted"
            />
            
            {/* Scanning Laser and Conic Gradient */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_90deg,rgba(158,27,27,0.05)_100deg)] rounded-full"
            />

            {/* Central Analysis Window */}
            <div className="absolute inset-20 border border-black/5 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.03)]">
              {/* Waveform Visualization */}
              <div className="absolute inset-0 flex items-center justify-around px-12 opacity-[0.07]">
                {scanLines.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>

              {/* Scanner Core Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  id="scanner-vial"
                  drag={isEditMode && !isRotating}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    setVialData(prev => ({
                      ...prev,
                      x: prev.x + info.offset.x,
                      y: prev.y + info.offset.y
                    }));
                  }}
                  animate={{ 
                    x: vialData.x, 
                    y: vialData.y,
                    rotate: vialData.rotate,
                    scale: vialData.scale
                  }}
                  transition={isRotating ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 20 }}
                  className={`relative w-48 h-64 z-20 group ${isEditMode ? 'cursor-move ring-2 ring-primary ring-offset-4 rounded-3xl' : ''}`}
                >
                  <Link href={isEditMode ? "#" : "/coa"} className={isEditMode ? 'cursor-move' : 'cursor-pointer'}>
                    <Image 
                      src="/vial.png"
                      alt="Research Vial"
                      fill
                      className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-none"
                    />
                  </Link>
                  
                  {/* Scanner "Simmer" Effect */}
                  <motion.div 
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/5 rounded-full blur-2xl -z-10"
                  />

                  {/* Edit Controls Overlay */}
                  {isEditMode && (
                    <>
                      {/* Free Transform Rotation Circle */}
                      <motion.div 
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setIsRotating(true);
                        }}
                        whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "#fff" }}
                        className="absolute -top-10 -right-10 w-9 h-9 rounded-full bg-white border-2 border-primary shadow-xl flex items-center justify-center text-primary cursor-alias z-[70] group/rotate-circle opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <RotateCcw size={18} className="group-hover/rotate-circle:rotate-45 transition-transform" />
                        <div className="absolute -top-8 bg-primary text-white text-[8px] font-black px-2 py-1 rounded uppercase opacity-0 group-hover/rotate-circle:opacity-100 transition-opacity whitespace-nowrap">
                          Hold to Rotate
                        </div>
                      </motion.div>

                      {/* Free Transform Rotation Handle (Legacy) */}
                      <div 
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setIsRotating(true);
                        }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-alias group/rotate z-[60] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded uppercase opacity-0 group-hover/rotate:opacity-100 transition-opacity">FREE_ROTATE</div>
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-primary shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                          <RotateCcw size={16} />
                        </div>
                        <div className="w-0.5 h-6 bg-primary/30" />
                      </div>

                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-xl border border-primary/20 z-50">
                        <button 
                          onClick={() => setVialData(prev => ({ ...prev, rotate: Math.round(prev.rotate / 90) * 90 + 90 }))}
                          className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                          title="Snap 90°"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <div className="w-[1px] h-3 bg-zinc-200 mx-0.5" />
                        <button 
                          onClick={() => setVialData(prev => ({ ...prev, scale: Math.min(prev.scale + 0.1, 2) }))}
                          className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                          title="Increase Size"
                        >
                          <Maximize size={14} />
                        </button>
                        <button 
                          onClick={() => setVialData(prev => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.5) }))}
                          className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                          title="Decrease Size"
                        >
                          <Minimize size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
              
              {/* Internal HUD Markers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/20" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/20" />
                <div className="absolute left-12 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-primary/20" />
                <div className="absolute right-12 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-primary/20" />
              </div>
            </div>

            {/* Exterior HUD Data Nodes */}
            {[
              { label: 'NODE_V.104', val: 'PURITY 99.242%', pos: 'top-0 left-0', color: 'text-green-600', shadow: 'shadow-green-100' },
              { label: 'NODE_V.105', val: 'STERILITY - NO GROWTH', pos: 'top-0 right-0', color: 'text-blue-600', shadow: 'shadow-blue-100' },
              { label: 'NODE_V.106', val: 'ENDOTOXINS < 0.0239 EU/mg', pos: 'bottom-0 left-0', color: 'text-primary', shadow: 'shadow-red-100' },
              { label: 'NODE_V.107', val: 'QUANTITY 30.02mg', pos: 'bottom-0 right-0', color: 'text-zinc-800', shadow: 'shadow-zinc-100' },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`absolute p-4 bg-white/95 border border-black/5 rounded-xl backdrop-blur-md z-20 min-w-[140px] shadow-lg ${node.shadow} ${node.pos}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-black/30 tracking-widest">{node.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className={`text-xs font-mono font-black ${node.color}`}>{node.val}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Data Interface */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 bg-primary/5 rounded-xl text-primary border border-primary/10">
                  <Cpu size={24} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Quantum Lab Interface v4.0</h3>
                  <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
              </motion.div>
              <h2 className="text-6xl font-black tracking-tighter text-zinc-900 leading-[0.85]">
                ADVANCED <br />
                <span className="text-primary italic">MOLECULAR</span> <br />
                DIAGNOSTICS
              </h2>
              <p className="text-zinc-500 max-w-md text-base leading-relaxed">
                Real-time synthesis monitoring and purity verification. Our medical-grade infrastructure ensures every batch meets the Helivex Gold Standard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Metrics Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-zinc-50 border border-black/[0.03] p-8 rounded-3xl space-y-6 shadow-sm"
              >
                <div className="flex items-center justify-between text-black/30">
                  <div className="flex items-center gap-3">
                    <Database size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Metrics</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-1 h-3 bg-primary/20 rounded-full" />
                    <div className="w-1 h-3 bg-primary rounded-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  <DataRow label="Batch Purity" value={metrics.purity} color="text-green-600" />
                  <DataRow label="Stability Index" value={metrics.stability} color="text-primary" />
                  <DataRow label="Sequence ID" value={metrics.sequence} color="text-zinc-900" />
                </div>
              </motion.div>

              {/* Security/Verification Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-zinc-50 border border-black/[0.03] p-8 rounded-3xl space-y-6 shadow-sm"
              >
                <div className="flex items-center justify-between text-black/30">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Security Protocol</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 py-2">
                  <div className="relative p-4 bg-white border border-black/5 rounded-2xl w-20 h-20 flex items-center justify-center shadow-inner overflow-hidden">
                    <div className="relative w-12 h-12 opacity-80">
                      <Image 
                        src="/vial.png"
                        alt="Verified Vial"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <motion.div 
                      animate={{ top: ['15%', '85%', '15%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 w-full h-0.5 bg-primary/40 shadow-[0_0_10px_rgba(158,27,27,0.3)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[12px] font-black text-zinc-900 tracking-widest">VERIFIED</p>
                    <p className="text-[9px] text-zinc-400 font-mono">ENCRYPTED_CHAIN_ID: 0x7F...3E</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[8px] font-mono text-black/40 uppercase">
                    <span>Validation Progress</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 w-full bg-white border border-black/5 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border border-primary/10 bg-primary/[0.02] rounded-2xl flex items-center justify-between backdrop-blur-md shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping absolute inset-0 opacity-20" />
                  <div className="w-3 h-3 rounded-full bg-primary relative" />
                </div>
                <p className="text-[11px] font-mono text-primary font-black tracking-[0.2em] uppercase">
                  Core Status: Nominal // Integrity Verified
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <div className="h-5 w-[1px] bg-primary/10" />
                <Search size={18} className="text-primary/30 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Edge Decor & Lighting */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-20" />
    </div>
  );
}
