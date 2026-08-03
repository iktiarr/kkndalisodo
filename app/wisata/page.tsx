import WisataCard from "@/components/features/wisata/WisataCard";
import { getWisataList } from "@/server/services/wisataService";

export const metadata = {
  title: "Wisata Desa Dalisodo | Pesona Alam Lereng Kawi",
  description: "Daftar tempat wisata alam, wahana, dan keindahan panorama Desa Dalisodo, Malang.",
};

export default async function WisataPage() {
  const wisataList = await getWisataList();

  return (
    <div className="max-w-350 mx-auto space-y-12 py-10 px-4 sm:px-6">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Wisata Desa Dalisodo</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Jelajahi berbagai keindahan alam dan tempat rekreasi khas Desa Dalisodo.
        </p>
      </div>

      {wisataList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500">Belum ada wisata yang ditambahkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-x-4 md:gap-y-8">
          {wisataList.map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
