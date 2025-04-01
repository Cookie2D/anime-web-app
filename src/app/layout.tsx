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
  title: "Anime",
  description: "Anime app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen items-center`}
      >
        <AppProviders>
          <header className="p-4 flex items-center justify-between w-full">
            <AppLogo />
            <div className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/list">List</Link>
              <Link href="/about">About us</Link>
            </div>

            <div>lgs</div>
          </header>
          <main className="grow container">{children}</main>
          <footer>footer</footer>
        </AppProviders>
      </body>
    </html>
  );
}
