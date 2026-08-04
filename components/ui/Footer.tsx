import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      aria-label="Footer Resmi Desa Dalisodo"
      className="w-full bg-[#181818] text-white border-t border-[#313131] mt-0"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20">
        
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Logos (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 2 Circular Logos Side-by-Side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {/* Logo 1: Circular Logo Desa Dalisodo */}
                <div className="relative w-10 h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/assets/image/logo-dalisodo.svg"
                    alt="Logo Desa Dalisodo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>

                {/* Logo 2: Circular Logo KKN 10 Dalisodo */}
                <div className="relative w-10 h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden shadow-md">
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
                <span className="font-lambo text-[10px] text-[#ffc000] tracking-[0.12em] font-semibold uppercase">
                  KECAMATAN WAGIR • KABUPATEN MALANG
                </span>
              </div>
            </div>

            {/* Editorial Summary */}
            <p className="font-lambo text-xs sm:text-sm text-[#7d7d7d] leading-relaxed tracking-[0.023em] max-w-md">
              PORTAL RESMI INFORMASI DESTINASI WISATA ALAM, KABAR KEGIATAN MASYARAKAT, DAN PROGRAM KERJA MAHASISWA KKN 10 DALISODO.
            </p>

            {/* Social / Tag Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-lambo text-[10px] uppercase tracking-wider text-[#ffc000] bg-black/60 px-3 py-1 rounded-[6px] border border-white/10">
                KKN 10 DALISODO
              </span>
              <span className="font-lambo text-[10px] uppercase tracking-wider text-slate-300 bg-white/5 px-3 py-1 rounded-[6px] border border-white/10">
                WAGIR MALANG
              </span>
            </div>
          </div>

          {/* Column 2: Navigasi Utama (2 cols) */}
          <nav aria-label="Navigasi Footer" className="lg:col-span-2 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-[#ffc000] border-b border-[#313131] pb-2">
              NAVIGASI UTAMA
            </h3>
            <ul className="space-y-2.5 font-lambo text-xs sm:text-sm uppercase tracking-[0.023em]">
              <li>
                <Link href="/" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  BERANDA
                </Link>
              </li>
              <li>
                <Link href="/wisata" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  WISATA DESA
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  BERITA KEGIATAN
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  PROFIL DESA
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Destinasi Wisata (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-[#ffc000] border-b border-[#313131] pb-2">
              DESTINASI WISATA
            </h3>
            <ul className="space-y-2.5 font-lambo text-xs sm:text-sm uppercase tracking-[0.023em]">
              <li>
                <Link href="/wisata/coban-glotak" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  COBAN GLOTAK
                </Link>
              </li>
              <li>
                <Link href="/wisata/wisata-hutan-pinus-dalisodo" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  HUTAN PINUS
                </Link>
              </li>
              <li>
                <Link href="/wisata/agrowisata-kebun-kopi-dalisodo" className="text-slate-300 hover:text-[#ffc000] transition-colors">
                  AGROWISATA KOPI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Operasional (3 cols) */}
          <address className="not-italic lg:col-span-3 space-y-4">
            <h3 className="font-lambo text-xs font-bold uppercase tracking-[0.15em] text-[#ffc000] border-b border-[#313131] pb-2">
              KONTAK & OPERASIONAL
            </h3>
            <div className="space-y-2 font-lambo text-xs text-slate-300 uppercase tracking-[0.023em]">
              <p className="flex items-center gap-2">
                <span className="text-[#ffc000]">📍</span>
                <span>JL. RAYA DALISODO NO. 123, WAGIR MALANG</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#ffc000]">📞</span>
                <span>+62 812-3456-7890</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#ffc000]">✉️</span>
                <span className="lowercase">layanan@dalisodo.desa.id</span>
              </p>
              <p className="flex items-center gap-2 pt-2 text-[#917300] font-semibold">
                <span className="text-[#ffc000]">🕒</span>
                <span>SENIN - JUMAT (08:00 - 15:30 WIB)</span>
              </p>
            </div>
          </address>

        </div>

        {/* Footer Bottom Copyright Bar */}
        <div className="border-t border-[#313131] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-lambo tracking-[0.05em] uppercase text-[#7d7d7d] gap-4">
          <p id="footer-copyright">
            © {currentYear} KKN 10 DESA DALISODO • KABUPATEN MALANG. HAK CIPTA DILINDUNGI.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#main-header" className="text-slate-400 hover:text-[#ffc000] transition-colors flex items-center gap-1">
              <span>KEMBALI KE ATAS</span>
              <span>↑</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
