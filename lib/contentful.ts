const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

export async function fetchContentful<T>(query: string, variables = {}): Promise<T | null> {
  if (!SPACE_ID || !ACCESS_TOKEN || SPACE_ID === "your_contentful_space_id_here") {
    // Return null so services can fallback gracefully to mock data if credentials are not configured yet
    return null;
  }

  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(8000), // 8 seconds timeout to prevent hanging connections
        next: { revalidate: 60 }, // Cache revalidation 60 seconds
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Contentful HTTP Error: ${res.status} ${res.statusText} - Details: ${errorDetails}`);
      return null;
    }

    const { data, errors } = await res.json();
    if (errors) {
      console.error("Contentful GraphQL Errors:", JSON.stringify(errors, null, 2));
      return null;
    }

    return data as T;
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return null;
  }
}

export function optimizeContentfulAsset(url?: string | null, width?: number): string {
  if (!url) return "";
  const cleanUrl = url.startsWith("//") ? `https:${url}` : url;
  // If image from Contentful CDN, optimize format to webp and compress quality to 80
  if (
    (cleanUrl.includes("ctfassets.net") || cleanUrl.includes("images.ctfassets.net")) &&
    !cleanUrl.endsWith(".mp4") &&
    !cleanUrl.endsWith(".webm") &&
    !cleanUrl.endsWith(".mov")
  ) {
    const separator = cleanUrl.includes("?") ? "&" : "?";
    const params: string[] = ["fm=webp", "q=80"];
    if (width) {
      params.push(`w=${width}`);
    }
    return `${cleanUrl}${separator}${params.join("&")}`;
  }
  return cleanUrl;
}
