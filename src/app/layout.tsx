import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capable-kheer-fd7f34.netlify.app"),
  title: {
    default: "Heartcast — Love, Relationships & Intimacy Podcast",
    template: "%s | Heartcast",
  },
  description:
    "Your go-to podcast for honest conversations about love, relationships, intimacy, dating, and emotional intelligence. Real talk, real connections.",
  keywords: [
    "podcast",
    "love",
    "relationships",
    "intimacy",
    "dating",
    "emotional intelligence",
    "relationship advice",
    "self-love",
    "communication",
    "marriage",
  ],
  authors: [{ name: "Heartcast" }],
  creator: "Heartcast",
  publisher: "Heartcast",
  openGraph: {
    title: "Heartcast — Love, Relationships & Intimacy Podcast",
    description:
      "Your go-to podcast for honest conversations about love, relationships, intimacy, dating, and emotional intelligence.",
    type: "website",
    siteName: "Heartcast",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heartcast — Love, Relationships & Intimacy Podcast",
    description:
      "Real talk about love, relationships, and intimacy. No judgment, just real connection.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
