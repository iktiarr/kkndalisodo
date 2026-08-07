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
    <main id={`wisata-detail-${wisata.id}`} className="w-full bg-marble min-h-screen pb-16">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-carbon-deep text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 border-b border-anvil relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-dalisodo/20 rounded-full blur-[120px] pointer-events-none -z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-giallo/10 rounded-full blur-[100px] pointer-events-none -z-0"></div>

        <div className="max-w-[1200px] mx-auto space-y-5 relative z-10">
          {/* Breadcrumb Navigation */}
          <Link
            href="/wisata"
            className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-giallo uppercase font-bold inline-flex items-center gap-2 group hover:text-white transition-colors duration-300 w-fit"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">&larr;</span>
            <span>KEMBALI KE DAFTAR WISATA</span>
          </Link>

          {/* Category Badges */}
          {wisata.kategori && wisata.kategori.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3">
              {wisata.kategori.map((kat, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-dalisodo/20 backdrop-blur-sm text-giallo font-lambo text-xs sm:text-sm font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-md border border-giallo/30 shadow-[0_0_15px_rgba(255,192,0,0.05)] cursor-default"
                >
                  {kat}
                </span>
              ))}
            </div>
          )}

          {/* Page Headline */}
          <h1 className="font-lambo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.01em] text-white leading-[1.05] drop-shadow-lg">
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
        <article className="bg-white rounded-lg border border-ash/20 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase text-carbony tracking-[0.023em] border-b border-carbony pb-2">
              DESKRIPSI & GAMBARAN UMUM
            </h2>

            <div className="prose prose-slate max-w-none prose-img:rounded-lg prose-headings:font-lambo prose-headings:uppercase prose-a:text-emerald-dalisodo font-sans text-sm sm:text-base text-anvil leading-relaxed">
              {wisata.deskripsi ? (
                <RichContentRenderer content={wisata.deskripsi} />
              ) : (
                <p className="text-steel">Deskripsi belum tersedia untuk destinasi ini.</p>
              )}
            </div>
          </div>

          {/* Facility & Extra Info Pills */}
          {wisata.lainnya && wisata.lainnya.length > 0 && (
            <div className="pt-6 border-t border-marble space-y-4">
              <h3 className="font-lambo text-lg font-bold uppercase text-carbony tracking-[0.023em] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-dalisodo"></span>
                <span>FASILITAS & INFORMASI TAMBAHAN</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {wisata.lainnya.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-dalisodo/10 text-emerald-dalisodo font-lambo text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-md border border-emerald-dalisodo/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action CTA Banner */}
          <div className="bg-carbon-deep text-white p-6 sm:p-8 rounded-lg border border-anvil flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-lambo text-xl font-bold uppercase text-giallo tracking-[0.023em]">
                INgin BERKUNJUNG KE {wisata.judul.toUpperCase()}?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                Hubungi Balai Desa atau pemandu lokasi untuk petunjuk arah dan informasi selengkapnya.
              </p>
            </div>
            <Link
              href="/#kontak"
              className="font-lambo bg-giallo text-black hover:bg-emerald-dalisodo hover:text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-bold tracking-[0.023em] uppercase transition-colors shrink-0 shadow-md"
            >
              HUBUNGI BALAI DESA
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}

