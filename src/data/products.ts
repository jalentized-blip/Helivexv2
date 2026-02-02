export interface ProductStrength {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  strengths: ProductStrength[];
  hasKit: boolean;
  kitPrice?: number;
  coaImage?: string;
}

export const products: Product[] = [
  {
    id: 'tesa',
    name: 'TESA',
    image: '/vial.png',
    description: 'High purity TESA for research purposes.',
    category: 'Peptides',
    isBestSeller: true,
    strengths: [
      { id: '5mg', label: '5mg', price: 45.00 },
      { id: '10mg', label: '10mg', price: 85.00 }
    ],
    hasKit: true,
    kitPrice: 280.00,
    coaImage: '/coa-placeholder.jpg'
  },
  {
    id: 'vip',
    name: 'VIP',
    image: '/vial.png',
    description: 'Premium VIP research compound.',
    category: 'Peptides',
    strengths: [
      { id: '2mg', label: '2mg', price: 50.00 },
      { id: '5mg', label: '5mg', price: 110.00 }
    ],
    hasKit: true,
    kitPrice: 350.00,
    coaImage: '/coa-placeholder.jpg'
  },
  {
    id: 'mots-c',
    name: 'MOTS-C',
    image: '/vial.png',
    description: 'High-grade MOTS-C research peptide.',
    category: 'Peptides',
    isNew: true,
    strengths: [
      { id: '5mg', label: '5mg', price: 45.00 },
      { id: '10mg', label: '10mg', price: 80.00 }
    ],
    hasKit: false,
    coaImage: '/coa-placeholder.jpg'
  },
  {
    id: 'mt-2',
    name: 'MT-2',
    image: '/vial.png',
    description: 'MT-2 peptide for scientific research.',
    category: 'Peptides',
    strengths: [
      { id: '10mg', label: '10mg', price: 40.00 }
    ],
    hasKit: true,
    kitPrice: 150.00,
    coaImage: '/coa-placeholder.jpg'
  },
  {
    id: 'tirz',
    name: 'TIRZEPATIDE',
    image: '/vial.png',
    description: 'High-purity Tirzepatide for advanced research applications.',
    category: 'Peptides',
    strengths: [
      { id: '10mg', label: '10mg', price: 120.00 }
    ],
    hasKit: true,
    kitPrice: 450.00,
    coaImage: '/t30barn.png'
  },
  {
    id: 'reta',
    name: 'RETATRUTIDE',
    image: '/vial.png',
    description: 'Next-generation research compound for metabolic studies.',
    category: 'Peptides',
    strengths: [
      { id: '5mg', label: '5mg', price: 150.00 }
    ],
    hasKit: true,
    kitPrice: 550.00,
    coaImage: '/coa-placeholder.jpg'
  }
];
