import { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop Research Peptides | 99% Pure Lab Compounds | Helivex Labs',
  description: 'Browse our full catalog of 99% pure research peptides. From TESA to MOTS-C, find high-quality compounds for your laboratory studies with fast USA shipping.',
  keywords: ['shop research peptides', 'buy lab peptides', '99% pure peptides', 'Helivex Labs catalog'],
};

export default function ShopPage() {
  return <ShopClient />;
}
