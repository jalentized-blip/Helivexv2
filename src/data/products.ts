export interface Product {
  id: string;
  name: string;
  price: number;
  priceRange: string;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 'tesa',
    name: 'TESA',
    price: 45.00,
    priceRange: '$45.00 - $280.00',
    image: '/next.svg', // Placeholder
    description: 'High purity TESA for research purposes.',
    category: 'Peptides',
    isBestSeller: true
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 50.00,
    priceRange: '$50.00 - $350.00',
    image: '/next.svg',
    description: 'Premium VIP research compound.',
    category: 'Peptides'
  },
  {
    id: 'mots-c',
    name: 'MOTS-C',
    price: 45.00,
    priceRange: '$45.00 - $175.00',
    image: '/next.svg',
    description: 'High-grade MOTS-C research peptide.',
    category: 'Peptides',
    isNew: true
  },
  {
    id: 'mt-2',
    name: 'MT-2',
    price: 40.00,
    priceRange: '$40.00 - $150.00',
    image: '/next.svg',
    description: 'MT-2 peptide for scientific research.',
    category: 'Peptides'
  }
];
