export interface WisataItem {
  id: string;
  nama: string;
  slug: string;
  deskripsiSingkat: string;
  deskripsiLengkap?: string;
  kategori: string;
  lokasi: string;
  hargaTiket: string;
  jamOperasional: string;
  gambarUrl: string;
  fasilitas?: string[];
}
