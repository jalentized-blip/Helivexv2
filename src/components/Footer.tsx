import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border pink-metallic-glow">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">HELIVEX LABS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium quality research peptides and compounds. Tested for 99% purity and delivered with integrity to the scientific community.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/coa" className="hover:text-primary">COA Archive</Link></li>
              <li><Link href="/shop?category=peptides" className="hover:text-primary">Peptides</Link></li>
              <li><Link href="/shop?category=research" className="hover:text-primary">Research Compounds</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns & Refunds</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@helivexlabs.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (800) HELIVEX</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> United States</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Helivex Labs. All items sold are strictly for laboratory research use only. Not for human consumption.</p>
        </div>
      </div>
    </footer>
  );
}
