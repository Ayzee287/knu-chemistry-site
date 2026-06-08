import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Lora } from "next/font/google";
import "./globals.css";

// Serif (Latin) — editorial identity for English headings.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Serif (Cyrillic) — renders Ukrainian headings, chained after Cormorant.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  display: "swap",
});

// Body — Latin + Cyrillic.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faculty of Chemistry — Taras Shevchenko National University of Kyiv",
  description:
    "The Faculty of Chemistry at Taras Shevchenko National University of Kyiv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${cormorant.variable} ${lora.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-ivory font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
