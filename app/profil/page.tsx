import ProfilSection from "@/components/features/profil/ProfilSection";
import { getProfilDesa } from "@/server/services/profilService";
import Link from "next/link";

export const metadata = {
  title: "Profil Desa Dalisodo | Kecamatan Wagir Kabupaten Malang",
  description:
    "Profil resmi Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang. Informasi geografis lereng Gunung Kawi, 7 dusun, demografi, potensi ekonomi, dan tata kelola desa.",
};

export default async function ProfilPage() {
  const data = await getProfilDesa();

  return (
    <main id="profil-main-page" className="w-full bg-marble min-h-screen">
      {/* Hero Banner Section (Dark Stage per DESIGN.md) */}
      <header
        id="profil-header-banner"
        className="w-full bg-carbon-deep text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-anvil relative overflow-hidden"
      >
        <div className="max-w-360 mx-auto space-y-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="font-lambo text-xs tracking-[0.15em] text-giallo uppercase font-bold flex items-center gap-2"
          >
            <Link href="/" className="hover:text-white hover:-translate-y-0.5 transition-all duration-300 inline-block">
              BERANDA
            </Link>
            <span>/</span>
            <span className="text-slate-400">PROFIL DESA</span>
          </nav>

          {/* Page Headline & Subtitle */}
          <div className="space-y-3">
            <span className="inline-block bg-giallo text-black font-lambo text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-md">
              KECAMATAN WAGIR • KABUPATEN MALANG
            </span>
            <h1 className="font-lambo text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.023em] text-white leading-tight w-full max-w-none">
              PROFIL DESA DALISODO
            </h1>
            <p className="font-lambo text-xs sm:text-sm md:text-base text-slate-300 uppercase tracking-[0.023em] w-full max-w-none leading-relaxed">
              MENGENAL GAMBARAN GEOGRAFIS LERENG KAWI, SEMBOYAN &quot;{data.semboyan}&quot;, 7 WILAYAH DUSUN, DEMOGRAFI, DAN POTENSI EKONOMI DESA.
            </p>
          </div>

          {/* Quick Info Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3 font-lambo text-xs uppercase tracking-wider text-slate-300">
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              📍 KODE POS: <strong className="text-giallo">{data.kodePos}</strong>
            </span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              ⛰️ KETINGGIAN: <strong className="text-giallo">{data.ketinggian}</strong>
            </span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              🏘️ DUSUN: <strong className="text-giallo">{data.jumlahDusunCount} DUSUN</strong>
            </span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              👥 POPULASI: <strong className="text-giallo">{data.jumlahPenduduk}</strong>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section
        id="profil-content-section"
        aria-label="Informasi Profil Desa"
        className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto"
      >
        <ProfilSection data={data} />
      </section>
    </main>
  );
}



