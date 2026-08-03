import { ProfilDesa } from "@/types/profil";

export default function ProfilSection({ data }: { data: ProfilDesa }) {
  return (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Tentang Desa Dalisodo</h2>
        <p className="text-slate-600 leading-relaxed text-base md:text-lg">{data.deskripsi}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 text-center">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Kecamatan</span>
            <span className="text-lg md:text-xl font-bold text-slate-900">{data.kecamatan}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Kabupaten</span>
            <span className="text-lg md:text-xl font-bold text-slate-900">{data.kabupaten}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Luas Wilayah</span>
            <span className="text-lg md:text-xl font-bold text-emerald-600">{data.luasWilayah}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Populasi</span>
            <span className="text-lg md:text-xl font-bold text-emerald-600">{data.jumlahPenduduk}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Visi Desa
          </h3>
          <p className="text-slate-700 leading-relaxed italic bg-emerald-50 p-5 rounded-xl border border-emerald-100 font-medium text-lg">
            &quot;{data.visi}&quot;
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span> Misi Desa
          </h3>
          <ul className="space-y-3 text-slate-600">
            {data.misi.map((m, idx) => (
              <li key={idx} className="flex gap-3 text-sm md:text-base leading-relaxed">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
