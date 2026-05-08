import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.priyapackers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Priya Packers | Corrugated Boxes and Export Packaging India",
    template: "%s | Priya Packers",
  },
  description:
    "Priya Packers is an Indian manufacturer of corrugated boxes, custom carton boxes, printed packaging, industrial packaging, and eco-friendly paper packaging solutions.",
  keywords: [
    "Priya Packers",
    "corrugated boxes India",
    "custom carton boxes",
    "industrial packaging",
    "export packaging India",
    "printed boxes",
    "paper packaging manufacturer",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Priya Packers",
    title: "Priya Packers | Sustainable Corrugated Packaging Solutions",
    description:
      "Premium corrugated packaging and paper-based packaging solutions for industrial and export clients.",
    images: [
      {
        url: "/images/og-priya-packers.svg",
        width: 1200,
        height: 630,
        alt: "Priya Packers corrugated packaging manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priya Packers | Corrugated Packaging Manufacturer",
    description:
      "Export-ready corrugated boxes, custom cartons, printed packaging, and eco-friendly paper packaging.",
    images: ["/images/og-priya-packers.svg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-[#111820]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
