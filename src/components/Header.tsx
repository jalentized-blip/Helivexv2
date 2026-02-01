'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-primary">HELIVEX <span className="text-secondary-foreground font-light">LABS</span></span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/shop" className="transition-colors hover:text-primary">SHOP</Link>
            <Link href="/about" className="transition-colors hover:text-primary">ABOUT</Link>
            <Link href="/faq" className="transition-colors hover:text-primary">FAQ</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">CONTACT</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 transition-colors hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" className="p-2 transition-colors hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2 transition-colors hover:text-primary relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">0</span>
          </Link>
          <button 
            className="md:hidden p-2 transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium text-center">
            <Link href="/shop" className="py-2 border-b border-muted">SHOP</Link>
            <Link href="/about" className="py-2 border-b border-muted">ABOUT</Link>
            <Link href="/faq" className="py-2 border-b border-muted">FAQ</Link>
            <Link href="/contact" className="py-2">CONTACT</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
