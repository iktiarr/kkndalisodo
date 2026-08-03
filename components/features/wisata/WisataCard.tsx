import Link from "next/link";
import Image from "next/image";
import { WisataItem } from "@/types/wisata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getShortDescription = (richText: any) => {
  if (!richText || !richText.content) return "";
  let text = "";
  for (const node of richText.content) {
    if (node.nodeType === "paragraph" && node.content) {
      for (const child of node.content) {
        if (child.nodeType === "text" && child.value) {
          text += child.value + " ";
        }
      }
    }
    if (text.length > 150) break;
  }
  return text.trim();
};

export default function WisataCard({ item }: { item: WisataItem }) {
  return (
    <article className="group flex flex-col bg-transparent">
      <Link href={`/wisata/${item.slug || item.id}`} className="block relative aspect-video rounded-xl overflow-hidden bg-slate-200 mb-3">
        <Image
          src={item.thumbnailUrl}
          alt={item.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>
      <div className="flex flex-col flex-1">
        {item.kategori && item.kategori.length > 0 && (
          <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 line-clamp-1">
            {item.kategori.join(", ")}
          </span>
        )}
        <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1 sm:mb-1.5 leading-tight group-hover:text-emerald-600 transition-colors">
          <Link href={`/wisata/${item.slug || item.id}`} className="line-clamp-2">
            {item.judul}
          </Link>
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {getShortDescription(item.deskripsi)}
        </p>
      </div>
    </article>
  );
}
