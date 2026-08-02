import { getBeritaById, formatTanggalWaktu } from "@/server/services/beritaService";
import RichContentRenderer from "@/components/features/berita/RichContentRenderer";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getBeritaById(id);
  if (!item) return { title: "Berita Tidak Ditemukan | Desa Dalisodo" };

  return {
    title: `${item.judul} | Desa Dalisodo`,
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
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back Button */}
      <div>
        <Link
          href="/berita"
          className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors gap-2 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-slate-800"
        >
          ← Kembali ke Berita & Kegiatan
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        {item.kategori && (
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
            {item.kategori}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          {item.judul}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-6">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate || item.tanggalwaktu}
          </span>
          {item.penulis && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {item.penulis}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {item.coverUrl && (
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 max-h-[480px]">
          <img
            src={item.coverUrl}
            alt={item.cover?.title || item.judul}
            className="w-full h-full object-cover max-h-[480px]"
          />
        </div>
      )}

      {/* Article Body */}
      <main className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <RichContentRenderer content={item.isi} />
      </main>
    </article>
  );
}
