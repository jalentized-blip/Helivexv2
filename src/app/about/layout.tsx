import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Helivex Labs | Our Mission & Peptide Purity Standards',
  description: 'Learn about Helivex Labs, a leading supplier of high-purity research peptides. We are committed to transparency, integrity, and providing the scientific community with lab-verified compounds.',
  keywords: ['Helivex Labs mission', 'peptide purity standards', 'research peptide supplier', 'lab-verified peptides'],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
