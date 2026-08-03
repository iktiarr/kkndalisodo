import { fetchContentful } from "@/lib/contentful";
import { WisataItem } from "@/types/wisata";

const MOCK_WISATA: WisataItem[] = [
  {
    id: "1",
    slug: "coban-glotak",
    judul: "Coban Glotak",
    kategori: ["Alam"],
    deskripsi: { nodeType: "document", data: {}, content: [{ nodeType: "paragraph", data: {}, content: [{ nodeType: "text", value: "Air terjun alami dengan pemandangan asri di kaki Gunung Kawi.", marks: [], data: {} }] }] },
    thumbnailUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80",
    galeriUrls: [],
    lainnya: ["Area Parkir", "Toilet", "Warung Makan", "Spot Foto"]
  },
  {
    id: "2",
    slug: "wisata-hutan-pinus-dalisodo",
    judul: "Wisata Hutan Pinus Dalisodo",
    kategori: ["Alam", "Hiburan"],
    deskripsi: { nodeType: "document", data: {}, content: [{ nodeType: "paragraph", data: {}, content: [{ nodeType: "text", value: "Kawasan hutan pinus rindang cocok untuk camping dan tempat santai keluarga.", marks: [], data: {} }] }] },
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    galeriUrls: [],
    lainnya: ["Camping Ground", "Spot Foto Skywalk", "Toilet"]
  }
];

export async function getWisataList(): Promise<WisataItem[]> {
  const query = `
    query GetWisataList {
      wisataCollection {
        items {
          sys { id }
          judul
          kategori
          deskripsi { json }
          thumbnail { url }
          galeriCollection {
            items { url }
          }
          link
          lainnya
        }
      }
    }
  `;

  interface ContentfulResponse {
    wisataCollection: {
      items: Array<{
        sys: { id: string };
        judul: string;
        kategori: string[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deskripsi?: { json: any };
        thumbnail?: { url: string };
        galeriCollection?: { items: Array<{ url: string }> };
        link?: string;
        lainnya?: string[];
      }>;
    };
  }

  const data = await fetchContentful<ContentfulResponse>(query);

  if (data && data.wisataCollection?.items?.length > 0) {
    return data.wisataCollection.items.map((item) => ({
      id: item.sys.id,
      slug: item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      judul: item.judul,
      kategori: item.kategori || [],
      deskripsi: item.deskripsi?.json || null,
      thumbnailUrl: item.thumbnail?.url || MOCK_WISATA[0].thumbnailUrl,
      galeriUrls: item.galeriCollection?.items?.map(g => g.url) || [],
      link: item.link,
      lainnya: item.lainnya || [],
    }));
  }

  // Fallback ke data mock sederhana jika Contentful belum diisi
  return MOCK_WISATA;
}

export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  const allWisata = await getWisataList();
  const wisata = allWisata.find((item) => item.slug === slug);
  return wisata || null;
}

