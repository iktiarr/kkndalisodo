import { ProfilDesa } from "@/types/profil";

interface GeografiSectionProps {
  data: ProfilDesa;
}

export default function GeografiSection({ data }: GeografiSectionProps) {
  return (
    <section id="geografi" className="scroll-mt-32 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            02 • LOKASI & LINGKUNGAN
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            LETAK GEOGRAFIS & BATAS WILAYAH
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          {data.kabupaten.toUpperCase()} • {data.provinsi.toUpperCase()}
        </span>
      </div>

      {/* 4-Way Compass Boundaries with Compass Directional Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-linear-to-br from-emerald-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-emerald-200/80 shadow-xs hover:border-emerald-dalisodo transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-dalisodo">
              SEBELAH UTARA
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M12 19V5M5 12L12 5L19 12" />
              </svg>
            </div>
          </div>
          <p className="font-sans text-base sm:text-lg text-carbony font-semibold leading-snug">
            {data.batasWilayah.utara}
          </p>
        </div>

        <div className="bg-linear-to-br from-amber-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-amber-200/80 shadow-xs hover:border-giallo-dark transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-wider text-giallo-dark">
              SEBELAH SELATAN
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M12 5V19M5 12L12 19L19 12" />
              </svg>
            </div>
          </div>
          <p className="font-sans text-base sm:text-lg text-carbony font-semibold leading-snug">
            {data.batasWilayah.selatan}
          </p>
        </div>

        <div className="bg-linear-to-br from-teal-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-teal-200/80 shadow-xs hover:border-teal-600 transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-800">
              SEBELAH TIMUR
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center border border-teal-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M5 12H19M12 5L19 12L12 19" />
              </svg>
            </div>
          </div>
          <p className="font-sans text-base sm:text-lg text-carbony font-semibold leading-snug">
            {data.batasWilayah.timur}
          </p>
        </div>

        <div className="bg-linear-to-br from-amber-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-amber-200/80 shadow-xs hover:border-giallo-dark transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase tracking-wider text-giallo-dark">
              SEBELAH BARAT
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5L5 12L12 19" />
              </svg>
            </div>
          </div>
          <p className="font-sans text-base sm:text-lg text-carbony font-semibold leading-snug">
            {data.batasWilayah.barat}
          </p>
        </div>
      </div>

      {/* Access & Hydrology Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-emerald-50/50 via-white to-white p-6 sm:p-8 rounded-lg border border-emerald-100 space-y-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="9" />
                <path d="M7 11V7L10 4H14L17 7V11" />
                <circle cx="7.5" cy="15.5" r="1.5" />
                <circle cx="16.5" cy="15.5" r="1.5" />
              </svg>
            </div>
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony">
              AKSES KE KEC. {data.kecamatan.toUpperCase()}
            </span>
          </div>
          <span className="font-lambo text-3xl sm:text-4xl font-bold text-emerald-dalisodo block">
            {data.batasWilayah.jarakKecamatan}
          </span>
          <p className="font-sans text-sm sm:text-base text-steel">
            Ditempuh dalam {data.batasWilayah.waktuKecamatan} ke ibu kota kecamatan.
          </p>
        </div>

        <div className="bg-linear-to-br from-amber-50/50 via-white to-white p-6 sm:p-8 rounded-lg border border-amber-100 space-y-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <rect x="4" y="2" width="16" height="20" />
                <path d="M9 22V18H15V22M8 6H10M14 6H16M8 10H10M14 10H16M8 14H10M14 14H16" />
              </svg>
            </div>
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony">
              AKSES KE {data.kabupaten.toUpperCase()}
            </span>
          </div>
          <span className="font-lambo text-3xl sm:text-4xl font-bold text-giallo-dark block">
            {data.batasWilayah.jarakKabupaten}
          </span>
          <p className="font-sans text-sm sm:text-base text-steel">
            Ditempuh dalam {data.batasWilayah.waktuKabupaten} ke pusat pemerintahan kabupaten.
          </p>
        </div>

        <div className="bg-linear-to-br from-teal-50/50 via-white to-white p-6 sm:p-8 rounded-lg border border-teal-100 space-y-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center border border-teal-200">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M2 12C5 12 5 9 8 9C11 9 11 12 14 12C17 12 17 9 20 9C23 9 23 12 24 12" />
                <path d="M2 16C5 16 5 13 8 13C11 13 11 16 14 16C17 16 17 13 20 13C23 13 23 16 24 16" />
                <path d="M2 20C5 20 5 17 8 17C11 17 11 20 14 20C17 20 17 17 20 17C23 17 23 20 24 20" />
              </svg>
            </div>
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony">
              HIDROLOGI & CUACA
            </span>
          </div>
          <p className="font-sans text-sm sm:text-base text-anvil leading-relaxed">
            {data.batasWilayah.hidrologi} {data.batasWilayah.curahHujan}
          </p>
        </div>
      </div>
    </section>
  );
}
