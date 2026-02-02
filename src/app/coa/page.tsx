'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowLeft, CheckCircle2, ShieldCheck, Search, Download, FlaskConical, Upload, Plus, X, Camera, Loader2, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

const INITIAL_COA_DATA = [
  {
    id: 'reta-1',
    name: 'RETATRUTIDE',
    batch: 'HXV-RETA-2026-01',
    purity: '99.421%',
    quantity: '5mg',
    weight: '5162.34 g/mol',
    date: 'JAN 15, 2026',
    ref: '#HXV-2026-0882',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tirz-1',
    name: 'TIRZEPATIDE',
    batch: 'HXV-TIRZ-2026-05',
    purity: '99.242%',
    quantity: '10mg',
    weight: '4813.52 g/mol',
    date: 'FEB 01, 2026',
    ref: '#HXV-2026-0442',
    image: 'https://images.unsplash.com/photo-1579154273155-08e826359516?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mots-c-1',
    name: 'MOTS-C',
    batch: 'HXV-MOTS-2026-12',
    purity: '99.115%',
    quantity: '5mg',
    weight: '2174.62 g/mol',
    date: 'JAN 28, 2026',
    ref: '#HXV-2026-1129',
    image: 'https://images.unsplash.com/photo-1532187875605-1ef6c237a195?auto=format&fit=crop&q=80&w=800'
  }
];

