'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, Search, User, Pencil } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isEditMode, setIsEditMode } = useAdmin();
  const { user, isAuthenticated } = useUser();
  const { itemCount } = useCart();

  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md pink-metallic-glow">
      <div className="container flex h-24 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Helivex Labs - Premier Supplier of 99% Pure Research Peptides" 
                fill 
                className="object-contain drop-shadow-[0_0_8px_rgba(139,26,26,0.3)] group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="relative">
              <span className="text-lg md:text-2xl font-bold tracking-tighter text-primary uppercase whitespace-nowrap">HELIVEX <span className="text-secondary-foreground font-light">LABS</span></span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </div>
          </Link>
          <nav className="hidden md:flex gap-8 text-[11px] font-bold tracking-widest uppercase">
            <Link href="/products" className="transition-colors hover:text-primary relative group">
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
            {!isHomePage && (
              <button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={`ml-[-10px] p-1.5 rounded-full transition-all ${isEditMode ? 'bg-primary text-white scale-110 shadow-lg' : 'text-zinc-400 hover:text-primary hover:bg-primary/5'}`}
                title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
              >
                <Pencil size={14} className={isEditMode ? "animate-pulse" : ""} />
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center mr-4 px-3 py-1 border border-primary/20 rounded-full bg-primary/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2" />
            <span className="text-[9px] font-mono text-primary font-bold tracking-tighter uppercase">SECURE_LINK: ACTIVE</span>
          </div>
          <Link href="/products" className="p-2 transition-colors hover:text-primary hover:bg-muted rounded-full">
            <Search className="h-4 w-4" />
          </Link>
          
          {isAuthenticated ? (
            <Link href="/dashboard" className="flex items-center gap-2 pl-2 pr-4 py-1.5 transition-colors hover:text-primary hover:bg-muted rounded-full group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <User className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase hidden lg:inline-block">{user?.name}</span>
            </Link>
          ) : (
            <Link href="/login" className="px-5 py-2 bg-zinc-900 text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-primary transition-all shadow-lg shadow-black/5">
              LOGIN
            </Link>
          )}

          <Link href="/cart" className="p-2 transition-colors hover:text-primary hover:bg-muted rounded-full relative">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-primary text-[8px] font-bold text-white flex items-center justify-center animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
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
            <Link href="/products" className="py-2 border-b border-muted">SHOP</Link>
            <Link href="/coa" className="py-2 border-b border-muted">COA</Link>
            <Link href="/about" className="py-2 border-b border-muted">ABOUT</Link>
            <Link href="/faq" className="py-2 border-b border-muted">FAQ</Link>
            <Link href="/contact" className="py-2 border-b border-muted">CONTACT</Link>
            <Link href="/orders" className="py-2 border-b border-muted">MY ORDERS</Link>
            <Link href="/cart" className="py-2">CART</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
