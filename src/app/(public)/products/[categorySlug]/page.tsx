import { query } from "@/lib/db";
import ProductGrid from "@/components/sections/products/ProductGrid";
import ProductFilters from "@/components/sections/products/ProductFilters";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { X } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}): Promise<Metadata> {
  const categories = await query<any[]>(
    "SELECT name, description, metaTitle, metaDescription FROM category WHERE slug = ?",
    [params.categorySlug]
  );
  const category = categories[0];

  if (!category) return {};

  return {
    title: category.metaTitle || `${category.name} | Besmak India`,
    description: category.metaDescription || category.description || `Explore our range of ${category.name} products.`,
  };
}

export default async function CategoryProductsPage({
  params,
  searchParams,
}: {
  params: { categorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 24;
  const offset = (page - 1) * limit;
  // 1. Get Category
  const categories = await query<any[]>(
    "SELECT * FROM category WHERE slug = ?",
    [params.categorySlug]
  );

  const category = categories[0];
  if (!category) notFound();

  // 2. Fetch all products for this category to derive filters
  const allProductsInCategory = await query<any[]>(
    "SELECT specifications FROM product WHERE categoryId = ?",
    [category.id]
  );

  // 3. Derive Filter Groups
  const specMap: Record<string, Set<string>> = {};
  allProductsInCategory.forEach((p: any) => {
    let specs = p.specifications;
    if (typeof specs === "string") specs = JSON.parse(specs);
    if (specs && typeof specs === "object") {
      Object.entries(specs).forEach(([key, value]) => {
        if (!specMap[key]) specMap[key] = new Set();
        specMap[key].add(String(value));
      });
    }
  });

  const filterGroups = Object.entries(specMap).map(([key, values]) => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    options: Array.from(values).sort().map(v => ({ label: v, value: v }))
  })).filter(group => group.options.length > 0);

  // 4. Construct SQL for search and filtering
  const searchQuery = (searchParams.q as string) || "";
  const queries = searchQuery.split(" ").filter(Boolean);

  let sql = `
    SELECT p.*, c.name as categoryName, c.slug as categorySlug 
    FROM product p 
    JOIN category c ON p.categoryId = c.id 
    WHERE p.categoryId = ?
  `;
  const sqlParams: any[] = [category.id];

  if (queries.length > 0) {
    sql += " AND (";
    queries.forEach((q, i) => {
      if (i > 0) sql += " AND ";
      sql += "(p.name LIKE ? OR p.description LIKE ? OR p.categorySpecification LIKE ? OR CAST(p.specifications AS CHAR) LIKE ?)";
      const term = `%${q}%`;
      sqlParams.push(term, term, term, term);
    });
    sql += ")";
  }

  // 5. Apply dynamic filters from specifications
  Object.keys(searchParams).forEach(key => {
    if (key !== 'q' && key !== 'page' && key !== 'limit' && searchParams[key]) {
      const val = searchParams[key];
      const values = Array.isArray(val) ? val : [val];

      if (values.length > 0) {
        const placeholders = values.map(() => "?").join(", ");
        sql += ` AND p.specifications->>'$."${key}"' IN (${placeholders})`;
        sqlParams.push(...values);
      }
    }
  });

  sql += " ORDER BY CASE WHEN p.specifications->>'$.Series' = '090' OR p.specifications->>'$.series' = '090' THEN 0 WHEN p.specifications->>'$.Series' IS NULL AND p.specifications->>'$.series' IS NULL THEN 2 ELSE 1 END ASC, COALESCE(p.specifications->>'$.Series', p.specifications->>'$.series') ASC, p.name ASC";

  // 6. Get Total Count for Pagination
  const countSql = sql.replace("SELECT p.*, c.name as categoryName, c.slug as categorySlug", "SELECT COUNT(*) as total");
  const countResult = await query<any[]>(countSql, sqlParams);
  const totalItems = countResult[0]?.total || 0;

  // 7. Apply Pagination to Main Query
  const paginatedSql = `${sql} LIMIT ? OFFSET ?`;
  const paginatedParams = [...sqlParams, limit, offset];

  const rawProducts = await query<any[]>(paginatedSql, paginatedParams);
  // console.log("SQL:", paginatedSql);
  // console.log("Params:", paginatedParams);

  // 6. Map to expected structure for ProductGrid
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
        backgroundImg={category.bannerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name }
        ]}
      />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${category.name} - Besmak India`,
        "description": category.description,
        "itemListElement": products.map((p, index) => ({
          "@type": "ListItem",
          "position": offset + index + 1,
          "name": p.name,
          "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://besmakindia.com'}/products/${p.categorySlug}/${p.slug}`,
          "image": p.images && JSON.parse(p.images)[0]
        }))
      }} />

      <div className="container mx-auto px-6 pb-12 max-w-7xl mt-2 relative z-40">
        <div className="flex flex-col gap-6">
          {/* Integrated Filter Bar & Results Header - Sticky */}
          <div className="sticky top-[75px] z-50 bg-[#fcfdfe] py-2">
            <Suspense fallback={<div className="h-12 w-full animate-pulse bg-slate-50 rounded-xl" />}>
              <ProductFilters
                filterGroups={filterGroups}
                title={category.name}
                totalProducts={totalItems}
                searchQuery={searchQuery}
              />
            </Suspense>
          </div>

          {/* Results section */}
          <div className="flex-1 min-w-0">
            {products.length > 0 ? (
              <div className="space-y-6">
                <ProductGrid products={products} />

                <Suspense fallback={<div className="h-10 w-full animate-pulse bg-slate-50 rounded-lg" />}>
                  <Pagination
                    totalItems={totalItems}
                    currentPage={page}
                    limit={limit}
                  />
                </Suspense>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-[3rem] p-24 text-center shadow-sm">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                    <X className="h-12 w-12 text-slate-200" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">No products found</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    We couldn't find any products matching your current search or filters in <span className="font-bold text-slate-700">{category.name}</span>. Try adjusting your criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
