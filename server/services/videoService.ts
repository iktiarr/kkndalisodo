import { fetchContentful } from "@/lib/contentful";
import { VideoItem } from "@/types/video";
import { parseVideoUrl } from "@/lib/videoUtils";

interface RawVideoItem {
  sys: { id: string };
  linkVideo?: string;
  judul?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi?: any;
}

/**
 * Ekstrak teks biasa dari node JSON Contentful RichText.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromContentfulJson(jsonNode: any): string {
  if (!jsonNode) return "";
  if (typeof jsonNode === "string") return jsonNode;
  if (Array.isArray(jsonNode)) {
    return jsonNode.map(extractTextFromContentfulJson).join(" ");
  }
  if (jsonNode.value && typeof jsonNode.value === "string") {
    return jsonNode.value;
  }
  if (jsonNode.content && Array.isArray(jsonNode.content)) {
    return jsonNode.content.map(extractTextFromContentfulJson).join("\n");
  }
  return "";
}

/**
 * Mengambil daftar video profil desa dari Contentful GraphQL API.
 * Mendukung pembacaan bertahap (fallback queries) untuk fleksibilitas skema Contentful.
 *
 * @returns {Promise<VideoItem[]>} Larik item video terformat.
 */
export async function getVideoList(): Promise<VideoItem[]> {
  const queryText = `
    query GetVideoListText {
      videoCollection {
        items {
          sys { id }
          linkVideo
          deskripsi
        }
      }
    }
  `;

  const queryRich = `
    query GetVideoListRich {
      videoCollection {
        items {
          sys { id }
          linkVideo
          deskripsi { json }
        }
      }
    }
  `;

  const queryBasic = `
    query GetVideoListBasic {
      videoCollection {
        items {
          sys { id }
          linkVideo
        }
      }
    }
  `;

  interface VideoQueryResponse {
    videoCollection?: {
      items: RawVideoItem[];
    };
  }

  // Coba ambil dengan variasi struktur bidang GraphQL yang didukung
  let data = await fetchContentful<VideoQueryResponse>(queryText);
  if (!data || !data.videoCollection) {
    data = await fetchContentful<VideoQueryResponse>(queryRich);
  }
  if (!data || !data.videoCollection) {
    data = await fetchContentful<VideoQueryResponse>(queryBasic);
  }

  const items = data?.videoCollection?.items || [];

  return items
    .filter((item) => item.linkVideo && item.linkVideo.trim().length > 0)
    .map((item) => {
      const rawLink = (item.linkVideo || "").trim();
      const parsed = parseVideoUrl(rawLink);

      const rawDesc = item.deskripsi;
      let deskripsiText = "";

      if (typeof rawDesc === "string") {
        deskripsiText = rawDesc;
      } else if (rawDesc && typeof rawDesc === "object") {
        if (rawDesc.json) {
          deskripsiText = extractTextFromContentfulJson(rawDesc.json);
        } else {
          deskripsiText = String(rawDesc);
        }
      }

      return {
        id: item.sys.id,
        linkVideo: rawLink,
        embedUrl:
          parsed.embedUrl ||
          (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`),
        thumbnailUrl: parsed.thumbnailUrl,
        judul: item.judul || "",
        deskripsi: deskripsiText,
      };
    });
}

