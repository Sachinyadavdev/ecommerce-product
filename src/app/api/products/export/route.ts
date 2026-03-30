import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';
import { auth } from '@/auth';

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const searchTerm = searchParams.get('search') || "";
        const selectedCategory = searchParams.get('category') || "";

        const keywords = searchTerm
            .trim()
            .split(/\s+/)
            .filter((k) => k.length > 0);

        // Build dynamic WHERE clause matching the main product list logic
        let whereClause = "1=1";
        let queryParams: any[] = [];

        if (keywords.length > 0) {
            const nameConditions = keywords.map(() => "p.name LIKE ?").join(" AND ");
            whereClause = `(${nameConditions}) OR p.id LIKE ?`;
            queryParams = [...keywords.map((k) => `%${k}%`), `%${searchTerm}%`];
        }

        if (selectedCategory) {
            whereClause = `(${whereClause}) AND p.categoryId = ?`;
            queryParams.push(selectedCategory);
        }

        const sql = `
      SELECT p.*, c.name as categoryName 
      FROM product p 
      LEFT JOIN category c ON p.categoryId = c.id 
      WHERE ${whereClause}
      ORDER BY p.createdAt DESC
    `;

        const products = await dbQuery<any[]>(sql, queryParams);

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error exporting products:', error);
        return NextResponse.json({ error: "Failed to fetch products for export" }, { status: 500 });
    }
}
