export interface HeroSlideItem {
  id: string;
  judul: string;
  deskripsi: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  jenis: "Berita" | "Video" | "Wisata" | string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
}
