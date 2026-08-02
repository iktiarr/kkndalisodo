import { fetchContentful } from "@/lib/contentful";
import { BeritaItem } from "@/types/berita";

// Helper: Format tanggal & waktu dari Contentful ISO string ke format Indonesia
export function formatTanggalWaktu(rawDateStr: string): string {
  if (!rawDateStr) return "";
  try {
    const dateObj = new Date(rawDateStr);
    if (isNaN(dateObj.getTime())) return rawDateStr;

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  } catch {
    return rawDateStr;
  }
}

// Helper: Ekstrak teks bersih dari field `isi`
export function extractTextFromIsi(isi: any): string {
  if (!isi) return "";

  // Jika string biasa / Markdown
  if (typeof isi === "string") {
    return isi.replace(/[#*`_~\[\]()]/g, "").trim();
  }

  // Jika berupa object Rich Text JSON dari Contentful (isi.json atau isi)
  const richTextObj = isi.json || isi;
  if (richTextObj && Array.isArray(richTextObj.content)) {
    return extractTextFromRichNodes(richTextObj.content);
  }

  return "";
}

function extractTextFromRichNodes(nodes: any[]): string {
  let text = "";
  for (const node of nodes) {
    if (node.nodeType === "text" && node.value) {
      text += node.value + " ";
    } else if (node.content && Array.isArray(node.content)) {
      text += extractTextFromRichNodes(node.content) + " ";
    }
  }
  return text.trim();
}

// Helper ringkasan
export function createRingkasan(isi: any, maxLength = 140): string {
  const fullText = extractTextFromIsi(isi);
  if (fullText.length <= maxLength) return fullText;
  return fullText.substring(0, maxLength).trim() + "...";
}

// Fallback Mock Data apabila belum terhubung / terisi
const MOCK_BERITA: BeritaItem[] = [
  {
    id: "1",
    judul: "Kegiatan Kerja Bakti Bersama Warga Desa Dalisodo",
    slug: "kegiatan-kerja-bakti-dalisodo",
    ringkasan: "Warga Desa Dalisodo bersama tim KKN melaksanakan pembersihan sarana lingkungan desa dan penataan fasilitas umum.",
    isi: "Warga Desa Dalisodo bersama tim KKN melaksanakan pembersihan sarana lingkungan desa. Kegiatan ini diikuti oleh seluruh elemen masyarakat desa secara antusias untuk menciptakan lingkungan yang bersih, aman, dan sehat.",
    tanggalwaktu: "2026-07-15T08:00:00.000Z",
    kategori: "Kegiatan Desa",
    penulis: "Tim Media Desa",
    coverUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    cover: {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
      title: "Kegiatan Kerja Bakti",
    },
  },
  {
    id: "2",
    judul: "Pelatihan Digitalisasi UMKM Produk Olahan Khas Dalisodo",
    slug: "pelatihan-digitalisasi-umkm",
    ringkasan: "Pendampingan branding dan pemasaran digital untuk pelaku usaha kecil di Desa Dalisodo agar menjangkau pasar nasional.",
    isi: "Pendampingan branding dan pemasaran digital untuk pelaku usaha kecil di Desa Dalisodo. Dalam pelatihan ini, warga diajarkan pembuatan foto produk menarik, pendaftaran di e-commerce, serta manajemen promosi media sosial.",
    tanggalwaktu: "2026-07-28T13:30:00.000Z",
    kategori: "Pemberdayaan UMKM",
    penulis: "Mahasiswa KKN",
    coverUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    cover: {
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      title: "Pelatihan UMKM",
    },
  },
];

interface RawContentfulPost {
  sys: { id: string };
  judul?: string;
  cover?: { url?: string; title?: string; description?: string };
  isi?: any;
  tanggalwaktu?: string;
}

// Ambil daftar postingan dari Contentful
export async function getBeritaList(): Promise<BeritaItem[]> {
  // Query yang difokuskan tepat pada field: judul, cover, isi, tanggalwaktu
  const queries = [
    // 1. Postinga / Post Collection dengan `isi` bertipe Rich Text (json)
    `query GetPostinganRich {
      postinganCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi { json }
          tanggalwaktu
        }
      }
    }`,
    // 2. Postinga / Post Collection dengan `isi` bertipe String / Text biasa
    `query GetPostinganText {
      postinganCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi
          tanggalwaktu
        }
      }
    }`,
    // 3. Berita Collection dengan `isi` Rich Text
    `query GetBeritaRich {
      beritaCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi { json }
          tanggalwaktu
        }
      }
    }`,
    // 4. Berita Collection dengan `isi` Text
    `query GetBeritaText {
      beritaCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi
          tanggalwaktu
        }
      }
    }`,
    // 5. Post Collection dengan `isi` Rich Text
    `query GetPostRich {
      postCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi { json }
          tanggalwaktu
        }
      }
    }`,
    // 6. Post Collection dengan `isi` Text
    `query GetPostText {
      postCollection {
        items {
          sys { id }
          judul
          cover { url title }
          isi
          tanggalwaktu
        }
      }
    }`,
  ];

  for (const query of queries) {
    const data = await fetchContentful<Record<string, { items: RawContentfulPost[] }>>(query);

    if (data) {
      const collectionKey = Object.keys(data)[0];
      const items = data[collectionKey]?.items;

      if (items && items.length > 0) {
        return items.map((item) => parseRawPostToBeritaItem(item));
      }
    }
  }

  // Jika belum ada data dari Contentful / query tidak cocok, return mock data
  return MOCK_BERITA;
}

// Ambil postingan berdasarkan ID
export async function getBeritaById(id: string): Promise<BeritaItem | null> {
  const allPosts = await getBeritaList();
  const found = allPosts.find((p) => p.id === id);
  if (found) return found;

  return MOCK_BERITA.find((item) => item.id === id) || null;
}

function parseRawPostToBeritaItem(item: RawContentfulPost): BeritaItem {
  const coverUrl = item.cover?.url || MOCK_BERITA[0].coverUrl;
  const rawIsi = item.isi || "";
  const rawTanggal = item.tanggalwaktu || new Date().toISOString();

  return {
    id: item.sys.id,
    judul: item.judul || "Tanpa Judul",
    coverUrl,
    cover: item.cover,
    isi: rawIsi,
    tanggalwaktu: rawTanggal,
    ringkasan: createRingkasan(rawIsi),
    kategori: "Berita & Kegiatan",
    penulis: "Admin Desa",
  };
}
