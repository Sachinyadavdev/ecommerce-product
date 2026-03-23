import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req: Request, context: any) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    const body = await req.json();
    const { platform, embedHtml, title, isActive, showOnHome, sortOrder } = body;

    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    await query(
      `UPDATE social_posts SET
        platform = ?, embedHtml = ?, title = ?,
        isActive = ?, showOnHome = ?, sortOrder = ?, updatedAt = ?
       WHERE id = ?`,
      [platform, embedHtml, title || null, isActive ? 1 : 0, showOnHome ? 1 : 0, sortOrder || 0, now, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[API Error] Failed to update social post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    await query("DELETE FROM social_posts WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Error] Failed to delete social post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
