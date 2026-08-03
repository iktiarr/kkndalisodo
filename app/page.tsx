import HeroSection from "@/components/features/beranda/HeroSection";
import WisataCard from "@/components/features/wisata/WisataCard";
import BeritaCard from "@/components/features/berita/BeritaCard";
import { getWisataList } from "@/server/services/wisataService";
import { getBeritaList } from "@/server/services/beritaService";
import Link from "next/link";
import ContactSection from "@/components/features/beranda/ContactSection";

export default async function HomePage() {
  const wisataList = await getWisataList();
  const beritaList = await getBeritaList();

  return (
    <div className="space-y-16 pb-12">
      <HeroSection />

      {/* Preview Berita */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-300 pb-3 md:pb-4 gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Berita Terkini</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Kabar terbaru dari masyarakat dan kegiatan KKN</p>
          </div>
          <Link href="/berita" className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0">
            Lihat lebih banyak &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-x-4 md:gap-y-8">
          {beritaList.slice(0, 6).map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Preview Wisata */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-300 pb-3 md:pb-4 gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Wisata Dalisodo</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Destinasi alam dan budaya favorit</p>
          </div>
          <Link href="/wisata" className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0">
            Lihat lebih banyak &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-x-4 md:gap-y-8">
          {wisataList.slice(0, 6).map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
