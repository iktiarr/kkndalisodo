import { ProfilDesa } from "@/types/profil";

export default function ProfilSection({ data }: { data: ProfilDesa }) {
  return (
    <div className="space-y-12">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Tentang Desa Dalisodo</h2>
        <p className="text-slate-300 leading-relaxed text-base">{data.deskripsi}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-center">
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <span className="text-xs text-slate-400 block">Kecamatan</span>
            <span className="text-lg font-bold text-white">{data.kecamatan}</span>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <span className="text-xs text-slate-400 block">Kabupaten</span>
            <span className="text-lg font-bold text-white">{data.kabupaten}</span>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <span className="text-xs text-slate-400 block">Luas Wilayah</span>
            <span className="text-lg font-bold text-emerald-400">{data.luasWilayah}</span>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <span className="text-xs text-slate-400 block">Populasi</span>
            <span className="text-lg font-bold text-emerald-400">{data.jumlahPenduduk}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-lg">
          <h3 className="text-xl font-bold text-emerald-400 mb-3">Visi Desa</h3>
          <p className="text-slate-300 leading-relaxed italic bg-emerald-950/40 p-4 rounded-lg border border-emerald-900/60">
            &quot;{data.visi}&quot;
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-lg">
          <h3 className="text-xl font-bold text-emerald-400 mb-3">Misi Desa</h3>
          <ul className="space-y-2 text-slate-300">
            {data.misi.map((m, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
