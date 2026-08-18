import { ProfilDesa } from "@/types/profil";

interface EkonomiSectionProps {
  data: ProfilDesa;
}

/**
 * Komponen EkonomiSection
 * 
 * Menampilkan seksi potensi ekonomi, pertanian, kehutanan, peternakan sapi perah, perdagangan, dan permodalan Desa Dalisodo.
 * Serta spanduk potensi pariwisata berbasis agrowisata dan lingkungan berkelanjutan.
 *
 * @param {EkonomiSectionProps} props - Properti komponen berisi data profil desa.
 * @returns {JSX.Element} Elemen seksi potensi ekonomi dan pertanian.
 */
export default function EkonomiSection({ data }: EkonomiSectionProps) {
  return (
    <section id="ekonomi" className="scroll-mt-32 space-y-8">
      {/* Header Seksi Potensi Ekonomi & Sektor Unggulan */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            07 • SEKTOR UNGGULAN
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            POTENSI EKONOMI & PERTANIAN
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          PERTANIAN • PETERNAKAN • PERDAGANGAN
        </span>
      </div>

      {/* Grid 6 Kartu Komoditas & Sektor Unggulan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-dalisodo">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L4 12H8L5 18H11V22H13V18H19L16 12H20L12 2Z" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">KEHUTANAN & KAYU</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.kehutanan}</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-giallo-dark">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="3" width="10" height="14" />
                <path d="M12 17V21M8 21H16" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">PALAWIJA & JAGUNG</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.palawija}</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-dalisodo">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21C12 21 5 17 5 11C5 7.1 8.1 4 12 4C15.9 4 19 7.1 19 11C19 17 12 21 12 21Z" />
                <path d="M12 4V18" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">SAYUR-MAYUR</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.sayuran}</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-carbony/5 border border-ash/20 flex items-center justify-center text-carbony">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="8" width="16" height="12" />
                <path d="M8 20V22M16 20V22M4 11H20M8 8V4M16 8V4" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">PETERNAKAN SAPI PERAH</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.peternakan}</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-giallo-dark">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6V20C3 21 4 22 5 22H19C20 22 21 21 21 20V6L18 2H6Z" />
                <path d="M3 6H21M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">PASAR & PERDAGANGAN</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.perdagangan}</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-dalisodo">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" />
                <path d="M2 10H22M6 16H10" />
              </svg>
            </div>
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">AKSES PERMODALAN</h3>
          </div>
          <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">{data.potensiEkonomi.permodalan}</p>
        </div>
      </div>

      {/* Spanduk Inisiatif Wisata Berkelanjutan */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-ash/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-dalisodo flex items-center justify-center border border-emerald-200 shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" />
              </svg>
            </div>
            <span className="font-lambo text-xs sm:text-sm text-emerald-dalisodo font-bold uppercase tracking-wider">
              POTENSI WISATA & LINGKUNGAN BERKELANJUTAN
            </span>
          </div>
          <p className="font-sans text-sm sm:text-base text-anvil leading-relaxed">
            {data.potensiEkonomi.inisiatifTambahan}
          </p>
        </div>
      </div>
    </section>
  );
}
