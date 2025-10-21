import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Providers } from "./providers";
import '@mantine/core/styles.css';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400","500","600","700","800"], display: 'swap' });

export const metadata: Metadata = {
  title: "Zypay - Secure Crypto Payment Platform - App",
  description: "Zypay is the fastest way to accept and send crypto payments securely. Built with cutting-edge blockchain technology and enterprise-grade security.",
  keywords: ["crypto payments", "blockchain", "cryptocurrency", "payment platform", "secure payments", "crypto wallet"],
  authors: [{ name: "Zypay Team" }],
  creator: "Zypay",
  publisher: "Zypay Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zypay.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Zypay - Secure Crypto Payment Platform - App",
    description: "The fastest way to accept and send crypto payments securely. Built with cutting-edge blockchain technology.",
    url: 'https://zypay.app',
    siteName: 'Zypay',
    images: [
      {
        url: '/logo.png',
        width: 256,
        height: 256,
        alt: 'Zypay logo: Abstract white geometric shape with a bright cyan dot on dark blue background',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zypay - Secure Crypto Payment Platform - App",
    description: "The fastest way to accept and send crypto payments securely.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={plusJakarta.className}>
        <Suspense fallback={<div>Loading Zypay...</div>}>
          <Providers>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
