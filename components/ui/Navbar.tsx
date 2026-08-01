import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-emerald-900/95 text-white backdrop-blur-md border-b border-emerald-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-emerald-950 text-xl shadow">
            D
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide block leading-none group-hover:text-emerald-300 transition-colors">
              Desa Dalisodo
            </span>
            <span className="text-xs text-emerald-300">Kec. Wagir, Kab. Malang</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
          <Link href="/" className="px-3 py-2 rounded-md hover:bg-emerald-800/60 hover:text-emerald-200 transition">
            Beranda
          </Link>
          <Link href="/wisata" className="px-3 py-2 rounded-md hover:bg-emerald-800/60 hover:text-emerald-200 transition">
            Wisata Desa
          </Link>
          <Link href="/berita" className="px-3 py-2 rounded-md hover:bg-emerald-800/60 hover:text-emerald-200 transition">
            Berita Kegiatan
          </Link>
          <Link href="/profil" className="px-3 py-2 rounded-md hover:bg-emerald-800/60 hover:text-emerald-200 transition">
            Profil Desa
          </Link>
        </nav>
      </div>
    </header>
  );
}
