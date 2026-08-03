import Link from "next/link";
import Image from "next/image";
import { BeritaItem } from "@/types/berita";

export default function BeritaCard({ item }: { item: BeritaItem }) {
  return (
    <article className="group flex flex-col bg-transparent">
      <Link href={`/berita/${item.id}`} className="block relative aspect-video rounded-xl overflow-hidden bg-slate-200 mb-3">
        <Image
          src={item.coverUrl}
          alt={item.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>
      <div className="flex flex-col flex-1">
        {item.kategori && (
          <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5">
            {item.kategori}
          </span>
        )}
        <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1 sm:mb-1.5 leading-tight group-hover:text-emerald-600 transition-colors">
          <Link href={`/berita/${item.id}`} className="line-clamp-2">
            {item.judul}
          </Link>
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {item.ringkasan}
        </p>
      </div>
    </article>
  );
}
