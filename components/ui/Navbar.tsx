"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "BERANDA" },
    { href: "/wisata", label: "WISATA DESA" },
    { href: "/berita", label: "BERITA KEGIATAN" },
    { href: "/profil", label: "PROFIL DESA" },
  ];

  // Detect scroll position to activate glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white ${
        isScrolled
          ? "bg-carbon-deep/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-0"
          : "bg-transparent border-b border-transparent py-2"
      }`}
    >
      <div className="max-w-360 mx-auto px-6 sm:px-12 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Top-Left: 2 Logos Side-by-Side (Logo Desa Dalisodo + Logo KKN 10) */}
        <Link
          id="navbar-brand-link"
          href="/"
          className="flex items-center gap-3.5 group shrink-0"
          aria-label="Kembali ke Beranda Desa Dalisodo"
        >
          <div className="flex items-center gap-2">
            {/* Logo 1: Circular Logo Desa Dalisodo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden group-hover:border-giallo transition-colors shadow-sm">
              <Image
                src="/assets/image/logo-dalisodo.svg"
                alt="Logo Desa Dalisodo"
                fill
                sizes="(max-width: 640px) 36px, 40px"
                className="object-contain"
              />
            </div>

            {/* Logo 2: Circular Logo KKN 10 Dalisodo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-white/10 p-1 border border-white/20 rounded-full overflow-hidden group-hover:border-giallo transition-colors shadow-sm">
              <Image
                src="/assets/image/Logo-kkn10.png"
                alt="Logo KKN 10 Dalisodo"
                fill
                sizes="(max-width: 640px) 36px, 40px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Brand Name & Subtitle */}
          <div className="flex flex-col">
            <span className="font-lambo font-bold text-base sm:text-lg tracking-[0.023em] text-white uppercase leading-none group-hover:text-giallo transition-colors">
              DESA DALISODO
            </span>
            <span className="font-lambo text-[10px] text-giallo tracking-[0.12em] font-semibold uppercase mt-1">
              KKN 10 • WAGIR MALANG
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Menu (LamboType Uppercase) */}
        <nav
          id="desktop-nav-menu"
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-2 lg:gap-6"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-lambo text-xs sm:text-sm font-semibold tracking-[0.023em] uppercase px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-giallo text-black font-bold shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Hamburger Mobile Button */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg focus:outline-none transition-colors cursor-pointer border border-white/10"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav
          id="mobile-nav-dropdown"
          aria-label="Navigasi Seluler"
          className="md:hidden border-t border-anvil bg-carbon-deep px-6 py-4 space-y-2 shadow-2xl"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                onClick={() => setIsMenuOpen(false)}
                href={link.href}
                className={`font-lambo block px-4 py-3 text-sm font-semibold tracking-[0.023em] uppercase rounded-lg transition-colors ${
                  isActive
                    ? "bg-giallo text-black font-bold"
                    : "text-slate-200 hover:bg-white/10 hover:text-giallo"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

