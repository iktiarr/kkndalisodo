import HeroSection from "@/components/features/beranda/HeroSection";
import WisataCard from "@/components/features/wisata/WisataCard";
import BeritaCard from "@/components/features/berita/BeritaCard";
import VideoSection from "@/components/features/beranda/VideoSection";
import DokumentasiSection from "@/components/features/beranda/DokumentasiSection";
import { getWisataList } from "@/server/services/wisataService";
import { getBeritaList } from "@/server/services/beritaService";
import { getHeroSlides } from "@/server/services/heroService";
import { getVideoList } from "@/server/services/videoService";
import { getBannerList } from "@/server/services/bannerService";
import Link from "next/link";
import ContactSection from "@/components/features/beranda/ContactSection";

export default async function HomePage() {
  const [heroSlides, wisataList, beritaList, videoList, bannerList] = await Promise.all([
    getHeroSlides(),
    getWisataList(),
    getBeritaList(),
    getVideoList(),
    getBannerList(),
  ]);

  return (
    <div className="space-y-16 pb-12">
      <HeroSection initialSlides={heroSlides} />


      {/* Section 2: Berita Terkini (Editorial Story Grid per DESIGN.md) */}
      <section
        id="berita-terkini-section"
        aria-labelledby="berita-heading"
        className="w-full bg-[#ffffff] text-carbony py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto border-b border-marble"
      >
        {/* Section Heading Block (Two-column row) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-carbony">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
              KABAR & DOKUMENTASI KEGIATAN
            </span>
            <h2
              id="berita-heading"
              className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-carbony"
            >
              BERITA TERKINI
            </h2>
          </div>
          <Link
            id="berita-view-all-link"
            href="/berita"
            className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.023em] text-carbony hover:text-emerald-dalisodo hover:-translate-y-0.5 inline-flex items-center gap-2 border-b-2 border-giallo pb-1 transition-all duration-300 self-start sm:self-end group"
          >
            <span className="group-hover:text-emerald-dalisodo transition-colors">LIHAT SEMUA BERITA</span>
            <span className="text-giallo font-bold transition-transform duration-200 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Four-Column Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-10">
          {beritaList.slice(0, 4).map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Section 3: Wisata Dalisodo (Marble Gray Surface per DESIGN.md) */}
      <section
        id="wisata-dalisodo-section"
        aria-labelledby="wisata-heading"
        className="w-full bg-marble text-carbony py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto border-t border-b border-ash/20"
      >
        {/* Section Heading Block (Two-column row) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-carbony">
          <div>
            <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
              DESTINASI & POTENSI LERENG KAWI
            </span>
            <h2
              id="wisata-heading"
              className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-carbony"
            >
              WISATA DALISODO
            </h2>
          </div>
          <Link
            id="wisata-view-all-link"
            href="/wisata"
            className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.023em] text-carbony hover:text-emerald-dalisodo hover:-translate-y-0.5 inline-flex items-center gap-2 border-b-2 border-giallo pb-1 transition-all duration-300 self-start sm:self-end group"
          >
            <span className="group-hover:text-emerald-dalisodo transition-colors">JELAJAHI SEMUA WISATA</span>
            <span className="text-giallo font-bold transition-transform duration-200 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Four-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-10">
          {wisataList.slice(0, 4).map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Section 4: Video Profil Dalisodo (Carousel if multiple videos) */}
      <VideoSection videos={videoList} />

      {/* Section 5: Dokumentasi Foto (4 Columns Desktop Grid) */}
      <DokumentasiSection items={bannerList} />

      <ContactSection />
    </div>
  );
}


