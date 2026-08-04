import { getWisataBySlug } from "@/server/services/wisataService";
import { notFound } from "next/navigation";
import RichContentRenderer from "@/components/features/berita/RichContentRenderer";
import Link from "next/link";
import ImageSlider from "@/components/features/wisata/ImageSlider";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const wisata = await getWisataBySlug(slug);
  if (!wisata) return { title: "Wisata Tidak Ditemukan | Desa Dalisodo" };

  return {
    title: `${wisata.judul} | Wisata Desa Dalisodo`,
    description: `Informasi dan keindahan ${wisata.judul} di Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.`,
  };
}

export default async function WisataDetailPage({ params }: Props) {
  const { slug } = await params;
  const wisata = await getWisataBySlug(slug);

  if (!wisata) {
    notFound();
  }

  // Gunakan galeri untuk slider, jika tidak ada baru fallback ke thumbnail
  const sliderImages =
    wisata.galeriUrls && wisata.galeriUrls.length > 0
      ? wisata.galeriUrls
      : [wisata.thumbnailUrl];

  return (
    <main id={`wisata-detail-${wisata.id}`} className="w-full bg-[#f5f5f5] min-h-screen pb-16">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-[#181818] text-white pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 border-b border-[#313131]">
        <div className="max-w-[1200px] mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <Link
            href="/wisata"
            className="font-lambo text-xs tracking-[0.15em] text-[#ffc000] uppercase font-bold inline-flex items-center gap-1.5 hover:underline"
          >
            <span>&larr;</span>
            <span>KEMBALI KE DAFTAR WISATA</span>
          </Link>

          {/* Category Badges */}
          {wisata.kategori && wisata.kategori.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {wisata.kategori.map((kat, idx) => (
                <span
                  key={idx}
                  className="bg-[#064e3b]/90 text-[#ffc000] font-lambo text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-[6px] border border-[#22c55e]/30 shadow-sm"
                >
                  {kat}
                </span>
              ))}
            </div>
          )}

          {/* Page Headline */}
          <h1 className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-white leading-tight">
            {wisata.judul}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto pt-8 sm:pt-12 px-6 sm:px-12 lg:px-16 space-y-8">
        
        {/* Photo Gallery Image Slider */}
        <div className="w-full shadow-lg">
          <ImageSlider images={sliderImages} judul={wisata.judul} />
        </div>

        {/* Article Body & Details Container */}
        <article className="bg-white rounded-[8px] border border-[#969696]/20 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase text-[#202020] tracking-[0.023em] border-b border-[#202020] pb-2">
              DESKRIPSI & GAMBARAN UMUM
            </h2>

            <div className="prose prose-slate max-w-none prose-img:rounded-[8px] prose-headings:font-lambo prose-headings:uppercase prose-a:text-[#15803d] font-sans text-sm sm:text-base text-[#313131] leading-relaxed">
              {wisata.deskripsi ? (
                <RichContentRenderer content={wisata.deskripsi} />
              ) : (
                <p className="text-[#7d7d7d]">Deskripsi belum tersedia untuk destinasi ini.</p>
              )}
            </div>
          </div>

          {/* Facility & Extra Info Pills */}
          {wisata.lainnya && wisata.lainnya.length > 0 && (
            <div className="pt-6 border-t border-[#f5f5f5] space-y-4">
              <h3 className="font-lambo text-lg font-bold uppercase text-[#202020] tracking-[0.023em] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]"></span>
                <span>FASILITAS & INFORMASI TAMBAHAN</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {wisata.lainnya.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#15803d]/10 text-[#15803d] font-lambo text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-[6px] border border-[#15803d]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action CTA Banner */}
          <div className="bg-[#181818] text-white p-6 sm:p-8 rounded-[8px] border border-[#313131] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-lambo text-xl font-bold uppercase text-[#ffc000] tracking-[0.023em]">
                INgin BERKUNJUNG KE {wisata.judul.toUpperCase()}?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                Hubungi Balai Desa atau pemandu lokasi untuk petunjuk arah dan informasi selengkapnya.
              </p>
            </div>
            <Link
              href="/#kontak"
              className="font-lambo bg-[#ffc000] text-black hover:bg-[#15803d] hover:text-white px-6 py-3 rounded-[8px] text-xs sm:text-sm font-bold tracking-[0.023em] uppercase transition-colors shrink-0 shadow-md"
            >
              HUBUNGI BALAI DESA
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
