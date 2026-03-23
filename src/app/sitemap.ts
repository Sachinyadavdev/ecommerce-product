import { query as dbQuery } from '@/lib/db';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://besmakindia.com';

  try {
    // 1. Fetch all active dynamic pages
    const activePages = await dbQuery<any[]>(
      "SELECT slug, updatedAt FROM pages WHERE isActive = TRUE"
    );

    const pageRoutes = activePages.map((page) => ({
      url: `${baseUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`,
      lastModified: page.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.slug === 'home' ? 1 : 0.8,
    }));

    // 2. Fetch all products
    const activeProducts = await dbQuery<any[]>(
      "SELECT slug, updatedAt FROM product"
    );

    const productRoutes = activeProducts.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    // 3. Static routes that might not be in the pages table yet
    const staticRoutes = [
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];

    return [...pageRoutes, ...productRoutes, ...staticRoutes];
  } catch (error) {
    console.error('[Sitemap Error] Failed to generate:', error);
    // Fallback to minimal sitemap if DB fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
    ];
  }
}
