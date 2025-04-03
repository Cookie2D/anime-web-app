import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppLogo from "@/components/share/header/components/AppLogo";
import AppProviders from "@/providers/AppProviders";
import NavLink from "@/components/share/header/components/NavLink";
import "../styles/globals.css";
import CategoriesDropdown from "@/components/share/header/components/dropdown/CategoriesDropdown";
import GenreDropdown from "@/components/share/header/components/dropdown/GenreDropdown";

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
    <html lang="uk">
      <head>
        <meta name="apple-mobile-web-app-title" content="AniHub" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AppProviders>
          <header className="w-full bg-purple-800 shadow-lg shadow-gray-200 z-50 sticky top-0">
            <nav className=" container flex items-center justify-between">
              <AppLogo />

              <div className="font-bold">
                <NavLink href="/">Головна</NavLink>
                <NavLink href="/anime" dropdown={<GenreDropdown />}>
                  Жанр
                </NavLink>
                <NavLink href="/anime" dropdown={<CategoriesDropdown />}>
                  Категорії
                </NavLink>
                <NavLink href="/anime">Рік</NavLink>
                <NavLink href="/anime">Анонси</NavLink>
              </div>

              <div className="w-12"></div>
            </nav>
          </header>
          <main className="grow container mx-auto my-4">{children}</main>
          <footer className="container">footer</footer>
        </AppProviders>
      </body>
    </html>
  );
}
