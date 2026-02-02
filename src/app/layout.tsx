import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminProvider } from "@/context/AdminContext";
import { UserProvider } from "@/context/UserContext";
import AdminToolbar from "@/components/AdminToolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy Research Peptides Online | 99% Pure Lab Supplies | Helivex Labs",
  description: "Buy 99% Pure Research Peptides Online. Helivex Labs provides premium lab peptides for sale, including TESA, VIP, and MOTS-C. High-quality research supplies for scientific studies with 3-5 day USA shipping.",
  keywords: ["buy research peptides online", "99% pure peptides", "lab peptides for sale", "peptide research supplies", "Helivex Labs", "USA research peptides"],
  openGraph: {
    title: "Buy Research Peptides Online | 99% Pure Lab Supplies | Helivex Labs",
    description: "Premium lab peptides for scientific research. 99% purity guaranteed, fast USA shipping.",
    url: 'https://helivexlabs.com',
    siteName: 'Helivex Labs',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Helivex Labs",
    "url": "https://helivexlabs.com",
    "logo": "https://helivexlabs.com/logo.png",
    "description": "Premium research peptide company specializing in ultra-pure peptides and compounds for scientific laboratory use only.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@helivexlabs.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}>
        <UserProvider>
          <AdminProvider>
            <Header />
            <main className="flex-grow overflow-x-hidden">
              {children}
            </main>
            <Footer />
            <AdminToolbar />
          </AdminProvider>
        </UserProvider>
      </body>
    </html>
  );
}
