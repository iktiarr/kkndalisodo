"use client";

/**
 * Komponen BackToTopButton
 * 
 * Tombol untuk menggulir halaman kembali ke bagian paling atas secara halus (smooth scroll).
 *
 * @returns {JSX.Element} Elemen tombol navigasi ke atas.
 */
export default function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-slate-400 hover:text-giallo hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1 cursor-pointer group"
      aria-label="Kembali ke bagian atas halaman"
    >
      <span>KEMBALI KE ATAS</span>
      <span className="group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true">&uarr;</span>
    </button>
  );
}
