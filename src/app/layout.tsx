// src/app/layout.tsx
"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-sans",
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat');

  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable}`}>
      <body className="bg-background text-text font-sans antialiased selection:bg-white selection:text-black">
        {!isChatPage && <Header />}
        <main>{children}</main>
        {!isChatPage && <Footer />}
        <Analytics />
      </body>
    </html>
  );
}