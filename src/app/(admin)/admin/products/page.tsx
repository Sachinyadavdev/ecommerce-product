import { query as dbQuery } from "@/lib/db";
import ProductListClient from "@/components/admin/ProductListClient";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    search?: string;
    page?: string;
    category?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const searchTerm = searchParams.search || "";
  const selectedCategory = searchParams.category || "";
  const keywords = searchTerm
    .trim()
    .split(/\s+/)
    .filter((k) => k.length > 0);
  const currentPage = parseInt(searchParams.page || "1") || 1;
  const itemsPerPage = 20;
  const offset = (currentPage - 1) * itemsPerPage;

  // 1. Fetch categories for the filter
  const categories = await dbQuery<any[]>("SELECT id, name FROM category ORDER BY name ASC");

  // Build dynamic WHERE clause for multi-word search
  let whereClause = "1=1";
  let queryParams: any[] = [];

  if (keywords.length > 0) {
    const nameConditions = keywords.map(() => "name LIKE ?").join(" AND ");
    whereClause = `(${nameConditions}) OR id LIKE ?`;
    queryParams = [...keywords.map((k) => `%${k}%`), `%${searchTerm}%`];
  }

  if (selectedCategory) {
    whereClause = `(${whereClause}) AND categoryId = ?`;
    queryParams.push(selectedCategory);
  }

  // 1. Get total count for pagination
  const countSql = `
    SELECT COUNT(*) as total 
    FROM product 
    WHERE ${whereClause}
  `;
  const countResult = await dbQuery<any[]>(countSql, queryParams);
  const totalProducts = countResult[0]?.total || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // 2. Get paginated products
  const productsSql = `
    SELECT p.*, c.name as categoryName 
    FROM product p 
    LEFT JOIN category c ON p.categoryId = c.id 
    WHERE ${whereClause.replace(/name/g, "p.name").replace(/id/g, "p.id")}
    ORDER BY p.createdAt DESC
    LIMIT ? OFFSET ?
  `;
  const products = await dbQuery<any[]>(productsSql, [
    ...queryParams,
    itemsPerPage,
    offset,
  ]);

  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading products...</div>}>
      <ProductListClient 
        initialProducts={products}
        totalProducts={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </Suspense>
  );
}
