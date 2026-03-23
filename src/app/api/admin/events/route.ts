import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

// Admin: GET all events (paginated)
export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    const countResult = await query<any[]>("SELECT COUNT(*) as count FROM events");
    const total = countResult[0]?.count || 0;

    const events = await query<any[]>(
      "SELECT * FROM events ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return NextResponse.json({ events, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[API Error] Failed to fetch admin events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Admin: POST create event
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, subtitle, description, location, startDate, endDate, thumbnail, bannerImage, tags, isActive, status, gallery } = body;

    if (!title || !slug || !startDate) {
      return NextResponse.json({ error: "title, slug and startDate are required" }, { status: 400 });
    }

    const galleryJson = Array.isArray(gallery) ? JSON.stringify(gallery) : null;

    const id = crypto.randomUUID();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const eventStatus = ["upcoming", "ongoing", "completed"].includes(status) ? status : "upcoming";

    const safeStartDate = startDate ? startDate.split("T")[0] : null;
    const safeEndDate = endDate ? endDate.split("T")[0] : null;

    await query(
      `INSERT INTO events (id, slug, title, subtitle, description, location, startDate, endDate, thumbnail, bannerImage, tags, isActive, status, gallery, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, slug, title, subtitle || null, description || null, location || null, safeStartDate, safeEndDate, thumbnail || null, bannerImage || null, tags || null, isActive ? 1 : 0, eventStatus, galleryJson, now, now]
    );

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error: any) {
    console.error("[API Error] Failed to create event:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
