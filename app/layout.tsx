import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Desa Dalisodo | Website Resmi & Portal Wisata KKN 10",
  description: "Portal resmi informasi wisata, berita kegiatan, dan profil Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} antialiased bg-carbony text-white min-h-screen flex flex-col justify-between`}
      >
        <div>
          <Navbar />
          <main className="w-full">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

