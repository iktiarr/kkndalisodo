import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRingkasan(isi: any, maxLength = 140): string {
  const fullText = extractTextFromIsi(isi);
  if (fullText.length <= maxLength) return fullText;
  return fullText.substring(0, maxLength).trim() + "...";
}

// Fallback Mock Data (empty array)
const MOCK_BERITA: BeritaItem[] = [];

interface RawContentfulPost {
  sys: { id: string; publishedAt?: string; firstPublishedAt?: string };
  judul?: string;
  cover?: { url?: string; title?: string; description?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isi?: any;
  tanggalwaktu?: string;
}

// Ambil daftar postingan dari Contentful
export async function getBeritaList(): Promise<BeritaItem[]> {
  const query = `query GetPostinganList {
    postinganCollection {
      items {
        sys { id publishedAt firstPublishedAt }
        judul
        cover { url title description }
        isi { json }
      }
    }
  }`;

  const data = await fetchContentful<{ postinganCollection?: { items: RawContentfulPost[] } }>(query);

  if (data && data.postinganCollection?.items && data.postinganCollection.items.length > 0) {
    return data.postinganCollection.items.map((item) => parseRawPostToBeritaItem(item));
  }

  // Jika belum ada data dari Contentful, return MOCK_BERITA
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
  const rawCoverUrl = item.cover?.url;
  const coverUrl = rawCoverUrl ? optimizeContentfulAsset(rawCoverUrl, 800) : "";
  const rawIsi = item.isi || "";
  const rawTanggal = item.tanggalwaktu || item.sys.firstPublishedAt || item.sys.publishedAt || new Date().toISOString();

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

