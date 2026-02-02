import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Helivex Labs | Support for Research Peptide Inquiries',
  description: 'Get in touch with Helivex Labs for technical support, order inquiries, and bulk ordering of high-purity research peptides. Our team is ready to assist with your scientific needs.',
  keywords: ['contact Helivex Labs', 'peptide support', 'research peptide inquiries', 'bulk peptide orders'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
