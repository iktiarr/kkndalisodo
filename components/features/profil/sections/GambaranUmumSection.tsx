import { ProfilDesa } from "@/types/profil";

interface GambaranUmumSectionProps {
  data: ProfilDesa;
}

export default function GambaranUmumSection({ data }: GambaranUmumSectionProps) {
  return (
    <section id="gambaran-umum" className="scroll-mt-32 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            01 • IDENTITAS & PROFIL DASAR
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            GAMBARAN UMUM DESA
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-pure-black font-bold uppercase tracking-wider bg-giallo px-4 py-2 rounded-lg border border-giallo-dark self-start sm:self-auto shadow-xs">
          &quot;{data.semboyan}&quot;
        </span>
      </div>

      {/* Top Info Highlights with Harmonious Gradients */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Ketinggian */}
        <div className="bg-linear-to-br from-emerald-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-emerald-200/80 shadow-xs space-y-3 hover:border-emerald-dalisodo transition-all group">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-emerald-800 font-bold uppercase tracking-wider block">KETINGGIAN</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-dalisodo flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-dalisodo group-hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M2 20L9 6L14 15L17 10L22 20H2Z" />
                <path d="M7 14L9 11L12 16" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-2xl sm:text-3xl font-bold text-carbony block">± 715 mdpl</span>
            <p className="font-sans text-sm text-steel mt-1">Lereng Timur Gunung Kawi</p>
          </div>
        </div>

        {/* Card 2: Iklim & Suhu */}
        <div className="bg-linear-to-br from-teal-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-teal-200/80 shadow-xs space-y-3 hover:border-teal-600 transition-all group">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-teal-800 font-bold uppercase tracking-wider block">IKLIM & SUHU</span>
            <div className="w-9 h-9 rounded-lg bg-teal-100/80 text-teal-700 flex items-center justify-center border border-teal-200 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M14 4V14.5L17 17.5L15 19.5L12 16.5V4H14Z" />
                <path d="M12 12H8M12 8H9M12 4H7" />
                <circle cx="12" cy="18" r="3" strokeWidth={2} />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-2xl sm:text-3xl font-bold text-teal-800 block">15°C – 20°C</span>
            <p className="font-sans text-sm text-steel mt-1">Sejuk khas dataran tinggi</p>
          </div>
        </div>

        {/* Card 3: Wilayah Dusun */}
        <div className="bg-linear-to-br from-amber-50/80 via-white to-white p-5 sm:p-6 rounded-lg border border-amber-200/80 shadow-xs space-y-3 hover:border-giallo-dark transition-all group">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-amber-900 font-bold uppercase tracking-wider block">WILAYAH DUSUN</span>
            <div className="w-9 h-9 rounded-lg bg-amber-100/80 text-giallo-dark flex items-center justify-center border border-amber-200 group-hover:bg-giallo group-hover:text-pure-black transition-colors">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-2xl sm:text-3xl font-bold text-carbony block">{data.jumlahDusunCount} Dusun</span>
            <p className="font-sans text-sm text-steel mt-1">12 Desa di Kec. Wagir</p>
          </div>
        </div>

        {/* Card 4: Kode Pos */}
        <div className="bg-linear-to-br from-slate-50 via-white to-white p-5 sm:p-6 rounded-lg border border-ash/30 shadow-xs space-y-3 hover:border-carbony transition-all group">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-steel font-bold uppercase tracking-wider block">KODE POS</span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-carbony flex items-center justify-center border border-ash/30 group-hover:bg-carbony group-hover:text-white transition-colors">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" />
                <path d="M12 12V22M12 12L4 7M12 12L20 7" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-2xl sm:text-3xl font-bold text-carbony block">{data.kodePos}</span>
            <p className="font-sans text-sm text-steel mt-1">{data.kabupaten}, {data.provinsi}</p>
          </div>
        </div>
      </div>

      {/* Description & Visi Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-ash/20 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-dalisodo shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M3 21H21M3 7L12 3L21 7V10H3V7ZM5 10V18M9 10V18M15 10V18M19 10V18" />
              </svg>
            </div>
            <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony">
              TENTANG DESA {data.namaDesa.toUpperCase()}
            </h3>
          </div>
          <p className="font-sans text-base sm:text-lg text-anvil leading-relaxed">
            {data.deskripsi}
          </p>
          <div className="p-5 rounded-lg bg-linear-to-r from-emerald-50/50 to-marble border border-emerald-100">
            <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
              {data.sejarah}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-linear-to-br from-emerald-50/50 via-white to-white border border-emerald-200/80 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-emerald-dalisodo rounded-md flex items-center justify-center text-white font-bold text-xs">
                ◆
              </div>
              <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-emerald-dalisodo tracking-wider">
                VISI PEMBANGUNAN DESA
              </span>
            </div>
            <p className="font-lambo text-base sm:text-lg text-carbony font-bold uppercase leading-snug tracking-[0.023em] bg-white p-4 sm:p-5 rounded-lg border border-emerald-100 shadow-2xs">
              &quot;{data.visi}&quot;
            </p>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-emerald-100">
            <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony tracking-wider block">
              MISI UTAMA DESA
            </span>
            <ul className="space-y-3">
              {data.misi.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-anvil">
                  <span className="text-emerald-dalisodo font-bold shrink-0 text-base leading-none">■</span>
                  <span className="font-sans leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
