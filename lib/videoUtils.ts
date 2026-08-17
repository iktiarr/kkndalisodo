export interface ParsedMediaInfo {
  provider: "youtube" | "drive" | "direct";
  mediaType: "video" | "image";
  embedUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  rawUrl: string;
}

export interface ParsedVideoInfo {
  provider: "youtube" | "drive" | "direct";
  embedUrl?: string;
  thumbnailUrl?: string;
  rawUrl: string;
}

export function parseGoogleDriveImage(url: string): string | null {
  if (!url) return null;
  const driveMatch =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (
    (url.includes("drive.google.com") || url.includes("googleusercontent.com")) &&
    driveMatch &&
    driveMatch[1]
  ) {
    const fileId = driveMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return null;
}

export function parseMediaUrl(url: string): ParsedMediaInfo {
  if (!url) {
    return { provider: "direct", mediaType: "image", rawUrl: "" };
  }

  const trimmed = url.trim();

  // 1. Check YouTube (Video)
  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    const youtubeThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return {
      provider: "youtube",
      mediaType: "video",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1`,
      thumbnailUrl: youtubeThumb,
      imageUrl: youtubeThumb,
      rawUrl: trimmed,
    };
  }

  // 2. Check Google Drive (Photo / Image)
  const gdriveImageUrl = parseGoogleDriveImage(trimmed);
  if (gdriveImageUrl) {
    return {
      provider: "drive",
      mediaType: "image",
      imageUrl: gdriveImageUrl,
      thumbnailUrl: gdriveImageUrl,
      rawUrl: trimmed,
    };
  }

  // 3. Fallback direct link
  const isVideoFile =
    trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.endsWith(".mov");
  return {
    provider: "direct",
    mediaType: isVideoFile ? "video" : "image",
    imageUrl: isVideoFile ? undefined : trimmed,
    rawUrl: trimmed,
  };
}

export function parseVideoUrl(url: string): ParsedVideoInfo {
  const mediaInfo = parseMediaUrl(url);
  return {
    provider: mediaInfo.provider,
    embedUrl: mediaInfo.embedUrl,
    thumbnailUrl: mediaInfo.thumbnailUrl || mediaInfo.imageUrl,
    rawUrl: url,
  };
}
