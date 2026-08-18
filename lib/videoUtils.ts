/**
 * Antarmuka ParsedMediaInfo
 * Struktur hasil parsing URL media (gambar atau video).
 */
export interface ParsedMediaInfo {
  provider: "youtube" | "drive" | "direct";
  mediaType: "video" | "image";
  embedUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  rawUrl: string;
}

/**
 * Antarmuka ParsedVideoInfo
 * Struktur hasil parsing URL spesifik video.
 */
export interface ParsedVideoInfo {
  provider: "youtube" | "drive" | "direct";
  embedUrl?: string;
  thumbnailUrl?: string;
  rawUrl: string;
}

/**
 * Mengekstrak ID berkas dari URL Google Drive.
 *
 * @param {string} url - URL Google Drive.
 * @returns {string | null} ID berkas Google Drive atau null.
 */
export function extractGoogleDriveId(url: string): string | null {
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
    return driveMatch[1];
  }
  return null;
}

/**
 * Mengonversi URL Google Drive menjadi URL pratinjau gambar langsung.
 *
 * @param {string} url - URL Google Drive.
 * @returns {string | null} URL gambar langsung atau null.
 */
export function parseGoogleDriveImage(url: string): string | null {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return null;
}

/**
 * Memparsed URL media (YouTube, Google Drive, atau tautan langsung) untuk menghasilkan URL embed dan thumbnail.
 *
 * @param {string} url - Tautan URL media.
 * @returns {ParsedMediaInfo} Objek terurai informasi media.
 */
export function parseMediaUrl(url: string): ParsedMediaInfo {
  if (!url) {
    return { provider: "direct", mediaType: "image", rawUrl: "" };
  }

  const trimmed = url.trim();

  // 1. Periksa Tautan YouTube (Video)
  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    const youtubeThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return {
      provider: "youtube",
      mediaType: "video",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`,
      thumbnailUrl: youtubeThumb,
      imageUrl: youtubeThumb,
      rawUrl: trimmed,
    };
  }

  // 2. Periksa Tautan Google Drive
  const driveFileId = extractGoogleDriveId(trimmed);
  if (driveFileId) {
    const driveImageUrl = `https://drive.google.com/uc?export=view&id=${driveFileId}`;
    const driveEmbedUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
    return {
      provider: "drive",
      mediaType: "image",
      imageUrl: driveImageUrl,
      thumbnailUrl: driveImageUrl,
      embedUrl: driveEmbedUrl,
      rawUrl: trimmed,
    };
  }

  // 3. Penanganan Tautan Langsung (Direct Link)
  const isVideoFile =
    trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.endsWith(".mov");
  return {
    provider: "direct",
    mediaType: isVideoFile ? "video" : "image",
    imageUrl: isVideoFile ? undefined : trimmed,
    rawUrl: trimmed,
  };
}

/**
 * Memparsed URL spesifik video untuk mendapatkan URL pemutar (embed) dan thumbnail.
 *
 * @param {string} url - Tautan URL video.
 * @returns {ParsedVideoInfo} Informasi terurai pemutar video.
 */
export function parseVideoUrl(url: string): ParsedVideoInfo {
  const mediaInfo = parseMediaUrl(url);
  return {
    provider: mediaInfo.provider,
    embedUrl: mediaInfo.embedUrl,
    thumbnailUrl: mediaInfo.thumbnailUrl || mediaInfo.imageUrl,
    rawUrl: url,
  };
}
