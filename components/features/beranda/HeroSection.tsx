import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center rounded-2xl overflow-hidden shadow-xl border border-emerald-700/40">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider rounded-full uppercase">
          Selamat Datang di Portal Resmi
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Pesona Wisata & Potensi <span className="text-emerald-400">Desa Dalisodo</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Menjelajahi keindahan alam lereng Gunung Kawi, keberagaman budaya lokal, serta informasi kegiatan dan berita terbaru Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/wisata"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Jelajahi Wisata
          </Link>
          <Link
            href="/profil"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-lg shadow transition"
          >
            Profil Desa
          </Link>
        </div>
      </div>
    </section>
  );
}
