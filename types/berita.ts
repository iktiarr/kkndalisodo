export interface ContentfulCover {
  url?: string;
  title?: string;
  description?: string;
}

export interface ContentfulRichText {
  nodeType: string;
  content?: any[];
  data?: any;
}

export interface BeritaItem {
  id: string;
  judul: string;
  slug?: string;
  coverUrl: string;
  cover?: ContentfulCover;
  isi: string | ContentfulRichText | any;
  tanggalwaktu: string;
  ringkasan: string;
  kategori?: string;
  penulis?: string;
}

