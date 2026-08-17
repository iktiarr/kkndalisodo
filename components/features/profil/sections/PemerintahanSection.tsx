import { ProfilDesa } from "@/types/profil";

interface PemerintahanSectionProps {
  data: ProfilDesa;
}

export default function PemerintahanSection({ data }: PemerintahanSectionProps) {
  return (
    <section id="pemerintahan" className="scroll-mt-32 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            04 • TATA KELOLA & STRUKTUR ORGANISASI
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            STRUKTUR PEMERINTAHAN DESA
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          BAGAN STRUKTUR ORGANISASI
        </span>
      </div>

      {/* BAGAN STRUKTUR HIERARKI (100% CONNECTED TREE CHART) */}
      <div className="bg-white p-6 sm:p-10 rounded-lg border border-ash/20 shadow-sm overflow-x-auto scrollbar-none">
        <div className="min-w-200 flex flex-col items-center">
          
          {/* LEVEL 1: KEPALA DESA (TOP CENTER) */}
          <div className="w-full max-w-sm bg-carbon-deep text-white p-6 rounded-lg border-2 border-giallo shadow-xl text-center space-y-2 z-10 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-giallo" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
              </svg>
              <span className="font-lambo text-xs sm:text-sm font-bold text-giallo uppercase tracking-[0.15em]">
                PIMPINAN PEMERINTAHAN DESA
              </span>
            </div>
            <h3 className="font-lambo text-xl sm:text-2xl font-bold uppercase tracking-[0.023em] text-white">
              KEPALA DESA
            </h3>
            <p className="font-sans text-sm text-slate-300">Desa {data.namaDesa}, Kec. {data.kecamatan}</p>
          </div>
          
          {/* Vertical connector: Level 1 -> Level 2 */}
          <div className="w-0.5 h-8 bg-carbony/50" />

          {/* LEVEL 2: SEKRETARIS DESA (CENTER) */}
          <div className="w-full max-w-xs bg-emerald-dalisodo text-white p-5 rounded-lg border border-emerald-600 shadow-md text-center space-y-1.5 z-10 hover:-translate-y-1 transition-all duration-300">
            <span className="font-lambo text-xs font-bold text-white/80 uppercase tracking-widest block">
              SEKRETARIAT DESA
            </span>
            <h4 className="font-lambo text-base sm:text-lg font-bold uppercase tracking-[0.023em]">
              SEKRETARIS DESA
            </h4>
          </div>

          {/* Vertical connector: Level 2 -> Level 3 Horizontal Bar */}
          <div className="w-0.5 h-8 bg-carbony/50" />

          {/* LEVEL 3: 5 KAUR & KASI */}
          <div className="w-full relative">
            {/* Continuous horizontal bar across the 5 columns */}
            <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-carbony/50" />
            
            <div className="grid grid-cols-5 gap-3.5 pt-0">
              {[
                { role: "KEPALA URUSAN", title: "KAUR TATA USAHA & UMUM", color: "text-emerald-dalisodo", bg: "bg-emerald-50/50" },
                { role: "KEPALA URUSAN", title: "KAUR KEUANGAN", color: "text-emerald-dalisodo", bg: "bg-emerald-50/50" },
                { role: "KEPALA URUSAN", title: "KAUR PERENCANAAN", color: "text-emerald-dalisodo", bg: "bg-emerald-50/50" },
                { role: "KEPALA SEKSI", title: "KASI PEMERINTAHAN", color: "text-giallo-dark", bg: "bg-amber-50/50" },
                { role: "KEPALA SEKSI", title: "KASI PELAYANAN", color: "text-giallo-dark", bg: "bg-amber-50/50" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Stem from horizontal bar down into the card */}
                  <div className="w-0.5 h-6 bg-carbony/50" />
                  <div className={`w-full h-full ${item.bg} p-4 sm:p-5 rounded-lg border border-ash/30 text-center space-y-1.5 hover:border-carbony hover:bg-white transition-all duration-200 shadow-xs flex flex-col justify-center`}>
                    <span className={`font-lambo text-xs ${item.color} font-bold uppercase tracking-wider block`}>
                      {item.role}
                    </span>
                    <h5 className="font-lambo text-xs sm:text-sm lg:text-base font-bold uppercase text-carbony leading-snug">
                      {item.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical connector: Level 3 -> Level 4 Horizontal Bar */}
          <div className="w-0.5 h-10 bg-carbony/50" />

          {/* LEVEL 4: 7 KEPALA DUSUN */}
          <div className="w-full relative">
            {/* Continuous horizontal bar across the 7 columns */}
            <div className="absolute top-0 left-[7.14%] right-[7.14%] h-0.5 bg-carbony/50" />

            <div className="grid grid-cols-7 gap-2.5 pt-0">
              {data.dusunList.map((dusun, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Stem from horizontal bar down into the card */}
                  <div className="w-0.5 h-6 bg-carbony/50" />
                  <div className="w-full h-full bg-white p-3.5 sm:p-4 rounded-lg border border-ash/30 text-center space-y-1 hover:border-emerald-dalisodo hover:shadow-sm transition-all duration-200 shadow-xs flex flex-col justify-center">
                    <span className="font-lambo text-[10px] text-steel font-bold tracking-wider block">
                      DUSUN 0{dusun.no}
                    </span>
                    <h6 className="font-lambo text-xs sm:text-sm font-bold uppercase text-carbony leading-snug">
                      KEPALA {dusun.nama.toUpperCase()}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Official Disclaimer Note */}
        <div className="pt-8">
          <div className="p-5 rounded-lg bg-marble/80 border border-ash/20 text-sm text-steel italic leading-relaxed">
            Catatan: Nama pejabat definitif Kepala Desa dan perangkat desa dapat berubah mengikuti masa jabatan dan hasil pemilihan kepala desa terbaru. Untuk informasi nama pejabat definitif terkini, disarankan mengonfirmasi langsung ke Kantor Balai Desa Dalisodo atau situs resmi desa (<span className="text-carbony font-semibold">dalisodo-malangkab.desa.id</span>).
          </div>
        </div>
      </div>
    </section>
  );
}
