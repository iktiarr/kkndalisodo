import ProfilSection from "@/components/features/profil/ProfilSection";
import { getProfilDesa } from "@/server/services/profilService";
import Link from "next/link";

export const metadata = {
  title: "Profil Desa Dalisodo | Visi Misi & Geografis",
  description:
    "Profil lengkap Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang. Informasi demografis, visi-misi, sejarah, dan struktur perangkat desa.",
};

export default async function ProfilPage() {
  const data = await getProfilDesa();

  return (
    <main id="profil-main-page" className="w-full bg-marble min-h-screen">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header
        id="profil-header-banner"
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
            <span className="text-slate-400">PROFIL DESA</span>
          </nav>

          {/* Page Headline */}
          <h1 className="font-lambo text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.023em] text-white leading-none">
            PROFIL & GAMBARAN UMUM DESA DALISODO
          </h1>

          {/* Subtitle Narration */}
          <p className="font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-[0.023em] max-w-2xl leading-relaxed">
            MENGENAL LEBIH DEKAT GAMBARAN GEOGRAFIS, VISI-MISI, KEARIFAN LOKAL, SERTA DEMOGRAFI DESA DALISODO KECAMATAN WAGIR KABUPATEN MALANG.
          </p>
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

