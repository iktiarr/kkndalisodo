import Link from "next/link";
import WisataCard from "@/components/features/wisata/WisataCard";
import { getWisataList } from "@/server/services/wisataService";

export const metadata = {
  title: "Wisata Desa Dalisodo | Pesona Alam Lereng Kawi",
  description:
    "Daftar tempat wisata alam, air terjun, hutan pinus, dan potensi agrowisata Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.",
};

export default async function WisataPage() {
  const wisataList = await getWisataList();

  return (
    <main id="wisata-main-page" className="w-full bg-[#f5f5f5] min-h-screen">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header
        id="wisata-header-banner"
        className="w-full bg-[#181818] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-[#313131]"
      >
        <div className="max-w-[1440px] mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="font-lambo text-xs tracking-[0.15em] text-[#ffc000] uppercase font-bold flex items-center gap-2">
            <Link href="/" className="hover:underline">
              BERANDA
            </Link>
            <span>/</span>
            <span className="text-slate-400">WISATA DESA</span>
          </nav>

          {/* Page Headline */}
          <h1 className="font-lambo text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.023em] text-white leading-none">
            WISATA & POTENSI ALAM DALISODO
          </h1>

          {/* Subtitle Narration */}
          <p className="font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-[0.023em] max-w-2xl leading-relaxed">
            MENJELAJAHI KEINDAHAN ALAM LERENG GUNUNG KAWI, AIR TERJUN ALAMI, HUTAN PINUS RINDANG, SERTA AGROWISATA KHAS DESA DALISODO KABUPATEN MALANG.
          </p>
        </div>
      </header>

      {/* Main Content Section (Marble Surface) */}
      <section
        id="wisata-catalog-section"
        aria-label="Katalog Wisata Dalisodo"
        className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto"
      >
        {/* Section Heading Block (Two-column row per DESIGN.md) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202020] mb-8 sm:mb-12">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
              KATALOG DESTINASI LOKAL
            </span>
            <h2 className="font-lambo text-3xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-[#202020]">
              DAFTAR DESTINASI WISATA
            </h2>
          </div>
          <p className="font-lambo text-xs text-[#7d7d7d] uppercase tracking-[0.023em]">
            MENAMPILKAN {wisataList.length} DESTINASI WISATA UNGGULAN
          </p>
        </div>

        {/* 3-Column Showcase Grid */}
        {wisataList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[8px] border border-[#969696]/20">
            <p className="font-lambo text-sm text-[#7d7d7d] uppercase tracking-wider">
              BELUM ADA DATA DESTINASI WISATA TERSEDIA.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wisataList.map((item) => (
              <WisataCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
