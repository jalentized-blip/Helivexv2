'use client';

import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved order in localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    const isCompleted = localStorage.getItem('lastOrderCompleted') === 'true';
    
    if (savedOrder) {
      try {
        const orderData = JSON.parse(savedOrder);
        // Update status based on completion
        orderData.status = isCompleted ? 'Completed' : 'Pending Payment';
        setOrders([orderData]);
      } catch (e) {
        console.error('Failed to parse saved order', e);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-24 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">No orders found</h1>
        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        <Link href="/products" className="btn-primary inline-flex">
          GO TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">MY ORDERS</h1>
        <Link href="/products" className="text-sm font-bold text-primary hover:underline">CONTINUE SHOPPING</Link>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border bg-muted/30 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Order ID</p>
                  <p className="font-bold">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</p>
                  <p className="font-bold">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</p>
                  <p className="font-bold text-primary">{order.total}</p>
                </div>
              </div>
              
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                order.status === 'Completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700 animate-pulse'
              }`}>
                {order.status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {order.status.toUpperCase()}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-zinc-50 border border-border relative overflow-hidden p-1">
                        <Image 
                          src={item.image || "/helivexproductlogo.png"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.qty}</p>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              {order.status === 'Completed' && (
                <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                  <Package className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold text-sm text-primary">Shipping Preparation</p>
                    <p className="text-xs text-muted-foreground">Your research compounds are being prepared for shipping via USPS Priority.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
