'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  User, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Activity, 
  Clock, 
  ShieldCheck,
  CreditCard,
  Bell,
  ChevronRight,
  Database
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, isLoading } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Protect the route
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'orders', label: 'ORDERS', icon: Package },
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'security', label: 'SECURITY', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-black/5 pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                  <span className="text-[9px] font-black text-primary tracking-widest uppercase">Personnel Profile</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                WELCOME, <span className="text-primary italic">{user.name.toUpperCase()}</span>
              </h1>
              <p className="text-zinc-500 font-medium tracking-tight">
                ID: {user.id} • Registered: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 text-zinc-400 hover:text-primary hover:border-primary/20 rounded-2xl font-black text-[10px] tracking-widest transition-all uppercase"
            >
              <LogOut size={16} /> Terminate Session
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-zinc-400 hover:bg-white hover:text-zinc-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'TOTAL ORDERS', val: '12', icon: Package, color: 'text-zinc-900' },
                      { label: 'LAB REWARDS', val: '2,450', icon: Activity, color: 'text-primary' },
                      { label: 'DATA INTEGRITY', val: '100%', icon: ShieldCheck, color: 'text-green-600' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-black/5 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-3 bg-zinc-50 rounded-2xl text-zinc-400">
                            <stat.icon size={20} />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-zinc-100" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">{stat.label}</div>
                          <div className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity Section */}
                  <div className="bg-white border border-black/5 rounded-[40px] overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-black/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                          <Clock size={18} />
                        </div>
                        <h3 className="text-xs font-black tracking-widest uppercase">System Activity Log</h3>
                      </div>
                      <Link href="#" className="text-[9px] font-black text-primary hover:underline tracking-widest uppercase">Download Logs</Link>
                    </div>
                    <div className="p-4">
                      {[
                        { event: 'Batch Authentication #RX-9012', date: '2 hours ago', status: 'Completed' },
                        { event: 'Profile Security Key Updated', date: 'Yesterday', status: 'Secure' },
                        { event: 'Order Dispatched: Tirzepatide 10mg', date: '3 days ago', status: 'In Transit' },
                        { event: 'Laboratory Access Granted', date: 'Feb 01, 2026', status: 'Authorized' },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-2xl transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-white transition-colors">
                              <Database size={16} />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight">{log.event}</div>
                              <div className="text-[9px] text-zinc-400 font-medium uppercase tracking-widest">{log.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">{log.status}</span>
                            <ChevronRight size={14} className="text-zinc-300 group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-black/5 rounded-[40px] p-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-zinc-300">
                    <Package size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-zinc-900 uppercase">Archive Empty</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto">No research compound orders found in your current session history.</p>
                  </div>
                  <Link href="/shop" className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-red-700 transition-all">
                    Initialize First Order
                  </Link>
                </motion.div>
              )}

              {/* Other tabs would be implemented similarly */}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
