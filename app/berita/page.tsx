import Link from "next/link";
import BeritaCard from "@/components/features/berita/BeritaCard";
import { getBeritaList } from "@/server/services/beritaService";

export const metadata = {
  title: "Berita & Kegiatan | Desa Dalisodo",
  description:
    "Kumpulan artikel berita terkini, dokumentasi kegiatan masyarakat, dan laporan program KKN 10 Desa Dalisodo.",
};

export default async function BeritaPage() {
  const beritaList = await getBeritaList();

  return (
    <main id="berita-main-page" className="w-full bg-[#ffffff] min-h-screen">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header
        id="berita-header-banner"
        className="w-full bg-[#181818] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-[#313131]"
      >
        <div className="max-w-[1440px] mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="font-lambo text-xs tracking-[0.15em] text-[#ffc000] uppercase font-bold flex items-center gap-2"
          >
            <Link href="/" className="hover:underline">
              BERANDA
            </Link>
            <span>/</span>
            <span className="text-slate-400">BERITA KEGIATAN</span>
          </nav>

          {/* Page Headline */}
          <h1 className="font-lambo text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.023em] text-white leading-none">
            BERITA & DOKUMENTASI KEGIATAN
          </h1>

          {/* Subtitle Narration */}
          <p className="font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-[0.023em] max-w-2xl leading-relaxed">
            INFORMASI TERBARU SEPUTAR AGENDA PEMBANGUNAN DESA, DOKUMENTASI KEGIATAN MASYARAKAT, DAN PROGRAM KERJA MAHASISWA KKN 10 DALISODO.
          </p>
        </div>
      </header>

      {/* Main Content Section (White Canvas) */}
      <section
        id="berita-catalog-section"
        aria-label="Katalog Berita Dalisodo"
        className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto"
      >
        {/* Section Heading Block (Two-column row per DESIGN.md) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202020] mb-8 sm:mb-12">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
              KABAR LOKAL & KKN 10
            </span>
            <h2 className="font-lambo text-3xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-[#202020]">
              KUMPULAN ARTIKEL BERITA
            </h2>
          </div>
          <p className="font-lambo text-xs text-[#7d7d7d] uppercase tracking-[0.023em]">
            MENAMPILKAN {beritaList.length} BERITA TERBIT
          </p>
        </div>

        {/* 3-Column Story Grid */}
        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-[#f5f5f5] rounded-[8px] border border-[#969696]/20">
            <p className="font-lambo text-sm text-[#7d7d7d] uppercase tracking-wider">
              BELUM ADA BERITA YANG DITERBITKAN.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {beritaList.map((item) => (
              <BeritaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
