import { NextResponse } from "next/server";
import { getLinkedInPosts } from "@/lib/linkedin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getLinkedInPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API Error] Failed to fetch LinkedIn posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
