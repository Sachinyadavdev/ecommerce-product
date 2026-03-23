import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isHome = searchParams.get("home") === "true";

    const sqlQuery = isHome
      ? "SELECT * FROM social_posts WHERE isActive = 1 AND showOnHome = 1 ORDER BY sortOrder ASC, createdAt DESC"
      : "SELECT * FROM social_posts WHERE isActive = 1 ORDER BY sortOrder ASC, createdAt DESC";

    const posts = await query<any[]>(sqlQuery);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API Error] Failed to fetch public social posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
