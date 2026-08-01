import HeroSection from "@/components/features/beranda/HeroSection";
import WisataCard from "@/components/features/wisata/WisataCard";
import BeritaCard from "@/components/features/berita/BeritaCard";
import { getWisataList } from "@/server/services/wisataService";
import { getBeritaList } from "@/server/services/beritaService";
import Link from "next/link";

export default async function HomePage() {
  const wisataList = await getWisataList();
  const beritaList = await getBeritaList();

  return (
    <div className="space-y-16">
      <HeroSection />

      {/* Preview Wisata */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Wisata Populer</h2>
            <p className="text-sm text-slate-400">Destinasi alam favorit di Desa Dalisodo</p>
          </div>
          <Link href="/wisata" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wisataList.slice(0, 3).map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Preview Berita */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Berita & Kegiatan</h2>
            <p className="text-sm text-slate-400">Kabar terbaru dari masyarakat dan kegiatan KKN</p>
          </div>
          <Link href="/berita" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaList.slice(0, 3).map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
