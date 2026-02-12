'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Product, ProductStrength } from '@/data/products';
import { Order, OrderStatus } from '@/data/orders';
import { Plus, Trash2, Save, X, Image as ImageIcon, Beaker, Tag, FileText, ChevronRight, ChevronDown, CloudLightning, Loader2, CheckCircle2, AlertCircle, LogIn, Mail, LogOut, Package, Users, ShoppingBag, Clock, Truck, CheckCircle, XCircle, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const { isAdmin, products, orders, updateProduct, addProduct, deleteProduct, updateOrder, pushToLive, login, userEmail, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Filter orders based on search
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-zinc-50 text-zinc-700 border-zinc-200';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'processing': return <Package className="h-3 w-3" />;
      case 'shipped': return <Truck className="h-3 w-3" />;
      case 'delivered': return <CheckCircle className="h-3 w-3" />;
      case 'cancelled': return <XCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  // If not admin, show login
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-200 p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center space-y-8"
        >
          <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto rotate-12 group-hover:rotate-0 transition-transform">
            <Beaker className="text-primary h-10 w-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">Admin Access</h1>
            <p className="text-zinc-500 font-medium text-sm">Enter your authorized researcher email to continue.</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input 
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Researcher Email"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
              />
            </div>
            
            <button 
              onClick={() => login(emailInput)}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            >
              <LogIn className="h-4 w-4" />
              AUTHENTICATE_SESSION
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <Link href="/" className="text-[10px] font-black text-zinc-400 hover:text-primary transition-colors tracking-widest uppercase">
              ← Return to Helivex Labs
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct({ ...product, strengths: [...product.strengths.map(s => ({ ...s }))] });
    setIsAddingNew(false);
  };

  const handleAddNewClick = () => {
    setEditingProduct({
      id: `prod_${Date.now()}`,
      name: '',
      image: '/helivexproductlogo.png',
      description: '',
      category: 'Peptides',
      strengths: [{ id: '5mg', label: '5mg', price: 0 }],
      hasKit: false,
      coaImage: '/coa-placeholder.jpg'
    });
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      if (isAddingNew) {
        addProduct(editingProduct);
      } else {
        updateProduct(editingProduct);
      }
      setEditingProduct(null);
      setIsAddingNew(false);
    }
  };

  const handleStrengthPriceChange = (strengthId: string, newPrice: number) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        strengths: editingProduct.strengths.map(s => s.id === strengthId ? { ...s, price: newPrice } : s)
      });
    }
  };

  const handleAddStrength = () => {
    if (editingProduct) {
      const newId = `strength_${Date.now()}`;
      setEditingProduct({
        ...editingProduct,
        strengths: [...editingProduct.strengths, { id: newId, label: 'New Concentration', price: 0 }]
      });
    }
  };

  const handleRemoveStrength = (id: string) => {
    if (editingProduct && editingProduct.strengths.length > 1) {
      setEditingProduct({
        ...editingProduct,
        strengths: editingProduct.strengths.filter(s => s.id !== id)
      });
    }
  };

  const handlePushToLive = async () => {
    setIsPushing(true);
    setPushStatus(null);
    try {
      const result = await pushToLive();
      setPushStatus({ success: result.success, message: result.message || (result.success ? 'Updates pushed successfully!' : result.error) });
      if (result.success) {
        setTimeout(() => setPushStatus(null), 5000);
      }
    } catch (error) {
      setPushStatus({ success: false, message: 'An unexpected error occurred.' });
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Beaker className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">Admin Control Panel</h1>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Product Management & Global Pricing</p>
                <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded-full border border-primary/10">{userEmail}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {pushStatus && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-right-4 ${pushStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {pushStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                {pushStatus.message}
              </div>
            )}
            
            <button 
              onClick={handlePushToLive}
              disabled={isPushing}
              className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-black text-xs tracking-widest flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPushing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CloudLightning className="h-4 w-4 text-yellow-400" />
              )}
              {isPushing ? 'PUSHING...' : 'PUSH TO LIVE'}
            </button>

            {activeTab === 'products' && (
              <button 
                onClick={handleAddNewClick}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-xs tracking-widest flex items-center gap-2 hover:bg-accent transition-all shadow-lg shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
                ADD PRODUCT
              </button>
            )}

            <button 
              onClick={logout}
              className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 text-xs font-black tracking-widest uppercase transition-all relative ${activeTab === 'products' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Inventory_Catalog
              </div>
              {activeTab === 'products' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 text-xs font-black tracking-widest uppercase transition-all relative ${activeTab === 'orders' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer_Orders
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px]">
                  {orders.length}
                </span>
              </div>
              {activeTab === 'orders' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'products' ? (
            <motion.div 
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Product List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                  <div className="p-4 bg-zinc-50 border-b border-zinc-200">
                    <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Inventory List</h2>
                  </div>
                  <div className="divide-y divide-zinc-100">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleEditClick(product)}
                        className={`w-full p-4 flex items-center gap-4 transition-colors hover:bg-zinc-50 ${editingProduct?.id === product.id ? 'bg-zinc-50' : ''}`}
                      >
                        <div className="relative w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
                          <img src={product.image} alt="" className="object-contain p-2" />
                        </div>
                        <div className="flex-grow text-left">
                          <p className="font-bold text-sm">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{product.category}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Edit Panel */}
              <div className="lg:col-span-2">
                {editingProduct ? (
                  <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black tracking-tight uppercase">
                          {isAddingNew ? 'Register New Product' : `Edit: ${editingProduct.name}`}
                        </h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Update specifications and laboratory pricing</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingProduct(null)}
                          className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                        >
                          <X className="h-5 w-5 text-zinc-400" />
                        </button>
                      </div>
                    </div>

                    <div className="p-8 space-y-8">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Product Name</label>
                          <input 
                            type="text" 
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="e.g. BPC-157"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Category</label>
                          <input 
                            type="text" 
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      {/* Images */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Product Image Path</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input 
                              type="text" 
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-12 pr-4 py-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">COA Image Path</label>
                          <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input 
                              type="text" 
                              value={editingProduct.coaImage}
                              onChange={(e) => setEditingProduct({ ...editingProduct, coaImage: e.target.value })}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-12 pr-4 py-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Research Description</label>
                        <textarea 
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          rows={4}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </div>

                      {/* Concentration Pricing */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Concentration Pricing (Dynamic)</label>
                          <button 
                            onClick={handleAddStrength}
                            className="text-[10px] font-black text-primary hover:text-accent flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            ADD OPTION
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {editingProduct.strengths.map((strength) => (
                            <div key={strength.id} className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 animate-in slide-in-from-right-4 duration-200">
                              <div className="flex-grow grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest px-1">Label</label>
                                  <input 
                                    type="text"
                                    value={strength.label}
                                    onChange={(e) => {
                                      const updatedStrengths = editingProduct.strengths.map(s => 
                                        s.id === strength.id ? { ...s, label: e.target.value } : s
                                      );
                                      setEditingProduct({ ...editingProduct, strengths: updatedStrengths });
                                    }}
                                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest px-1">Price ($)</label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">$</span>
                                    <input 
                                      type="number"
                                      value={strength.price}
                                      onChange={(e) => handleStrengthPriceChange(strength.id, parseFloat(e.target.value) || 0)}
                                      className="w-full bg-white border border-zinc-200 rounded-lg pl-8 pr-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleRemoveStrength(strength.id)}
                                className="mt-4 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                disabled={editingProduct.strengths.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Save Actions */}
                      <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
                        <button 
                          onClick={() => {
                            if (window.confirm('Permanently delete this product?')) {
                              deleteProduct(editingProduct.id);
                              setEditingProduct(null);
                            }
                          }}
                          className="flex items-center gap-2 text-red-500 hover:text-red-700 font-black text-[10px] tracking-widest uppercase"
                        >
                          <Trash2 className="h-4 w-4" />
                          DELETE_RECORD
                        </button>
                        <button 
                          onClick={handleSave}
                          className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl"
                        >
                          <Save className="h-4 w-4" />
                          COMMIT_CHANGES
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-400 space-y-4">
                    <div className="bg-zinc-100 p-6 rounded-full">
                      <ShoppingBag className="h-10 w-10" />
                    </div>
                    <p className="font-bold text-sm tracking-widest uppercase">Select an item to modify inventory</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Order List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col h-[calc(100vh-280px)]">
                  <div className="p-4 bg-zinc-50 border-b border-zinc-200 space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Orders</h2>
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <input 
                        type="text"
                        placeholder="Search ID, Name, Email..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="flex-grow overflow-y-auto divide-y divide-zinc-100">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <button
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className={`w-full p-4 text-left transition-colors hover:bg-zinc-50 ${selectedOrder?.id === order.id ? 'bg-zinc-50' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">#{order.id.slice(0, 8)}</span>
                            <span className="text-[10px] font-bold text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-bold text-sm text-zinc-900">{order.customerName}</p>
                          <p className="text-[11px] text-zinc-500 font-medium mb-3">{order.customerEmail}</p>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                            <span className="text-xs font-black">${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-zinc-400">
                        <p className="text-xs font-bold uppercase tracking-widest">No orders found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="lg:col-span-2">
                {selectedOrder ? (
                  <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black tracking-tight uppercase">Order Details: #{selectedOrder.id.slice(0, 8)}</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Manage fulfillment and shipping status</p>
                      </div>
                      <button 
                        onClick={() => setSelectedOrder(null)}
                        className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                      >
                        <X className="h-5 w-5 text-zinc-400" />
                      </button>
                    </div>

                    <div className="p-8 space-y-8">
                      {/* Status Management */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Order Status</label>
                          <select 
                            value={selectedOrder.status}
                            onChange={(e) => {
                              const updated = { ...selectedOrder, status: e.target.value as OrderStatus };
                              setSelectedOrder(updated);
                              updateOrder(updated);
                            }}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                          >
                            <option value="pending">PENDING_REVIEW</option>
                            <option value="processing">IN_PREPARATION</option>
                            <option value="shipped">SHIPPED_OUT</option>
                            <option value="delivered">DELIVERED</option>
                            <option value="cancelled">CANCELLED</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Tracking Number</label>
                          <div className="relative">
                            <Truck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input 
                              type="text" 
                              value={selectedOrder.trackingNumber || ''}
                              placeholder="Enter Carrier Tracking #"
                              onChange={(e) => {
                                const updated = { ...selectedOrder, trackingNumber: e.target.value };
                                setSelectedOrder(updated);
                                updateOrder(updated);
                              }}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-12 pr-4 py-3 font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Users className="h-4 w-4" />
                          <h3 className="text-[10px] font-black uppercase tracking-widest">Customer Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Full Name</p>
                            <p className="text-sm font-bold text-zinc-900">{selectedOrder.customerName}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-sm font-bold text-zinc-900">{selectedOrder.customerEmail}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Shipping Address</p>
                            <p className="text-sm font-bold text-zinc-900 leading-relaxed">{selectedOrder.shippingAddress}</p>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Package className="h-4 w-4" />
                          <h3 className="text-[10px] font-black uppercase tracking-widest">Order Contents</h3>
                        </div>
                        <div className="border border-zinc-100 rounded-2xl overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 border-b border-zinc-100">
                              <tr>
                                <th className="px-6 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Product</th>
                                <th className="px-6 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Strength</th>
                                <th className="px-6 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">Qty</th>
                                <th className="px-6 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Price</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                              {selectedOrder.items.map((item, idx) => (
                                <tr key={idx}>
                                  <td className="px-6 py-4 font-bold text-zinc-900">{item.name}</td>
                                  <td className="px-6 py-4">
                                    <span className="text-[10px] font-black bg-zinc-100 px-2 py-0.5 rounded-full">{item.strength}</span>
                                  </td>
                                  <td className="px-6 py-4 text-center font-bold">x{item.quantity}</td>
                                  <td className="px-6 py-4 text-right font-black">${item.price.toFixed(2)}</td>
                                </tr>
                              ))}
                              <tr className="bg-zinc-50/50">
                                <td colSpan={3} className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">Order Total</td>
                                <td className="px-6 py-4 text-right text-lg font-black text-primary">${selectedOrder.totalAmount.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-zinc-100 flex justify-end">
                        <button 
                          onClick={() => {
                            updateOrder(selectedOrder);
                            // Visual feedback would be good here, but updateOrder already updates state
                          }}
                          className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl"
                        >
                          <Save className="h-4 w-4" />
                          SAVE_ORDER_CHANGES
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-400 space-y-4">
                    <div className="bg-zinc-100 p-6 rounded-full">
                      <Package className="h-10 w-10" />
                    </div>
                    <p className="font-bold text-sm tracking-widest uppercase">Select an order to view full details</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
