import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Konfigurasi Font Google (Geist Sans, Geist Mono, dan Barlow Condensed)
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

// Meta data global aplikasi (Judul SEO, Deskripsi, dan Ikon Favicon)
export const metadata: Metadata = {
  title: "Desa Dalisodo | Website Resmi & Portal Wisata KKN 10",
  description: "Portal resmi informasi wisata, berita kegiatan, dan profil Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.",
  icons: {
    icon: "/assets/image/Logo-kkn10.svg",
    shortcut: "/assets/image/Logo-kkn10.svg",
    apple: "/assets/image/Logo-kkn10.svg",
  },
};

/**
 * Komponen RootLayout
 * 
 * Tata letak tingkat teratas (Root Layout) portal web Desa Dalisodo.
 * Menyediakan struktur dokumen HTML, pengikatan font Google, header Navbar global, serta Footer global.
 *
 * @param {Object} props - Properti komponen.
 * @param {React.ReactNode} props.children - Komponen halaman anak (pages).
 * @returns {JSX.Element} Dokumen HTML utama.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect & DNS-Prefetch CDN Contentful untuk Kecepatan Muat Gambar */}
        <link rel="preconnect" href="https://assets.ctfassets.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
      </head>
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

