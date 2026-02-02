import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Helivex Labs Research Peptides',
  description: 'Review the terms and conditions for purchasing research peptides from Helivex Labs. Important information regarding laboratory use and purchaser representations.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
