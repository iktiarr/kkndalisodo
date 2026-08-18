import { ProfilDesa } from "@/types/profil";

interface DusunSectionProps {
  data: ProfilDesa;
}

export default function DusunSection({ data }: DusunSectionProps) {
  return (
    <section id="dusun" className="scroll-mt-32 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
        <div>
          <span className="font-lambo text-xs sm:text-sm tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            03 • PEMBAGIAN ADMINISTRATIF
          </span>
          <h2 className="font-lambo text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.023em] text-carbony">
            {data.jumlahDusunCount} WILAYAH DUSUN
          </h2>
        </div>
        <span className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-wider font-semibold">
          TOTAL {data.jumlahDusunCount} DUSUN DI {data.namaDesa.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {data.dusunList.map((dusun) => {
          const isPrecet = dusun.nama.toLowerCase().includes("precet");
          const isBedali = dusun.nama.toLowerCase().includes("bedali");

          return (
            <div
              key={dusun.no}
              className={`p-6 rounded-lg border transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xs group hover:-translate-y-1 ${
                isPrecet
                  ? "bg-linear-to-br from-amber-50/70 via-white to-white border-amber-200 hover:border-giallo-dark"
                  : isBedali
                  ? "bg-linear-to-br from-emerald-50/70 via-white to-white border-emerald-200 hover:border-emerald-dalisodo"
                  : "bg-linear-to-br from-slate-50/70 via-white to-white border-ash/30 hover:border-emerald-dalisodo"
              }`}
            >
              <div className="flex items-center justify-between border-b border-marble pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-dalisodo flex items-center justify-center border border-emerald-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" />
                      <path d="M9 3V21M15 3V21M3 9H21M3 15H21" />
                    </svg>
                  </div>
                  <span className="font-lambo text-xs sm:text-sm font-bold text-emerald-dalisodo uppercase tracking-widest">
                    DUSUN 0{dusun.no}
                  </span>
                </div>
                {isPrecet && (
                  <span className="font-lambo text-xs font-bold bg-giallo text-pure-black px-2.5 py-0.5 rounded-md uppercase shadow-2xs">
                    KAMPUNG KB
                  </span>
                )}
                {isBedali && (
                  <span className="font-lambo text-xs font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md uppercase border border-emerald-200">
                    LERENG KAWI
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-emerald-dalisodo transition-colors">
                  {dusun.nama}
                </h3>
                {dusun.keterangan && (
                  <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
                    {dusun.keterangan}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
