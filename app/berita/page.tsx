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
    <main id="berita-main-page" className="w-full bg-white min-h-screen">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header
        id="berita-header-banner"
        className="w-full bg-carbon-deep text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-anvil"
      >
        <div className="max-w-360 mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="font-lambo text-xs tracking-[0.15em] text-giallo uppercase font-bold flex items-center gap-2"
          >
            <Link href="/" className="hover:text-white hover:-translate-y-0.5 transition-all duration-300 inline-block">
              BERANDA
            </Link>
            <span>/</span>
            <span className="text-slate-400">BERITA KEGIATAN</span>
          </nav>

          {/* Page Headline */}
          <h1 className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-white leading-tight w-full max-w-none">
            BERITA & DOKUMENTASI KEGIATAN
          </h1>

          {/* Subtitle Narration (Full width, no cutoff) */}
          <p className="font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-[0.023em] w-full max-w-none leading-relaxed">
            INFORMASI TERBARU SEPUTAR AGENDA PEMBANGUNAN DESA, DOKUMENTASI KEGIATAN MASYARAKAT, DAN PROGRAM KERJA MAHASISWA KKN 10 DALISODO.
          </p>
        </div>
      </header>

      {/* Main Content Section (White Canvas) */}
      <section
        id="berita-catalog-section"
        aria-label="Katalog Berita Dalisodo"
        className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto"
      >
        {/* Section Heading Block (Two-column row per DESIGN.md) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-carbony mb-8 sm:mb-12">
          <div>
            <h2 className="font-lambo text-3xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
              KUMPULAN ARTIKEL BERITA
            </h2>
          </div>
          <p className="font-lambo text-xs text-steel uppercase tracking-[0.023em]">
            MENAMPILKAN {beritaList.length} BERITA
          </p>
        </div>

        {/* 3-Column Story Grid */}
        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-marble rounded-lg border border-ash/20">
            <p className="font-lambo text-sm text-steel uppercase tracking-wider">
              BELUM ADA BERITA YANG DITERBITKAN.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {beritaList.map((item) => (
              <BeritaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

