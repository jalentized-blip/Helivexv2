import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refunds | Helivex Labs Research Peptides',
  description: 'Understand the return and refund policies for Helivex Labs research compounds. Due to product integrity, we maintain strict guidelines for the scientific community.',
};

export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
