export interface VideoItem {
  id: string;
  linkVideo: string;
  embedUrl: string;
  thumbnailUrl?: string;
  judul?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deskripsi?: string | any;
}

