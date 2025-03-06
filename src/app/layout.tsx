import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "../components/AnimationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-School - Learn With Fun",
  description: "E-School is an online learning platform where you can learn on any schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="E-School online learning platform" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/logo.png" />
        <link rel="preload" as="image" href="/illustration.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
