import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { HeroSlideItem } from "@/types/hero";

// Fallback Mock Data (empty array)
const MOCK_HERO_SLIDES: HeroSlideItem[] = [];

interface RawContentfulSlide {
  sys: { id: string };
  judul?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi?: any;
  jenis?: string;
  media?: {
    url?: string;
    contentType?: string;
  };
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  // Query Contentful GraphQL untuk Banner (deskripsi bertipe Text/String, media bertipe Asset)
  const queries = [
    // 1. deskripsi bertipe Text (String)
    `query GetBannerText {
      bannerCollection {
        items {
          sys { id }
          judul
          deskripsi
          jenis
          media { url contentType title description }
        }
      }
    }`,
    // 2. deskripsi bertipe RichText
    `query GetBannerRich {
      bannerCollection {
        items {
          sys { id }
          judul
          deskripsi { json }
          jenis
          media { url contentType title description }
        }
      }
    }`,
  ];

  for (const query of queries) {
    const data = await fetchContentful<Record<string, { items: RawContentfulSlide[] }>>(query);

    if (data) {
      const collectionKey = Object.keys(data)[0];
      const items = data[collectionKey]?.items;

      if (items && items.length > 0) {
        return items.map((item) => parseRawSlideToHeroItem(item));
      }
    }
  }

  // Jika belum ada data dari Contentful, return MOCK_HERO_SLIDES
  return MOCK_HERO_SLIDES;
}

function parseRawSlideToHeroItem(item: RawContentfulSlide): HeroSlideItem {
  // Jika deskripsi berupa File Asset, ambil url & contentType dari deskripsi
  const deskripsiAssetUrl =
    typeof item.deskripsi === "object" && item.deskripsi?.url ? item.deskripsi.url : "";
  const mediaAssetUrl = item.media?.url || "";

  let rawUrl = deskripsiAssetUrl || mediaAssetUrl || "";
  if (rawUrl.startsWith("//")) {
    rawUrl = `https:${rawUrl}`;
  }

  const contentType = (
    (typeof item.deskripsi === "object" && item.deskripsi?.contentType) ||
    item.media?.contentType ||
    ""
  ).toLowerCase();

  const jenis = (item.jenis || "Berita").toLowerCase();

  const isVideo =
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
  if (typeof item.deskripsi === "string") {
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

