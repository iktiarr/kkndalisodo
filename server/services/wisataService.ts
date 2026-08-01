import { fetchContentful } from "@/lib/contentful";
import { WisataItem } from "@/types/wisata";

const MOCK_WISATA: WisataItem[] = [
  {
    id: "1",
    nama: "Coban Glotak",
    slug: "coban-glotak",
    deskripsiSingkat: "Air terjun alami dengan pemandangan asri di kaki Gunung Kawi.",
    kategori: "Wisata Alam",
    lokasi: "Dusun Bedalisodo, Desa Dalisodo",
    hargaTiket: "Rp 10.000",
    jamOperasional: "08:00 - 16:00 WIB",
    gambarUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80",
    fasilitas: ["Area Parkir", "Toilet", "Warung Makan", "Spot Foto"]
  },
  {
    id: "2",
    nama: "Wisata Hutan Pinus Dalisodo",
    slug: "hutan-pinus-dalisodo",
    deskripsiSingkat: "Kawasan hutan pinus rindang cocok untuk camping dan tempat santai keluarga.",
    kategori: "Wisata Alam & Camping",
    lokasi: "Dalisodo, Wagir, Malang",
    hargaTiket: "Rp 5.000",
    jamOperasional: "24 Jam",
    gambarUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    fasilitas: ["Camping Ground", "Spot Foto Skywalk", "Toilet"]
  }
];

export async function getWisataList(): Promise<WisataItem[]> {
  const query = `
    query GetWisataList {
      wisataCollection {
        items {
          sys { id }
          nama
          slug
          deskripsiSingkat
          kategori
          lokasi
          hargaTiket
          jamOperasional
          gambar { url }
        }
      }
    }
  `;

  interface ContentfulResponse {
    wisataCollection: {
      items: Array<{
        sys: { id: string };
        nama: string;
        slug: string;
        deskripsiSingkat: string;
        kategori: string;
        lokasi: string;
        hargaTiket: string;
        jamOperasional: string;
        gambar?: { url: string };
      }>;
    };
  }

  const data = await fetchContentful<ContentfulResponse>(query);

  if (data && data.wisataCollection?.items?.length > 0) {
    return data.wisataCollection.items.map((item) => ({
      id: item.sys.id,
      nama: item.nama,
      slug: item.slug,
      deskripsiSingkat: item.deskripsiSingkat,
      kategori: item.kategori,
      lokasi: item.lokasi,
      hargaTiket: item.hargaTiket,
      jamOperasional: item.jamOperasional,
      gambarUrl: item.gambar?.url || MOCK_WISATA[0].gambarUrl,
    }));
  }

  // Fallback ke data mock sederhana jika Contentful belum diisi
  return MOCK_WISATA;
}
