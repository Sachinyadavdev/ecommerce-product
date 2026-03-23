import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Public: GET all active events ordered by startDate
export async function GET() {
  try {
    const events = await query<any[]>(
      "SELECT * FROM events WHERE isActive = 1 ORDER BY startDate ASC"
    );
    return NextResponse.json(events);
  } catch (error) {
    console.error("[API Error] Failed to fetch events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
