'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Beaker, Globe, Save, RotateCcw, Maximize, Minimize } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { updateMissionPositions } from '@/app/actions/updateMissionPositions';

// --- POSITION MARKERS ---
const CARD_1_POS = /* CARD_1_START */ { x: 145, y: 158 } /* CARD_1_END */;
const CARD_2_POS = /* CARD_2_START */ { x: 563, y: -148 } /* CARD_2_END */;
const CARD_3_POS = /* CARD_3_START */ { x: -118, y: -400 } /* CARD_3_END */;
const VIAL_DATA = /* VIAL_START */ { x: 4, y: -42, rotate: 11, scale: 1.9 } /* VIAL_END */;

export default function MissionSection() {
  const { isEditMode } = useAdmin();
  const [positions, setPositions] = useState([CARD_1_POS, CARD_2_POS, CARD_3_POS]);
  const [vialData, setVialData] = useState(VIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [orbs, setOrbs] = useState<any[]>([]);

  useEffect(() => {
    // Generate random flying orbs on the client to avoid hydration mismatch
    const generatedOrbs = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      // Create a path of random points
      x: Array.from({ length: 5 }).map(() => Math.random() * 600 - 300),
      y: Array.from({ length: 5 }).map(() => Math.random() * 600 - 300),
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      maxOpacity: Math.random() * 0.4 + 0.1
    }));
    setOrbs(generatedOrbs);
  }, []);

  const handleFreeRotate = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isRotating) return;
    
    const vialElement = document.getElementById('vial-container');
    if (!vialElement) return;

    const rect = vialElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setVialData(prev => ({ ...prev, rotate: angle + 90 })); // Offset by 90 to align with top handle
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

  const callouts = [
    {
      title: "Trusted Brand",
      description: "A vendor you can trust with the upmost integrity.",
      position: "top-[-20%] left-[-40%]",
      dotPosition: "top-[50%] right-[-10px]"
    },
    {
      title: "Research Use Only",
      description: "Labeled for research and laboratory use only.",
      position: "bottom-[10%] left-[-45%]",
      dotPosition: "top-[50%] left-[-10px]"
    },
    {
      title: "In the U.S.A.",
      description: "Product is shipped from the US so it gets to your door faster.",
      position: "bottom-[5%] right-[-45%]",
      dotPosition: "top-[50%] left-[-10px]"
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateMissionPositions(positions, vialData);
      if (result.success) {
        if (result.message) {
          alert(result.message);
        } else {
          alert('Positions and transformations saved successfully!');
        }
        setTimeout(() => {
          // Use a timestamp to bust the browser cache on reload
          window.location.href = window.location.pathname + '?t=' + Date.now();
        }, 500);
      } else {
        alert('Failed to save: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {isEditMode && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Mission Layout'}
          </button>
        </div>
      )}

      <div className="container mx-auto px-6">
        
        {/* Mission Text */}
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-primary uppercase"
          >
            Purity & Sourcing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 leading-relaxed text-base md:text-lg px-4 md:px-0"
          >
            At Helivex Labs, we prioritize absolute peptide purity and meticulous sourcing. Every compound in our inventory undergoes a rigorous selection process and comprehensive third-party laboratory analysis to ensure it meets the highest scientific standards for your research.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-black text-base md:text-lg italic px-4 md:px-0"
          >
            Our commitment to purity is driven by a collective vetting standard, ensuring every research compound meets the uncompromising quality that defines us.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <Link href="/about" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold tracking-widest text-[10px] hover:bg-zinc-900 transition-all duration-300 shadow-lg inline-block">
              ABOUT OUR STANDARDS
            </Link>
          </motion.div>
        </div>

        {/* Interactive Vial Display */}
        <div className="relative max-w-lg mx-auto aspect-square flex items-center justify-center">
          
          {/* Background medical "twist" - pulse rings */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            {/* Pulsating Brand Color Glow around Vial */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
                filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-80 rounded-full"
              style={{ backgroundColor: '#F4A7A4' }}
            />
            
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.08, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-full h-full border-2 border-[#F4A7A4]/30 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0, 0.08] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute w-[120%] h-[120%] border border-[#F4A7A4]/20 rounded-full"
            />
          </div>

          {/* Flying Orbs */}
          <div className="absolute inset-0 pointer-events-none z-[15]">
            {orbs.map((orb) => (
              <motion.div
                key={orb.id}
                className="absolute rounded-full"
                style={{
                  width: orb.size,
                  height: orb.size,
                  backgroundColor: '#F4A7A4',
                  filter: 'blur(1px)',
                  boxShadow: '0 0 8px rgba(244, 167, 164, 0.4)',
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: orb.x,
                  y: orb.y,
                  opacity: [0, orb.maxOpacity, orb.maxOpacity, 0],
                }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  delay: orb.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Central Vial */}
          <motion.div
            id="vial-container"
            drag={isEditMode && !isRotating}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              setVialData(prev => ({
                ...prev,
                x: prev.x + info.offset.x,
                y: prev.y + info.offset.y
              }));
            }}
            initial={false}
            animate={{ 
              rotate: vialData.rotate, 
              scale: vialData.scale,
              x: vialData.x,
              y: vialData.y,
              opacity: 1 
            }}
            transition={isRotating ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 20 }}
            className={`relative z-10 w-64 h-80 group ${isEditMode ? 'cursor-move ring-2 ring-primary ring-offset-4 rounded-3xl' : ''}`}
          >
            <Image 
              src="/vial.png"
              alt="Helivex Vial"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-none"
            />
            
            {/* Vial Edit Controls Overlay */}
            {isEditMode && (
              <>
                {/* Free Transform Rotation Circle - Appears when hovering near edges */}
                <motion.div 
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsRotating(true);
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "#fff" }}
                  className="absolute -top-12 -right-12 w-10 h-10 rounded-full bg-white border-2 border-primary shadow-xl flex items-center justify-center text-primary cursor-alias z-[70] group/rotate-circle opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <RotateCcw size={20} className="group-hover/rotate-circle:rotate-45 transition-transform" />
                  <div className="absolute -top-8 bg-primary text-white text-[8px] font-black px-2 py-1 rounded uppercase opacity-0 group-hover/rotate-circle:opacity-100 transition-opacity whitespace-nowrap">
                    Hold to Rotate
                  </div>
                </motion.div>

                {/* Legacy Top Handle */}
                <div 
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsRotating(true);
                  }}
                  className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-alias group/rotate z-[60] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded uppercase opacity-0 group-hover/rotate:opacity-100 transition-opacity">FREE_ROTATE</div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-primary shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <RotateCcw size={16} />
                  </div>
                  <div className="w-0.5 h-8 bg-primary/30" />
                </div>

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white p-2 rounded-xl shadow-xl border border-primary/20 z-50">
                  <button 
                    onClick={() => setVialData(prev => ({ ...prev, rotate: Math.round(prev.rotate / 90) * 90 + 90 }))}
                    className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    title="Snap 90°"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-zinc-200 mx-1" />
                  <button 
                    onClick={() => setVialData(prev => ({ ...prev, scale: Math.min(prev.scale + 0.1, 2) }))}
                    className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    title="Increase Size"
                  >
                    <Maximize size={16} />
                  </button>
                  <button 
                    onClick={() => setVialData(prev => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.5) }))}
                    className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    title="Decrease Size"
                  >
                    <Minimize size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Callout Cards */}
          {callouts.map((callout, i) => (
            <motion.div
              key={i}
              drag={isEditMode}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const newPositions = [...positions];
                newPositions[i] = {
                  x: positions[i].x + info.offset.x,
                  y: positions[i].y + info.offset.y
                };
                setPositions(newPositions);
              }}
              initial={false}
              animate={{ 
                x: positions[i].x, 
                y: positions[i].y,
                opacity: 1
              }}
              className={`absolute ${callout.position} z-20 hidden md:block w-64 group ${isEditMode ? 'cursor-move' : ''}`}
            >
              {/* The Hover Target Area (The Dot) */}
              <div className={`absolute ${callout.dotPosition} z-30 cursor-pointer`}>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0px rgba(236, 72, 153, 0.4)",
                      "0 0 0 10px rgba(236, 72, 153, 0)",
                      "0 0 0 0px rgba(236, 72, 153, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-4 h-4 rounded-full bg-[#EC4899] border-2 border-white shadow-lg"
                />
              </div>

              {/* The Revealable Content */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: callout.dotPosition.includes('right') ? 10 : -10 }}
                whileHover={{ opacity: 1, scale: 1, x: 0 }}
                animate={isEditMode ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`bg-white border ${isEditMode ? 'border-primary' : 'border-black/[0.03]'} p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative group-hover:z-40 pointer-events-none group-hover:pointer-events-auto`}
              >
                <h4 className="text-sm font-black text-zinc-900 mb-2 uppercase tracking-tight">{callout.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{callout.description}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Mobile version of callouts */}
          <div className="md:hidden absolute -bottom-20 left-0 right-0 space-y-4">
             {/* Mobile text content could go here if needed, but keeping it clean for now */}
          </div>
        </div>

      </div>
    </section>
  );
}
