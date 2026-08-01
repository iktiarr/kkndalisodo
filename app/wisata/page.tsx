import WisataCard from "@/components/features/wisata/WisataCard";
import { getWisataList } from "@/server/services/wisataService";

export const metadata = {
  title: "Wisata Desa Dalisodo | Pesona Alam Lereng Kawi",
  description: "Daftar tempat wisata alam, wahana, dan keindahan panorama Desa Dalisodo, Malang.",
};

export default async function WisataPage() {
  const wisataList = await getWisataList();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Wisata Desa Dalisodo</h1>
        <p className="text-slate-400 mt-2">
          Jelajahi berbagai keindahan alam dan tempat rekreasi khas Desa Dalisodo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wisataList.map((item) => (
          <WisataCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
