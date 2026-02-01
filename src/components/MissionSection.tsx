'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Star, Truck, Beaker, Globe, Zap, Save } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { updateMissionPositions } from '@/app/actions/updateMissionPositions';

// --- POSITION MARKERS ---
const CARD_1_POS = /* CARD_1_START */ { x: 0, y: 0 } /* CARD_1_END */;
const CARD_2_POS = /* CARD_2_START */ { x: 0, y: 0 } /* CARD_2_END */;
const CARD_3_POS = /* CARD_3_START */ { x: 0, y: 0 } /* CARD_3_END */;

export default function MissionSection() {
  const { isEditMode } = useAdmin();
  const [positions, setPositions] = useState([CARD_1_POS, CARD_2_POS, CARD_3_POS]);
  const [isSaving, setIsSaving] = useState(false);

  const features = [
    { icon: Star, text: "Premium Quality", color: "bg-primary" },
    { icon: Zap, text: "99% PURE & TESTED", color: "bg-primary" },
    { icon: Truck, text: "Ships in 3-5 days", color: "bg-primary" },
  ];

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
      dotPosition: "top-[50%] right-[-10px]"
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
      await updateMissionPositions(positions);
      alert('Positions saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save positions.');
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
        
        {/* Top Feature Bars */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${feature.color} text-white px-8 py-3 rounded-lg flex items-center gap-3 shadow-lg min-w-[240px] justify-center`}
            >
              <feature.icon size={18} />
              <span className="text-sm font-black tracking-widest uppercase">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Mission Text */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-black tracking-tight text-[#0A3D62]"
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 leading-relaxed text-lg"
          >
            At Helivex Labs, our purpose is to deliver research peptides at fair, transparent prices. We are built on a foundation of trust, integrity, and uncompromising standards, ensuring the research community can rely on us every step of the way.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#0A3D62] font-black text-lg italic"
          >
            When it comes to purity and service, we would sooner step away than sacrifice the standards that define us.
          </motion.p>
        </div>

        {/* Interactive Vial Display */}
        <div className="relative max-w-lg mx-auto aspect-square flex items-center justify-center">
          
          {/* Background medical "twist" - pulse rings */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.05, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 border-2 border-primary/20 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0, 0.05] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute inset-[-40px] border border-primary/10 rounded-full"
            />
          </div>

          {/* Central Vial */}
          <motion.div
            initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: -25, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-10 w-64 h-80"
          >
            <Image 
              src="/vial.png"
              alt="Helivex Vial"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            />
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
              className={`absolute ${callout.position} z-20 hidden md:block w-64 ${isEditMode ? 'cursor-move' : ''}`}
            >
              <div className={`bg-white border ${isEditMode ? 'border-primary' : 'border-black/[0.03]'} p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative group hover:shadow-xl transition-all duration-500`}>
                <h4 className="text-sm font-black text-zinc-900 mb-2 uppercase tracking-tight">{callout.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{callout.description}</p>
                
                {/* Connecting Dot & Line */}
                <div className={`absolute ${callout.dotPosition} flex items-center`}>
                  <div className="w-3 h-3 rounded-full bg-[#D48806] border-2 border-white shadow-sm" />
                </div>
              </div>
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
