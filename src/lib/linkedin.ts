/**
 * LinkedIn API Helper Service
 * 
 * This service handles fetching posts from the LinkedIn API.
 * It requires LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORGANIZATION_ID in .env.
 */

export interface LinkedInPost {
  id: string;
  text: string;
  createdAt: string;
  link: string;
  image?: string;
  authorName: string;
  authorImage?: string;
}

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!accessToken || !orgId) {
    console.warn("[LinkedIn Service] Missing credentials. Please follow the setup guide.");
    return [];
  }

  try {
    // Current LinkedIn API (v2) for fetching posts
    // Note: This requires the 'Marketing Developer Platform' or 'Community Management' access
    const response = await fetch(
      `https://api.linkedin.com/v2/posts?author=urn:li:organization:${orgId}&count=6`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[LinkedIn API] Error:", errorData);
      return [];
    }

    const data = await response.json();
    
    // Transform API response to our common format
    return data.elements.map((item: any) => {
      // Logic for extracting content from LinkedIn's complex JSON structure
      const text = item.commentary || "";
      const createdAt = new Date(item.createdAt).toISOString();
      const id = item.id;
      const link = `https://www.linkedin.com/feed/update/${id}`;
      
      // Attempt to extract image from multi-media or content
      let image = undefined;
      if (item.content?.multiMedia?.length > 0) {
        image = item.content.multiMedia[0].image;
      } else if (item.content?.media?.image) {
        image = item.content.media.image;
      }

      return {
        id,
        text,
        createdAt,
        link,
        image,
        authorName: "Besmak India",
        authorImage: "/favicon.png",
      };
    });
  } catch (error) {
    console.error("[LinkedIn Service] Exception:", error);
    return [];
  }
}