export default function COAPage() {
  const { isAdmin } = useAdmin();
  const [view, setView] = useState<'table' | 'gallery' | 'examine'>('table');
  const [coas, setCoas] = useState(INITIAL_COA_DATA);
  const [selectedCOA, setSelectedCOA] = useState<null | typeof INITIAL_COA_DATA[0]>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (view !== 'examine') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotation({ x: x * 30, y: -y * 30 });
  };

  const handleDocumentClick = (coa: typeof INITIAL_COA_DATA[0]) => {
    setSelectedCOA(coa);
    setView('examine');
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate OCR Detection Logic
    setTimeout(() => {
      const names = ['GLP-1', 'BPC-157', 'TB-500', 'IPAMORELIN', 'SEMAGLUTIDE'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPurity = (99.1 + Math.random() * 0.8).toFixed(3) + '%';
      const randomQty = [5, 10, 15][Math.floor(Math.random() * 3)] + 'mg';
      
      const newCOA = {
        id: Math.random().toString(36).substr(2, 9),
        name: randomName,
        batch: `HXV-${randomName}-${new Date().getFullYear()}-${Math.floor(Math.random() * 100)}`,
        purity: randomPurity,
        quantity: randomQty,
        weight: (2000 + Math.random() * 3000).toFixed(2) + ' g/mol',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
        ref: `#HXV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
        image: URL.createObjectURL(file)
      };

      setCoas([newCOA, ...coas]);
      setIsProcessing(false);
      setIsUploading(false);
      
      // Auto-examine the new upload
      setSelectedCOA(newCOA);
      setView('examine');
    }, 2500);
  };

  return (
    <div 
      className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-primary/10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'table' ? (
          <motion.div 
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-50/50"
          >
            {/* Lab Table Surface with Perspective */}
            <div className="absolute inset-0 z-0 perspective-[2000px] flex items-center justify-center">
              <div 
                className="w-[200%] h-[120%] bg-white border-t border-zinc-200 shadow-[0_-20px_100px_rgba(0,0,0,0.05)] origin-bottom"
                style={{ transform: 'rotateX(65deg) translateY(30%)' }}
              />
            </div>

            <div className="relative z-10 text-center mb-16 px-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-4">Laboratory Records</h2>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">RESEARCH_ARCHIVE</h1>
                <p className="text-zinc-400 text-[10px] md:text-xs font-mono mt-4 uppercase tracking-widest">Select a document from the table to examine</p>
              </motion.div>
            </div>

            {/* Documents on the Table */}
            <div className="relative z-10 w-full max-w-6xl h-[400px] perspective-[2000px] flex items-center justify-center">
              <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 items-center justify-center px-6">
                {coas.map((coa, i) => (
                  <motion.div
                    key={coa.id}
                    initial={{ opacity: 0, y: 100, rotateX: 45 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 25, 
                      rotateY: (i - 1) * 12,
                      z: Math.abs(i - 1) * -80
                    }}
                    whileHover={{ 
                      y: -80, 
                      rotateX: 0, 
                      rotateY: 0, 
                      z: 200,
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    onClick={() => handleDocumentClick(coa)}
                    className="cursor-pointer group relative"
                  >
                    {/* The Paper Document */}
                    <div className="bg-white border border-zinc-200 w-44 h-60 md:w-56 md:h-72 shadow-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group-hover:border-primary/40 transition-colors">
                      {/* Paper Texture Overlay */}
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                      
                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-300 group-hover:text-primary transition-colors">
                            <FlaskConical size={18} />
                          </div>
                          <div className="text-[7px] md:text-[8px] font-black font-mono text-zinc-300 tracking-tighter uppercase">Official Record</div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xs md:text-sm font-black tracking-tighter uppercase group-hover:text-primary transition-colors leading-none">{coa.name}</h3>
                          <div className="w-full h-[1px] bg-zinc-100" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2 pt-1 md:pt-2">
                          <div className="w-full h-1 bg-zinc-50/80 rounded-full" />
                          <div className="w-4/5 h-1 bg-zinc-50/80 rounded-full" />
                          <div className="w-full h-1 bg-zinc-50/80 rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-2 md:space-y-3 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <div className="text-[8px] md:text-[10px] font-black font-mono text-zinc-400">PURITY: <span className="text-zinc-900">{coa.purity}</span></div>
                        </div>
                        <div className="text-[6px] md:text-[7px] font-black tracking-[0.2em] text-zinc-300 group-hover:text-primary transition-colors">CLICK_TO_EXAMINE</div>
                      </div>

                      {/* Paper Corner Fold Effect */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-50 group-hover:bg-primary/5 transition-colors origin-top-right transform rotate-45 translate-x-4 -translate-y-4 border-l border-b border-zinc-200" />
                    </div>
                    
                    {/* Shadow on Table */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/5 blur-2xl rounded-full group-hover:opacity-20 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 md:mt-20 flex flex-col md:flex-row gap-6 md:gap-12">
              <button 
                onClick={() => setView('gallery')}
                className="px-8 py-3 bg-zinc-900 text-white text-[10px] font-black tracking-[0.3em] rounded-full hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                OPEN DIGITAL DATABASE
              </button>
            </div>
          </motion.div>
        ) : view === 'gallery' ? (
          <motion.div 
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-6 py-32"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <button 
                  onClick={() => setView('table')}
                  className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-400 hover:text-primary transition-colors mb-4"
                >
                  <ArrowLeft size={14} /> BACK_TO_TABLE
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Live Database</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter">COA_ARCHIVE</h1>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                  Verified analysis for every synthesis batch. Our purity standards are maintained through rigorous third-party validation.
                </p>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden" 
                    accept="image/*"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="group relative px-8 py-5 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative flex items-center gap-4">
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span className="text-xs font-black tracking-[0.2em]">ANALYZING_SCAN...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          <span className="text-xs font-black tracking-[0.2em]">UPLOAD_NEW_COA</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {coas.map((coa) => (
                <motion.div
                  key={coa.id}
                  layoutId={coa.id}
                  onClick={() => {
                    setSelectedCOA(coa);
                    setView('examine');
                  }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/4] bg-zinc-50 border border-zinc-100 rounded-3xl overflow-hidden relative shadow-sm group-hover:shadow-2xl group-hover:border-primary/20 transition-all duration-500">
                    <img 
                      src={coa.image} 
                      alt={coa.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-primary rounded-full">
                          <span className="text-[8px] font-black text-white tracking-widest">VERIFIED</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-white/50 tracking-[0.3em] uppercase mb-2">{coa.batch}</span>
                      <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{coa.name}</h3>
                    </div>
                  </div>
                  
                  {/* Meta Data Under Image */}
                  <div className="mt-6 space-y-3 px-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">Purity Level</span>
                      <span className="text-sm font-mono font-bold text-green-600">{coa.purity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">Quantity</span>
                      <span className="text-sm font-mono font-bold">{coa.quantity}</span>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-zinc-300 tracking-widest uppercase">Synthesis Date</span>
                      <span className="text-[10px] font-mono font-bold text-zinc-400">{coa.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="examine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center justify-center min-h-screen">
              {/* 3D Visualizer Side */}
              <div className="w-full lg:w-1/2 flex items-center justify-center perspective-[2000px]">
                <motion.div
                  animate={{ 
                    rotateX: rotation.x, 
                    rotateY: rotation.y,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 30 }}
                  className="relative group"
                >
                  <div className="bg-white border border-zinc-200 w-[350px] md:w-[450px] aspect-[3/4] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden relative">
                    <img 
                      src={selectedCOA?.image} 
                      className="w-full h-full object-cover"
                      alt="Full Analysis"
                    />
                    {/* Paper Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-white shadow-inner" />
                  </div>
                  {/* 3D Depth Edges */}
                  <div className="absolute inset-0 bg-zinc-100 translate-z-[-2px] border border-zinc-200" />
                  <div className="absolute inset-0 bg-zinc-50 translate-z-[-4px] border border-zinc-200" />
                </motion.div>
              </div>

              {/* Data Side */}
              <div className="w-full lg:w-1/2 max-w-xl space-y-12">
                <div className="space-y-6">
                  <button 
                    onClick={() => setView('table')}
                    className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-400 hover:text-primary transition-colors"
                  >
                    <ArrowLeft size={14} /> BACK_TO_TABLE
                  </button>
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black tracking-tighter uppercase">{selectedCOA?.name}</h2>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full flex items-center gap-2">
                        <CheckCircle2 size="14" />
                        <span className="text-[10px] font-black tracking-widest">VERIFIED_99%+</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{selectedCOA?.ref}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 bg-zinc-50 rounded-3xl space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">HPLC Purity</span>
                    <p className="text-3xl font-black text-green-600 tracking-tighter">{selectedCOA?.purity}</p>
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-3xl space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">Target Quantity</span>
                    <p className="text-3xl font-black tracking-tighter">{selectedCOA?.quantity}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between py-4 border-b border-zinc-100">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Batch Identifier</span>
                    <span className="text-xs font-mono font-bold">{selectedCOA?.batch}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-zinc-100">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Molecular Mass</span>
                    <span className="text-xs font-mono font-bold">{selectedCOA?.weight}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-zinc-100">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Verification Date</span>
                    <span className="text-xs font-mono font-bold">{selectedCOA?.date}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-5 bg-zinc-900 text-white text-[10px] font-black tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    <Download size={16} /> DOWNLOAD_FULL_REPORT
                  </button>
                  <button className="p-5 border-2 border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors">
                    <Search size={20} className="text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
