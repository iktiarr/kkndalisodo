import { getWisataBySlug, getOtherWisataList } from "@/server/services/wisataService";
import { notFound } from "next/navigation";
import RichContentRenderer from "@/components/features/berita/RichContentRenderer";
import Link from "next/link";
import Image from "next/image";
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

  const otherWisata = await getOtherWisataList(wisata.slug || wisata.id, 4);

  return (
    <main id={`wisata-detail-${wisata.id}`} className="w-full bg-marble min-h-screen pb-20">
      {/* Header Banner Section (Dark Stage per DESIGN.md) */}
      <header className="w-full bg-carbon-deep text-white pt-24 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 border-b border-anvil relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-dalisodo/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-giallo/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto space-y-3.5 relative z-10">
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
            <div className="flex flex-wrap gap-2 pt-1.5">
              {wisata.kategori.map((kat, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-dalisodo/20 backdrop-blur-sm text-giallo font-lambo text-xs font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-md border border-giallo/30 shadow-[0_0_15px_rgba(255,192,0,0.05)] cursor-default"
                >
                  {kat}
                </span>
              ))}
            </div>
          )}

          {/* Page Headline (Wide span & perfectly scaled font) */}
          <h1 className="font-lambo text-xl sm:text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl font-bold uppercase tracking-[0.02em] text-white leading-tight w-full max-w-none drop-shadow-md">
            {wisata.judul}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto pt-8 sm:pt-12 px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Photo Gallery Image Slider */}
        <div className="w-full shadow-lg rounded-xl overflow-hidden">
          <ImageSlider images={sliderImages} judul={wisata.judul} />
        </div>

        {/* Informational Narrative Card */}
        <article className="bg-white rounded-xl border border-ash/20 p-6 sm:p-10 lg:p-14 shadow-sm space-y-8">
          
          {/* Main Description */}
          <div className="space-y-4">
            <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase text-carbony tracking-[0.023em] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-dalisodo"></span>
              <span>TENTANG DESTINASI</span>
            </h2>
            <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:font-lambo prose-headings:uppercase prose-a:text-emerald-dalisodo font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
              <RichContentRenderer content={wisata.deskripsi} />
            </div>
          </div>

          {/* Detail Informasi Section (Key-Value Grid / Table Fallback) */}
          {wisata.detailInformasiItems && wisata.detailInformasiItems.length > 0 ? (
            <div className="pt-6 border-t border-marble space-y-4">
              <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase text-carbony tracking-[0.023em] border-b border-carbony pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-dalisodo"></span>
                <span>INFORMASI & KETERANGAN DESTINASI</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {wisata.detailInformasiItems.map((info, idx) => (
                  <div
                    key={idx}
                    className="bg-marble/60 border border-ash/20 rounded-lg p-4 flex flex-col justify-between hover:border-emerald-dalisodo/40 transition-colors shadow-2xs"
                  >
                    <span className="font-lambo text-xs uppercase tracking-wider text-emerald-dalisodo font-bold">
                      {info.label}
                    </span>
                    <span className="font-sans text-sm sm:text-base font-semibold text-carbony mt-1.5 leading-snug">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : wisata.detailInformasi ? (
            <div className="pt-6 border-t border-marble space-y-4">
              <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase text-carbony tracking-[0.023em] border-b border-carbony pb-2">
                DETAIL INFORMASI
              </h2>
              <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:font-lambo prose-headings:uppercase prose-a:text-emerald-dalisodo font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                <RichContentRenderer content={wisata.detailInformasi} />
              </div>
            </div>
          ) : null}

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
          <div className="bg-carbon-deep text-white p-6 sm:p-8 rounded-xl border border-anvil flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-lambo text-xl font-bold uppercase text-giallo tracking-[0.023em]">
                INGIN BERKUNJUNG KE {wisata.judul.toUpperCase()}?
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

        {/* 2-Column, 4-Card Compact Other Wisata Section */}
        <section id="wisata-rekomendasi" aria-label="Destinasi Wisata Lainnya" className="space-y-6 pt-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                EKSPLORASI LERENG KAWI
              </span>
              <h2 className="font-lambo text-2xl sm:text-3xl font-bold uppercase tracking-[0.023em] text-carbony">
                DESTINASI WISATA LAINNYA
              </h2>
            </div>
            <Link
              href="/wisata"
              className="font-lambo text-xs font-bold text-carbony hover:text-emerald-dalisodo uppercase tracking-[0.023em] inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>LIHAT SEMUA WISATA</span>
              <span className="text-giallo font-bold transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          {otherWisata.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-ash/20">
              <p className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider">
                TIDAK ADA DESTINASI WISATA LAINNYA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {otherWisata.map((otherItem) => (
                <Link
                  key={otherItem.id}
                  href={`/wisata/${otherItem.slug || otherItem.id}`}
                  className="group flex items-center gap-3.5 sm:gap-4 bg-white p-3 sm:p-3.5 rounded-xl border border-ash/20 hover:border-giallo hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-24 h-18 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-carbony">
                    <Image
                      src={otherItem.thumbnailUrl}
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
