'use client';

import { useAdmin } from '@/context/AdminContext';
import { Edit3, Eye, Save, Settings, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminToolbar() {
  const { isAdmin, isEditMode, setIsEditMode } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-foreground text-white p-2 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 backdrop-blur-xl"
      >
        <div className="px-4 py-2 border-r border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Admin Controls</p>
          <p className="text-xs font-bold">Helivex Labs Live</p>
        </div>
        
        <Link 
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs hover:bg-white/10 text-white/70"
        >
          <LayoutDashboard className="h-4 w-4" />
          DASHBOARD
        </Link>

        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${
            isEditMode 
              ? 'bg-primary text-white shadow-lg shadow-primary/30' 
              : 'hover:bg-white/10 text-white/70'
          }`}
        >
          {isEditMode ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {isEditMode ? 'EXIT EDIT MODE' : 'ENTER EDIT MODE'}
        </button>

        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/50">
          <Settings className="h-4 w-4" />
        </button>
      </motion.div>
      
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-4 right-0 bg-primary text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tighter shadow-lg"
        >
          LIVE EDIT MODE ACTIVE
        </motion.div>
      )}
    </div>
  );
}
