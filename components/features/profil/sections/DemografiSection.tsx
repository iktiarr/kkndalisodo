import { ProfilDesa } from "@/types/profil";

interface DemografiSectionProps {
  data: ProfilDesa;
}

export default function DemografiSection({ data }: DemografiSectionProps) {
  const { kependudukan } = data;

  // Dynamic Total Sum Calculations for Real-Time Percentage Adjustments
  const parseNum = (val: number | string) => (typeof val === "number" ? val : parseInt(String(val).replace(/[^0-9]/g, "")) || 0);

  const totalUsiaSum = kependudukan.kelompokUsia.reduce((acc, curr) => acc + parseNum(curr.jumlah), 0) || 6451;
  const totalPendidikanSum = kependudukan.tingkatPendidikan.reduce((acc, curr) => acc + parseNum(curr.jumlah), 0) || 6451;
  const totalPekerjaanSum = kependudukan.mataPencaharian.reduce((acc, curr) => acc + parseNum(curr.jumlah), 0) || 4298;

  return (
    <section id="demografi" className="scroll-mt-32 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            05 • STATISTIK & PENDUDUK
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            DATA KEPENDUDUKAN
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          {kependudukan.ringkasan.totalPenduduk} • {kependudukan.ringkasan.kk} (DATA HISTORIS)
        </span>
      </div>

      {/* 4 Main Stat Cards (Harmonious White Theme with Clean Brand Accents) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-steel font-bold uppercase tracking-wider block">
              TOTAL PENDUDUK
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M17 21V19C17 17 15 15 13 15H5C3 15 1 17 1 19V21" />
                <rect x="5" y="3" width="8" height="8" />
                <path d="M23 21V19C23 17.5 21.8 16.2 20.3 15.6M16 3.1C17.2 3.6 18 4.7 18 6C18 7.3 17.2 8.4 16 8.9" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-3xl sm:text-4xl font-bold text-carbony block">
              {kependudukan.ringkasan.totalPenduduk.replace(/[^0-9.,]/g, "")}
            </span>
            <span className="font-sans text-sm text-steel mt-1 block">Jiwa penduduk desa</span>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-giallo transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-steel font-bold uppercase tracking-wider block">
              KEPALA KELUARGA
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M3 9L12 2L21 9V20C21 21 20 22 19 22H5C4 22 3 21 3 20V9Z" />
                <path d="M9 22V12H15V22" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-3xl sm:text-4xl font-bold text-carbony block">
              {kependudukan.ringkasan.kk.replace(/[^0-9.,]/g, "")}
            </span>
            <span className="font-sans text-sm text-steel mt-1 block">Kepala Keluarga (KK)</span>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-emerald-dalisodo transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-steel font-bold uppercase tracking-wider block">
              LAKI-LAKI
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <circle cx="10" cy="14" r="5" />
                <path d="M19 5L13.5 10.5M19 5H14M19 5V10" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-3xl sm:text-4xl font-bold text-emerald-dalisodo block">
              {kependudukan.ringkasan.lakiLaki.replace(/[^0-9.,]/g, "")}
            </span>
            <span className="font-sans text-sm text-steel mt-1 block">
              {Math.round((parseNum(kependudukan.ringkasan.lakiLaki) / (parseNum(kependudukan.ringkasan.lakiLaki) + parseNum(kependudukan.ringkasan.perempuan) || 1)) * 100)}% dari total penduduk
            </span>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 space-y-3 shadow-xs hover:border-giallo transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-lambo text-xs sm:text-sm text-steel font-bold uppercase tracking-wider block">
              PEREMPUAN
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-giallo-dark flex items-center justify-center border border-amber-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <circle cx="12" cy="9" r="5" />
                <path d="M12 14V21M9 18H15" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-lambo text-3xl sm:text-4xl font-bold text-giallo-dark block">
              {kependudukan.ringkasan.perempuan.replace(/[^0-9.,]/g, "")}
            </span>
            <span className="font-sans text-sm text-steel mt-1 block">
              {Math.round((parseNum(kependudukan.ringkasan.perempuan) / (parseNum(kependudukan.ringkasan.lakiLaki) + parseNum(kependudukan.ringkasan.perempuan) || 1)) * 100)}% dari total penduduk
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Demographic Tables with Dynamic Percentage Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kelompok Usia */}
        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-marble pb-3.5">
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">
              KELOMPOK USIA
            </h3>
            <svg className="w-5 h-5 text-emerald-dalisodo" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
              <path d="M12 8V12L15 15M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" />
            </svg>
          </div>
          <div className="space-y-4">
            {kependudukan.kelompokUsia.map((item, idx) => {
              const num = parseNum(item.jumlah);
              const pct = Math.min(100, Math.round((num / totalUsiaSum) * 100));
              return (
                <div key={idx} className="space-y-1.5 pb-2.5 border-b border-marble last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="font-sans text-steel font-medium">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony text-sm sm:text-base">
                      {item.jumlah} {item.satuan} <span className="text-xs text-steel font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-marble rounded-sm overflow-hidden">
                    <div className="h-full bg-emerald-dalisodo rounded-sm transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tingkat Pendidikan */}
        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-marble pb-3.5">
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">
              TINGKAT PENDIDIKAN
            </h3>
            <svg className="w-5 h-5 text-giallo-dark" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
              <path d="M22 10L12 4L2 10L12 16L22 10ZM22 10V16M6 12.5V17C6 19 8.7 20.5 12 20.5C15.3 20.5 18 19 18 17V12.5" />
            </svg>
          </div>
          <div className="space-y-4">
            {kependudukan.tingkatPendidikan.map((item, idx) => {
              const num = parseNum(item.jumlah);
              const pct = Math.min(100, Math.round((num / totalPendidikanSum) * 100));
              return (
                <div key={idx} className="space-y-1.5 pb-2.5 border-b border-marble last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="font-sans text-steel font-medium">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony text-sm sm:text-base">
                      {item.jumlah} {item.satuan} <span className="text-xs text-steel font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-marble rounded-sm overflow-hidden">
                    <div className="h-full bg-giallo rounded-sm transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mata Pencaharian */}
        <div className="bg-white p-6 sm:p-7 rounded-lg border border-ash/20 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-marble pb-3.5">
            <h3 className="font-lambo text-base sm:text-lg font-bold uppercase text-carbony">
              MATA PENCAHARIAN
            </h3>
            <svg className="w-5 h-5 text-carbony" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" />
              <path d="M16 7V4H8V7M2 13H22" />
            </svg>
          </div>
          <div className="space-y-4">
            {kependudukan.mataPencaharian.map((item, idx) => {
              const num = parseNum(item.jumlah);
              const pct = Math.min(100, Math.round((num / totalPekerjaanSum) * 100));
              return (
                <div key={idx} className="space-y-1.5 pb-2.5 border-b border-marble last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="font-sans text-steel font-medium">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony text-sm sm:text-base">{item.jumlah} {item.satuan}</span>
                  </div>
                  <div className="w-full h-2 bg-marble rounded-sm overflow-hidden">
                    <div className="h-full bg-carbony rounded-sm transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agama Card with Religion-Specific Sharp Icons */}
      <div className="bg-marble p-6 sm:p-8 rounded-lg border border-ash/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="font-lambo text-xs sm:text-sm font-bold uppercase text-emerald-dalisodo tracking-widest block mb-1">
            DATA PEMELUK AGAMA
          </span>
          <h4 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony">
            KERUKUNAN UMAT BERAGAMA
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {kependudukan.agama.map((item, idx) => {
            const lower = item.kategori.toLowerCase();
            const isIslam = lower.includes("islam");
            const isKristen = lower.includes("kristen") || lower.includes("protestan");
            const isHindu = lower.includes("hindu");

            return (
              <div
                key={idx}
                className="bg-white px-5 py-3 rounded-lg border border-ash/20 font-semibold shadow-xs flex items-center gap-3 hover:border-carbony/40 transition-colors"
              >
                {/* Specific Religious Icon */}
                {isIslam && (
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-dalisodo flex items-center justify-center border border-emerald-200 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                      <path d="M3 21H21M4 21V10L6 8L8 10V21M16 21V10L18 8L20 10V21M8 21V13C8 10.8 9.8 9 12 9C14.2 9 16 10.8 16 13V21M12 9V5" />
                      <circle cx="12" cy="4" r="1.5" />
                    </svg>
                  </div>
                )}

                {isKristen && (
                  <div className="w-7 h-7 rounded-md bg-amber-50 text-giallo-dark flex items-center justify-center border border-amber-200 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                      <path d="M12 2V22M6 8H18" />
                    </svg>
                  </div>
                )}

                {isHindu && (
                  <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                      <path d="M12 2L9 6H15L12 2ZM7 6L5 10H19L17 6H7ZM4 10L2 15H22L20 10H4ZM3 15V22H21V15M10 22V17H14V22" />
                    </svg>
                  </div>
                )}

                <span className="font-sans text-sm sm:text-base text-carbony">
                  <strong className={`font-lambo uppercase ${
                    isIslam ? "text-emerald-dalisodo" : isKristen ? "text-giallo-dark" : "text-orange-600"
                  }`}>
                    {item.kategori}:
                  </strong>{" "}
                  {item.jumlah} Jiwa
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
