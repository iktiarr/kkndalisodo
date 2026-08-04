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
    <main id={`berita-detail-${item.id}`} className="w-full bg-[#f5f5f5] min-h-screen pb-16">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-[#181818] text-white pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 border-b border-[#313131]">
        <div className="max-w-[1000px] mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <Link
            href="/berita"
            className="font-lambo text-xs tracking-[0.15em] text-[#ffc000] uppercase font-bold inline-flex items-center gap-1.5 hover:underline"
          >
            <span>&larr;</span>
            <span>KEMBALI KE BERITA</span>
          </Link>

          {/* Category Badges */}
          {item.kategori && (
            <div className="pt-2">
              <span className="bg-[#064e3b]/90 text-[#ffc000] font-lambo text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-[6px] border border-[#22c55e]/30 shadow-sm">
                {item.kategori}
              </span>
            </div>
          )}

          {/* Headline Title */}
          <h1 className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-white leading-tight">
            {item.judul}
          </h1>

          {/* Date Stamp & Author Meta */}
          <div className="flex items-center gap-3 pt-2 font-lambo text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
            <time dateTime={item.tanggalwaktu} className="text-[#15803d] font-bold">
              {formattedDate || item.tanggalwaktu}
            </time>
            {item.penulis && (
              <>
                <span className="text-[#313131]">•</span>
                <span className="text-slate-400">OLEH: {item.penulis.toUpperCase()}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Article Body Container */}
      <div className="max-w-[1000px] mx-auto pt-8 sm:pt-12 px-6 sm:px-12 lg:px-16 space-y-8">
        
        {/* Cover Image Visual */}
        {item.coverUrl && (
          <div className="relative w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-[#202020] border border-[#969696]/20 shadow-md">
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
        <article className="bg-white rounded-[8px] border border-[#969696]/20 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="prose prose-slate max-w-none prose-img:rounded-[8px] prose-headings:font-lambo prose-headings:uppercase prose-a:text-[#15803d] font-sans text-sm sm:text-base text-[#313131] leading-relaxed">
            <RichContentRenderer content={item.isi} />
          </div>

          {/* Article Footer & Share Banner */}
          <div className="pt-8 mt-8 border-t border-[#f5f5f5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-lambo text-xs text-[#7d7d7d] uppercase tracking-wider">
              DITERBITKAN OLEH PEMERINTAH DESA DALISODO & TIM KKN 10
            </div>
            <Link
              href="/berita"
              className="font-lambo text-xs font-bold text-[#202020] hover:text-[#15803d] uppercase tracking-[0.023em] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>BACA BERITA LAINNYA</span>
              <span className="text-[#ffc000] font-bold">&rarr;</span>
            </Link>
          </div>
        </article>

      </div>
    </main>
  );
}
