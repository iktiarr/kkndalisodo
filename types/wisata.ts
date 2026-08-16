export interface WisataItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi: any; // RichText JSON format from Contentful
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailInformasi?: any; // RichText JSON format from Contentful for Detail Informasi
  thumbnailUrl: string;
  galeriUrls: string[];
}


