import Link from "next/link";
import { BeritaItem } from "@/types/berita";
import { formatTanggalWaktu } from "@/server/services/beritaService";

export default function BeritaCard({ item }: { item: BeritaItem }) {
  const formattedDate = formatTanggalWaktu(item.tanggalwaktu);

  return (
    <article className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all flex flex-col group">
      <Link href={`/berita/${item.id}`} className="block h-48 bg-slate-800 overflow-hidden relative">
        <img
          src={item.coverUrl}
          alt={item.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.kategori && (
          <span className="absolute top-3 left-3 bg-slate-950/80 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700/80 backdrop-blur-sm">
            {item.kategori}
          </span>
        )}
      </Link>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xs text-slate-400 font-medium mb-2 flex items-center gap-2">
            <span>📅 {formattedDate || item.tanggalwaktu}</span>
            {item.penulis && (
              <>
                <span>•</span>
                <span>✍️ {item.penulis}</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
            <Link href={`/berita/${item.id}`}>{item.judul}</Link>
          </h3>
          <p className="text-slate-400 text-sm mt-2 line-clamp-3 leading-relaxed">
            {item.ringkasan}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800/60">
          <Link
            href={`/berita/${item.id}`}
            className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors gap-1 group-hover:translate-x-1 duration-200"
          >
            Baca Selengkapnya <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
