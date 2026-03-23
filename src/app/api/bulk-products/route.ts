import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';
import { auth } from '@/auth';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { products } = await req.json();

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array of products." }, { status: 400 });
    }

    // Fetch all categories for name-to-id mapping
    const categories = await dbQuery<any[]>("SELECT id, name FROM category");
    const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));

    const now = new Date();
    let createdCount = 0;
    let updatedCount = 0;
    const usedSlugsInBatch = new Set<string>();

    async function generateUniqueSlug(baseName: string, originalSlug?: string, excludeId?: string) {
      // 1. Initial slug from trimmed name or provided slug
      let baseSlug = (originalSlug || baseName)
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

      let slug = baseSlug;
      let counter = 1;

      while (true) {
        // Find if this slug exists for ANOTHER product
        const collisionQuery = excludeId
          ? ["SELECT id FROM product WHERE slug = ? AND id != ?", [slug, excludeId]]
          : ["SELECT id FROM product WHERE slug = ?", [slug]];

        const existsInDb = await dbQuery<any[]>(collisionQuery[0] as string, collisionQuery[1] as any[]);

        if (existsInDb.length === 0 && !usedSlugsInBatch.has(slug)) {
          break;
        }
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      usedSlugsInBatch.add(slug);
      return slug;
    }

    function safeJsonStringify(input: any, defaultValue: string = "{}") {
      try {
        if (!input) return defaultValue;
        let obj = input;
        if (typeof input === 'string') {
          try {
            obj = JSON.parse(input);
          } catch {
            obj = input;
          }
        }
        return JSON.stringify(obj);
      } catch (error) {
        return defaultValue;
      }
    }

    for (const product of products) {
      let {
        id,
        name,
        slug,
        description,
        categoryId,
        categoryName,
        categorySpecification,
        images,
        specifications
      } = product;

      if (!name) continue;

      // 1. Try to find existing product to UPSERT
      let existingProduct = null;

      // STAGE 1: Match by ID if provided
      if (id) {
        const rows = await dbQuery<any[]>("SELECT id, slug FROM product WHERE id = ?", [id]);
        if (rows.length > 0) existingProduct = rows[0];
      }

      // STAGE 2: Match by EXACT Name (most reliable for user intent)
      if (!existingProduct && name) {
        const rows = await dbQuery<any[]>(
          "SELECT id, slug FROM product WHERE LOWER(TRIM(name)) = LOWER(TRIM(?)) LIMIT 1",
          [name]
        );
        if (rows.length > 0) existingProduct = rows[0];
      }

      // STAGE 3: Match by Slug if explicitly provided
      if (!existingProduct && slug) {
        const rows = await dbQuery<any[]>("SELECT id, slug FROM product WHERE slug = ?", [slug]);
        if (rows.length > 0) existingProduct = rows[0];
      }

      // 2. Dynamic Slug Generation (preserve if updating and not changed, or generate unique)
      slug = await generateUniqueSlug(name, slug || (existingProduct?.slug), existingProduct?.id);

      // 3. Dynamic Category Mapping
      if (!categoryId && categoryName) {
        categoryId = categoryMap.get(categoryName.toLowerCase()) || null;
      }

      const finalImages = safeJsonStringify(images, "[]");
      const finalSpecs = safeJsonStringify(specifications, "{}");

      if (existingProduct) {
        // UPDATE
        await dbQuery(
          "UPDATE product SET name = ?, slug = ?, description = ?, categoryId = ?, categorySpecification = ?, images = ?, specifications = ?, updatedAt = ? WHERE id = ?",
          [name, slug, description || "", categoryId || null, categorySpecification || null, finalImages, finalSpecs, now, existingProduct.id]
        );
        updatedCount++;
      } else {
        // INSERT
        const newId = id || crypto.randomUUID();
        await dbQuery(
          "INSERT INTO product (id, name, slug, description, categoryId, categorySpecification, images, specifications, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [newId, name, slug, description || "", categoryId || null, categorySpecification || null, finalImages, finalSpecs, now, now]
        );
        createdCount++;
      }
    }

    // Force revalidation of the product catalog
    revalidatePath('/admin/products');
    revalidatePath('/products');

    return NextResponse.json({
      success: true,
      message: `Bulk operation completed: ${createdCount} created, ${updatedCount} updated.`,
      stats: { created: createdCount, updated: updatedCount }
    });
  } catch (error) {
    console.error('Bulk product error:', error);
    return NextResponse.json({ error: "Failed to process bulk operation" }, { status: 500 });
  }
}
