import { fetchContentful } from "@/lib/contentful";
import { VideoItem } from "@/types/video";
import { parseVideoUrl } from "@/lib/videoUtils";

interface RawVideoItem {
  sys: { id: string };
  linkVideo?: string;
}

export async function getVideoList(): Promise<VideoItem[]> {
  const query = `
    query GetVideoList {
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

  const data = await fetchContentful<VideoQueryResponse>(query);
  const items = data?.videoCollection?.items || [];

  return items
    .filter((item) => item.linkVideo && item.linkVideo.trim().length > 0)
    .map((item) => {
      const rawLink = (item.linkVideo || "").trim();
      const parsed = parseVideoUrl(rawLink);

      return {
        id: item.sys.id,
        linkVideo: rawLink,
        embedUrl:
          parsed.embedUrl ||
          (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`),
        thumbnailUrl: parsed.thumbnailUrl,
      };
    });
}
