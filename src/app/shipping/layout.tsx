import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Helivex Labs Research Peptides',
  description: 'Information about processing times, shipping rates, and international delivery for Helivex Labs research compounds.',
};

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
