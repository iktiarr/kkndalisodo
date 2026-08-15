export interface DetailInformasiItem {
  label: string;
  value: string;
}

export interface WisataItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi: any; // RichText JSON format from Contentful
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailInformasi?: any; // RichText JSON format from Contentful for Detail Informasi
  detailInformasiItems?: DetailInformasiItem[]; // Key-value pairs extracted from RichText table
  thumbnailUrl: string;
  galeriUrls: string[];
  link?: string;
  lainnya?: string[];
}


