'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Product, ProductStrength } from '@/data/products';
import { Plus, Trash2, Save, X, Image as ImageIcon, Beaker, Tag, FileText, ChevronRight, ChevronDown, CloudLightning, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { isAdmin, products, updateProduct, addProduct, deleteProduct, pushToLive } = useAdmin();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // If not admin, show access denied (though in a real app this would be server-side)
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 p-8 rounded-3xl max-w-md text-center space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <X className="text-red-600 h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black text-red-900">ACCESS DENIED</h1>
          <p className="text-red-700 font-medium">This control panel is strictly for authorized personnel only.</p>
          <Link href="/" className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
            Return Home
          </Link>
        </div>
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
      image: '/vial.png',
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
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Product Management & Global Pricing</p>
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

            <button 
              onClick={handleAddNewClick}
              className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-xs tracking-widest flex items-center gap-2 hover:bg-accent transition-all shadow-lg shadow-primary/20"
            >
              <Plus className="h-4 w-4" />
              ADD PRODUCT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                  {/* Actions */}
                  <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    {!isAddingNew && (
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to permanently remove this product?')) {
                            deleteProduct(editingProduct.id);
                            setEditingProduct(null);
                          }
                        }}
                        className="text-red-600 font-black text-[10px] tracking-widest uppercase px-6 py-4 rounded-2xl hover:bg-red-50 transition-colors w-full sm:w-auto order-3 sm:order-1"
                      >
                        Delete Product
                      </button>
                    )}
                    <div className="flex-grow hidden sm:block order-2" />
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto order-1 sm:order-3">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Saves to local browser cache</p>
                        <p className="text-[8px] font-medium text-zinc-300 uppercase tracking-tighter italic">Push to live to sync globally</p>
                      </div>
                      <button 
                        onClick={() => setEditingProduct(null)}
                        className="px-8 py-4 font-black text-[10px] tracking-widest uppercase text-zinc-400 hover:text-zinc-600 transition-colors w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="bg-primary text-white px-12 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-accent transition-all shadow-xl shadow-primary/20 w-full sm:w-auto"
                      >
                        <Save className="h-4 w-4" />
                        {isAddingNew ? 'REGISTER PRODUCT' : 'SAVE CHANGES'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-dashed border-zinc-200 h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="bg-zinc-50 p-6 rounded-full">
                  <Tag className="h-12 w-12 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight uppercase text-zinc-400">No Product Selected</h3>
                  <p className="text-sm text-zinc-400 font-medium">Select a product from the list to modify its specifications or add a new laboratory standard.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
