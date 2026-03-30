import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';
import { auth } from '@/auth';
import fs from 'fs';
import path from 'path';

// GET media with pagination
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Load code-referenced media for 100% guarantee
    let codeReferencedUrls: string[] = [];
    try {
      const filePath = path.join(process.cwd(), 'src/lib/media-code-references.json');
      if (fs.existsSync(filePath)) {
        codeReferencedUrls = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (e) {
      console.error("Failed to load code-referenced media", e);
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const queryTerm = searchParams.get('q') || '';
    const showUnused = searchParams.get('unused') === 'true';
    const typeFilter = searchParams.get('type') || 'all';
    const offset = (page - 1) * limit;

    let whereConditions: string[] = [];
    let queryParams: any[] = [];

    if (queryTerm) {
      whereConditions.push("filename LIKE ?");
      queryParams.push(`%${queryTerm}%`);
    }

    if (typeFilter === 'image') {
      whereConditions.push("contentType LIKE 'image/%'");
    } else if (typeFilter === 'video') {
      whereConditions.push("contentType LIKE 'video/%'");
    }

    if (showUnused) {
      let subquery = `
        (
          NOT EXISTS (SELECT 1 FROM category WHERE image COLLATE utf8mb4_unicode_ci = media.url COLLATE utf8mb4_unicode_ci)
          AND NOT EXISTS (SELECT 1 FROM product WHERE JSON_SEARCH(images, 'one', media.url COLLATE utf8mb4_unicode_ci) IS NOT NULL)
          AND NOT EXISTS (SELECT 1 FROM events WHERE thumbnail COLLATE utf8mb4_unicode_ci = media.url COLLATE utf8mb4_unicode_ci OR bannerImage COLLATE utf8mb4_unicode_ci = media.url COLLATE utf8mb4_unicode_ci OR JSON_SEARCH(gallery, 'one', media.url COLLATE utf8mb4_unicode_ci) IS NOT NULL)
          AND NOT EXISTS (SELECT 1 FROM site_settings WHERE value COLLATE utf8mb4_unicode_ci = media.url COLLATE utf8mb4_unicode_ci)
          AND NOT EXISTS (SELECT 1 FROM page_sections WHERE content LIKE CONCAT('%', media.url COLLATE utf8mb4_unicode_ci, '%'))
        )
      `;

      if (codeReferencedUrls.length > 0) {
        const placeholders = codeReferencedUrls.map(() => "?").join(", ");
        subquery += ` AND media.url COLLATE utf8mb4_unicode_ci NOT IN (${placeholders})`;
        queryParams.push(...codeReferencedUrls);
      }
      
      whereConditions.push(subquery);
    }

    const whereClause = whereConditions.length > 0 
      ? ` WHERE ${whereConditions.join(" AND ")}` 
      : "";

    // Fetch total count
    const countResult = await dbQuery<any[]>(
      `SELECT COUNT(*) as count FROM media${whereClause}`,
      queryParams
    );
    const total = countResult[0]?.count || 0;

    // Fetch paginated media
    const media = await dbQuery<any[]>(
      `SELECT * FROM media${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      media,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

// DELETE a media item
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const url = searchParams.get('url');

    if (!id || !url) {
      return NextResponse.json({ error: "ID and URL are required" }, { status: 400 });
    }

    // 1. Delete from Vercel Blob
    try {
        await del(url);
    } catch (blobError) {
        console.error('Error deleting from Vercel Blob:', blobError);
        // We continue to delete from DB even if blob delete fails or file is already gone
    }

    // 2. Delete from Database
    await dbQuery("DELETE FROM media WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
// PATCH to update media metadata (alt text)
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, alt } = data;

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    await dbQuery("UPDATE media SET alt = ?, updatedAt = ? WHERE id = ?", [alt, new Date(), id]);

    return NextResponse.json({ success: true, message: "Metadata updated successfully" });
  } catch (error) {
    console.error('Error updating media metadata:', error);
    return NextResponse.json({ error: "Failed to update metadata" }, { status: 500 });
  }
}
