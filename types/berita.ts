/**
 * Antarmuka ContentfulCover
 * Metadata aset gambar sampul berita dari Contentful.
 */
export interface ContentfulCover {
  url?: string;
  title?: string;
  description?: string;
}

/**
 * Antarmuka ContentfulRichText
 * Struktur dasar dokumen Rich Text dari Contentful.
 */
export interface ContentfulRichText {
  nodeType: string;
  content?: unknown[];
  data?: Record<string, unknown>;
}

/**
 * Antarmuka BeritaItem
 * Struktur data lengkap untuk postingan artikel/berita kegiatan desa.
 */
export interface BeritaItem {
  id: string;
  judul: string;
  slug?: string;
  coverUrl: string;
  cover?: ContentfulCover;
  isi: string | ContentfulRichText | unknown;
  tanggalwaktu: string;
  ringkasan: string;
  kategori?: string;
  penulis?: string;
}


