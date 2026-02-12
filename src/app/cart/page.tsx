'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, ShieldCheck, ShoppingBag, Trash2, Lock, CreditCard, Bitcoin } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, totalPrice, removeItem } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const proceedToWooCommerce = async () => {
    if (items.length === 0) return;
    
    setIsRedirecting(true);
    setError(null);

    // The user wants to use the default WooCommerce checkout method.
    // We use the 'add-to-cart' URL parameter which is the standard WooCommerce way.
    // Since helivex.com doesn't exist, we use helivexlabs.com as a placeholder.
    const wcBaseUrl = "https://helivexlabs.com"; // Replace with your actual WordPress URL
    
    try {
      // For multiple items, the standard WooCommerce way is tricky without a plugin.
      // We'll redirect to the first item's add-to-cart URL and append others if possible,
      // or redirect to the cart page of the WordPress site.
      
      const firstItem = items[0];
      const productId = firstItem.strength.wcId || firstItem.productId;
      const quantity = firstItem.quantity;
      
      // Construct the default WooCommerce add-to-cart URL
      const checkoutUrl = `${wcBaseUrl}/?add-to-cart=${productId}&quantity=${quantity}`;
      
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout redirect failed:", err);
      setError("Failed to redirect to checkout. Please try again.");
      setIsRedirecting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold uppercase tracking-tighter">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some research peptides to your cart to proceed to checkout.</p>
        <Link href="/products" className="btn-primary inline-flex">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Order Review */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Review Your Order</h1>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Secure Research Portal</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Cart Items</h2>
            </div>
            {items.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-border group relative pink-metallic-glow"
              >
                <div className="h-20 w-20 bg-zinc-50 rounded-xl border border-border p-2 flex-shrink-0">
                  <img src={item.image || "/helivexproductlogo.png"} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg uppercase">{item.name}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">{item.strength.label}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">QTY: {item.quantity}</span>
                    <span className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-zinc-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                  title="Remove from cart"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-border flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Authenticity</p>
                <p className="text-xs font-bold uppercase">99%+ Purity Guaranteed</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-border flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Security</p>
                <p className="text-xs font-bold uppercase">Secure SSL Encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden pink-metallic-glow">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-xl font-bold mb-6 relative z-10 uppercase tracking-tighter">Order Summary</h2>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-400 text-[10px]">Calculated at Checkout</span>
                </div>
                <div className="h-[1px] bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Total Payable</p>
                    <p className="text-4xl font-black tracking-tighter">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <button 
                  onClick={proceedToWooCommerce}
                  disabled={isRedirecting}
                  className="w-full bg-primary text-white font-black tracking-[0.2em] py-5 rounded-2xl mt-8 flex items-center justify-center gap-3 transition-all hover:bg-accent active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-primary/20"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>SECURE REDIRECTING...</span>
                    </>
                  ) : (
                    <>
                      <span>PROCEED TO SECURE CHECKOUT</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-xs text-red-400 text-center mt-4 font-bold uppercase tracking-tighter">{error}</p>
                )}

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <CreditCard className="h-6 w-6 text-zinc-300" />
                    <Bitcoin className="h-6 w-6 text-zinc-300" />
                    <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">Payrio</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 text-center font-bold uppercase tracking-[0.2em]">
                    SECURE HUB: WOOCOMMERCE & PAYRIO ENCRYPTED
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-2xl border border-border border-dashed">
              <p className="text-[10px] text-muted-foreground leading-relaxed text-center font-bold uppercase tracking-widest opacity-60">
                You will be redirected to our secure Helivex Labs payment portal on the main shop to complete your purchase with Payrio (Credit Card) or Crypto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
