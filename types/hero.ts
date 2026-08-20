/**
 * Antarmuka HeroSlideItem
 * Struktur data untuk satu slide gambar pada komponen Hero Banner beranda.
 */
export interface HeroSlideItem {
  id: string;
  judul: string;
  thumbnailUrl: string;
  kategori: "Berita" | "Wisata" | "Dokumentasi";
  ctaLink: string;
}
