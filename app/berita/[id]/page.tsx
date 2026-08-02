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
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-10">
        <Link
          href="/berita"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span>
          Kembali ke Berita
        </Link>
      </div>

      <header className="space-y-6 mb-10 text-center">
        {item.kategori && (
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wide">
            {item.kategori}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {item.judul}
        </h1>

        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 font-medium">
          <time dateTime={item.tanggalwaktu}>{formattedDate || item.tanggalwaktu}</time>
          {item.penulis && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span>{item.penulis}</span>
            </>
          )}
        </div>
      </header>

      {item.coverUrl && (
        <div className="relative w-full aspect-video md:aspect-21/9 mb-12 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-lg">
          <Image
            src={item.coverUrl}
            alt={item.cover?.title || item.judul}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="prose prose-emerald max-w-none prose-lg prose-p:leading-relaxed prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-img:rounded-2xl mx-auto">
        <RichContentRenderer content={item.isi} />
      </div>
    </article>
  );
}
