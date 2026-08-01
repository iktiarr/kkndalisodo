import BeritaCard from "@/components/features/berita/BeritaCard";
import { getBeritaList } from "@/server/services/beritaService";

export const metadata = {
  title: "Berita & Kegiatan | Desa Dalisodo",
  description: "Kumpulan artikel berita terkini dan laporan kegiatan pembangunan Desa Dalisodo.",
};

export default async function BeritaPage() {
  const beritaList = await getBeritaList();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Berita & Kegiatan Desa</h1>
        <p className="text-slate-400 mt-2">
          Informasi terbaru seputar agenda, pembangunan, dan kegiatan masyarakat Desa Dalisodo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((item) => (
          <BeritaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
