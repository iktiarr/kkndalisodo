export interface ParsedVideoInfo {
  provider: "youtube" | "drive" | "direct";
  embedUrl?: string;
  thumbnailUrl?: string;
  rawUrl: string;
}

export function parseVideoUrl(url: string): ParsedVideoInfo {
  if (!url) {
    return { provider: "direct", rawUrl: "" };
  }

  // 1. Check YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      rawUrl: url,
    };
  }

  // 2. Check Google Drive
  const driveMatch =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes("drive.google.com") && driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return {
      provider: "drive",
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      rawUrl: url,
    };
  }

  // 3. Direct video file (.mp4, .webm, .mov, etc.)
  return {
    provider: "direct",
    embedUrl: undefined,
    rawUrl: url,
  };
}
