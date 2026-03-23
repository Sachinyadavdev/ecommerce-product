import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Public: GET single event by slug
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const events = await query<any[]>(
      "SELECT * FROM events WHERE slug = ? AND isActive = 1 LIMIT 1",
      [params.slug]
    );
    if (!events || events.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(events[0]);
  } catch (error) {
    console.error("[API Error] Failed to fetch event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
