import { WisataItem } from "@/types/wisata";

export default function WisataCard({ item }: { item: WisataItem }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition-all group flex flex-col">
      <div className="h-48 bg-slate-800 overflow-hidden relative">
        <img
          src={item.gambarUrl}
          alt={item.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-800 backdrop-blur-sm">
          {item.kategori}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {item.nama}
          </h3>
          <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
            {item.deskripsiSingkat}
          </p>
        </div>
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>📍 {item.lokasi}</span>
          <span className="font-semibold text-emerald-400">{item.hargaTiket}</span>
        </div>
      </div>
    </div>
  );
}
