"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      aria-label="Footer Resmi Desa Dalisodo"
      className="w-full bg-carbon-deep text-white border-t border-anvil mt-0"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20">
        
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Logos (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 2 Circular Logos Side-by-Side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {/* Logo 1: Circular Logo Desa Dalisodo */}
                <div className="relative w-10 h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden shadow-md hover:scale-110 hover:border-giallo transition-all duration-300">
                  <Image
                    src="/assets/image/logo-dalisodo.svg"
                    alt="Logo Desa Dalisodo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>

                {/* Logo 2: Circular Logo KKN 10 Dalisodo */}
                <div className="relative w-10 h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden shadow-md hover:scale-110 hover:border-giallo transition-all duration-300">
                  <Image
                    src="/assets/image/Logo-kkn10.png"
                    alt="Logo KKN 10 Dalisodo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <span className="font-lambo text-lg sm:text-xl font-bold uppercase tracking-[0.023em] text-white leading-tight">
                  DESA DALISODO
                </span>
                <span className="font-lambo text-[10px] text-giallo tracking-[0.12em] font-semibold uppercase">
                  KECAMATAN WAGIR • KABUPATEN MALANG
                </span>
              </div>
            </div>

            {/* Editorial Summary */}
            <p className="font-lambo text-xs sm:text-sm text-steel leading-relaxed tracking-[0.023em] max-w-md">
              PORTAL RESMI INFORMASI DESTINASI WISATA ALAM, KABAR KEGIATAN MASYARAKAT, DAN PROGRAM KERJA MAHASISWA KKN 10 DALISODO.
            </p>

            {/* Social / Tag Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-lambo text-[10px] uppercase tracking-wider text-giallo bg-black/60 px-3 py-1 rounded-md border border-white/10 hover:border-giallo hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                KKN 10 DALISODO
              </span>
              <span className="font-lambo text-[10px] uppercase tracking-wider text-slate-300 bg-white/5 px-3 py-1 rounded-md border border-white/10 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                WAGIR MALANG
              </span>
            </div>
          </div>

          {/* Column 2: Navigasi Utama (2 cols) */}
          <nav aria-label="Navigasi Footer" className="lg:col-span-2 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-giallo border-b border-anvil pb-2">
              NAVIGASI UTAMA
            </h3>
            <ul className="space-y-2.5 font-lambo text-xs sm:text-sm uppercase tracking-[0.023em]">
              <li>
                <Link href="/" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  BERANDA
                </Link>
              </li>
              <li>
                <Link href="/wisata" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  WISATA DESA
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  BERITA KEGIATAN
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  PROFIL DESA
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Destinasi Wisata (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-giallo border-b border-anvil pb-2">
              DESTINASI WISATA
            </h3>
            <ul className="space-y-2.5 font-lambo text-xs sm:text-sm uppercase tracking-[0.023em]">
              <li>
                <Link href="/wisata/coban-glotak" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  COBAN GLOTAK
                </Link>
              </li>
              <li>
                <Link href="/wisata/wisata-hutan-pinus-dalisodo" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  HUTAN PINUS
                </Link>
              </li>
              <li>
                <Link href="/wisata/agrowisata-kebun-kopi-dalisodo" className="text-slate-300 hover:text-giallo hover:translate-x-1 inline-block transition-all duration-300">
                  AGROWISATA KOPI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Operasional (3 cols) */}
          <address className="not-italic lg:col-span-3 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-giallo border-b border-anvil pb-2">
              KONTAK & OPERASIONAL
            </h3>
            <div className="space-y-2 font-lambo text-xs text-slate-300 uppercase tracking-[0.023em]">
              <p className="flex items-center gap-2">
                <span className="text-giallo">📍</span>
                <span>JL. RAYA DALISODO NO. 123, WAGIR MALANG</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-giallo">📞</span>
                <span>+62 812-3456-7890</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-giallo">✉️</span>
                <span className="lowercase">layanan@dalisodo.desa.id</span>
              </p>
              <p className="flex items-center gap-2 pt-2 text-giallo-dark font-semibold">
                <span className="text-giallo">🕒</span>
                <span>SENIN - JUMAT (08:00 - 15:30 WIB)</span>
              </p>
            </div>
          </address>

        </div>

        {/* Footer Bottom Copyright Bar */}
        <div className="border-t border-anvil pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-lambo tracking-wider uppercase text-steel gap-4">
          <p id="footer-copyright">
            © {currentYear} KKN 10 DESA DALISODO • KABUPATEN MALANG. HAK CIPTA DILINDUNGI.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-400 hover:text-giallo hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1 cursor-pointer group"
            >
              <span>KEMBALI KE ATAS</span>
              <span className="group-hover:-translate-y-1 transition-transform duration-300">↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

