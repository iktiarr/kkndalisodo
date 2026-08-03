import BeritaCard from "@/components/features/berita/BeritaCard";
import { getBeritaList } from "@/server/services/beritaService";

export const metadata = {
  title: "Berita & Kegiatan | Desa Dalisodo",
  description: "Kumpulan artikel berita terkini dan laporan kegiatan pembangunan Desa Dalisodo.",
};

export default async function BeritaPage() {
  const beritaList = await getBeritaList();

  return (
    <div className="max-w-350 mx-auto space-y-12 py-10 px-4 sm:px-6">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Berita & Kegiatan</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Informasi terbaru seputar agenda, pembangunan, dan kegiatan masyarakat Desa Dalisodo.
        </p>
      </div>

      {beritaList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500">Belum ada berita yang diterbitkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-x-4 md:gap-y-8">
          {beritaList.map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
