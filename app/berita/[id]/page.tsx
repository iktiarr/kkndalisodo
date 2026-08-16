import { getBeritaById, getOtherBeritaList, formatTanggalWaktu } from "@/server/services/beritaService";
import RichContentRenderer from "@/components/features/berita/RichContentRenderer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getBeritaById(id);
  if (!item) return { title: "Berita Tidak Ditemukan | Desa Dalisodo" };

  return {
    title: `${item.judul} | Berita Desa Dalisodo`,
    description: item.ringkasan,
  };
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getBeritaById(id);

  if (!item) {
    notFound();
  }

  const formattedDate = formatTanggalWaktu(item.tanggalwaktu);
  const otherBerita = await getOtherBeritaList(item.id, 4);

  return (
    <main id={`berita-detail-${item.id}`} className="w-full bg-marble min-h-screen pb-20">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-carbon-deep text-white pt-24 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 border-b border-anvil relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-dalisodo/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-giallo/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto space-y-3.5 relative z-10">
          {/* Breadcrumb Navigation */}
          <Link
            href="/berita"
            className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-giallo uppercase font-bold inline-flex items-center gap-2 group hover:text-white transition-colors duration-300 w-fit"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">&larr;</span>
            <span>KEMBALI KE BERITA</span>
          </Link>

          {/* Category Badges */}
          {item.kategori && (
            <div className="pt-1.5">
              <span className="bg-emerald-dalisodo/20 backdrop-blur-sm text-giallo font-lambo text-xs font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-md border border-giallo/30 shadow-[0_0_15px_rgba(255,192,0,0.05)] cursor-default">
                {item.kategori}
              </span>
            </div>
          )}

          {/* Headline Title (Wide span & perfectly scaled font) */}
          <h1 className="font-lambo text-xl sm:text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl font-bold uppercase tracking-[0.02em] text-white leading-tight w-full max-w-none drop-shadow-md">
            {item.judul}
          </h1>

          {/* Date Stamp & Author Meta */}
          <div className="flex flex-wrap items-center gap-3 pt-1.5 font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
            <time dateTime={item.tanggalwaktu} className="text-emerald-dalisodo font-bold">
              {formattedDate || item.tanggalwaktu}
            </time>
            {item.penulis && (
              <>
                <span className="text-anvil">•</span>
                <span className="text-slate-400">OLEH: {item.penulis.toUpperCase()}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Article Body Container (Wide spacious layout) */}
      <div className="max-w-7xl mx-auto pt-8 sm:pt-12 px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Cover Image Visual */}
        {item.coverUrl && (
          <div className="relative w-full aspect-21/9 max-h-125 rounded-xl overflow-hidden bg-carbony border border-ash/20 shadow-md">
            <Image
              src={item.coverUrl}
              alt={item.cover?.title || item.judul}
              fill
              priority
              sizes="(max-width: 1300px) 100vw, 1240px"
              className="object-cover object-center filter brightness-[0.95]"
            />
          </div>
        )}

        {/* Article Content Card */}
        <article className="bg-white rounded-xl border border-ash/20 p-6 sm:p-10 lg:p-14 shadow-sm space-y-8">
          <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:font-lambo prose-headings:uppercase prose-headings:text-carbony prose-a:text-emerald-dalisodo prose-p:text-slate-700 prose-p:leading-relaxed font-sans text-base sm:text-lg text-anvil leading-relaxed space-y-4">
            <RichContentRenderer content={item.isi} />
          </div>

          {/* Article Footer */}
          <div className="pt-6 border-t border-marble">
            <div className="font-lambo text-xs text-steel uppercase tracking-wider">
              DITERBITKAN OLEH PEMERINTAH DESA DALISODO & TIM KKN 10
            </div>
          </div>
        </article>

        {/* 2-Column, 4-Card Compact Other News Section */}
        <section id="berita-rekomendasi" aria-label="Berita Lainnya" className="space-y-6 pt-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-carbony">
            <div>
              <h2 className="font-lambo text-2xl sm:text-3xl font-bold uppercase tracking-[0.023em] text-carbony">
                BERITA LAINNYA
              </h2>
            </div>
          </div>

          {otherBerita.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-ash/20">
              <p className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider">
                TIDAK ADA BERITA LAINNYA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {otherBerita.map((otherItem) => (
                <Link
                  key={otherItem.id}
                  href={`/berita/${otherItem.id}`}
                  className="group flex items-center gap-3.5 sm:gap-4 bg-white p-3 sm:p-3.5 rounded-xl border border-ash/20 hover:border-giallo hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-24 h-18 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-carbony">
                    <Image
                      src={otherItem.coverUrl}
                      alt={otherItem.judul}
                      fill
                      sizes="120px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony group-hover:text-emerald-dalisodo transition-colors leading-snug line-clamp-2">
                      {otherItem.judul}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

