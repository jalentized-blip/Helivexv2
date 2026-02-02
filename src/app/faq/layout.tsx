import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Helivex Labs Research Peptides',
  description: 'Find answers to common questions about research peptides, purity testing, shipping, and laboratory usage. Helivex Labs provides clear guidance for the scientific community.',
  keywords: ['peptide FAQ', 'research peptide questions', 'peptide shipping info', 'lab peptide safety'],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
