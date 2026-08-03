import { getWisataBySlug } from "@/server/services/wisataService";
import { notFound } from "next/navigation";
import RichContentRenderer from "@/components/features/berita/RichContentRenderer";
import Link from "next/link";
import ImageSlider from "@/components/features/wisata/ImageSlider";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WisataDetailPage({ params }: Props) {
  const { slug } = await params;
  const wisata = await getWisataBySlug(slug);

  if (!wisata) {
    notFound();
  }

  // Gunakan galeri untuk slider, jika tidak ada baru fallback ke thumbnail
  const sliderImages = wisata.galeriUrls && wisata.galeriUrls.length > 0 
    ? wisata.galeriUrls 
    : [wisata.thumbnailUrl];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link href="/wisata" className="text-emerald-600 hover:text-emerald-500 mb-6 inline-block font-semibold transition-colors">
        &larr; Kembali ke Daftar Wisata
      </Link>
      
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xl">
        
        <ImageSlider images={sliderImages} judul={wisata.judul} />

        
        <div className="p-6 md:p-10">
          <div className="mb-8">
            {wisata.kategori && wisata.kategori.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {wisata.kategori.map((kat, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-lg border border-emerald-100">
                    {kat}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {wisata.judul}
            </h1>
          </div>

          <div className="prose prose-slate prose-emerald max-w-none prose-img:rounded-xl prose-headings:text-slate-900 prose-a:text-emerald-600">
            {wisata.deskripsi ? (
              <RichContentRenderer content={wisata.deskripsi} />
            ) : (
              <p className="text-slate-500">Deskripsi tidak tersedia.</p>
            )}
          </div>

          {wisata.lainnya && wisata.lainnya.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="bg-emerald-500 w-2 h-6 rounded-full mr-3"></span>
                Informasi Tambahan
              </h3>
              <div className="flex flex-wrap gap-3">
                {wisata.lainnya.map((tag, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 font-medium px-4 py-2 rounded-lg text-sm border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
