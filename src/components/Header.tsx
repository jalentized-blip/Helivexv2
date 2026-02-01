'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-2xl font-bold tracking-tighter text-primary">HELIVEX <span className="text-secondary-foreground font-light">LABS</span></span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </div>
          </Link>
          <nav className="hidden md:flex gap-8 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/shop" className="transition-colors hover:text-primary relative group">
              SHOP
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/coa" className="transition-colors hover:text-primary relative group">
              COA
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary relative group">
              ABOUT
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/faq" className="transition-colors hover:text-primary relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary relative group">
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center mr-4 px-3 py-1 border border-primary/20 rounded-full bg-primary/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2" />
            <span className="text-[9px] font-mono text-primary font-bold tracking-tighter uppercase">SECURE_LINK: ACTIVE</span>
          </div>
          <Link href="/shop" className="p-2 transition-colors hover:text-primary hover:bg-muted rounded-full">
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/orders" className="p-2 transition-colors hover:text-primary hover:bg-muted rounded-full">
            <User className="h-4 w-4" />
          </Link>
          <Link href="/checkout" className="p-2 transition-colors hover:text-primary hover:bg-muted rounded-full relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-primary text-[8px] font-bold text-white flex items-center justify-center">0</span>
          </Link>
          <button 
            className="md:hidden p-2 transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Thick Red Bar from the photo */}
      <div className="h-8 w-full bg-primary" />
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium text-center">
            <Link href="/shop" className="py-2 border-b border-muted">SHOP</Link>
            <Link href="/coa" className="py-2 border-b border-muted">COA</Link>
            <Link href="/about" className="py-2 border-b border-muted">ABOUT</Link>
            <Link href="/faq" className="py-2 border-b border-muted">FAQ</Link>
            <Link href="/contact" className="py-2 border-b border-muted">CONTACT</Link>
            <Link href="/orders" className="py-2 border-b border-muted">MY ORDERS</Link>
            <Link href="/checkout" className="py-2">CHECKOUT</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
