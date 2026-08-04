import HeroSection from "@/components/features/beranda/HeroSection";
import WisataCard from "@/components/features/wisata/WisataCard";
import BeritaCard from "@/components/features/berita/BeritaCard";
import { getWisataList } from "@/server/services/wisataService";
import { getBeritaList } from "@/server/services/beritaService";
import { getHeroSlides } from "@/server/services/heroService";
import Link from "next/link";
import ContactSection from "@/components/features/beranda/ContactSection";

export default async function HomePage() {
  const heroSlides = await getHeroSlides();
  const wisataList = await getWisataList();
  const beritaList = await getBeritaList();

  return (
    <div className="space-y-16 pb-12">
      <HeroSection initialSlides={heroSlides} />

      {/* Section 2: Berita Terkini (Editorial Story Grid per DESIGN.md) */}
      <section
        id="berita-terkini-section"
        aria-labelledby="berita-heading"
        className="w-full bg-[#ffffff] text-[#202020] py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#f5f5f5]"
      >
        {/* Section Heading Block (Two-column row) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202020]">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
              KABAR & DOKUMENTASI KEGIATAN
            </span>
            <h2
              id="berita-heading"
              className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-[#202020]"
            >
              BERITA TERKINI
            </h2>
          </div>
          <Link
            id="berita-view-all-link"
            href="/berita"
            className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.023em] text-[#202020] hover:text-[#15803d] inline-flex items-center gap-2 border-b-2 border-[#ffc000] pb-1 transition-colors self-start sm:self-end group"
          >
            <span className="group-hover:text-[#15803d]">LIHAT SEMUA BERITA</span>
            <span className="text-[#ffc000] font-bold transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Three-Column Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10">
          {beritaList.slice(0, 3).map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Section 3: Wisata Dalisodo (Marble Gray Surface per DESIGN.md) */}
      <section
        id="wisata-dalisodo-section"
        aria-labelledby="wisata-heading"
        className="w-full bg-[#f5f5f5] text-[#202020] py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto border-t border-b border-[#969696]/20"
      >
        {/* Section Heading Block (Two-column row) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202020]">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
              DESTINASI & POTENSI LERENG KAWI
            </span>
            <h2
              id="wisata-heading"
              className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-[#202020]"
            >
              WISATA DALISODO
            </h2>
          </div>
          <Link
            id="wisata-view-all-link"
            href="/wisata"
            className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.023em] text-[#202020] hover:text-[#15803d] inline-flex items-center gap-2 border-b-2 border-[#ffc000] pb-1 transition-colors self-start sm:self-end group"
          >
            <span className="group-hover:text-[#15803d]">JELAJAHI SEMUA WISATA</span>
            <span className="text-[#ffc000] font-bold transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Three-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10">
          {wisataList.slice(0, 3).map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
