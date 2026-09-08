import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVEN MEDIA — Local Growth Carousel App",
  description: "Taking local businesses beyond their location. Interactive local growth carousel & high-res slide exports for AVEN Media.",
  keywords: ["AVEN Media", "Local Growth", "Carousel", "Social Content", "Business Growth"],
  openGraph: {
    title: "AVEN MEDIA — Local Growth Carousel",
    description: "Interactive responsive local growth carousel for AVEN Media. Local stories, made known.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
