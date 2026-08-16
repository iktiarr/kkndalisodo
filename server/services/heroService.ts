import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { HeroSlideItem } from "@/types/hero";
import { parseVideoUrl } from "@/lib/videoUtils";

// Fallback Mock Data (empty array)
const MOCK_HERO_SLIDES: HeroSlideItem[] = [];

interface RawContentfulSlide {
  sys: { id: string };
  judul?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi?: any;
  jenis?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: any;
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

  // Jika belum ada data dari Contentful, return MOCK_HERO_SLIDES
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

  const videoInfo = parseVideoUrl(rawUrl);

  const contentType = (
    (typeof item.deskripsi === "object" && item.deskripsi?.contentType) ||
    item.media?.contentType ||
    ""
  ).toLowerCase();

  const jenis = (item.jenis || "Berita").toLowerCase();

  const isVideo =
    videoInfo.provider !== "direct" ||
    contentType.startsWith("video/") ||
    jenis === "video" ||
    rawUrl.endsWith(".mp4") ||
    rawUrl.endsWith(".webm") ||
    rawUrl.endsWith(".mov") ||
    rawUrl.includes("video");

  let mediaUrl =
    rawUrl ||
    (isVideo
      ? "/assets/videos/VIDEO PROFIL DESA BANCAK 1.mp4"
      : "/assets/image/gambar.jpeg");

  // Kompresi otomatis gambar dari Contentful
  if (!isVideo && mediaUrl.includes("ctfassets.net")) {
    mediaUrl = optimizeContentfulAsset(mediaUrl, 1920);
  }

  let primaryCtaText = "LIHAT DETAIL";
  let primaryCtaLink = "/";

  if (jenis === "wisata") {
    primaryCtaText = "JELAJAHI WISATA";
    primaryCtaLink = "/wisata";
  } else if (jenis === "video" || isVideo) {
    primaryCtaText = "PUTAR VIDEO PROFIL";
    primaryCtaLink = "#play-video";
  } else if (jenis === "berita") {
    primaryCtaText = "BACA BERITA KKN";
    primaryCtaLink = "/berita";
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
    jenis: item.jenis || "Berita",
    primaryCtaText,
    primaryCtaLink,
    videoProvider: isVideo ? videoInfo.provider : undefined,
    embedUrl: isVideo ? videoInfo.embedUrl : undefined,
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

