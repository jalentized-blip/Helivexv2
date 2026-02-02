import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificates of Analysis (COA) | Lab-Verified Peptide Purity | Helivex Labs',
  description: 'View third-party lab results and Certificates of Analysis (COA) for all Helivex Labs peptides. We guarantee 99%+ purity through rigorous molecular testing.',
  keywords: ['peptide COA', 'peptide lab results', 'purity verification', 'Helivex Labs testing'],
};

export default function COALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
