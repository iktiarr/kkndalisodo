import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { HeroSlideItem } from "@/types/hero";
import { parseMediaUrl } from "@/lib/videoUtils";

// Fallback Mock Data (empty array)
const MOCK_HERO_SLIDES: HeroSlideItem[] = [];

interface RawContentfulSlide {
  sys: { id: string };
  judul?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi?: any;
  kategori?: string;
  jenis?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: any;
  primaryCtaText?: string;
  primaryCtaLink?: string;
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  // Query Contentful GraphQL untuk Hero (bannerCollection)
  const query = `
    query GetHeroList {
      bannerCollection {
        items {
          sys { id }
          judul
          deskripsi
          kategori
          media
        }
      }
    }
  `;

  interface HeroQueryResponse {
    bannerCollection?: {
      items: RawContentfulSlide[];
    };
    heroCollection?: {
      items: RawContentfulSlide[];
    };
  }

  const data = await fetchContentful<HeroQueryResponse>(query);

  const items = data?.bannerCollection?.items || data?.heroCollection?.items;
  if (items && items.length > 0) {
    return items.map((item) => parseRawSlideToHeroItem(item));
  }

  // Jika belum ada data dari Contentful, return empty array
  return MOCK_HERO_SLIDES;
}

function parseRawSlideToHeroItem(item: RawContentfulSlide): HeroSlideItem {
  // Extract URL dari deskripsi atau media (baik berupa object Asset maupun string URL)
  const deskripsiAssetUrl =
    typeof item.deskripsi === "object" && item.deskripsi?.url
      ? item.deskripsi.url
      : typeof item.deskripsi === "string" && (item.deskripsi.startsWith("http") || item.deskripsi.startsWith("//"))
      ? item.deskripsi
      : "";

  const mediaAssetUrl =
    typeof item.media === "string"
      ? item.media
      : typeof item.media === "object" && item.media?.url
      ? item.media.url
      : "";

  let rawUrl = deskripsiAssetUrl || mediaAssetUrl || "";
  if (rawUrl.startsWith("//")) {
    rawUrl = `https:${rawUrl}`;
  }

  const parsedMedia = parseMediaUrl(rawUrl);

  const jenisRaw = (item.kategori || item.jenis || "").trim();
  let jenis = jenisRaw;

  // Infer jenis if not specified in Contentful
  if (!jenis) {
    if (parsedMedia.provider === "youtube" || parsedMedia.mediaType === "video") {
      jenis = "Video";
    } else {
      jenis = "Berita";
    }
  }

  const jenisLower = jenis.toLowerCase();
  const isVideo = jenisLower === "video";

  let mediaUrl = parsedMedia.imageUrl || parsedMedia.thumbnailUrl || rawUrl;

  // Kompresi otomatis gambar dari Contentful jika gambar
  if (!isVideo && mediaUrl && mediaUrl.includes("ctfassets.net")) {
    mediaUrl = optimizeContentfulAsset(mediaUrl, 1920);
  }

  let primaryCtaText = item.primaryCtaText || "LIHAT DETAIL";
  let primaryCtaLink = item.primaryCtaLink || "/";

  if (jenisLower === "wisata") {
    primaryCtaText = item.primaryCtaText || "JELAJAHI WISATA";
    primaryCtaLink = item.primaryCtaLink || "/wisata";
  } else if (jenisLower === "berita") {
    primaryCtaText = item.primaryCtaText || "JELAJAHI BERITA";
    primaryCtaLink = item.primaryCtaLink || "/berita";
  } else if (jenisLower === "video" || isVideo) {
    primaryCtaText = item.primaryCtaText || "PUTAR VIDEO PROFIL";
    primaryCtaLink = item.primaryCtaLink || "#play-video";
  }

  let descText = "";
  if (typeof item.deskripsi === "string" && !item.deskripsi.startsWith("http") && !item.deskripsi.startsWith("//")) {
    descText = item.deskripsi;
  } else if (item.deskripsi?.description) {
    descText = item.deskripsi.description;
  } else if (item.deskripsi?.title) {
    descText = item.deskripsi.title;
  } else if (item.deskripsi?.json) {
    descText = extractTextFromRichNodes(item.deskripsi.json.content || []);
  }

  return {
    id: item.sys.id,
    judul: (item.judul || "DESA DALISODO").toUpperCase(),
    deskripsi:
      descText.toUpperCase() ||
      "INFORMASI RESMI DESA DALISODO KECAMATAN WAGIR KABUPATEN MALANG.",
    mediaUrl,
    mediaType: isVideo ? "video" : "image",
    jenis: jenis,
    primaryCtaText,
    primaryCtaLink,
    videoProvider: isVideo ? parsedMedia.provider : undefined,
    embedUrl: isVideo ? parsedMedia.embedUrl : undefined,
  };
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


