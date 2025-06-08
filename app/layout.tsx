import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aulawell - Expert British & American Curriculum Tutoring",
  description: "Helping students aged 11-18 excel in KS3, GCSE, IGCSE, A-Level, and IB from Madrid and worldwide. Current AQA & Cambridge Examiner.",
  keywords: "tutoring, British curriculum, GCSE, A-Level, IB, Madrid, online tutoring, examiner",
  authors: [{ name: "Aulawell" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://aulawell.com",
    siteName: "Aulawell",
    title: "Aulawell - Expert British & American Curriculum Tutoring",
    description: "Expert tutoring from a current AQA & Cambridge examiner",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aulawell - Premium Tutoring Services",
      },
    ],
  },
};

import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "./components/DisableDraftMode";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
