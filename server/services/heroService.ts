import { fetchContentful } from "@/lib/contentful";
import { HeroSlideItem } from "@/types/hero";

// Fallback Mock Data apabila belum terhubung / terisi di Contentful
const MOCK_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "1",
    judul: "PESONA WISATA & POTENSI DESA DALISODO",
    deskripsi:
      "MENJELAJAHI KEINDAHAN ALAM LERENG GUNUNG KAWI, KEBERAGAMAN BUDAYA LOKAL, SERTA PROGRAM KEGIATAN MAHASISWA KKN 10.",
    mediaUrl: "/assets/image/gambar.jpeg",
    mediaType: "image",
    jenis: "Wisata",
    primaryCtaText: "JELAJAHI WISATA",
    primaryCtaLink: "/wisata",
  },
  {
    id: "2",
    judul: "VIDEO PROFIL SINEMATIK DESA DALISODO",
    deskripsi:
      "MENYAKSIKAN KEHIDUPAN MASYARAKAT, DOKUMENTASI KKNDALISODO, DAN POTENSI DESA DALAM TAYANGAN VIDEO SINEMATIK.",
    mediaUrl: "/assets/videos/VIDEO PROFIL DESA BANCAK 1.mp4",
    mediaType: "video",
    jenis: "Video",
    primaryCtaText: "PUTAR VIDEO PROFIL",
    primaryCtaLink: "#play-video",
  },
  {
    id: "3",
    judul: "INOVASI & POTENSI EKONOMI KREATIF",
    deskripsi:
      "KOLABORASI MAHASISWA KKN 10 DENGAN WARGA DESA DALISODO UNTUK MENGEMBANGKAN POTENSI LOKAL SERTA DIGITALISASI DESA.",
    mediaUrl: "/assets/image/gambar.jpeg",
    mediaType: "image",
    jenis: "Berita",
    primaryCtaText: "BACA BERITA KKN",
    primaryCtaLink: "/berita",
  },
];

interface RawContentfulSlide {
  sys: { id: string };
  judul?: string;
  deskripsi?: any;
  jenis?: string;
  media?: {
    url?: string;
    contentType?: string;
  };
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  // Query Contentful GraphQL persis pada model schema: heroCollection
  const queries = [
    // 1. Query heroCollection dengan `deskripsi { json }` (Rich Text)
    `query GetHeroCollectionRich {
      heroCollection {
        items {
          sys { id }
          judul
          deskripsi { json }
          jenis
          media { url contentType }
        }
      }
    }`,
    // 2. Query heroCollection dengan `deskripsi` bertipe String / Text jika plain text
    `query GetHeroCollectionText {
      heroCollection {
        items {
          sys { id }
          judul
          jenis
          media { url contentType }
        }
      }
    }`,
    // 3. Query heroCursorCollection
    `query GetHeroCursorCollection {
      heroCursorCollection {
        items {
          sys { id }
          judul
          jenis
          media { url contentType }
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
  let rawUrl = item.media?.url || "";
  if (rawUrl.startsWith("//")) {
    rawUrl = `https:${rawUrl}`;
  }

  const contentType = (item.media?.contentType || "").toLowerCase();
  const jenis = (item.jenis || "Berita").toLowerCase();

  const isVideo =
    contentType.startsWith("video/") ||
    jenis === "video" ||
    rawUrl.endsWith(".mp4") ||
    rawUrl.endsWith(".webm") ||
    rawUrl.endsWith(".mov") ||
    rawUrl.includes("video");

  const mediaUrl =
    rawUrl ||
    (isVideo
      ? "/assets/videos/VIDEO PROFIL DESA BANCAK 1.mp4"
      : "/assets/image/gambar.jpeg");

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
