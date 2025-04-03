import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";

import Link from "next/link";
import AppLogo from "@/components/share/header/components/AppLogo";
import AppProviders from "@/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniHub",
  description:
    "Дивіться, відстежуйте та відкривайте своє улюблене аніме з AniHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <head>
        <meta name="apple-mobile-web-app-title" content="AniHub" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AppProviders>
          <header className="p-4 flex items-center justify-between w-full">
            <AppLogo />
            <div className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/anime">List</Link>
              <Link href="/about">About us</Link>
            </div>

            <div>lgs</div>
          </header>
          <main className="grow container mx-auto">{children}</main>
          <footer>footer</footer>
        </AppProviders>
      </body>
    </html>
  );
}
