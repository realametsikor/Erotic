import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Heartcast — Love, Relationships & Intimacy Podcast",
    template: "%s | Heartcast",
  },
  description:
    "Your go-to podcast for honest conversations about love, relationships, intimacy, dating, and emotional intelligence. Real talk, real connections.",
  openGraph: {
    title: "Heartcast — Love, Relationships & Intimacy Podcast",
    description:
      "Your go-to podcast for honest conversations about love, relationships, intimacy, dating, and emotional intelligence.",
    type: "website",
    siteName: "Heartcast",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heartcast — Love, Relationships & Intimacy Podcast",
    description:
      "Real talk about love, relationships, and intimacy. No judgment, just real connection.",
  },
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
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
