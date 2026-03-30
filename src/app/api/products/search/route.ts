
import { NextRequest, NextResponse } from "next/server";
import { query as dbQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const keywords = q
    .trim()
    .split(/\s+/)
    .filter((k) => k.length > 0);

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

  try {
    const productsSql = `
      SELECT p.id, p.name, p.image, p.slug, c.slug as categorySlug, p.categorySpecification
      FROM product p 
      JOIN category c ON p.categoryId = c.id
      WHERE ${whereClause}
      ORDER BY CASE WHEN p.specifications->>'$.Series' = '090' OR p.specifications->>'$.series' = '090' THEN 0 WHEN p.specifications->>'$.Series' IS NULL AND p.specifications->>'$.series' IS NULL THEN 2 ELSE 1 END ASC, COALESCE(p.specifications->>'$.Series', p.specifications->>'$.series') ASC, p.name ASC
      LIMIT 10
    `;

    const products = await dbQuery<any[]>(productsSql, queryParams);

    return NextResponse.json(products.map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      slug: p.slug,
      categorySlug: p.categorySlug,
      categorySpecification: p.categorySpecification
    })));
  } catch (error) {
    console.error("[Search API Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
