import SectionRenderer from "@/components/sections/SectionRenderer";
import { query as dbQuery } from "@/lib/db";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import ProductGrid from "@/components/sections/products/ProductGrid";
import PageHeader from "@/components/ui/PageHeader";
import { X } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("products");
}

async function getPageSections() {
  const sections = await dbQuery(`
    SELECT ps.* 
    FROM page_sections ps
    JOIN pages p ON ps.pageId = p.id
    WHERE p.slug = 'products' AND ps.isActive = TRUE
    ORDER BY ps.sortOrder ASC
  `);
  return sections;
}

export default async function ProductCategoryListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams?.q;
  const searchQuery = typeof q === 'string' ? q : Array.isArray(q) ? q[0] : "";

  // 1. Get Page Banner from MySQL
  const pageResult = await dbQuery<any[]>("SELECT bannerImage FROM pages WHERE slug = 'products' AND isActive = 1 LIMIT 1");
  const bannerImage = pageResult[0]?.bannerImage;

  if (searchQuery) {
    const keywords = searchQuery.split(" ").filter(Boolean);
    let whereClause = "1=1";
    let queryParams: any[] = [];

    if (keywords.length > 0) {
      const keywordConditions = keywords.map(() => {
        return `(
          p.name LIKE ? OR 
          p.categorySpecification LIKE ? OR 
          p.description LIKE ? OR
          CAST(p.specifications AS CHAR) LIKE ?
        )`;
      }).join(" AND ");

      whereClause += ` AND (${keywordConditions})`;

      keywords.forEach(keyword => {
        const match = `%${keyword}%`;
        queryParams.push(match, match, match, match);
      });
    }

    const productsSql = `
      SELECT p.*, c.name as categoryName, c.slug as categorySlug 
      FROM product p 
      JOIN category c ON p.categoryId = c.id 
      WHERE ${whereClause}
      ORDER BY CASE WHEN p.specifications->>'$.Series' = '090' OR p.specifications->>'$.series' = '090' THEN 0 WHEN p.specifications->>'$.Series' IS NULL AND p.specifications->>'$.series' IS NULL THEN 2 ELSE 1 END ASC, COALESCE(p.specifications->>'$.Series', p.specifications->>'$.series') ASC, p.name ASC
    `;

    const rawProducts = await dbQuery<any[]>(productsSql, queryParams);
    const products = rawProducts.map(p => ({
      ...p,
      category: {
        name: p.categoryName,
        slug: p.categorySlug
      }
    }));

    return (
      <div className="bg-[#fcfdfe] min-h-screen pb-12">
        <PageHeader
          title=""
          backgroundImg={bannerImage}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Search" }
          ]}
        />

        <div className="container mx-auto px-6 pb-12 max-w-7xl mt-2 relative z-40">
          {products.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800">Found {products.length} matching products</h2>
              </div>
              <ProductGrid products={products} />
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-4xl p-24 text-center shadow-sm">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-4xl flex items-center justify-center mx-auto mb-8">
                  <X className="h-12 w-12 text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">No products found</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  We couldn't find any products matching search query "<span className="font-bold text-slate-700">{searchQuery}</span>". Try adjusting your criteria.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const rawSections = await getPageSections();
  const hasHeader = rawSections.some((s: any) => s.type === "page-header");

  const sections = rawSections.map((s: any) => {
    if (s.type === "page-header") {
      return {
        ...s,
        content: {
          ...s.content,
          backgroundImg: bannerImage || s.content?.backgroundImg,
        },
      };
    }
    return s;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Standalone Header only if no-header section is present (fallback) */}
      {!hasHeader && (
        <PageHeader
          title=""
          backgroundImg={bannerImage}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products" }
          ]}
        />
      )}
      
      {sections.length > 0 ? (
        <div className="flex flex-col">
          {sections.map((section: any) => (
            <SectionRenderer key={section.id} section={section} readonly={true} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
          No catalog content found.
        </div>
      )}
    </div>
  );
}
