import Link from "next/link";
import Image from "next/image";
import { WisataItem } from "@/types/wisata";

// Helper: Extract text from RichText JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getShortDescription = (richText: any): string => {
  if (!richText) return "";
  if (typeof richText === "string") return richText;
  if (!richText.content) return "";
  
  let text = "";
  for (const node of richText.content) {
    if (node.nodeType === "paragraph" && node.content) {
      for (const child of node.content) {
        if (child.nodeType === "text" && child.value) {
          text += child.value + " ";
        }
      }
    }
    if (text.length > 140) break;
  }
  return text.trim();
};

export default function WisataCard({ item }: { item: WisataItem }) {
  const shortDesc = getShortDescription(item.deskripsi);
  const targetLink = `/wisata/${item.slug || item.id}`;

  return (
    <article
      id={`wisata-card-${item.id}`}
      className="group flex flex-col bg-white border border-ash/20 rounded-lg overflow-hidden hover:border-giallo hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      {/* Destination Image Visual */}
      <Link
        href={targetLink}
        aria-label={`Jelajahi wisata: ${item.judul}`}
        className="block relative aspect-4/3 w-full overflow-hidden bg-carbony"
      >
        <Image
          src={item.thumbnailUrl}
          alt={item.judul}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out filter brightness-[0.95]"
        />
        
        {/* Category Badge */}
        {item.kategori && item.kategori.length > 0 && (
          <span className="absolute top-3 left-3 bg-emerald-dark/90 group-hover:bg-emerald-dalisodo/90 backdrop-blur-md text-giallo font-lambo text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm border border-emerald-light/30 shadow-md transition-colors duration-300">
            {item.kategori.join(" • ")}
          </span>
        )}
      </Link>

      {/* Destination Content Details */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between bg-white">
        <div className="space-y-2">
          {/* Uppercase Headline */}
          <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony group-hover:text-emerald-dalisodo transition-colors leading-snug line-clamp-2 tracking-[0.023em]">
            <Link href={targetLink}>{item.judul}</Link>
          </h3>

          {/* Description Snippet */}
          <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed line-clamp-2">
            {shortDesc || "Destinasi wisata favorit di lereng Gunung Kawi Desa Dalisodo."}
          </p>

          {/* Facility / Highlights Pills */}
          {item.lainnya && item.lainnya.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.lainnya.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="font-lambo text-[10px] uppercase tracking-wider text-emerald-dalisodo bg-emerald-dalisodo/10 px-2 py-0.5 rounded-sm border border-emerald-dalisodo/20 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-4 mt-4 border-t border-marble">
          <Link
            href={targetLink}
            className="font-lambo text-xs font-bold text-carbony group-hover:text-emerald-dalisodo uppercase tracking-[0.023em] inline-flex items-center gap-1.5 transition-colors"
          >
            <span className="group-hover:text-emerald-dalisodo">JELAJAHI DESTINASI</span>
            <span className="text-giallo font-bold transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

