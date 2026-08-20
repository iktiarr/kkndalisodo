import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { WisataItem } from "@/types/wisata";

/**
 * Mengambil seluruh daftar destinasi wisata dari Contentful GraphQL API.
 *
 * @returns {Promise<WisataItem[]>} Larik item destinasi wisata terformat.
 */
export async function getWisataList(): Promise<WisataItem[]> {
  const query = `query GetWisataList {
    wisataCollection {
      items {
        sys { id }
        judul
        deskripsi { json }
        detailInformasi { json }
        thumbnail { url }
        galerryCollection {
          items { url }
        }
      }
    }
  }`;

  interface RawWisataItem {
    sys: { id: string };
    judul?: string;
    thumbnail?: { url?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deskripsi?: { json?: any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    detailInformasi?: { json?: any };
    galerryCollection?: { items?: Array<{ url?: string }> };
    galeriCollection?: { items?: Array<{ url?: string }> };
  }

  const data = await fetchContentful<{ wisataCollection?: { items: RawWisataItem[] } }>(query);

  if (data && data.wisataCollection?.items && data.wisataCollection.items.length > 0) {
    return data.wisataCollection.items.map((item) => {
      const galeriItems = item.galerryCollection?.items || item.galeriCollection?.items || [];
      const galeriUrls = galeriItems
        .map((g) => (g.url ? optimizeContentfulAsset(g.url, 1200) : ""))
        .filter(Boolean);

      const judulText = item.judul || "Wisata Dalisodo";
      const slug = judulText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const rawDeskripsi = item.deskripsi?.json || null;
      const rawDetailInformasi = item.detailInformasi?.json || null;

      return {
        id: item.sys.id,
        slug: slug || item.sys.id,
        judul: judulText,
        kategori: ["Wisata Alam"],
        deskripsi: rawDeskripsi,
        detailInformasi: rawDetailInformasi,
        thumbnailUrl: optimizeContentfulAsset(item.thumbnail?.url, 800) || "",
        galeriUrls,
      };
    });
  }

  return [];
}

/**
 * Mengambil satu destinasi wisata berdasarkan slug atau ID.
 *
 * @param {string} slug - Slug atau ID wisata.
 * @returns {Promise<WisataItem | null>} Objek wisata atau null jika tidak ditemukan.
 */
export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  const allWisata = await getWisataList();
  const wisata = allWisata.find((item) => item.slug === slug || item.id === slug);
  return wisata || null;
}

/**
 * Mengambil daftar destinasi wisata rekomendasi lainnya (mengecualikan slug/ID yang sedang dibuka).
 *
 * @param {string} excludeSlugOrId - Slug atau ID yang dikecualikan.
 * @param {number} [limit=4] - Jumlah wisata rekomendasi.
 * @returns {Promise<WisataItem[]>} Larik wisata rekomendasi.
 */
export async function getOtherWisataList(excludeSlugOrId: string, limit = 4): Promise<WisataItem[]> {
  const allWisata = await getWisataList();
  return allWisata
    .filter((w) => w.slug !== excludeSlugOrId && w.id !== excludeSlugOrId)
    .slice(0, limit);
}


