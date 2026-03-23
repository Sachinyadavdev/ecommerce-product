import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await query<any[]>("SELECT * FROM social_posts ORDER BY sortOrder ASC, createdAt DESC");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API Error] Failed to fetch social posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { platform, embedHtml, title, isActive, showOnHome, sortOrder } = body;

    if (!platform || !embedHtml) {
      return NextResponse.json({ error: "platform and embedHtml are required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    await query(
      `INSERT INTO social_posts (id, platform, embedHtml, title, isActive, showOnHome, sortOrder, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, platform, embedHtml, title || null, isActive ? 1 : 0, showOnHome ? 1 : 0, sortOrder || 0, now, now]
    );

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error: any) {
    console.error("[API Error] Failed to create social post:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
