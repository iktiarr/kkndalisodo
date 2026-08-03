"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 text-slate-800 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xl shadow-sm shrink-0">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wide block leading-none group-hover:text-emerald-600 transition-colors">
              Desa Dalisodo
            </span>
            <span className="text-xs text-slate-500 font-medium">Kec. Wagir, Kab. Malang</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-4 text-sm font-semibold">
          <Link href="/" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-emerald-600 transition">Beranda</Link>
          <Link href="/wisata" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-emerald-600 transition">Wisata Desa</Link>
          <Link href="/berita" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-emerald-600 transition">Berita Kegiatan</Link>
          <Link href="/profil" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-emerald-600 transition">Profil Desa</Link>
        </nav>

        {/* Hamburger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-lg absolute w-full">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-1 font-semibold text-slate-800">
            <Link onClick={() => setIsMenuOpen(false)} href="/" className="block px-3 py-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition">Beranda</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/wisata" className="block px-3 py-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition">Wisata Desa</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/berita" className="block px-3 py-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition">Berita Kegiatan</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/profil" className="block px-3 py-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition">Profil Desa</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
