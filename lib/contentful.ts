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
        next: { revalidate: 60 }, // Cache revalidation 60 seconds
      }
    );

    const { data, errors } = await res.json();
    if (errors) {
      console.error("Contentful GraphQL Errors:", errors);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return null;
  }
}
