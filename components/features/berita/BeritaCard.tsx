import Link from "next/link";
import Image from "next/image";
import { BeritaItem } from "@/types/berita";

export default function BeritaCard({ item }: { item: BeritaItem }) {
  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      <Link href={`/berita/${item.id}`} className="block relative aspect-4/3 overflow-hidden bg-gray-100">
        <Image
          src={item.coverUrl}
          alt={item.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {item.kategori && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
            {item.kategori}
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
          <Link href={`/berita/${item.id}`} className="line-clamp-2">
            {item.judul}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {item.ringkasan}
        </p>
      </div>
    </article>
  );
}
