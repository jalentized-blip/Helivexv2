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
  strengths: string[];
  hasKit: boolean;
  kitPrice?: number;
}

export const products: Product[] = [
  {
    id: 'tesa',
    name: 'TESA',
    price: 45.00,
    priceRange: '$45.00 - $280.00',
    image: '/vial.png',
    description: 'High purity TESA for research purposes.',
    category: 'Peptides',
    isBestSeller: true,
    strengths: ['5mg', '10mg'],
    hasKit: true,
    kitPrice: 280.00
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 50.00,
    priceRange: '$50.00 - $350.00',
    image: '/vial.png',
    description: 'Premium VIP research compound.',
    category: 'Peptides',
    strengths: ['2mg', '5mg'],
    hasKit: true,
    kitPrice: 350.00
  },
  {
    id: 'mots-c',
    name: 'MOTS-C',
    price: 45.00,
    priceRange: '$45.00 - $175.00',
    image: '/vial.png',
    description: 'High-grade MOTS-C research peptide.',
    category: 'Peptides',
    isNew: true,
    strengths: ['5mg', '10mg'],
    hasKit: false
  },
  {
    id: 'mt-2',
    name: 'MT-2',
    price: 40.00,
    priceRange: '$40.00 - $150.00',
    image: '/vial.png',
    description: 'MT-2 peptide for scientific research.',
    category: 'Peptides',
    strengths: ['10mg'],
    hasKit: true,
    kitPrice: 150.00
  }
];
