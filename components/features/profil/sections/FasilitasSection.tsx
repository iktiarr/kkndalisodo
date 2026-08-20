import { ProfilDesa } from "@/types/profil";

interface FasilitasSectionProps {
  data: ProfilDesa;
}

/**
 * Komponen FasilitasSection
 * 
 * Menampilkan seksi sarana dan prasarana umum Desa Dalisodo.
 * Mencakup daftar fasilitas umum & sosial (sekolah, tempat ibadah, polindes) serta infrastruktur dasar (jalan, listrik, irigasi).
 *
 * @param {FasilitasSectionProps} props - Properti komponen berisi data profil desa.
 * @returns {JSX.Element} Elemen seksi sarana dan prasarana.
 */
export default function FasilitasSection({ data }: FasilitasSectionProps) {
  return (
    <section id="fasilitas" className="scroll-mt-32 space-y-8">
      {/* Header Seksi Sarana & Prasarana */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            06 • FASILITAS DESA
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            SARANA & PRASARANA
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          FASILITAS SOSIAL & INFRASTRUKTUR
        </span>
      </div>

      {/* Grid 2 Kolom (Fasilitas Umum & Infrastruktur Dasar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Kolom Fasilitas Umum & Sosial */}
        <div className="bg-linear-to-br from-emerald-50/40 via-white to-white p-6 sm:p-8 rounded-lg border border-emerald-100/80 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 21H21M3 7L12 3L21 7V10H3V7ZM5 10V18M9 10V18M15 10V18M19 10V18" />
              </svg>
            </div>
            <div>
              <span className="font-lambo text-[10px] text-emerald-dalisodo font-bold uppercase tracking-wider block">SARANA PUBLIK</span>
              <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony">
                FASILITAS UMUM & SOSIAL
              </h3>
            </div>
          </div>
          <ul className="space-y-4">
            {data.saranaPrasarana.fasilitasUmum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-anvil">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-dalisodo flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-200" aria-hidden="true">
                  ✓
                </div>
                <span className="font-sans leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom Infrastruktur Dasar & Utilitas */}
        <div className="bg-linear-to-br from-amber-50/40 via-white to-white p-6 sm:p-8 rounded-lg border border-amber-100/80 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </div>
            <div>
              <span className="font-lambo text-[10px] text-giallo-dark font-bold uppercase tracking-wider block">UTILITAS & JALAN</span>
              <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony">
                INFRASTRUKTUR DASAR
              </h3>
            </div>
          </div>
          <ul className="space-y-4">
            {data.saranaPrasarana.infrastrukturDasar.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-anvil">
                <div className="w-5 h-5 rounded-md bg-amber-100 text-giallo-dark flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-amber-200" aria-hidden="true">
                  ⚡
                </div>
                <span className="font-sans leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
