import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { BeritaItem } from "@/types/berita";

/**
 * Format tanggal & waktu dari Contentful (ISO string) ke format bahasa Indonesia.
 *
 * @param {string} rawDateStr - String tanggal ISO.
 * @returns {string} Tanggal terformat (contoh: 19 Agustus 2026, 14:30).
 */
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

/**
 * Ekstrak teks bersih dari bidang `isi` (String Markdown / Contentful RichText JSON).
 *
 * @param {any} isi - Konten teks atau RichText.
 * @returns {string} Teks polos tanpa simbol markdown/tag HTML.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractTextFromIsi(isi: any): string {
  if (!isi) return "";

  if (typeof isi === "string") {
    return isi.replace(/[#*`_~\[\]()]/g, "").trim();
  }

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

/**
 * Buat cuplikan ringkasan teks singkat dengan batas karakter maksimum.
 *
 * @param {any} isi - Konten teks asli.
 * @param {number} [maxLength=140] - Panjang teks maksimum.
 * @returns {string} Teks ringkasan berakhiran "..." jika terpotong.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRingkasan(isi: any, maxLength = 140): string {
  const fullText = extractTextFromIsi(isi);
  if (fullText.length <= maxLength) return fullText;
  return fullText.substring(0, maxLength).trim() + "...";
}

interface RawContentfulPost {
  sys: { id: string; publishedAt?: string; firstPublishedAt?: string };
  judul?: string;
  cover?: { url?: string; title?: string; description?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isi?: any;
  tanggalwaktu?: string;
}

/**
 * Mengambil daftar berita kegiatan dari Contentful GraphQL API.
 *
 * @returns {Promise<BeritaItem[]>} Larik item berita terformat.
 */
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

  return [];
}

/**
 * Mengambil satu berita berdasarkan ID unik.
 *
 * @param {string} id - ID berita.
 * @returns {Promise<BeritaItem | null>} Objek berita atau null jika tidak ditemukan.
 */
export async function getBeritaById(id: string): Promise<BeritaItem | null> {
  const allPosts = await getBeritaList();
  const found = allPosts.find((p) => p.id === id);
  return found || null;
}

/**
 * Mengambil daftar berita rekomendasi lainnya (mengecualikan ID berita yang sedang dibuka).
 *
 * @param {string} excludeId - ID berita yang dikecualikan.
 * @param {number} [limit=4] - Jumlah berita rekomendasi yang diambil.
 * @returns {Promise<BeritaItem[]>} Larik berita rekomendasi.
 */
export async function getOtherBeritaList(excludeId: string, limit = 4): Promise<BeritaItem[]> {
  const allPosts = await getBeritaList();
  return allPosts.filter((p) => p.id !== excludeId).slice(0, limit);
}

/**
 * Konversi mentah entri Contentful menjadi objek BeritaItem siap pakai.
 */
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

