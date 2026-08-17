import { fetchContentful, optimizeContentfulAsset } from "@/lib/contentful";
import { HeroSlideItem } from "@/types/hero";

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const query = `
    query GetHeroData {
      bannerCollection(limit: 2, order: sys_publishedAt_DESC) {
        items {
          sys { id }
          judul
          media { url }
        }
      }
      postinganCollection(limit: 2, order: sys_publishedAt_DESC) {
        items {
          sys { id }
          judul
          cover { url }
        }
      }
      wisataCollection(limit: 2) {
        items {
          sys { id }
          judul
          thumbnail { url }
        }
      }
    }
  `;

  interface HeroQueryResponse {
    bannerCollection?: {
      items: Array<{ sys: { id: string }; judul?: string; media?: { url?: string } }>;
    };
    postinganCollection?: {
      items: Array<{ sys: { id: string }; judul?: string; cover?: { url?: string } }>;
    };
    wisataCollection?: {
      items: Array<{ sys: { id: string }; judul?: string; thumbnail?: { url?: string } }>;
    };
  }

  const data = await fetchContentful<HeroQueryResponse>(query);
  const slides: HeroSlideItem[] = [];

  // 1. 2 Banner / Dokumentasi terbaru (arahkan ke #dokumentasi)
  const bannerItems = data?.bannerCollection?.items || [];
  for (const item of bannerItems) {
    const rawUrl = item.media?.url || "";
    if (!rawUrl) continue;
    slides.push({
      id: `banner-${item.sys.id}`,
      judul: item.judul || "Dokumentasi Dalisodo",
      thumbnailUrl: optimizeContentfulAsset(rawUrl, 1920),
      kategori: "Dokumentasi",
      ctaLink: "#dokumentasi",
    });
  }

  // 2. 2 Berita terbaru
  const beritaItems = data?.postinganCollection?.items || [];
  for (const item of beritaItems) {
    const rawUrl = item.cover?.url || "";
    if (!rawUrl) continue;
    slides.push({
      id: `berita-${item.sys.id}`,
      judul: item.judul || "Berita Terkini",
      thumbnailUrl: optimizeContentfulAsset(rawUrl, 1920),
      kategori: "Berita",
      ctaLink: "/berita",
    });
  }

  // 3. 2 Wisata terbaru
  const wisataItems = data?.wisataCollection?.items || [];
  for (const item of wisataItems) {
    const rawUrl = item.thumbnail?.url || "";
    if (!rawUrl) continue;

    const judulText = item.judul || "Wisata Dalisodo";
    const slug = judulText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    slides.push({
      id: `wisata-${item.sys.id}`,
      judul: judulText,
      thumbnailUrl: optimizeContentfulAsset(rawUrl, 1920),
      kategori: "Wisata",
      ctaLink: `/wisata/${slug || item.sys.id}`,
    });
  }

  return slides;
}
