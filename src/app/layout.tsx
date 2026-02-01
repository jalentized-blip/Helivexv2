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
  title: "Helivex Labs | Premium Research Peptides",
  description: "High-quality research peptides and compounds with 99% purity. Shipped from the USA with integrity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <UserProvider>
          <AdminProvider>
            <Header />
            <main className="flex-grow">
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
