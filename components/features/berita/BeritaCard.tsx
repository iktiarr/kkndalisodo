import { BeritaItem } from "@/types/berita";

export default function BeritaCard({ item }: { item: BeritaItem }) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition-all flex flex-col">
      <div className="h-44 bg-slate-800 overflow-hidden relative">
        <img
          src={item.gambarUrl}
          alt={item.judul}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-slate-950/80 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-sm">
          {item.kategori}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xs text-emerald-400 font-medium mb-1">
            {item.tanggal} • {item.penulis}
          </div>
          <h3 className="text-lg font-bold text-white leading-snug hover:text-emerald-400 transition-colors">
            {item.judul}
          </h3>
          <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
            {item.ringkasan}
          </p>
        </div>
      </div>
    </article>
  );
}
