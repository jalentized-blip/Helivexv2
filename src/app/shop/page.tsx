import { products } from '@/data/products';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

export default function ShopPage() {
  return (
    <div className="container py-12 relative">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
