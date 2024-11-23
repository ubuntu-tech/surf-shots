import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import MainProvider from "@/components/providers/main";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SnapLine | Catch your wave, keep the moment",
  description: "Discover and purchase your surf session photos from any beach, any time. The largest database of surf photography connecting surfers with professional photographers worldwide.",
  keywords: ["surf photos", "surf photography", "surf session photos", "beach photography", "action sports photography", "surfing pictures"],
  openGraph: {
    title: "SnapLine | Catch your wave, keep the moment",
    description: "Find your surf session photos from any beach, any time. Connect with surf photographers worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "SnapLine"
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapLine | Catch your wave, keep the moment",
    description: "Find your surf session photos from any beach, any time"
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://snapline.com"
  },
  other: {
    "google-site-verification": "your-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <Header />
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
