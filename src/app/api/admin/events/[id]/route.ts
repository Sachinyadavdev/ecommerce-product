import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

// Admin: PATCH update event
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, subtitle, description, location, startDate, endDate, thumbnail, bannerImage, tags, isActive, status, gallery } = body;
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const eventStatus = ["upcoming", "ongoing", "completed"].includes(status) ? status : "upcoming";

    const safeStartDate = startDate ? startDate.split("T")[0] : null;
    const safeEndDate = endDate ? endDate.split("T")[0] : null;

    const galleryJson = Array.isArray(gallery) ? JSON.stringify(gallery) : null;

    await query(
      `UPDATE events SET
        title = ?, slug = ?, subtitle = ?, description = ?, location = ?,
        startDate = ?, endDate = ?, thumbnail = ?, bannerImage = ?,
        tags = ?, isActive = ?, status = ?, gallery = ?, updatedAt = ?
       WHERE id = ?`,
      [title, slug, subtitle || null, description || null, location || null, safeStartDate, safeEndDate, thumbnail || null, bannerImage || null, tags || null, isActive ? 1 : 0, eventStatus, galleryJson, now, params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[API Error] Failed to update event:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Admin: DELETE event
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await query("DELETE FROM events WHERE id = ?", [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Error] Failed to delete event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
