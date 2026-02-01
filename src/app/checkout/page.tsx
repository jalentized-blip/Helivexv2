'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Loader2, QrCode, Bitcoin, Wallet, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

type PaymentStatus = 'pending' | 'detecting' | 'confirming' | 'completed';

export default function CheckoutPage() {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'USDT' | null>(null);
  const [address, setAddress] = useState('');
  
  const paymentDetails = {
    amount: '0.0024',
    symbol: selectedCoin || 'BTC',
    usdAmount: '$125.00',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' // Mock BTC address
  };

  const startPayment = (coin: 'BTC' | 'ETH' | 'USDT') => {
    setSelectedCoin(coin);
    setAddress(paymentDetails.address);
    setStatus('detecting');
  };

  useEffect(() => {
    if (status === 'detecting') {
      // Simulate blockchain monitoring
      const timer = setTimeout(() => {
        setStatus('confirming');
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (status === 'confirming') {
      // Simulate confirmation blocks
      const timer = setTimeout(() => {
        setStatus('completed');
        // In a real app, you'd update the DB here via an API call
        localStorage.setItem('lastOrderCompleted', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">CHECKOUT</h1>
            <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="font-medium">TESA x 2</span>
                <span>$90.00</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="font-medium">MOTS-C x 1</span>
                <span>$45.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">TOTAL</span>
                <span className="text-lg font-bold text-primary">$135.00</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span>Secure encrypted transaction via Helivex SecureNode.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Bitcoin className="h-5 w-5 text-primary" />
              <span>Direct blockchain settlement for maximum privacy.</span>
            </div>
          </div>
        </div>

        {/* Payment Area */}
        <div className="bg-white p-8 rounded-2xl border-2 border-primary/10 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'pending' && (
              <motion.div 
                key="pending"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold">Select Crypto</h2>
                  <p className="text-sm text-muted-foreground mt-1">Choose your preferred currency to generate address</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => startPayment('BTC')}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#F7931A]/10 flex items-center justify-center text-[#F7931A]">
                        <Bitcoin className="h-6 w-6" />
                      </div>
                      <span className="font-bold">Bitcoin</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                  
                  <button 
                    onClick={() => startPayment('ETH')}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#627EEA]/10 flex items-center justify-center text-[#627EEA]">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <span className="font-bold">Ethereum</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </div>
              </motion.div>
            )}

            {(status === 'detecting' || status === 'confirming') && (
              <motion.div 
                key="monitoring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    {status === 'detecting' ? 'Waiting for payment' : 'Confirming on blockchain'}
                  </div>
                  <h2 className="text-2xl font-bold">Send {paymentDetails.amount} {selectedCoin}</h2>
                  <p className="text-sm text-muted-foreground">Scan QR or copy address below</p>
                </div>

                <div className="flex justify-center py-4">
                  <div className="p-4 bg-white rounded-xl border border-border shadow-inner">
                    <QrCode className="h-40 w-40 text-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Deposit Address</label>
                  <div className="flex gap-2">
                    <code className="flex-grow p-3 bg-muted rounded-lg text-xs break-all border border-border">
                      {address}
                    </code>
                    <button 
                      onClick={copyAddress}
                      className="p-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                  <strong>IMPORTANT:</strong> Send only {selectedCoin} to this address. Sending any other currency may result in permanent loss.
                </div>
              </motion.div>
            )}

            {status === 'completed' && (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Payment Received!</h2>
                  <p className="text-muted-foreground">Your order #HVX-2941 has been confirmed.</p>
                </div>
                <Link 
                  href="/orders" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  VIEW YOUR ORDERS <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
