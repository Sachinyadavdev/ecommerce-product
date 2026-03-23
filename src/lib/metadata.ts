import { query } from "@/lib/db";
import { Metadata } from "next";

export async function getPageMetadata(slug: string): Promise<Metadata> {
  try {
    const pages = await query(
      "SELECT title, description, keywords FROM pages WHERE slug = ? LIMIT 1",
      [slug]
    );
    const page = pages[0];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://besmakindia.com";
    const canonical = `${baseUrl}${slug === "home" ? "" : `/${slug}`}`;

    return {
      title: {
        absolute: `${page.title}${slug !== "home" ? " | Besmak India" : ""}`,
      },
      description: page.description,
      keywords: page.keywords?.split(",").map((k: string) => k.trim()) || [],
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: page.title,
        description: page.description,
        url: canonical,
        siteName: "Besmak India",
        images: [
          {
            url: "/images/og-image.png", // Default OG image
            width: 1200,
            height: 630,
            alt: page.title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: page.title,
        description: page.description,
        images: ["/images/og-image.png"],
      },
    };
  } catch (error) {
    console.error(`[Metadata Error] Failed to fetch for ${slug}:`, error);
    return {};
  }
}
