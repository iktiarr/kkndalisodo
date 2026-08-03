export interface WisataItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi: any; // RichText JSON format from Contentful
  thumbnailUrl: string;
  galeriUrls: string[];
  link?: string;
  lainnya?: string[];
}
