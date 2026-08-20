/**
 * Antarmuka WisataItem
 * Struktur data lengkap untuk informasi tempat/destinasi wisata Desa Dalisodo.
 */
export interface WisataItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi: any; // Format RichText JSON dari Contentful
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailInformasi?: any; // Format RichText JSON detail informasi dari Contentful
  thumbnailUrl: string;
  galeriUrls: string[];
}


