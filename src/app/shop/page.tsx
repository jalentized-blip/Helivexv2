import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">SHOP ALL</h1>
          <p className="text-muted-foreground mt-2">Displaying all {products.length} research compounds.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            FILTER
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            SORT BY
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <Link href={`/product/${product.id}`} className="aspect-[4/5] relative bg-zinc-50 rounded-2xl overflow-hidden border border-border transition-all group-hover:border-primary/50 mb-4 flex items-center justify-center">
              {product.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">NEW</span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">BEST SELLER</span>
              )}
              
              <div className="relative w-4/5 h-4/5 group-hover:scale-110 transition-all duration-700">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-full btn-primary text-sm py-2.5 rounded-xl shadow-lg flex items-center justify-center">
                  ANALYZE SPECIMEN
                </div>
              </div>
            </Link>
            
            <div className="space-y-1">
              <Link href={`/product/${product.id}`} className="block">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-primary font-bold">{product.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
