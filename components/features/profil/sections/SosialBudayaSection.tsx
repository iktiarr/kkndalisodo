import { ProfilDesa } from "@/types/profil";

interface SosialBudayaSectionProps {
  data: ProfilDesa;
}

/**
 * Komponen SosialBudayaSection
 * 
 * Menampilkan seksi kehidupan sosial, keagamaan, toleransi antarumat beragama,
 * serta daftar kelembagaan kemasyarakatan yang aktif di Desa Dalisodo.
 *
 * @param {SosialBudayaSectionProps} props - Properti komponen berisi data profil desa.
 * @returns {JSX.Element} Elemen seksi sosial budaya dan kelembagaan.
 */
export default function SosialBudayaSection({ data }: SosialBudayaSectionProps) {
  return (
    <section id="sosbud" className="scroll-mt-32 space-y-8">
      {/* Header Seksi Sosial & Kelembagaan */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            08 • MASYARAKAT & ORGANISASI
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            SOSIAL & KELEMBAGAAN
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          KEHIDUPAN SOSIAL BUDAYA DESA
        </span>
      </div>

      {/* Kartu Narasi Keberagaman & Grid Organisasi Kemasyarakatan */}
      <div className="bg-linear-to-br from-emerald-50/30 via-white to-white p-6 sm:p-8 rounded-lg border border-emerald-100/80 space-y-6 shadow-xs">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 21V19C17 17 15 15 13 15H5C3 15 1 17 1 19V21" />
                <rect x="5" y="3" width="8" height="8" />
              </svg>
            </div>
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-emerald-dalisodo tracking-widest">
              KEBERAGAMAN & KEAGAMAAN
            </span>
          </div>
          <p className="font-sans text-base sm:text-lg text-anvil leading-relaxed">
            {data.sosialBudaya.keagamaan}
          </p>
        </div>

        {/* Grid Lembaga Masyarakat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-4 border-t border-emerald-100">
          {data.sosialBudaya.kelembagaan.map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-lg border border-ash/30 space-y-2.5 shadow-2xs hover:border-emerald-dalisodo transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-giallo-dark rounded-full" aria-hidden="true" />
                <span className="font-lambo text-xs sm:text-sm text-giallo-dark font-bold uppercase tracking-wider">
                  ORGANISASI 0{idx + 1}
                </span>
              </div>
              <p className="font-sans text-sm sm:text-base text-carbony font-medium leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
