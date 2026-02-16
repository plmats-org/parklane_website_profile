import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "../providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLM Ltd - Global Sourcing Excellence",
  description:
    "Your trusted partner for world-class construction materials and equipment procurement. We deliver optimal value through strategic global sourcing, rigorous quality control, and seamless logistics.",
  keywords: [
    "construction materials",
    "global sourcing",
    "equipment procurement",
    "supply chain",
    "logistics",
    "Rwanda",
    "PLM",
  ],
  authors: [{ name: "PLM Ltd" }],
  openGraph: {
    title: "PLM Ltd - Streamline Global Business",
    description:
      "Leading global sourcing subsidiary of the PLM, specializing in premium construction materials and equipment procurement.",
    type: "website",
    locale: "en_US",
    siteName: "PLM Ltd",
  },
  icons: {
    icon: "/plm.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}