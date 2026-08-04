import { ProfilDesa } from "@/types/profil";

export default function ProfilSection({ data }: { data: ProfilDesa }) {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Demographics & Stats Summary Grid (4 Columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-[8px] border border-[#969696]/20 shadow-sm hover:border-[#15803d] transition-colors group">
          <span className="font-lambo text-xs font-bold uppercase tracking-[0.12em] text-[#15803d] block mb-1">
            KECAMATAN
          </span>
          <span className="font-lambo text-xl sm:text-2xl font-bold uppercase text-[#202020] tracking-[0.023em]">
            {data.kecamatan}
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[8px] border border-[#969696]/20 shadow-sm hover:border-[#15803d] transition-colors group">
          <span className="font-lambo text-xs font-bold uppercase tracking-[0.12em] text-[#15803d] block mb-1">
            KABUPATEN
          </span>
          <span className="font-lambo text-xl sm:text-2xl font-bold uppercase text-[#202020] tracking-[0.023em]">
            {data.kabupaten}
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[8px] border border-[#969696]/20 shadow-sm hover:border-[#ffc000] transition-colors group">
          <span className="font-lambo text-xs font-bold uppercase tracking-[0.12em] text-[#15803d] block mb-1">
            LUAS WILAYAH
          </span>
          <span className="font-lambo text-xl sm:text-2xl font-bold uppercase text-[#15803d] tracking-[0.023em]">
            {data.luasWilayah}
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[8px] border border-[#969696]/20 shadow-sm hover:border-[#ffc000] transition-colors group">
          <span className="font-lambo text-xs font-bold uppercase tracking-[0.12em] text-[#15803d] block mb-1">
            POPULASI PENDUDUK
          </span>
          <span className="font-lambo text-xl sm:text-2xl font-bold uppercase text-[#15803d] tracking-[0.023em]">
            {data.jumlahPenduduk}
          </span>
        </div>
      </div>

      {/* 2. Tentang & Sejarah Desa Dalisodo */}
      <div className="bg-white border border-[#969696]/20 rounded-[8px] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-[#202020] pb-4">
          <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
            GAMBARAN UMUM
          </span>
          <h2 className="font-lambo text-2xl sm:text-3xl font-bold uppercase tracking-[0.023em] text-[#202020]">
            TENTANG DESA DALISODO
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-[#313131] leading-relaxed">
          {data.deskripsi}
        </p>

        {data.sejarah && (
          <div className="pt-4 space-y-2 border-t border-[#f5f5f5]">
            <h3 className="font-lambo text-lg font-bold uppercase text-[#202020] tracking-[0.023em]">
              SEJARAH DESA
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#7d7d7d] leading-relaxed">
              {data.sejarah}
            </p>
          </div>
        )}
      </div>

      {/* 3. Visi & Misi Desa (Two-Column Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Visi Card (Emerald Dark Banner Stage - 5 cols) */}
        <div className="lg:col-span-5 bg-[#064e3b] text-white border border-[#22c55e]/30 rounded-[8px] p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#ffc000]"></span>
              <h3 className="font-lambo text-xl sm:text-2xl font-bold uppercase tracking-[0.023em] text-[#ffc000]">
                VISI DESA
              </h3>
            </div>
            <p className="font-lambo text-base sm:text-lg text-white leading-relaxed uppercase tracking-[0.023em] italic bg-black/30 p-5 rounded-[6px] border border-white/10">
              &quot;{data.visi}&quot;
            </p>
          </div>
          <span className="font-lambo text-[10px] text-slate-300 uppercase tracking-widest block">
            PEDOMAN Arah PEMBANGUNAN DESA DALISODO
          </span>
        </div>

        {/* Misi List (White Card - 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#969696]/20 rounded-[8px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#202020] pb-3">
            <h3 className="font-lambo text-xl sm:text-2xl font-bold uppercase tracking-[0.023em] text-[#202020]">
              MISI DESA
            </h3>
          </div>
          <ul className="space-y-3.5">
            {data.misi.map((m, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-[#f5f5f5] p-3.5 rounded-[6px] border border-[#969696]/15 hover:border-[#15803d] transition-colors"
              >
                <span className="w-5 h-5 shrink-0 bg-[#15803d] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm mt-0.5">
                  ✓
                </span>
                <span className="font-sans text-xs sm:text-sm text-[#313131] leading-relaxed">
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 4. Perangkat Desa Grid */}
      {data.perangkatDesa && data.perangkatDesa.length > 0 && (
        <div className="bg-white border border-[#969696]/20 rounded-[8px] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#202020] pb-4 flex items-center justify-between">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-[#15803d] font-bold uppercase block mb-1">
                TATA KELOLA PEMERINTAHAN
              </span>
              <h2 className="font-lambo text-2xl sm:text-3xl font-bold uppercase tracking-[0.023em] text-[#202020]">
                STRUKTUR PERANGKAT DESA
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.perangkatDesa.map((p) => (
              <div
                key={p.id}
                className="bg-[#f5f5f5] p-5 rounded-[8px] border border-[#969696]/20 flex flex-col justify-between space-y-2 hover:border-[#15803d] transition-colors"
              >
                <span className="font-lambo text-xs font-bold uppercase tracking-wider text-[#15803d]">
                  {p.jabatan}
                </span>
                <h4 className="font-lambo text-base font-bold uppercase text-[#202020] tracking-[0.023em]">
                  {p.nama}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
