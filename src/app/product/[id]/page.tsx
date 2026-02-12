import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductClient from './ProductClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found | Helivex Labs',
    };
  }

  return {
    title: `Buy ${product.name} | 99% Pure Research Peptide | Helivex Labs`,
    description: `Order ${product.name} online from Helivex Labs. High-purity lab-grade research compound, verified at 99%+ purity. Fast USA shipping for all scientific research supplies.`,
    keywords: [`buy ${product.name}`, `${product.name} research`, `99% pure ${product.name}`, 'Helivex Labs peptides'],
    openGraph: {
      title: `Buy ${product.name} | 99% Pure Research Peptide`,
      description: `Premium grade ${product.name} for scientific research. Verified purity and fast shipping.`,
      images: [{ url: product.image }],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductClient />;
}
