import { fetchContentful } from "@/lib/contentful";
import { BeritaItem } from "@/types/berita";

const MOCK_BERITA: BeritaItem[] = [
  {
    id: "1",
    judul: "Kegiatan Kerja Bakti Bersama Warga Desa Dalisodo",
    slug: "kegiatan-kerja-bakti-dalisodo",
    ringkasan: "Warga Desa Dalisodo bersama tim KKN melaksanakan pembersihan sarana lingkungan desa.",
    kategori: "Kegiatan Desa",
    tanggal: "15 Juli 2026",
    penulis: "Tim Media Desa",
    gambarUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    judul: "Pelatihan Digitalisasi UMKM Produk Olahan Khas Dalisodo",
    slug: "pelatihan-digitalisasi-umkm",
    ringkasan: "Pendampingan branding dan pemasaran digital untuk pelaku usaha kecil di Desa Dalisodo.",
    kategori: "Pemberdayaan UMKM",
    tanggal: "28 Juli 2026",
    penulis: "Mahasiswa KKN",
    gambarUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
  }
];

export async function getBeritaList(): Promise<BeritaItem[]> {
  const query = `
    query GetBeritaList {
      beritaCollection {
        items {
          sys { id }
          judul
          slug
          ringkasan
          kategori
          tanggal
          penulis
          gambar { url }
        }
      }
    }
  `;

  interface ContentfulResponse {
    beritaCollection: {
      items: Array<{
        sys: { id: string };
        judul: string;
        slug: string;
        ringkasan: string;
        kategori: string;
        tanggal: string;
        penulis: string;
        gambar?: { url: string };
      }>;
    };
  }

  const data = await fetchContentful<ContentfulResponse>(query);

  if (data && data.beritaCollection?.items?.length > 0) {
    return data.beritaCollection.items.map((item) => ({
      id: item.sys.id,
      judul: item.judul,
      slug: item.slug,
      ringkasan: item.ringkasan,
      kategori: item.kategori,
      tanggal: item.tanggal,
      penulis: item.penulis,
      gambarUrl: item.gambar?.url || MOCK_BERITA[0].gambarUrl,
    }));
  }

  // Fallback ke data mock sederhana jika Contentful belum terkoneksi
  return MOCK_BERITA;
}
