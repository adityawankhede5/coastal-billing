import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coastal",
  description: "Coastal Cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-family-default text-default color-default color-background h-screen`}
      >
        <div className="grid grid-rows-[56px_1fr] h-full">
          <Header />
          <main className="overflow-y-auto px-2 mb-[40px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
