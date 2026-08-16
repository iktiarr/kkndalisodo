import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { WisataItem } from "@/types/wisata";

// Fallback Mock Data (empty array)
const MOCK_WISATA: WisataItem[] = [];

// Helper untuk mengekstrak teks bersih dari node RichText
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromRichNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.nodeType === "text" && node.value) return node.value;

  if (Array.isArray(node.content)) {
    return node.content
      .map((child: unknown) => extractTextFromRichNode(child))
      .join(" ")
      .trim();
  }
  return "";
}

// Helper untuk mengekstrak key:value dari tabel Rich Text Contentful tanpa melemparkan error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDetailInformasiTable(detailInformasi: any): Array<{ label: string; value: string }> {
  if (!detailInformasi) return [];

  try {
    const rootObj = detailInformasi.json || detailInformasi;
    if (!rootObj || typeof rootObj !== "object") return [];

    const items: Array<{ label: string; value: string }> = [];

    // Cari node ber-type "table"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findTables = (node: any, foundTables: any[]) => {
      if (!node || typeof node !== "object") return;
      if (node.nodeType === "table") {
        foundTables.push(node);
      } else if (Array.isArray(node.content)) {
        for (const child of node.content) {
          findTables(child, foundTables);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tables: any[] = [];
    findTables(rootObj, tables);

    for (const tableNode of tables) {
      if (Array.isArray(tableNode.content)) {
        for (const rowNode of tableNode.content) {
          if (
            rowNode &&
            (rowNode.nodeType === "table-row" || rowNode.nodeType === "row") &&
            Array.isArray(rowNode.content)
          ) {
            const cells = rowNode.content;
            if (cells.length >= 2) {
              const label = extractTextFromRichNode(cells[0]).trim();
              const value = extractTextFromRichNode(cells[1]).trim();

              if (label && value) {
                items.push({ label, value });
              }
            }
          }
        }
      }
    }

    return items;
  } catch {
    // Apabila format bukan tabel / terjadi kesalahan, return array kosong tanpa throw error
    return [];
  }
}

export async function getWisataList(): Promise<WisataItem[]> {
  const query = `query GetWisataList {
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
  }`;

  interface RawWisataItem {
    sys: { id: string };
    judul?: string;
    kategori?: string[];
    thumbnail?: { url?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deskripsi?: { json?: any };
    galeriCollection?: { items?: Array<{ url?: string }> };
    link?: string;
    lainnya?: string[];
  }

  const data = await fetchContentful<{ wisataCollection?: { items: RawWisataItem[] } }>(query);

  if (data && data.wisataCollection?.items && data.wisataCollection.items.length > 0) {
    return data.wisataCollection.items.map((item) => {
      const galeriItems = item.galeriCollection?.items || [];
      const galeriUrls = galeriItems
        .map((g) => (g.url ? optimizeContentfulAsset(g.url, 1200) : ""))
        .filter(Boolean);

      const judulText = item.judul || "Wisata Dalisodo";
      const slug = judulText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const rawDeskripsi = item.deskripsi?.json || null;
      const detailInformasiItems = parseDetailInformasiTable(rawDeskripsi);

      return {
        id: item.sys.id,
        slug: slug || item.sys.id,
        judul: judulText,
        kategori: item.kategori && item.kategori.length > 0 ? item.kategori : ["Wisata Alam"],
        deskripsi: rawDeskripsi,
        detailInformasi: rawDeskripsi,
        detailInformasiItems: detailInformasiItems.length > 0 ? detailInformasiItems : undefined,
        thumbnailUrl: optimizeContentfulAsset(item.thumbnail?.url, 800) || "",
        galeriUrls,
        link: item.link,
        lainnya: item.lainnya && item.lainnya.length > 0 ? item.lainnya : ["Alam", "Spot Foto", "Edukasi"],
      };
    });
  }

  // Fallback ke data mock sederhana jika Contentful belum diisi
  return MOCK_WISATA;
}

export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  const allWisata = await getWisataList();
  const wisata = allWisata.find((item) => item.slug === slug || item.id === slug);
  return wisata || null;
}


