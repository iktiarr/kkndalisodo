import { getBeritaById, formatTanggalWaktu } from "@/server/services/beritaService";
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

  return (
    <main id={`berita-detail-${item.id}`} className="w-full bg-marble min-h-screen pb-16">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-carbon-deep text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-anvil relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-dalisodo/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-giallo/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-250 mx-auto space-y-5 relative z-10">
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
            <div className="pt-3">
              <span className="bg-emerald-dalisodo/20 backdrop-blur-sm text-giallo font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-md border border-giallo/30 shadow-[0_0_15px_rgba(255,192,0,0.05)] cursor-default">
                {item.kategori}
              </span>
            </div>
          )}

          {/* Headline Title */}
          <h1 className="font-lambo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.01em] text-white leading-[1.05] drop-shadow-lg">
            {item.judul}
          </h1>

          {/* Date Stamp & Author Meta */}
          <div className="flex items-center gap-3 pt-3 font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
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

      {/* Article Body Container */}
      <div className="max-w-250 mx-auto pt-8 sm:pt-12 px-6 sm:px-12 lg:px-16 space-y-8">
        
        {/* Cover Image Visual */}
        {item.coverUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-carbony border border-ash/20 shadow-md">
            <Image
              src={item.coverUrl}
              alt={item.cover?.title || item.judul}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1000px"
              className="object-cover object-center filter brightness-[0.95]"
            />
          </div>
        )}

        {/* Article Content Card */}
        <article className="bg-white rounded-lg border border-ash/20 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="prose prose-slate max-w-none prose-img:rounded-lg prose-headings:font-lambo prose-headings:uppercase prose-a:text-emerald-dalisodo font-sans text-sm sm:text-base text-anvil leading-relaxed">
            <RichContentRenderer content={item.isi} />
          </div>

          {/* Article Footer & Share Banner */}
          <div className="pt-8 mt-8 border-t border-marble flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-lambo text-xs text-steel uppercase tracking-wider">
              DITERBITKAN OLEH PEMERINTAH DESA DALISODO & TIM KKN 10
            </div>
            <Link
              href="/berita"
              className="font-lambo text-xs font-bold text-carbony hover:text-emerald-dalisodo uppercase tracking-[0.023em] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>BACA BERITA LAINNYA</span>
              <span className="text-giallo font-bold">&rarr;</span>
            </Link>
          </div>
        </article>

      </div>
    </main>
  );
}

