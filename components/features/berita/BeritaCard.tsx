import Link from "next/link";
import Image from "next/image";
import { BeritaItem } from "@/types/berita";
import { formatTanggalWaktu } from "@/server/services/beritaService";

export default function BeritaCard({ item }: { item: BeritaItem }) {
  const formattedDate = item.tanggalwaktu
    ? formatTanggalWaktu(item.tanggalwaktu)
    : "Kabar Desa";

  return (
    <article
      id={`berita-card-${item.id}`}
      className="group flex flex-col bg-white border border-ash/20 rounded-lg overflow-hidden hover:border-giallo hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      {/* Article Cover Visual */}
      <Link
        href={`/berita/${item.id}`}
        aria-label={`Baca berita: ${item.judul}`}
        className="block relative aspect-video w-full overflow-hidden bg-carbony"
      >
        <Image
          src={item.coverUrl}
          alt={item.judul}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out filter brightness-[0.95]"
        />
        {item.kategori && (
          <span className="absolute top-3 left-3 bg-emerald-dark/90 group-hover:bg-emerald-dalisodo/90 backdrop-blur-md text-giallo font-lambo text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm border border-emerald-light/30 shadow-md transition-colors duration-300">
            {item.kategori}
          </span>
        )}
      </Link>

      {/* Article Content Details */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between bg-white">
        <div className="space-y-2">
          {/* Date Stamp */}
          <time
            dateTime={item.tanggalwaktu}
            className="font-lambo text-[11px] sm:text-xs tracking-wider text-emerald-dalisodo font-bold uppercase block"
          >
            {formattedDate}
          </time>

          {/* Uppercase Headline */}
          <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony group-hover:text-emerald-dalisodo transition-colors leading-snug line-clamp-2 tracking-[0.023em]">
            <Link href={`/berita/${item.id}`}>{item.judul}</Link>
          </h3>

          {/* Body Snippet */}
          <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed line-clamp-2">
            {item.ringkasan}
          </p>
        </div>

        {/* Discovery Action Link */}
        <div className="pt-4 mt-4 border-t border-marble">
          <Link
            href={`/berita/${item.id}`}
            className="font-lambo text-xs font-bold text-carbony group-hover:text-emerald-dalisodo uppercase tracking-[0.023em] inline-flex items-center gap-1.5 transition-colors"
          >
            <span className="group-hover:text-emerald-dalisodo">BACA SELENGKAPNYA</span>
            <span className="text-giallo font-bold transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

